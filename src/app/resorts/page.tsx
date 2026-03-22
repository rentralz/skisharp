import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import NextSteps from "@/components/NextSteps";

export const metadata: Metadata = {
  title: "Ski Resorts Worldwide",
  description:
    "Explore ski resorts around the world grouped by region. North America, Europe, Japan, South America, Oceania, and more — with key stats and what each resort is known for.",
};

interface Resort {
  name: string;
  location: string;
  knownFor: string;
  vertical?: string;
  terrain?: string;
  season?: string;
  website?: string;
}

interface Region {
  name: string;
  icon: string;
  color: string;
  borderColor: string;
  textColor: string;
  description: string;
  seasonNote: string;
  subregions: {
    name: string;
    resorts: Resort[];
  }[];
}

const regions: Region[] = [
  {
    name: "North America",
    icon: "🇺🇸",
    color: "from-blue-950 to-indigo-950",
    borderColor: "border-blue-700/30",
    textColor: "text-blue-300",
    description: "Home to massive resorts with reliable snowfall, modern infrastructure, and everything from gentle groomers to extreme backcountry.",
    seasonNote: "Season: November – April (some resorts into June)",
    subregions: [
      {
        name: "Colorado",
        resorts: [
          { name: "Vail", location: "CO, USA", knownFor: "Legendary back bowls, massive terrain variety", vertical: "3,450 ft", terrain: "5,317 acres" },
          { name: "Breckenridge", location: "CO, USA", knownFor: "High altitude, great park, accessible from Denver", vertical: "3,398 ft", terrain: "2,908 acres" },
          { name: "Aspen Snowmass", location: "CO, USA", knownFor: "Four mountains, world-class après, steep terrain", vertical: "4,406 ft", terrain: "5,527 acres" },
          { name: "Telluride", location: "CO, USA", knownFor: "Stunning box canyon setting, expert terrain, uncrowded", vertical: "4,425 ft", terrain: "2,000 acres" },
        ],
      },
      {
        name: "Utah",
        resorts: [
          { name: "Park City", location: "UT, USA", knownFor: "Largest resort in the US, easy access from SLC", vertical: "3,100 ft", terrain: "7,300 acres" },
          { name: "Alta", location: "UT, USA", knownFor: "Skiers only (no snowboarders), legendary powder", vertical: "2,538 ft", terrain: "2,614 acres" },
          { name: "Snowbird", location: "UT, USA", knownFor: "Extreme terrain, deep powder, long season", vertical: "3,240 ft", terrain: "2,500 acres" },
        ],
      },
      {
        name: "Pacific Northwest & California",
        resorts: [
          { name: "Whistler Blackcomb", location: "BC, Canada", knownFor: "North America's largest ski area, incredible variety", vertical: "5,280 ft", terrain: "8,171 acres" },
          { name: "Jackson Hole", location: "WY, USA", knownFor: "Legendary steeps, Corbet's Couloir, expert terrain", vertical: "4,139 ft", terrain: "2,500 acres" },
          { name: "Mammoth Mountain", location: "CA, USA", knownFor: "Huge snowfall, long season (often into July), great parks", vertical: "3,100 ft", terrain: "3,500 acres" },
          { name: "Big Sky", location: "MT, USA", knownFor: "Biggest skiing in America (by acreage), uncrowded", vertical: "4,350 ft", terrain: "5,800 acres" },
        ],
      },
      {
        name: "Eastern North America",
        resorts: [
          { name: "Killington", location: "VT, USA", knownFor: "The Beast of the East — longest season in the East", vertical: "3,050 ft", terrain: "1,509 acres" },
          { name: "Stowe", location: "VT, USA", knownFor: "Classic New England charm, challenging front four trails", vertical: "2,360 ft", terrain: "485 acres" },
          { name: "Mont-Tremblant", location: "QC, Canada", knownFor: "Charming European-style village, best in Eastern Canada", vertical: "2,116 ft", terrain: "755 acres" },
          { name: "Jay Peak", location: "VT, USA", knownFor: "Most natural snow in the East, expert glades", vertical: "2,153 ft", terrain: "385 acres" },
        ],
      },
      {
        name: "Western Canada",
        resorts: [
          { name: "Revelstoke", location: "BC, Canada", knownFor: "Most vertical in North America, deep powder", vertical: "5,620 ft", terrain: "3,121 acres" },
          { name: "Lake Louise", location: "AB, Canada", knownFor: "Stunning Rockies scenery, world cup venue, reliable cold snow", vertical: "3,250 ft", terrain: "4,200 acres" },
          { name: "Banff Sunshine", location: "AB, Canada", knownFor: "Canada's highest base elevation, dry snow, long season", vertical: "3,514 ft", terrain: "3,358 acres" },
        ],
      },
    ],
  },
  {
    name: "Europe",
    icon: "🇪🇺",
    color: "from-emerald-950 to-teal-950",
    borderColor: "border-emerald-700/30",
    textColor: "text-emerald-300",
    description: "The birthplace of alpine skiing. Massive interconnected ski areas, stunning mountain scenery, and unmatched mountain culture.",
    seasonNote: "Season: December – April (glaciers year-round)",
    subregions: [
      {
        name: "France",
        resorts: [
          { name: "Chamonix", location: "French Alps", knownFor: "The capital of alpinism, extreme terrain, Vallée Blanche", vertical: "9,209 ft", terrain: "Off-piste paradise" },
          { name: "Les 3 Vallées (Courchevel/Méribel/Val Thorens)", location: "French Alps", knownFor: "World's largest linked ski area (600km of pistes)", terrain: "600km pistes" },
          { name: "Val d'Isère / Tignes", location: "French Alps", knownFor: "Snow-sure, high altitude, world cup racing", terrain: "300km pistes" },
          { name: "La Plagne / Les Arcs (Paradiski)", location: "French Alps", knownFor: "Massive linked area, family-friendly, glacier skiing", terrain: "425km pistes" },
        ],
      },
      {
        name: "Switzerland",
        resorts: [
          { name: "Zermatt", location: "Valais", knownFor: "Matterhorn views, highest pistes in Europe, year-round skiing", terrain: "360km pistes" },
          { name: "Verbier", location: "Valais", knownFor: "Expert freeride Mecca, legendary Mont Fort", terrain: "410km pistes (4 Vallées)" },
          { name: "St. Moritz", location: "Engadin", knownFor: "Birthplace of winter tourism, glamour, reliable sunshine", terrain: "350km pistes" },
          { name: "Laax", location: "Graubünden", knownFor: "Europe's best freestyle scene, huge halfpipe", terrain: "224km pistes" },
        ],
      },
      {
        name: "Austria",
        resorts: [
          { name: "St. Anton am Arlberg", location: "Tyrol", knownFor: "Birthplace of alpine skiing instruction, legendary off-piste, wild après", terrain: "300km pistes" },
          { name: "Kitzbühel", location: "Tyrol", knownFor: "Home of the Hahnenkamm — most famous downhill in racing", terrain: "170km pistes" },
          { name: "Ischgl", location: "Tyrol", knownFor: "Party scene, duty-free shopping in Samnaun (Switzerland), modern lifts", terrain: "239km pistes" },
          { name: "Sölden", location: "Tyrol", knownFor: "Two glaciers, World Cup opener, featured in James Bond", terrain: "144km pistes" },
        ],
      },
      {
        name: "Italy",
        resorts: [
          { name: "Cortina d'Ampezzo", location: "Dolomites", knownFor: "2026 Winter Olympics, stunning Dolomite scenery, Italian culture", terrain: "120km pistes" },
          { name: "Val Gardena / Sella Ronda", location: "Dolomites", knownFor: "Spectacular circuit linking 4 valleys, UNESCO scenery", terrain: "175km pistes" },
          { name: "Courmayeur", location: "Aosta Valley", knownFor: "Mont Blanc views, gourmet mountain dining, off-piste", terrain: "100km pistes" },
        ],
      },
      {
        name: "Scandinavia",
        resorts: [
          { name: "Åre", location: "Sweden", knownFor: "Scandinavia's biggest, World Cup venue, northern lights", terrain: "91km pistes" },
          { name: "Levi", location: "Finland", knownFor: "Lapland experience, World Cup slalom, aurora borealis", terrain: "43km pistes" },
          { name: "Hemsedal", location: "Norway", knownFor: "The Scandinavian Alps, reliable snow, family-friendly", terrain: "53km pistes" },
        ],
      },
    ],
  },
  {
    name: "Japan",
    icon: "🇯🇵",
    color: "from-red-950 to-rose-950",
    borderColor: "border-red-700/30",
    textColor: "text-red-300",
    description: "The powder capital of the world. Japow (Japanese powder) is legendary — deep, dry, and incredibly consistent. Add world-class food, onsens, and culture.",
    seasonNote: "Season: December – April (best powder: January – February)",
    subregions: [
      {
        name: "Hokkaido",
        resorts: [
          { name: "Niseko", location: "Hokkaido", knownFor: "14+ meters of annual snowfall, world-famous powder, international scene" },
          { name: "Furano", location: "Hokkaido", knownFor: "Less crowded than Niseko, excellent powder, no queues" },
          { name: "Rusutsu", location: "Hokkaido", knownFor: "Tree skiing paradise, deep consistent powder, family-friendly" },
          { name: "Kiroro", location: "Hokkaido", knownFor: "Huge snowfall (21m annual), uncrowded, deep powder" },
        ],
      },
      {
        name: "Honshu",
        resorts: [
          { name: "Hakuba Valley", location: "Nagano", knownFor: "1998 Olympics, 10 linked resorts, variety for all levels" },
          { name: "Nozawa Onsen", location: "Nagano", knownFor: "Traditional onsen village, great powder, authentic Japanese experience" },
          { name: "Myoko Kogen", location: "Niigata", knownFor: "Massive snowfall, uncrowded, steep challenging terrain" },
          { name: "Shiga Kogen", location: "Nagano", knownFor: "Japan's largest linked ski area, snow monkeys nearby" },
        ],
      },
    ],
  },
  {
    name: "South America",
    icon: "🇦🇷",
    color: "from-amber-950 to-yellow-950",
    borderColor: "border-amber-700/30",
    textColor: "text-amber-300",
    description: "Southern hemisphere skiing means winter in July-September. Perfect for chasing endless winter or training during the northern off-season.",
    seasonNote: "Season: June – October",
    subregions: [
      {
        name: "Argentina",
        resorts: [
          { name: "Las Leñas", location: "Mendoza", knownFor: "South America's most extreme terrain, legendary off-piste, Marte chairlift" },
          { name: "Cerro Catedral", location: "Bariloche, Patagonia", knownFor: "Largest resort in South America, stunning lake views, great base town" },
          { name: "Chapelco", location: "San Martín de los Andes", knownFor: "Charming town, great tree skiing, family-friendly" },
        ],
      },
      {
        name: "Chile",
        resorts: [
          { name: "Valle Nevado", location: "Near Santiago", knownFor: "Easy access from Santiago, heli-skiing, above treeline" },
          { name: "Portillo", location: "Andes", knownFor: "Iconic boutique resort, world speed records, Inca Lake setting" },
          { name: "Nevados de Chillán", location: "Central Chile", knownFor: "Hot springs, volcanos, tree skiing, unique terrain" },
        ],
      },
    ],
  },
  {
    name: "Oceania & Others",
    icon: "🇳🇿",
    color: "from-purple-950 to-violet-950",
    borderColor: "border-purple-700/30",
    textColor: "text-purple-300",
    description: "Southern hemisphere resorts in New Zealand and Australia, plus emerging destinations in Central Asia and the Middle East.",
    seasonNote: "Season: June – October",
    subregions: [
      {
        name: "New Zealand",
        resorts: [
          { name: "Queenstown (The Remarkables / Coronet Peak)", location: "South Island", knownFor: "Adventure capital, stunning scenery, varied terrain" },
          { name: "Wanaka (Treble Cone / Cardrona)", location: "South Island", knownFor: "Best terrain in NZ, less crowded than Queenstown" },
          { name: "Mt Hutt", location: "Canterbury", knownFor: "Longest season in NZ, wide open terrain, reliable snow" },
        ],
      },
      {
        name: "Australia",
        resorts: [
          { name: "Perisher", location: "NSW", knownFor: "Australia's largest, family-friendly, good infrastructure" },
          { name: "Thredbo", location: "NSW", knownFor: "Longest runs in Australia, best vertical, village atmosphere" },
          { name: "Falls Creek", location: "Victoria", knownFor: "Ski-in/ski-out village, cross-country, family destination" },
        ],
      },
      {
        name: "Others",
        resorts: [
          { name: "Gudauri", location: "Georgia", knownFor: "Affordable, uncrowded, incredible freeride potential, growing fast" },
          { name: "Gulmarg", location: "Kashmir, India", knownFor: "Himalayan powder, gondola to 3,980m, untouched off-piste" },
          { name: "Shymbulak", location: "Almaty, Kazakhstan", knownFor: "Close to city, high altitude, emerging destination" },
        ],
      },
    ],
  },
];

export default function ResortsPage() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{label:'Resorts'}]} />

      <div id="main-content" className="bg-gradient-to-b from-[#0a1520] to-[#0d1b2a] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Where to ski
          </p>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Ski Resorts Worldwide
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            From the powder fields of Hokkaido to the steep couloirs of Chamonix —
            explore ski resorts around the world, organized by region.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Region quick nav */}
        <div className="flex flex-wrap gap-2 mb-12">
          {regions.map((r) => (
            <a
              key={r.name}
              href={`#${r.name.toLowerCase().replace(/\s/g, "-")}`}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-[#e8722a]/30 transition-colors"
            >
              {r.icon} {r.name}
            </a>
          ))}
        </div>

        <div className="space-y-16">
          {regions.map((r) => (
            <section
              key={r.name}
              id={r.name.toLowerCase().replace(/\s/g, "-")}
              className="scroll-mt-20"
            >
              <div className={`rounded-2xl bg-gradient-to-br ${r.color} p-6 sm:p-8 border ${r.borderColor} mb-6`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{r.name}</h2>
                    <p className={`text-sm ${r.textColor}`}>{r.seasonNote}</p>
                  </div>
                </div>
                <p className="text-gray-300 mt-3">{r.description}</p>
              </div>

              <div className="space-y-8">
                {r.subregions.map((sr) => (
                  <div key={sr.name}>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8722a]" />
                      {sr.name}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {sr.resorts.map((resort) => (
                        <div
                          key={resort.name}
                          className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <h4 className="text-white font-bold mb-1">{resort.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">{resort.location}</p>
                          <p className="text-sm text-gray-400 mb-2">{resort.knownFor}</p>
                          {(resort.vertical || resort.terrain) && (
                            <div className="flex flex-wrap gap-2 text-xs">
                              {resort.vertical && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300 border border-blue-700/30">
                                  ↕ {resort.vertical}
                                </span>
                              )}
                              {resort.terrain && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/30">
                                  ⛰ {resort.terrain}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Note */}
        <section className="mt-16 p-6 rounded-2xl bg-[#e8722a]/5 border border-[#e8722a]/15">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span>🌍</span> Chase Endless Winter
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The northern hemisphere ski season runs November to April, while the
            southern hemisphere runs June to October. By alternating between the
            two, dedicated skiers can ski year-round. Many professional athletes
            train in New Zealand and South America during the northern off-season.
          </p>
        </section>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <NextSteps links={[
          { href: '/techniques', label: 'Browse Techniques →', description: '30+ expert-curated skiing technique guides with video breakdowns' },
          { href: '/equipment-guide', label: 'Equipment Guide →', description: 'Choose the right skis, boots, and gear for your level and style' },
          { href: '/snow-conditions', label: 'Snow Conditions →', description: 'Learn to adapt your skiing to groomed, powder, ice, and more' },
        ]} />
      </div>
      <Footer />
    </div>
  );
}
