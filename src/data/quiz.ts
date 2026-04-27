import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import { getTechniqueBySlug, type DifficultyRating } from "@/data/techniques";

export interface QuestionOption {
  label: string;
  points: number;
  detail?: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface SkillResult {
  level: number;
  title: string;
  emoji: string;
  color: string;
  bgColor: string;
  rating: DifficultyRating;
  description: string;
  techniques: string[];
  nextGoal: string;
}

export interface QuizTrack {
  discipline: Discipline;
  questions: Question[];
  getResult: (score: number) => SkillResult;
}

interface ResultBracket {
  maxScore: number;
  result: SkillResult;
}

function createResultLookup(brackets: ResultBracket[]) {
  return (score: number): SkillResult => {
    const match = brackets.find((bracket) => score <= bracket.maxScore) ?? brackets[brackets.length - 1];

    if (!match) {
      throw new Error("Quiz result brackets must contain at least one entry.");
    }

    return match.result;
  };
}

const skiQuestions: Question[] = [
  {
    id: "experience",
    text: "How many days have you skied in your life?",
    options: [
      { label: "Never — this is brand new", points: 0 },
      { label: "1–5 days", points: 1 },
      { label: "6–20 days", points: 2 },
      { label: "21–50 days", points: 3 },
      { label: "50+ days", points: 4 },
    ],
  },
  {
    id: "comfort",
    text: "What's the hardest terrain you're comfortable on?",
    options: [
      { label: "I haven't been on a slope yet", points: 0 },
      { label: "Green / bunny hill — gentle slopes", points: 1 },
      { label: "Blue — moderate steepness", points: 2 },
      { label: "Black — steep, challenging runs", points: 3 },
      { label: "Double black — expert terrain, moguls, trees", points: 4 },
    ],
  },
  {
    id: "turns",
    text: "How do you currently turn on skis?",
    options: [
      { label: "I can't really turn yet", points: 0 },
      { label: "Snowplow / pizza turns", points: 1 },
      { label: "Skidded parallel turns", points: 2 },
      { label: "Carved turns with edge grip", points: 3 },
      { label: "Dynamic short turns at speed", points: 4 },
    ],
  },
  {
    id: "stopping",
    text: "How do you stop on skis?",
    options: [
      { label: "I fall or run into something", points: 0 },
      { label: "Snowplow stop (pizza)", points: 1 },
      { label: "Hockey stop on one side", points: 2 },
      { label: "Hockey stop on both sides confidently", points: 3 },
      { label: "I can stop instantly at any speed", points: 4 },
    ],
  },
  {
    id: "conditions",
    text: "Which conditions challenge you most?",
    options: [
      { label: "Everything — I'm just getting started", points: 0 },
      { label: "Anything steeper than a green", points: 1 },
      { label: "Ice and hard-packed snow", points: 2 },
      { label: "Moguls and variable terrain", points: 3 },
      { label: "Nothing — I ski everything", points: 4 },
    ],
  },
  {
    id: "goals",
    text: "What's your biggest goal right now?",
    options: [
      { label: "Learn the basics and stay safe", points: 0, detail: "fundamentals" },
      { label: "Stop snowplowing and ski parallel", points: 1, detail: "parallel" },
      { label: "Ski blue runs with confidence", points: 2, detail: "confidence" },
      { label: "Carve and handle all groomed terrain", points: 3, detail: "carving" },
      { label: "Master moguls, powder, and steep terrain", points: 4, detail: "expert" },
    ],
  },
];

const snowboardQuestions: Question[] = [
  {
    id: "experience",
    text: "How many days have you ridden a snowboard?",
    options: [
      { label: "Never — this is brand new", points: 0 },
      { label: "1–5 days", points: 1 },
      { label: "6–20 days", points: 2 },
      { label: "21–50 days", points: 3 },
      { label: "50+ days", points: 4 },
    ],
  },
  {
    id: "comfort",
    text: "What's the hardest terrain you're comfortable riding?",
    options: [
      { label: "I haven't been on a slope yet", points: 0 },
      { label: "Green / bunny hill — gentle slopes", points: 1 },
      { label: "Blue — moderate steepness", points: 2 },
      { label: "Black — steep, challenging runs", points: 3 },
      { label: "Double black — expert terrain, trees, powder", points: 4 },
    ],
  },
  {
    id: "heelside",
    text: "How solid is your heel-side control?",
    options: [
      { label: "I haven't found my heel edge yet", points: 0 },
      { label: "I can hold it only while side slipping", points: 1 },
      { label: "I can use it to start turns", points: 2 },
      { label: "I can ride heel-side confidently on groomers", points: 3 },
      { label: "It feels automatic in all normal conditions", points: 4 },
    ],
  },
  {
    id: "toeside",
    text: "How solid is your toe-side control?",
    options: [
      { label: "Toe-side still feels scary", points: 0 },
      { label: "I can hold it only with a lot of braking", points: 1 },
      { label: "I can make basic toe-side turns", points: 2 },
      { label: "I can ride toe-side confidently on groomers", points: 3 },
      { label: "It feels automatic in all normal conditions", points: 4 },
    ],
  },
  {
    id: "linking",
    text: "How do linked turns feel right now?",
    options: [
      { label: "I'm not linking turns yet", points: 0 },
      { label: "I can link a few turns but it's inconsistent", points: 1 },
      { label: "I can link turns on green terrain", points: 2 },
      { label: "I can link turns confidently on blue groomers", points: 3 },
      { label: "I can vary turn shape and rhythm anywhere I ride", points: 4 },
    ],
  },
  {
    id: "speed-control",
    text: "How do you control speed on your board?",
    options: [
      { label: "Mostly by falling or stopping completely", points: 0 },
      { label: "By skidding hard on one edge", points: 1 },
      { label: "With linked turns on easier runs", points: 2 },
      { label: "With turn shape and edge control on groomers", points: 3 },
      { label: "Comfortably in varied snow and steeper terrain", points: 4 },
    ],
  },
  {
    id: "goals",
    text: "What's your biggest goal right now?",
    options: [
      { label: "Learn the basics and stay upright", points: 0, detail: "basics" },
      { label: "Link turns without catching an edge", points: 1, detail: "linking" },
      { label: "Ride blue runs with confidence", points: 2, detail: "confidence" },
      { label: "Carve cleanly on groomers", points: 3, detail: "carving" },
      { label: "Ride powder, trees, park, or switch with control", points: 4, detail: "expert" },
    ],
  },
];

const skiResultBrackets: ResultBracket[] = [
  {
    maxScore: 3,
    result: {
      level: 1,
      title: "First Timer",
      emoji: "🟢",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      rating: "green",
      description:
        "You're at the very beginning, so the priority is simple: learn how to stand, stop, turn, and load the chairlift without chaos.",
      techniques: [
        "athletic-stance",
        "getting-up",
        "chairlift-basics",
        "wedge-turns",
        "snowplow-stop",
        "pizza-to-french-fries",
      ],
      nextGoal: "Link safe wedge turns and reliable snowplow stops on green terrain.",
    },
  },
  {
    maxScore: 8,
    result: {
      level: 2,
      title: "Progressing Beginner",
      emoji: "🟢",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      rating: "green",
      description:
        "You can get down easier runs, but you're still leaning on the wedge. Now it's time to build balance, side-slipping, and the path toward parallel skiing.",
      techniques: [
        "hockey-stop",
        "speed-control",
        "stem-christie",
        "balance-drills",
        "sideslipping",
        "linked-turns",
      ],
      nextGoal: "Move from wedge-based turning toward linked parallel turns on confident green-to-blue terrain.",
    },
  },
  {
    maxScore: 13,
    result: {
      level: 3,
      title: "Intermediate Cruiser",
      emoji: "🔵",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      rating: "blue",
      description:
        "You're skiing blues with growing confidence. The next jump comes from cleaner edge control, better weight transfer, and more deliberate turn shape.",
      techniques: [
        "parallel-turns",
        "edge-control-basics",
        "weight-transfer",
        "pole-planting",
        "fore-aft-balance",
        "garland-exercise",
      ],
      nextGoal: "Develop confident parallel skiing with cleaner pole plants and stronger outside-ski pressure.",
    },
  },
  {
    maxScore: 18,
    result: {
      level: 4,
      title: "Advanced Skier",
      emoji: "⬛",
      color: "text-gray-800",
      bgColor: "bg-gray-100 border-gray-300",
      rating: "black",
      description:
        "You handle steep groomers and mixed conditions. Your gains now come from sharper carving, tighter turn control, and stronger terrain tactics.",
      techniques: [
        "carved-turns",
        "hip-angulation",
        "short-turns",
        "mogul-absorption",
        "tree-skiing",
        "steep-terrain",
      ],
      nextGoal: "Build dynamic short turns and sharper line choice in bumps, trees, and steeper snow.",
    },
  },
  {
    maxScore: Number.POSITIVE_INFINITY,
    result: {
      level: 5,
      title: "Expert / All-Mountain",
      emoji: "⬛⬛",
      color: "text-purple-700",
      bgColor: "bg-purple-50 border-purple-200",
      rating: "double-black",
      description:
        "You already ski the whole mountain. The focus now is mastery: steep-terrain tactics, faster edge changes, and cleaner performance in difficult snow.",
      techniques: [
        "powder-floating",
        "retraction-turns",
        "step-turns",
        "hop-turns",
        "steep-skiing",
        "dynamic-carving",
      ],
      nextGoal: "Refine technique under pressure in powder, steeps, and highly variable snow.",
    },
  },
];

const snowboardResultBrackets: ResultBracket[] = [
  {
    maxScore: 4,
    result: {
      level: 1,
      title: "First-Day Rider",
      emoji: "🟢",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      rating: "green",
      description:
        "You're building the true foundations of riding: stance, flat-base awareness, chairlift basics, and the first edge-control drills that keep edge catches from running the show.",
      techniques: [
        "snowboard-athletic-stance",
        "snowboard-one-foot-riding",
        "snowboard-chairlift-basics",
        "snowboard-flat-base-awareness",
        "snowboard-side-slipping",
        "snowboard-falling-leaf",
      ],
      nextGoal: "Get comfortable traversing, side slipping, and staying calm on both edges on easy green terrain.",
    },
  },
  {
    maxScore: 10,
    result: {
      level: 2,
      title: "Developing Rider",
      emoji: "🟢",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      rating: "green",
      description:
        "You're moving beyond survival mode. The priority is stronger heel-side and toe-side control so linked turns stop feeling random.",
      techniques: [
        "snowboard-side-slipping",
        "snowboard-falling-leaf",
        "snowboard-heelside-turns",
        "snowboard-toeside-turns",
        "snowboard-linked-turns",
        "snowboard-speed-control",
      ],
      nextGoal: "Link consistent turns on green runs without relying on emergency braking.",
    },
  },
  {
    maxScore: 16,
    result: {
      level: 3,
      title: "Linked-Turn Cruiser",
      emoji: "🔵",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      rating: "blue",
      description:
        "You can already ride green runs and are starting to own your rhythm. Now it's about cleaner linked turns, better speed control, and your first carving habits.",
      techniques: [
        "snowboard-linked-turns",
        "snowboard-speed-control",
        "snowboard-garlands",
        "snowboard-basic-carving",
        "snowboard-variable-snow-basics",
        "snowboard-switch-basics",
      ],
      nextGoal: "Ride blue groomers with smoother edge changes and more deliberate turn shape.",
    },
  },
  {
    maxScore: 22,
    result: {
      level: 4,
      title: "Advanced Snowboarder",
      emoji: "⬛",
      color: "text-gray-800",
      bgColor: "bg-gray-100 border-gray-300",
      rating: "black",
      description:
        "You ride with control on tougher groomers and are ready to sharpen edge hold, carving confidence, switch basics, and adaptation in rougher snow.",
      techniques: [
        "snowboard-garlands",
        "snowboard-basic-carving",
        "snowboard-switch-basics",
        "snowboard-variable-snow-basics",
        "snowboard-powder-basics",
        "snowboard-speed-control",
      ],
      nextGoal: "Carry confident edge control into steeper runs, powder, and mixed snow.",
    },
  },
  {
    maxScore: Number.POSITIVE_INFINITY,
    result: {
      level: 5,
      title: "Expert / All-Mountain Rider",
      emoji: "⬛⬛",
      color: "text-purple-700",
      bgColor: "bg-purple-50 border-purple-200",
      rating: "double-black",
      description:
        "You already ride confidently across the mountain. Your focus now is sharper execution in powder, switch, carving, and whatever terrain variety the day throws at you.",
      techniques: [
        "snowboard-basic-carving",
        "snowboard-switch-basics",
        "snowboard-variable-snow-basics",
        "snowboard-powder-basics",
        "snowboard-garlands",
        "snowboard-linked-turns",
      ],
      nextGoal: "Refine precision and consistency when the snow, speed, or terrain gets more demanding.",
    },
  },
];

const QUIZ_RESULT_BRACKETS: Record<Discipline, ResultBracket[]> = {
  ski: skiResultBrackets,
  snowboard: snowboardResultBrackets,
};

export const QUIZ_TRACKS: Record<Discipline, QuizTrack> = {
  ski: {
    discipline: "ski",
    questions: skiQuestions,
    getResult: createResultLookup(QUIZ_RESULT_BRACKETS.ski),
  },
  snowboard: {
    discipline: "snowboard",
    questions: snowboardQuestions,
    getResult: createResultLookup(QUIZ_RESULT_BRACKETS.snowboard),
  },
};

for (const [discipline, track] of Object.entries(QUIZ_TRACKS) as [Discipline, QuizTrack][]) {
  const questionIds = new Set<string>();

  for (const question of track.questions) {
    if (questionIds.has(question.id)) {
      throw new Error(`Duplicate quiz question id for ${discipline}: ${question.id}`);
    }

    questionIds.add(question.id);
  }

  for (const { result } of QUIZ_RESULT_BRACKETS[discipline]) {
    for (const slug of result.techniques) {
      const technique = getTechniqueBySlug(slug);

      if (!technique) {
        throw new Error(`Quiz result references missing technique slug: ${slug}`);
      }

      if (technique.discipline !== discipline) {
        throw new Error(
          `Quiz result references cross-discipline technique: ${slug} is ${technique.discipline}, expected ${discipline}`,
        );
      }
    }
  }
}

export const QUIZ_DISCIPLINE_OPTIONS = (Object.keys(DISCIPLINES) as Discipline[]).map((discipline) => ({
  discipline,
  label: DISCIPLINES[discipline].label,
  detail:
    discipline === "ski"
      ? "Assess turning, stopping, terrain comfort, and progression toward cleaner parallel skiing."
      : "Assess edge control, linking turns, speed control, and progression toward stronger snowboard riding.",
}));

export function getQuizTrack(discipline: Discipline) {
  return QUIZ_TRACKS[discipline];
}
