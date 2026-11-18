// Free-text search for the technique library. Pure functions with no imports
// that run at load time, so `node --test` can load this file directly.
import type { Technique } from "@/data/techniques";

export type SearchableTechnique = Pick<
  Technique,
  "slug" | "title" | "description" | "terrain" | "discipline" | "rating"
>;

export type TechniqueAliases = Record<string, readonly string[]>;

// Words that say nothing about which technique someone wants ("how do I ...").
const STOPWORDS = new Set([
  "a", "an", "and", "are", "at", "best", "better", "can", "do", "does", "for", "from",
  "guide", "how", "i", "im", "in", "is", "it", "learn", "me", "my", "of", "on", "or",
  "should", "technique", "techniques", "the", "tip", "tips", "to", "way", "ways",
  "versus", "vs", "what", "when", "with", "without", "you", "your",
]);

const RATING_WORDS: Record<SearchableTechnique["rating"], string> = {
  green: "green beginner easy",
  blue: "blue intermediate",
  black: "black advanced",
  "double-black": "double black expert",
};

const DISCIPLINE_WORDS: Record<SearchableTechnique["discipline"], string> = {
  ski: "ski skiing skier",
  snowboard: "snowboard snowboarding board boarding rider",
};

// How strongly a match in each field counts when ranking results.
const WEIGHTS = { title: 5, alias: 4, tag: 2, description: 1 } as const;
type Field = keyof typeof WEIGHTS;

// Tokens shorter than this must match a whole word; longer ones may match the
// start of a word, so "mog" finds "moguls" and "carvi" finds "carving" while
// the visitor is still typing.
const MIN_PREFIX_LENGTH = 3;

export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function undouble(word: string) {
  const last = word[word.length - 1];
  return word.length > 3 && last === word[word.length - 2] && last !== "l" && last !== "s"
    ? word.slice(0, -1)
    : word;
}

// A deliberately small stemmer: enough that "stopping", "stops" and "stop",
// or "carving" and "carved" and "carve", reduce to the same stem.
export function stem(word: string) {
  let w = word;
  if (w.length > 4 && w.endsWith("ing")) {
    w = undouble(w.slice(0, -3));
  } else if (w.length > 4 && w.endsWith("ed") && !w.endsWith("eed")) {
    // "carved" -> "carv", but "speed" stays "speed"
    w = undouble(w.slice(0, -2));
  } else if (w.length > 3 && /(sh|ch|x|z)es$/.test(w)) {
    w = w.slice(0, -2);
  } else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) {
    w = w.slice(0, -1);
  }
  if (w.length > 3 && w.endsWith("e")) {
    w = w.slice(0, -1);
  }
  return w;
}

interface Words {
  raw: string[];
  stems: string[];
}

function words(text: string): Words {
  const raw = normalizeText(text).split(" ").filter(Boolean);
  return { raw, stems: raw.map(stem) };
}

interface QueryWord {
  raw: string;
  stem: string;
}

function queryWords(query: string): QueryWord[] {
  const seen = new Set<string>();
  return normalizeText(query)
    .split(" ")
    .filter((word) => word && !STOPWORDS.has(word))
    .map((raw) => ({ raw, stem: stem(raw) }))
    .filter(({ stem: s }) => (seen.has(s) ? false : (seen.add(s), true)));
}

export function queryTerms(query: string) {
  return queryWords(query).map(({ stem: s }) => s);
}

export function hasSearchTerms(query: string) {
  return queryTerms(query).length > 0;
}

export interface SearchIndexEntry {
  slug: string;
  fields: Record<Field, Words>;
}

export function buildSearchIndex(
  techniques: readonly SearchableTechnique[],
  aliases: TechniqueAliases = {},
): Map<string, SearchIndexEntry> {
  return new Map(
    techniques.map((technique) => [
      technique.slug,
      {
        slug: technique.slug,
        fields: {
          title: words(`${technique.title} ${technique.slug}`),
          alias: words((aliases[technique.slug] ?? []).join(" ")),
          tag: words(
            [
              ...technique.terrain,
              RATING_WORDS[technique.rating],
              DISCIPLINE_WORDS[technique.discipline],
            ].join(" "),
          ),
          description: words(technique.description),
        },
      },
    ]),
  );
}

// Starts of the endings the stemmer removes, as they appear mid-typing.
const PARTIAL_ENDINGS = new Set(["i", "in", "ing", "e", "ed", "es"]);

// True when a half-typed word is a known stem plus the start of an ending:
// "turni" (turn + i), "stoppi" (stop + p + i, the doubled consonant), "stopp".
function isPartialInflection(raw: string, base: string) {
  if (base.length < MIN_PREFIX_LENGTH || raw.length <= base.length || !raw.startsWith(base)) {
    return false;
  }
  let rest = raw.slice(base.length);
  const last = base[base.length - 1];
  if (rest === last) return true;
  if (rest.length > 1 && rest[0] === last) rest = rest.slice(1);
  return PARTIAL_ENDINGS.has(rest);
}

// A word matches by its stem ("stopping" finds "stops") or, while it is still
// being typed, as the start of a word ("carvi" finds "carving") or of an
// inflection of one ("turni", on the way to "turning", finds "turns").
function termMatches(term: QueryWord, field: Words) {
  if (term.raw.length < MIN_PREFIX_LENGTH) {
    return field.raw.includes(term.raw) || field.stems.includes(term.stem);
  }
  return (
    field.stems.some((word) => word.startsWith(term.stem) || isPartialInflection(term.raw, word)) ||
    field.raw.some((word) => word.startsWith(term.raw))
  );
}

function scoreEntry(entry: SearchIndexEntry, terms: QueryWord[]) {
  let score = 0;
  for (const term of terms) {
    let best = 0;
    for (const field of Object.keys(WEIGHTS) as Field[]) {
      if (WEIGHTS[field] > best && termMatches(term, entry.fields[field])) {
        best = WEIGHTS[field];
      }
    }
    if (best === 0) return 0; // every term has to match somewhere
    score += best;
  }
  return score;
}

// Returns the techniques that match every search term, best match first;
// ties keep the list's own order. A query with no usable terms ("how to")
// returns the list unchanged.
export function searchTechniques<T extends SearchableTechnique>(
  techniques: readonly T[],
  query: string,
  index: Map<string, SearchIndexEntry>,
): T[] {
  const terms = queryWords(query);
  if (terms.length === 0) return [...techniques];

  return techniques
    .map((technique, position) => {
      const entry = index.get(technique.slug);
      return { technique, position, score: entry ? scoreEntry(entry, terms) : 0 };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.position - b.position)
    .map(({ technique }) => technique);
}
