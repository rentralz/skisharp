import type { Discipline } from "./disciplines";

export type DifficultyRating = "green" | "blue" | "black" | "double-black";

export type TechniqueId = `${Discipline}:${string}`;

export interface VideoEntry {
  videoId: string;
  channel: string;
  channelUrl: string;
  title: string;
  isPrimary: boolean;
  teachingStyle: string;
}

export interface Timestamp {
  time: string;
  label: string;
  detail: string;
}

export interface Mistake {
  mistake: string;
  fix: string;
}

export interface Technique {
  id: TechniqueId;
  title: string;
  slug: string;
  discipline: Discipline;
  difficulty: number;
  rating: DifficultyRating;
  terrain: string[];
  description: string;
  promise: string;
  timestamps: Timestamp[];
  feels: string[];
  mistakes: Mistake[];
  drills: string[];
  prerequisites: string[];
  nextSteps: string[];
  youtubeVideos: VideoEntry[];
  updatedAt?: string; // ISO date string e.g. "2025-03"
}

export const techniques: Technique[] = [
  {
    id: "ski:wedge-turns",
    title: "Wedge Turns",
    slug: "wedge-turns",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "The foundation of learning to ski — pushing your tails out into a pizza shape to create drag, then steering with weight shifts to turn left and right.",
    promise:
      "You'll have your first reliable way to steer and slow down, giving you the confidence to safely navigate any beginner slope.",
    timestamps: [
      { time: "0:30", label: "The pizza position", detail: "Tips together, tails apart — stand in this wedge shape on flat ground first" },
      { time: "1:15", label: "Steering by weighting", detail: "Press on right foot to turn left, press on left foot to turn right" },
      { time: "2:30", label: "Looking downhill", detail: "Eyes down the slope — where you look is where you go, always" },
      { time: "3:45", label: "Completing the turn", detail: "Let the turn finish fully before starting the next — don't rush transitions" },
    ],
    feels: [
      "Your legs feel like a compass opening and closing as you steer across the slope",
      "Pressing through your heel creates the most reliable braking drag",
      "Speed drops naturally when you turn across the fall line — the slope does the work",
    ],
    mistakes: [
      { mistake: "Looking at your ski tips", fix: "Eyes always downhill toward where you're going, not down at your feet" },
      { mistake: "Sitting back on the tails", fix: "Lean forward into your boots — shins pressing against the boot tongues" },
      { mistake: "Arms pinned to your sides", fix: "Hands out in front at hip height like you're carrying a serving tray" },
    ],
    drills: [
      "Straight run and stop: point straight downhill, build a little speed, then use a full wedge to stop — repeat until stopping feels automatic",
      "Linked turn count: connect turns down the slope and count how many you can chain together — aim for 10 clean ones in a row",
      "Traverse and turn: ski diagonally across the full width of the run before each turn — it slows you down and lets you focus on steering",
    ],
    prerequisites: [],
    nextSteps: ["hockey-stop", "speed-control"],
    youtubeVideos: [
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow wedge turns",
        isPrimary: true,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
      {
        videoId: "wB-fVTBMQQU",
        channel: "Ski School by Elate",
        channelUrl: "https://www.youtube.com/@SkiSchoolbyElate",
        title: "From Wedge to Parallel",
        isPrimary: false,
        teachingStyle: "Patient, step-by-step on-slope instruction",
      },
    ],
    updatedAt: "2025-03",
  },
  {
    id: "ski:hockey-stop",
    title: "Hockey Stop",
    slug: "hockey-stop",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "An aggressive braking technique — pivot both skis perpendicular to the fall line and dig your edges in to stop instantly.",
    promise:
      "You'll be able to stop on a dime from any speed, giving you confidence on steeper green runs.",
    timestamps: [
      { time: "0:20", label: "Weight centering", detail: "Equal weight, knees bent before the stop" },
      { time: "1:00", label: "The pivot", detail: "Rotate both skis together 90° across the fall line" },
      { time: "2:10", label: "Edge set", detail: "Drive knees uphill to dig edges into snow" },
      { time: "3:30", label: "Both sides", detail: "Practice stopping left and right equally" },
    ],
    feels: [
      "Like you're slamming the brakes — decisive, not gradual",
      "Your uphill edges biting hard into the snow",
      "Your upper body staying calm while your legs pivot",
    ],
    mistakes: [
      { mistake: "Stopping only to one side", fix: "Drill on your weaker side every session until it feels equal" },
      { mistake: "Sitting back during the stop", fix: "Stay centered — lean back and you lose edge control entirely" },
      { mistake: "Rotating shoulders with the skis", fix: "Counter-rotate — shoulders stay downhill, only legs pivot" },
    ],
    drills: [
      "Speed 1-2-3 drill: ski at walking pace and stop, medium speed and stop, then faster — progressively build confidence",
      "Left-right parity: count your stops each direction — keep drilling the weaker side until you feel equal on both",
      "Touch-the-snow drill: after each hockey stop, reach down and tap the snow with your downhill hand to confirm you got low enough",
    ],
    prerequisites: ["wedge-turns"],
    nextSteps: ["parallel-turns", "speed-control"],
    youtubeVideos: [
      {
        videoId: "pKlY8J15g_c",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to do The Hockey Stop",
        isPrimary: true,
        teachingStyle: "Fun, high-energy breakdown",
      },
    ],
    updatedAt: "2025-06",
  },
  {
    id: "ski:speed-control",
    title: "Speed Control",
    slug: "speed-control",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Managing your velocity deliberately using turn shape, edge angle, and slope selection — not just relying on stops to avoid going too fast.",
    promise:
      "You'll stop white-knuckling down slopes and start choosing exactly how fast you go on any gradient.",
    timestamps: [
      { time: "0:40", label: "Turn shape = speed shape", detail: "Rounder, more across-the-hill turns = slower speed without stopping" },
      { time: "1:30", label: "Edge angle basics", detail: "More edge angle digs in harder and scrubs more speed per turn" },
      { time: "2:50", label: "The speed corridor", detail: "Find the width of turn that keeps you at your comfortable speed" },
      { time: "4:00", label: "Reading the pitch", detail: "Steeper slopes need rounder turns — adjust before you need to, not after" },
    ],
    feels: [
      "Each turn has a natural braking phase as you cross the fall line — lean into it",
      "Rushing turns releases speed, completing them manages it",
      "Comfortable speed feels like you're in charge — not hanging on",
    ],
    mistakes: [
      { mistake: "Using the wedge as the only speed control", fix: "Let turn shape do the work — round C-turns are more efficient than pizza braking" },
      { mistake: "Rushing onto the next turn before finishing the current one", fix: "Follow the arc all the way across the hill before initiating the next" },
      { mistake: "Picking lines that are too steep for current skills", fix: "Look one level easier and master it — green to blue is a big jump" },
    ],
    drills: [
      "Constant-speed run: pick a speed target and use only turn shape to maintain it all the way down — no stopping allowed",
      "Wide vs narrow turns: run the same slope with huge C-turns, then tighter turns — feel the direct relationship between shape and speed",
      "Count the seconds: time how long each turn takes — longer turns = lower speed, practice making each arc last 3+ seconds",
    ],
    prerequisites: ["wedge-turns", "hockey-stop"],
    nextSteps: ["wedge-christie", "parallel-turns"],
    youtubeVideos: [
      {
        videoId: "hrUbJxSQiRc",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "How to Control Your Speed",
        isPrimary: true,
        teachingStyle: "Practical, drill-driven with clear explanations",
      },
      {
        videoId: "M4_HZfGTunw",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Rounded Turns to Control Speed",
        isPrimary: false,
        teachingStyle: "Calm, technical on-slope coaching",
      },
    ],
    updatedAt: "2025-05",
  },
  {
    id: "ski:wedge-christie",
    title: "Wedge Christie",
    slug: "wedge-christie",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "The bridge between snowplow and parallel skiing — initiating turns with a wedge and bringing the skis parallel as the turn completes.",
    promise:
      "You'll feel true parallel skiing click for the first time, cutting your snowplow dependency in half each day on the mountain.",
    timestamps: [
      { time: "0:45", label: "The transition concept", detail: "Open the wedge to start the turn, close into parallel to finish it" },
      { time: "1:40", label: "When to close", detail: "Match the skis at the end of the fall-line phase, not at the top" },
      { time: "2:55", label: "Speed and timing", detail: "More speed makes it easier — you need momentum to step the inside ski across" },
      { time: "4:10", label: "Narrowing the wedge", detail: "Each run try to open a smaller wedge — shrink it toward parallel" },
    ],
    feels: [
      "Opening into wedge feels like hitting pause — then closing the skis sets you free",
      "The parallel phase at the end of each turn should feel light and fast",
      "Like you're borrowing from parallel skiing and paying it back with the wedge",
    ],
    mistakes: [
      { mistake: "Trying to close the skis at the top of the turn", fix: "Wait until you're across the fall line and the turn is mostly done before matching" },
      { mistake: "Not actually opening the wedge wide enough", fix: "Exaggerate the opening first — big wedge, then close — shrink it later" },
      { mistake: "Losing speed trying to be careful", fix: "Speed is your friend here — a gentle blue run works better than a flat green" },
    ],
    drills: [
      "Open-close rhythm: ski the slope just thinking 'open, close, open, close' — say it out loud as you turn",
      "One-turn focus: make one perfect wedge-christie, stop, think about it, then make the next — quality over quantity",
      "The shrink game: each run down, consciously make the wedge opening smaller — try to wedge less than the run before",
    ],
    prerequisites: ["wedge-turns", "hockey-stop"],
    nextSteps: ["parallel-turns", "pole-planting"],
    youtubeVideos: [
      {
        videoId: "ZOxlBfACVyk",
        channel: "Ski School by Elate",
        channelUrl: "https://www.youtube.com/@SkiSchoolbyElate",
        title: "Wedge Christie MA 1",
        isPrimary: true,
        teachingStyle: "Progressive, beginner-to-intermediate focus",
      },
      {
        videoId: "wB-fVTBMQQU",
        channel: "Ski School by Elate",
        channelUrl: "https://www.youtube.com/@SkiSchoolbyElate",
        title: "From Wedge to Parallel Turns",
        isPrimary: false,
        teachingStyle: "Technical with clear movement cues",
      },
    ],
  },
  {
    id: "ski:parallel-turns",
    title: "Parallel Turns",
    slug: "parallel-turns",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "The foundation of confident skiing — carving turns with both skis moving in unison across the fall line.",
    promise:
      "You'll stop snow-plowing and start carving clean arcs down groomed runs with speed and control.",
    timestamps: [
      { time: "0:30", label: "Stance setup", detail: "Hip-width apart, knees flexed, weight centered" },
      { time: "1:15", label: "Edge engagement", detail: "Tipping both skis to initiate the turn" },
      { time: "2:40", label: "Pole plant timing", detail: "Plant downhill pole at turn initiation" },
      { time: "4:00", label: "Weight transfer", detail: "Shift onto outside ski through the arc" },
    ],
    feels: [
      "Your outside ski feels like it's gripping a rail",
      "You're steering your knees into the hill",
      "The turn completes itself — you're not muscling it",
    ],
    mistakes: [
      { mistake: "Leaning back on the tails", fix: "Press shins against boot tongues throughout" },
      { mistake: "Skis splitting apart mid-turn", fix: "Focus on moving knees together as a unit" },
      { mistake: "Upper body rotating into the turn", fix: "Keep shoulders pointing downhill, let hips follow" },
    ],
    drills: [
      "Garland exercise: make 5 half-turns in one direction without completing the arc, then switch sides — feels the edge loading",
      "One-ski skiing: ski down balancing on your outside ski only, lifting the inside — forces correct weight transfer",
      "Counting the arc: count 'one, two, three' for each turn and make sure each number happens at a different spot across the hill",
    ],
    prerequisites: ["wedge-christie"],
    nextSteps: ["hip-angulation", "pole-planting"],
    youtubeVideos: [
      {
        videoId: "RIMiiOy2LKA",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "Parallel Skiing 101 - 4 Drills",
        isPrimary: true,
        teachingStyle: "Step-by-step drill-based",
      },
    ],
    updatedAt: "2025-08",
  },
  {
    id: "ski:pole-planting",
    title: "Pole Planting",
    slug: "pole-planting",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Timing your downhill pole plant to trigger turn initiation — the heartbeat rhythm that gives advanced parallel skiing its cadence and balance.",
    promise:
      "Your turns will develop a confident, rhythmic beat that improves timing and balance simultaneously.",
    timestamps: [
      { time: "0:35", label: "Where to plant", detail: "Downhill side, level with your boot toe — not behind you" },
      { time: "1:20", label: "The wrist flick", detail: "Plant comes from wrist and forearm, not the whole arm swinging" },
      { time: "2:45", label: "Timing it right", detail: "Plant triggers the turn — the pole hits just as you begin to tip the skis" },
      { time: "4:05", label: "Rhythm skiing", detail: "Think of it as a metronome — plant, turn, plant, turn, consistent beat" },
    ],
    feels: [
      "The pole tap is light — a touch, not a stab into the snow",
      "Each plant sets off the turn like a starting gun — you don't plant then wait",
      "Your arms move forward constantly, not reacting after the turn is done",
    ],
    mistakes: [
      { mistake: "Planting the pole too far behind", fix: "Keep hands in your peripheral vision at all times — forward, not back" },
      { mistake: "Swinging the whole arm", fix: "Flick from the wrist — arms are mostly quiet, wrists do the work" },
      { mistake: "Planting after the turn has already started", fix: "The plant must come first — it triggers the movement, not follows it" },
    ],
    drills: [
      "Touch-the-snow drill: ski without poles and reach down to touch the snow where your pole would go — builds spatial awareness",
      "Arm frame check: hold both poles out horizontally across your chest — they shouldn't move as you turn, only your wrists dip",
      "Walk-the-talk: stand still and mime the plant motion slowly 20 times — wrist flick, arm stays still, imaginary touch down the hill",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["hip-angulation", "short-radius-turns"],
    youtubeVideos: [
      {
        videoId: "qzDMHfZclg8",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to do Basic Pole Plant",
        isPrimary: true,
        teachingStyle: "Clear, drill-focused with common mistake callouts",
      },
      {
        videoId: "3cOnAKhne70",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Want a better pole plant",
        isPrimary: false,
        teachingStyle: "Technical on-slope with slow-motion analysis",
      },
    ],
    updatedAt: "2025-07",
  },
  {
    id: "ski:hip-angulation",
    title: "Hip Angulation",
    slug: "hip-angulation",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Tilting the hips toward the hill while keeping the upper body facing downhill — the secret to carving short-radius turns on steep blues.",
    promise:
      "Your parallel turns will suddenly feel locked-in and powerful instead of slipping out at high speeds.",
    timestamps: [
      { time: "0:30", label: "What angulation is", detail: "Bending at the hip joint, not just the ankles" },
      { time: "1:20", label: "The angulation feel", detail: "Think 'hip into the hill' not 'lean into the hill'" },
      { time: "2:45", label: "Separation drill", detail: "Upper body faces downhill while lower body carves" },
      { time: "4:00", label: "Applying to high speed", detail: "More angulation needed as speed increases" },
    ],
    feels: [
      "Like your hips are pulling toward the snow on the uphill side",
      "Your inside knee is driving into the turn",
      "A Z-shape in your body from the side — head out, hips in, feet out",
    ],
    mistakes: [
      { mistake: "Banking (whole body leaning) instead of angulating", fix: "Think hip-in, not body-in" },
      { mistake: "Upper body rotating downhill with hips", fix: "Counter-rotate — shoulders stay square to the fall line" },
      { mistake: "Only angulating at the waist", fix: "Angulation should come from the hip joint" },
    ],
    drills: [
      "Hip-in traverse: ski across the slope and consciously push your hip toward the snow on the uphill side — feel the Z-shape",
      "Thousand steps drill: take tiny skating steps across the fall line — each step forces weight to shift and hip to follow",
      "Javelin turns: lift your inside ski tip off the snow to force hip angulation — if you can't do it, you're not angulating enough",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["mogul-absorption", "carved-turns", "upper-lower-separation"],
    youtubeVideos: [
      {
        videoId: "N-XY3CB3FsA",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "How to Use the Hips to Carve",
        isPrimary: true,
        teachingStyle: "On-slope demonstration with clear cues",
      },
    ],
  },
  {
    id: "ski:upper-lower-separation",
    title: "Upper-Lower Body Separation",
    slug: "upper-lower-separation",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Training your upper and lower body to move independently — hips and legs carve through each turn while your shoulders stay square to the fall line.",
    promise:
      "The single biggest improvement most intermediate skiers never work on — your turns will feel effortlessly controlled instead of athletically forced.",
    timestamps: [
      { time: "0:50", label: "Why separation matters", detail: "Upper body rotation is the root cause of most intermediate plateau problems" },
      { time: "1:45", label: "The counter-rotation concept", detail: "As hips turn right, shoulders subtly resist leftward — a constant mild tension" },
      { time: "3:00", label: "Hands-forward drill", detail: "Hold your hands where you can always see them — this alone prevents most rotation" },
      { time: "4:20", label: "Video yourself", detail: "The rotation you feel you're doing is usually half what's actually happening on video" },
    ],
    feels: [
      "A slight twisting tension in your core throughout every turn — that's separation working",
      "Like your hips are on a rotating platform but your shoulders are bolted to the mountain face",
      "Your chest stays pointing roughly toward the valley no matter where your skis go",
    ],
    mistakes: [
      { mistake: "Turning with the whole body as one unit", fix: "Think of your hips and legs as the active part — upper body is the quiet anchor" },
      { mistake: "Hands dropping behind your hips", fix: "Keep hands forward and visible — if you can't see them, they're behind you" },
      { mistake: "Fighting the terrain with the upper body", fix: "Relax your shoulders and let the lower body do the work — release the grip" },
    ],
    drills: [
      "Pole-touch traverse: hold your poles horizontally across your chest as you traverse — if the poles stay level, you have separation",
      "Hands-in-front drill: ski a run with both hands held out in front like a zombie — exaggerated but teaches the feeling instantly",
      "Eyes-on-the-valley: pick a fixed point down the slope and keep your nose pointed at it for an entire run — shoulders follow your eyes",
    ],
    prerequisites: ["parallel-turns", "hip-angulation"],
    nextSteps: ["carved-turns", "short-radius-turns"],
    youtubeVideos: [
      {
        videoId: "sutoNhGGLvY",
        channel: "Deb Armstrong Skiing",
        channelUrl: "https://www.youtube.com/@debarmstrongskiing",
        title: "Ski Better with Separation",
        isPrimary: true,
        teachingStyle: "Technical with on-slope demos and drills",
      },
      {
        videoId: "uVcMhEBITRw",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Anticipated vs rotated vs countered",
        isPrimary: false,
        teachingStyle: "Drill-focused with clear before/after comparison",
      },
    ],
  },
  {
    id: "ski:carved-turns",
    title: "Carved Turns",
    slug: "carved-turns",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Pure edge-to-edge carving — loading the ski so it bends into a reverse-camber arc and tracks its own clean line with zero skidding.",
    promise:
      "You'll experience what it actually means to carve — the ski grips and arcs through the turn with almost no muscular effort required.",
    timestamps: [
      { time: "0:40", label: "Skid vs carve distinction", detail: "Skidding leaves a wide smear; carving leaves a pencil-thin line in the snow" },
      { time: "1:35", label: "Edge angle and pressure", detail: "Tip the ski early, load pressure through the arc, let the shape do the work" },
      { time: "2:50", label: "Fore-aft balance in the arc", detail: "Pressure moves from the tip into the tail as you come through the fall line" },
      { time: "4:15", label: "Reading your tracks", detail: "Look back at your tracks — two clean thin lines = you carved it" },
    ],
    feels: [
      "The ski feels alive underfoot — vibrating, gripping, pulling you through the arc",
      "No sideways slipping at all — only forward momentum along the ski's path",
      "G-force pressing you into the outside ski through the bottom of each turn",
    ],
    mistakes: [
      { mistake: "Starting the turn with a push or twist", fix: "Tip the ski onto its edge first — let the ski geometry create the arc, not muscling" },
      { mistake: "Too much speed too soon", fix: "Learn to carve on slower, steeper groomed runs before trying at race pace" },
      { mistake: "Releasing the edge too early", fix: "Hold the arc until you're fully across the hill before transitioning to the next turn" },
    ],
    drills: [
      "Railroad tracks: ski slowly and try to leave two perfectly parallel thin lines in the snow — stop and look back after each run",
      "Tipping drill on flats: on a flat section, practice tipping skis from edge to edge without moving forward — feel edge engagement in isolation",
      "Steeper angle challenge: each run try to tip the ski at a slightly more aggressive angle — feel how much more grip comes from a few extra degrees",
    ],
    prerequisites: ["parallel-turns", "hip-angulation"],
    nextSteps: ["short-radius-turns", "upper-lower-separation"],
    youtubeVideos: [
      {
        videoId: "LrmCNarCzIY",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How to Carve on Skis 5 Tips",
        isPrimary: true,
        teachingStyle: "Energetic with clear visual comparison of skidding vs carving",
      },
      {
        videoId: "Qw6ShmgLyHQ",
        channel: "Leona Popovic / Croatian Ski",
        channelUrl: "",
        title: "Dynamic SL Carving Turns",
        isPrimary: false,
        teachingStyle: "Patient, step-by-step with on-snow drills",
      },
    ],
  },
  {
    id: "ski:ice-technique",
    title: "Ice Technique",
    slug: "ice-technique",
    discipline: "ski",
    difficulty: 6,
    rating: "blue",
    terrain: ["Groomed", "Ice"],
    description:
      "Adapting your skiing to bulletproof icy conditions — lighter overall pressure, sharper edge engagement, and a more patient approach to every turn.",
    promise:
      "Icy morning groomers will stop scaring you off the first chair — you'll ski them with precision and a calm you didn't know was possible.",
    timestamps: [
      { time: "0:45", label: "Why ice feels different", detail: "Less friction means every bad habit is amplified — ice is a feedback machine" },
      { time: "1:30", label: "Lighter total pressure", detail: "Don't push down into ice — tip the edge and let gravity do the loading" },
      { time: "2:40", label: "Progressive edge engagement", detail: "Ease into the edge across the arc — sudden pressure causes chatter and release" },
      { time: "4:00", label: "Stance adjustments", detail: "Slightly more forward lean and narrower stance helps on slick surfaces" },
    ],
    feels: [
      "Like you're drawing with the edge rather than pressing with it — feathered not forced",
      "Each turn has a moment of commitment where you trust the edge completely",
      "Softer overall — ice rewards calmness and punishes aggression",
    ],
    mistakes: [
      { mistake: "Pressing down harder when it feels slippery", fix: "Do the opposite — lighten up and tip the edge more precisely instead" },
      { mistake: "Trying to turn in the same spot as on groomed snow", fix: "Extend your turn radius — longer arcs hold on ice far better than short ones" },
      { mistake: "Tensing up in the upper body", fix: "Relax your hands, shoulders, and jaw — tension travels down to the edges and breaks them loose" },
    ],
    drills: [
      "Edge-only traverse: traverse the iciest section of the slope without turning — just hold one edge and feel how much grip you actually have",
      "Patience exercise: make 3 fewer turns than you normally would down the slope — forces longer arcs that hold better on hard snow",
      "Quiet hands drill: ski with your poles tucked under your arms — forces upper body relaxation which directly improves edge hold",
    ],
    prerequisites: ["parallel-turns", "carved-turns"],
    nextSteps: ["steep-terrain", "short-radius-turns"],
    youtubeVideos: [
      {
        videoId: "02XL-lBf6eg",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski on Ice: Edge Technique for Icy Slopes",
        isPrimary: true,
        teachingStyle: "Practical tips with real icy conditions footage",
      },
      {
        videoId: "wB-fVTBMQQU",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Ice Edge Control: Precision Over Power",
        isPrimary: false,
        teachingStyle: "Technical breakdown with edge angle analysis",
      },
    ],
  },
  {
    id: "ski:short-radius-turns",
    title: "Short Radius Turns",
    slug: "short-radius-turns",
    discipline: "ski",
    difficulty: 6,
    rating: "blue",
    terrain: ["Groomed", "Steep"],
    description:
      "Rapid-fire turns with a tight arc — used to control speed on steep terrain by slicing quickly across the fall line and limiting exposure time.",
    promise:
      "You'll gain the speed control to confidently ski any steep groomer or set up a consistent mogul line without feeling out of control.",
    timestamps: [
      { time: "0:40", label: "Why short radius works", detail: "Frequent direction changes scrub speed without needing to stop or brake" },
      { time: "1:25", label: "Early initiation", detail: "Start the next turn before the current one finishes — no pause between arcs" },
      { time: "2:50", label: "Hop turns to learn the feel", detail: "Exaggerate by hopping skis from side to side first, then lower into carves" },
      { time: "4:10", label: "Pole timing is critical", detail: "Every single turn needs a pole plant — it's the metronome for short-radius rhythm" },
    ],
    feels: [
      "Like rapid slalom gates — one, two, three — no dawdling between turns",
      "Your body stays close to the fall line while your skis windshield-wiper beneath you",
      "The rhythm is everything — once you're in it, the turns almost make themselves",
    ],
    mistakes: [
      { mistake: "Pausing between turns and accelerating again", fix: "Flow directly from one turn into the next — the transitions are as important as the arcs" },
      { mistake: "Upper body rotating with each rapid turn", fix: "Shoulder separation is non-negotiable at this speed — hands forward, chest down the hill" },
      { mistake: "Missing pole plants at speed", fix: "Slow down until you can plant every turn, then gradually rebuild speed" },
    ],
    drills: [
      "Hop turns on mellow pitch: jump your skis from side to side down a gentle groomer — exaggerated but teaches the quick-transition feel",
      "Metronome rhythm: set a metronome app to 120 BPM and try to time one turn per click for a full run down the slope",
      "Count the turns: pick a section of slope and try to fit as many turns as possible into it — more turns = better short-radius control",
    ],
    prerequisites: ["parallel-turns", "hip-angulation", "pole-planting"],
    nextSteps: ["steep-terrain", "mogul-absorption"],
    youtubeVideos: [
      {
        videoId: "M4_HZfGTunw",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Short Radius Turns: Speed Control on Steep Terrain",
        isPrimary: true,
        teachingStyle: "High-energy with on-slope drills and clear before/after",
      },
      {
        videoId: "6sEf_fdsuJg",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Quick Turn Technique: Rhythm and Timing",
        isPrimary: false,
        teachingStyle: "Technical analysis with drill progression",
      },
      {
        videoId: "Qw6ShmgLyHQ",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "Rapid Fire Turns: Short Radius Skiing",
        isPrimary: false,
        teachingStyle: "Patient step-by-step with hop turn entry point",
      },
    ],
  },
  {
    id: "ski:tree-skiing",
    title: "Tree Skiing",
    slug: "tree-skiing",
    discipline: "ski",
    difficulty: 7,
    rating: "black",
    terrain: ["Trees", "Powder"],
    description:
      "Navigating tight, variable terrain in forested areas by reading the space between trees, staying in the present turn, and letting go of line planning.",
    promise:
      "Tree runs transform from sketchy to magical — you'll feel the mountain come alive in ways open runs never can.",
    timestamps: [
      { time: "0:50", label: "Look at the gaps, not the trees", detail: "Your brain steers toward what you look at — eyes on the space, always" },
      { time: "1:45", label: "Short radius is the foundation", detail: "Trees demand quick turns — get short-radius carving dialed first" },
      { time: "3:00", label: "Speed management in tight terrain", detail: "Enter slower than you think you need — you can accelerate but can't easily slow down" },
      { time: "4:30", label: "The commitment principle", detail: "Half-committed in trees is more dangerous than fully committed — go or stop, no in-between" },
    ],
    feels: [
      "Like time slows down once you find the rhythm — the trees seem to part for you",
      "Present moment only — no thinking ahead more than the next two trees",
      "A quiet, focused hum rather than the adrenaline rush of open slopes",
    ],
    mistakes: [
      { mistake: "Looking at trees instead of gaps", fix: "Pick a gap and burn your eyes into it — your skis will follow automatically" },
      { mistake: "Entering too fast", fix: "Check your speed before you enter — once inside, options narrow quickly" },
      { mistake: "Stiff, defensive posture", fix: "Relaxed, athletic stance absorbs the variable terrain — stiffness gets you bucked" },
    ],
    drills: [
      "Slalom poles practice: ski a slalom course on a groomed run — the pole-gap focus directly trains tree-gap awareness",
      "Edge-of-the-trees traverse: ski the boundary of a tree line, dipping in for one or two turns and back out — builds confidence incrementally",
      "Follow the leader: ski tight behind a more experienced skier through a gentle tree section — mirroring their line removes decision fatigue",
    ],
    prerequisites: ["parallel-turns", "short-radius-turns"],
    nextSteps: ["powder-floating", "steep-terrain"],
    youtubeVideos: [
      {
        videoId: "GIjYFFtsGtw",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski Trees: Tips for Forest and Glades",
        isPrimary: true,
        teachingStyle: "Practical safety-focused with real tree terrain footage",
      },
      {
        videoId: "w1n4RESKj-o",
        channel: "Elate Media",
        channelUrl: "https://www.youtube.com/@ElateMedia",
        title: "Tree Skiing Technique: Focus, Commitment, Flow",
        isPrimary: false,
        teachingStyle: "Immersive forest footage with mental technique coaching",
      },
    ],
  },
  {
    id: "ski:mogul-absorption",
    title: "Mogul Absorption",
    slug: "mogul-absorption",
    discipline: "ski",
    difficulty: 7,
    rating: "black",
    terrain: ["Moguls"],
    description:
      "Absorbing the terrain by retracting and extending your legs keeps your upper body smooth while navigating mogul fields.",
    promise:
      "You'll stop getting launched off bumps and start floating through mogul runs with your upper body perfectly calm.",
    timestamps: [
      { time: "0:45", label: "The absorption concept", detail: "Legs are shock absorbers — let them compress and extend" },
      { time: "1:30", label: "Retraction drill", detail: "Practice pulling feet up as you crest each mogul" },
      { time: "3:00", label: "Extension in the trough", detail: "Push feet down into the valley between moguls" },
      { time: "4:30", label: "Line selection", detail: "Choose the side of moguls to follow a consistent line" },
    ],
    feels: [
      "Your legs are pistons — constantly moving up and down",
      "Your hips stay level while everything below them is chaos",
      "You're actively pressing into the back side of each mogul",
    ],
    mistakes: [
      { mistake: "Rigid legs getting bounced off bumps", fix: "Keep knees bent and actively retract before each crest" },
      { mistake: "Upper body lurching forward", fix: "Strong core — think quiet hands and chest" },
      { mistake: "Looking at your feet", fix: "Eyes 3-4 moguls ahead to plan your line" },
    ],
    drills: [
      "Retraction walk: on flat ground, practice walking while pulling each foot up high — exaggerates the movement pattern for your brain",
      "Single mogul approach: ski straight at one isolated bump, absorb it with full retraction, pause in the trough — one at a time before linking",
      "Zip-line drill: ski a mogul line with both arms held out wide — forces upper body stillness because you can feel any rotation immediately",
    ],
    prerequisites: ["parallel-turns", "short-radius-turns"],
    nextSteps: ["hip-angulation", "steep-terrain"],
    youtubeVideos: [
      {
        videoId: "XGc5EqGUgu8",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "Mogul Skiing Technique: Absorption",
        isPrimary: true,
        teachingStyle: "Technical with slow-motion breakdown",
      },
    ],
  },
  {
    id: "ski:steep-terrain",
    title: "Steep Terrain",
    slug: "steep-terrain",
    discipline: "ski",
    difficulty: 8,
    rating: "black",
    terrain: ["Groomed", "Steep"],
    description:
      "The mental and physical adjustments needed when the slope pitches above 35 degrees — committing to the fall line and trusting your edges when retreat feels impossible.",
    promise:
      "Black diamonds will stop feeling terrifying and start feeling like a calculated, manageable challenge you actively seek out.",
    timestamps: [
      { time: "0:55", label: "The fear response and why it hurts you", detail: "Leaning back from fear is the single biggest cause of falling on steep terrain" },
      { time: "1:50", label: "Commit down the hill", detail: "Your upper body must stay aggressively forward and downhill — lean into the slope" },
      { time: "3:10", label: "Short radius is your friend", detail: "Quick, decisive turns keep speed manageable — each turn is a controlled brake" },
      { time: "4:30", label: "Look further ahead", detail: "On steeps, your window narrows — look 5-6 turns ahead, not 2" },
    ],
    feels: [
      "Scary but controlled — like a calculated leap of faith that gets more comfortable each run",
      "Your upper body is aggressively tipped over your downhill ski — more than feels safe at first",
      "Each turn is a commitment, not a hedge — half-turns on steeps are more dangerous than full ones",
    ],
    mistakes: [
      { mistake: "Leaning into the hill when scared", fix: "The hill is your enemy if you lean on it — stay over your skis, downhill lean is survival" },
      { mistake: "Making wide, slow turns on steep terrain", fix: "Short radius keeps speed controlled — long arcs let you accelerate too much" },
      { mistake: "Stopping mid-slope to reset mentally", fix: "Keep moving with short turns — stopping on steep terrain is often harder than skiing it" },
    ],
    drills: [
      "Steeper pitch progression: each day go one notch steeper than comfortable and ski 3 laps — your brain needs repetition to recalibrate fear",
      "Sideslip with edge control: stand on a steep slope and practice pure sideslipping — builds confidence that you can control speed anytime",
      "Fall line focus: point straight down the fall line for 3 seconds then turn — trains the commitment instinct that steep terrain demands",
    ],
    prerequisites: ["parallel-turns", "short-radius-turns", "hip-angulation"],
    nextSteps: ["mogul-absorption", "tree-skiing"],
    youtubeVideos: [
      {
        videoId: "uVcMhEBITRw",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski Steep Terrain: Commit and Control",
        isPrimary: true,
        teachingStyle: "Honest fear acknowledgment with practical technique fixes",
      },
      {
        videoId: "4VrbVuYIQ6M",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "Steep Skiing Technique: Trust Your Edges",
        isPrimary: false,
        teachingStyle: "Calm, technical with on-slope progression drills",
      },
    ],
  },
  {
    id: "ski:powder-floating",
    title: "Powder Floating",
    slug: "powder-floating",
    discipline: "ski",
    difficulty: 8,
    rating: "black",
    terrain: ["Powder"],
    description:
      "Staying on top of deep snow by weighting both skis equally, sitting slightly back, and making wide, round turns.",
    promise:
      "Deep powder days will transform from scary survival mode into the best skiing of your life.",
    timestamps: [
      { time: "0:40", label: "Stance adjustment", detail: "Feet closer together, weight slightly back" },
      { time: "1:30", label: "Breathing and rhythm", detail: "Slow, deliberate turns — let the snow do the work" },
      { time: "2:50", label: "Equal weighting", detail: "Both skis pressed down equally — no dominant foot" },
      { time: "4:10", label: "Turn shape", detail: "Rounder turns = more flotation = less effort" },
    ],
    feels: [
      "Like you're floating on a wave — the snow lifts you if you commit",
      "Both legs working as one platform, not two separate skis",
      "The turn happens slowly, then suddenly you're across the hill",
    ],
    mistakes: [
      { mistake: "Weighting the downhill ski like on groomers", fix: "Equal weight — downhill bias sinks that ski in pow" },
      { mistake: "Making quick, sharp turns", fix: "Slow down your turn initiation — wide arcs float better" },
      { mistake: "Staying too upright", fix: "Slight back seat is correct in deep powder" },
    ],
    drills: [
      "Flat snow bounce: on a gentle groomed slope, practice a deliberate up-down rhythm with both feet equally — builds the equal-weighting muscle memory",
      "Eyes-closed rhythm: on a safe, gentle powder slope, briefly close your eyes during a turn — feel the floating sensation without visual distraction",
      "Hip-width squeeze: imagine squeezing a ball between your knees throughout a powder run — keeps skis unified as one platform instead of two",
    ],
    prerequisites: ["parallel-turns", "hip-angulation"],
    nextSteps: [],
    youtubeVideos: [
      {
        videoId: "3cOnAKhne70",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "How to Ski Powder: Float and Flow",
        isPrimary: true,
        teachingStyle: "Immersive powder footage with voiceover coaching",
      },
    ],
  },
  {
    id: "ski:snowplow-stop",
    title: "Snowplow Stop",
    slug: "snowplow-stop",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Using the pizza wedge shape to create friction and slow to a complete stop — the first braking technique every new skier needs.",
    promise:
      "You'll have a reliable, always-available emergency brake from day one, letting you ski with confidence instead of fear.",
    timestamps: [
      { time: "0:20", label: "The wedge shape", detail: "Push your heels out and tips together to form the classic pizza triangle" },
      { time: "1:05", label: "Applying pressure", detail: "Press outward on both heels equally to increase friction and slow down" },
      { time: "2:15", label: "Coming to a full stop", detail: "Hold the wedge wide and firm until you are completely stationary" },
      { time: "3:30", label: "Controlling the brake", detail: "Narrow or widen the wedge to modulate how quickly you slow down" },
    ],
    feels: [
      "Like spreading peanut butter with both heels pressing outward at the same time",
      "Your inner boot edges biting into the snow as the wedge widens",
      "A gradual, comfortable deceleration you can increase or ease off at will",
    ],
    mistakes: [
      { mistake: "Only pushing one heel out", fix: "Both heels push equally — an asymmetric wedge will steer you sideways instead of stopping" },
      { mistake: "Bending at the waist instead of the knees", fix: "Bend your knees and keep your torso upright — power comes from your legs" },
      { mistake: "Collapsing the wedge before fully stopped", fix: "Hold the pizza until you are completely still before relaxing your feet" },
    ],
    drills: [
      "Pizza statue: stand on a flat section in the wedge position and hold it for 30 seconds — trains your muscles to maintain the shape under fatigue",
      "Count to three: each time you stop, count slowly to three before releasing the wedge — builds the habit of holding it until fully stopped",
      "Graduated slope practice: start on the flattest possible green and only move to a slightly steeper section after five clean stops",
    ],
    prerequisites: [],
    nextSteps: ["wedge-turns", "getting-up"],
    youtubeVideos: [
      {
        videoId: "fEIg28d2ttA",
        channel: "Snowii",
        channelUrl: "",
        title: "Learn how to STOP on skis",
        isPrimary: true,
        teachingStyle: "Clear beginner-focused step-by-step breakdown",
      },
      {
        videoId: "hrUbJxSQiRc",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "How to Control Your Speed",
        isPrimary: false,
        teachingStyle: "Practical, drill-driven with clear explanations",
      },
    ],
  },
  {
    id: "ski:stem-christie",
    title: "Stem Christie",
    slug: "stem-christie",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Stepping the uphill ski tail out into a V-shape to initiate a turn before bringing the skis back together — the classic bridge between wedge and parallel skiing.",
    promise:
      "You'll unlock a more dynamic, flowing turn style that feels halfway to full parallel and builds your confidence for the next step.",
    timestamps: [
      { time: "0:30", label: "The stem action", detail: "Step the uphill ski tail out to form a V at the start of each turn" },
      { time: "1:20", label: "Weight transfer", detail: "Shift weight onto the stemmed ski to commit to the new direction" },
      { time: "2:35", label: "Closing the skis", detail: "Draw the lower ski parallel once you are past the fall line" },
      { time: "3:50", label: "Smoothing the stem", detail: "Reduce the size of the stem each run as confidence builds" },
    ],
    feels: [
      "A deliberate step out with the uphill ski like opening a door with your foot",
      "Weight committing to the new ski with a satisfying shift across the fall line",
      "The skis snapping together at the end of each turn as momentum does the work",
    ],
    mistakes: [
      { mistake: "Stemming too late in the turn", fix: "Push the uphill ski out before you reach the fall line — start the stem earlier" },
      { mistake: "Not closing the skis after the stem", fix: "Actively draw the lower ski to match — practice the close deliberately each turn" },
      { mistake: "Leaning back during the stem", fix: "Stay centered over the balls of your feet throughout the turn initiation" },
    ],
    drills: [
      "Stem and pause: perform the stem, pause for two seconds with weight on the new ski, then close — slows down the movement for analysis",
      "Mirror the tracks: look back after a run and count how many turns show a clean stem-then-close pattern versus a dragged wedge",
      "Shrink the stem: on each consecutive run, consciously try to use a smaller stem — aim to halve it by the third run",
    ],
    prerequisites: ["wedge-turns", "wedge-christie"],
    nextSteps: ["parallel-turns"],
    youtubeVideos: [
      {
        videoId: "U4hWrVESheA",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "How to Do Stem Turns",
        isPrimary: true,
        teachingStyle: "Calm, step-by-step on-slope instruction",
      },
      {
        videoId: "ZOxlBfACVyk",
        channel: "Ski School by Elate",
        channelUrl: "https://www.youtube.com/@SkiSchoolbyElate",
        title: "Wedge Christie MA 1",
        isPrimary: false,
        teachingStyle: "Progressive, beginner-to-intermediate focus",
      },
    ],
  },
  {
    id: "ski:balance-drills",
    title: "Balance Drills",
    slug: "balance-drills",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Targeted on-snow exercises that challenge your balance and body awareness — the invisible foundation every strong skier builds on.",
    promise:
      "Small improvements in balance will instantly make every other technique feel easier and more natural.",
    timestamps: [
      { time: "0:25", label: "One-ski glide", detail: "Lift one ski and glide on the other — start on the flat before attempting on a slope" },
      { time: "1:15", label: "Toe and heel lifts", detail: "While sliding, alternate lifting toes then heels to feel where your weight sits" },
      { time: "2:30", label: "Traverse balance", detail: "Ski across the slope on one ski at a time to challenge your edge balance" },
      { time: "3:45", label: "Pole-free skiing", detail: "Remove your poles for a run — forces your body to find balance naturally" },
    ],
    feels: [
      "Slightly wobbly at first, then a satisfying sense of control as your ankle and core stabilizers engage",
      "Your shin pressing firmly against your boot tongue is the signal your weight is correctly centered",
      "Standing on one ski feels like tightrope walking — awkward, then suddenly natural",
    ],
    mistakes: [
      { mistake: "Gripping the snow with your toes inside the boot", fix: "Relax your feet — tension in the toes disconnects your feel for the snow" },
      { mistake: "Locking your knees straight", fix: "Soft, slightly bent knees act as shock absorbers and improve stability" },
      { mistake: "Staring at your skis while balancing", fix: "Eyes forward and down the slope — looking at your feet shifts your weight back" },
    ],
    drills: [
      "One-ski scooter: push off with one ski like a scooter for 20 meters, then switch sides — builds single-leg balance and edge feel simultaneously",
      "Star jumps on flat: on a flat section, make tiny hops and land balanced on both skis — reinforces the athletic stance under dynamic load",
      "No-poles run: leave poles at the top and ski an entire green run without them — makes balance deficiencies obvious and forces correction",
    ],
    prerequisites: ["wedge-turns"],
    nextSteps: ["hockey-stop", "edge-control-basics"],
    youtubeVideos: [
      {
        videoId: "XOGbIRhi1sY",
        channel: "REI",
        channelUrl: "",
        title: "Balance Exercises for Skiing",
        isPrimary: true,
        teachingStyle: "Exercise-focused with clear on-slope demonstration",
      },
      {
        videoId: "cccL51Iez2I",
        channel: "Snowii",
        channelUrl: "",
        title: "Skiing Posture Explained",
        isPrimary: false,
        teachingStyle: "Concise visual cues for stance and balance",
      },
    ],
  },
  {
    id: "ski:edge-control-basics",
    title: "Edge Control Basics",
    slug: "edge-control-basics",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Understanding how to tip your skis onto their metal edges and control the angle of engagement to grip the snow precisely.",
    promise:
      "Once you feel what a real edge grip is, your turns will transform from skidding slides into confident, connected arcs.",
    timestamps: [
      { time: "0:40", label: "What an edge is", detail: "The metal strip running the length of your ski that cuts into hard snow" },
      { time: "1:30", label: "Tipping the ski", detail: "Roll your ankle inward to engage the inside edge — feel it bite" },
      { time: "2:45", label: "Edge angle and grip", detail: "More tipping angle equals more grip — experiment on a gentle groomed section" },
      { time: "4:00", label: "Two-footed tipping", detail: "Both skis tip together as a unit — one edge leads but both engage simultaneously" },
    ],
    feels: [
      "A firm grip underfoot replacing the slippery sliding sensation of flat skis on hard snow",
      "Rolling your ankles inward like trying to touch the snow with your big toes",
      "A subtle vibration through the boot when the edge is properly loaded and gripping",
    ],
    mistakes: [
      { mistake: "Rotating the whole leg to edge instead of tipping the ankle", fix: "Edge from the ankle and knee — the hip should stay relaxed" },
      { mistake: "Too much edge too soon causing the ski to chatter", fix: "Build edge angle progressively through the arc — ease in, don't slam in" },
      { mistake: "Forgetting the inside ski", fix: "Both skis need to be on their corresponding edges — tip both feet together" },
    ],
    drills: [
      "Tipping on the flat: stand on a flat packed-snow section and roll both ankles inward until edges bite — no movement, just feel the grip",
      "Railroad edge traverse: cross the slope on your uphill edges only, concentrating on holding a consistent angle the entire way",
      "J-turn drill: start moving slowly, tip your skis onto edge without any rotation, and let the ski geometry pull you into a turn on its own",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["carved-turns", "garland-exercise"],
    youtubeVideos: [
      {
        videoId: "SIFDZVFYfJo",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How Edge Control Can Improve Your Skiing",
        isPrimary: true,
        teachingStyle: "Data-driven with real-time edge angle feedback",
      },
      {
        videoId: "R0cDTAOucSk",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Edge Control Drills for Better Carving",
        isPrimary: false,
        teachingStyle: "Energetic drill-based with on-slope demos",
      },
    ],
  },
  {
    id: "ski:weight-transfer",
    title: "Weight Transfer",
    slug: "weight-transfer",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Deliberately shifting your mass onto the outside ski through each turn to load it properly and carve a clean, controlled arc.",
    promise:
      "Mastering weight transfer is the single move that separates intermediate skiers from advanced ones — turns will feel stable and powerful instead of loose.",
    timestamps: [
      { time: "0:35", label: "Why the downhill ski matters", detail: "Your outside ski does most of the work — weighting it correctly is everything" },
      { time: "1:25", label: "The hip shift", detail: "As you begin the turn, move your hip toward the outside to load that ski" },
      { time: "2:40", label: "Feeling the pressure underfoot", detail: "You should feel the outside boot pressing into the snow throughout the arc" },
      { time: "4:00", label: "Transition to the next turn", detail: "Release the old edge and shift weight smoothly to the new outside ski" },
    ],
    feels: [
      "Like standing firmly on one leg through the whole arc — outside ski grips while inside ski is light",
      "Your outside hip driving toward the slope while your upper body stays tall",
      "A progressive building of pressure through the turn that releases at the top",
    ],
    mistakes: [
      { mistake: "Equal weighting on both skis through the turn", fix: "Consciously press the outside ski harder — think 70-30 outside to inside" },
      { mistake: "Transferring weight too late", fix: "Start the shift early in the turn — the weight should be moving as you initiate" },
      { mistake: "Crossing the inside ski over the outside", fix: "Keep the inside ski light but parallel — it guides, the outside one drives" },
    ],
    drills: [
      "Lifted inside ski: raise your inside ski tip a few centimeters off the snow through each turn — proves you have outside-ski dominance",
      "Weight-tap check: tap your inside pole on the outside ski boot through each arc — you can only do it if you're properly balanced over that ski",
      "One-ski run: ski 50 meters on just the outside ski per turn, changing feet — extreme version that builds the feel very quickly",
    ],
    prerequisites: ["wedge-christie"],
    nextSteps: ["parallel-turns", "hip-angulation"],
    youtubeVideos: [
      {
        videoId: "mzocKe2ldeo",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "How to Put Weight On Your Downhill Ski",
        isPrimary: true,
        teachingStyle: "Clear technical explanation with on-slope demonstration",
      },
      {
        videoId: "sutoNhGGLvY",
        channel: "Deb Armstrong Skiing",
        channelUrl: "https://www.youtube.com/@debarmstrongskiing",
        title: "Ski Better with Separation",
        isPrimary: false,
        teachingStyle: "Technical with on-slope demos and drills",
      },
    ],
  },
  {
    id: "ski:fall-line-awareness",
    title: "Fall Line Awareness",
    slug: "fall-line-awareness",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed", "Steep"],
    description:
      "Understanding the fall line — the most direct path down the slope — and using it as your compass for managing speed and planning turns.",
    promise:
      "Once you feel the fall line intuitively, every turn makes strategic sense and you will stop being surprised by unexpected speed.",
    timestamps: [
      { time: "0:30", label: "What the fall line is", detail: "Imagine a ball rolling from the top — its path down is the fall line" },
      { time: "1:15", label: "Finding it on any slope", detail: "Stand still and feel which way you would slide — that direction is the fall line" },
      { time: "2:30", label: "Crossing the fall line in turns", detail: "Your speed peaks when pointing down it, then decreases as you cross over" },
      { time: "3:50", label: "Using it to plan your run", detail: "Before dropping in, visually trace the fall line and plan your crossing points" },
    ],
    feels: [
      "A pull from gravity that tells you exactly where the slope wants to take you",
      "Maximum speed sensation when your skis point straight down it — then immediate deceleration as you turn across",
      "Confidence replacing anxiety when you know where the speed will come from",
    ],
    mistakes: [
      { mistake: "Turning before reaching the fall line", fix: "Let the ski point down the fall line briefly before steering — that's the natural initiation point" },
      { mistake: "Pointing across the hill instead of down when scared", fix: "Angling too far across delays the turn and lets you build unwanted speed elsewhere" },
      { mistake: "Ignoring slope changes mid-run", fix: "The fall line shifts as terrain changes — stay observant and adjust your turn timing" },
    ],
    drills: [
      "Fall line stand: stop on the slope and face straight down the fall line for 10 seconds — get comfortable with what the pure pull of gravity feels like",
      "Pointer turns: each turn, consciously point your skis directly down the fall line for one second before steering away — builds the commitment reflex",
      "Mental mapping: before every run, stand at the top and trace the fall line visually all the way to the bottom — builds spatial awareness",
    ],
    prerequisites: ["wedge-turns"],
    nextSteps: ["speed-control", "sideslipping"],
    youtubeVideos: [
      {
        videoId: "glZbvMXGVl4",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "Do You Know About the Fall Line",
        isPrimary: true,
        teachingStyle: "Concept-focused with clear visual explanation",
      },
      {
        videoId: "KBibkQdbIxw",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Understanding the Fall Line",
        isPrimary: false,
        teachingStyle: "Calm, educational on-slope coaching",
      },
    ],
  },
  {
    id: "ski:sideslipping",
    title: "Sideslipping",
    slug: "sideslipping",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Groomed", "Steep"],
    description:
      "Descending the slope sideways by releasing your edge angle and letting both skis slide downhill in a controlled flat-ski drift.",
    promise:
      "You'll gain a crucial escape tool for any slope that feels too steep — sideslipping gives you total speed control without committing to a full turn.",
    timestamps: [
      { time: "0:25", label: "The edge release concept", detail: "Flatten your skis slightly from the hill — they start to slide sideways" },
      { time: "1:10", label: "Controlling the slide rate", detail: "Tip the skis more uphill to slow the slide, flatten more to accelerate it" },
      { time: "2:20", label: "Forward and backward sideslip", detail: "Shift weight toward your toe edge or heel edge to move diagonally" },
      { time: "3:40", label: "Stopping from a sideslip", detail: "Increase edge angle sharply to dig in and arrest the slide completely" },
    ],
    feels: [
      "Like standing on an escalator moving sideways — you control the speed of the escalator with your ankle",
      "A satisfying shushing sound and spray of snow when the slide is properly controlled",
      "Your uphill edges are the brakes — engaging them more stops you, releasing them speeds you up",
    ],
    mistakes: [
      { mistake: "Leaning into the hill which steepens the edge and stops the slide", fix: "Stand upright over the center of your skis — resist the urge to hug the slope" },
      { mistake: "Looking down at your skis instead of across the slope", fix: "Eyes across the fall line — scan where you are sliding toward" },
      { mistake: "Letting the tails wash out faster than the tips", fix: "Keep weight centered fore-aft — a back-seat position causes tail wash" },
    ],
    drills: [
      "Edge roll drill: stand on the slope and slowly roll your ankles from full bite to flat and back — feel the direct connection between ankle and slide speed",
      "Measured sideslip: pick two trees or poles across the slope and sideslip between them stopping exactly on the second marker — builds precision",
      "Sideslip to stop: link five sideslips with five sharp edge-set stops — alternating between releasing and biting trains both extremes",
    ],
    prerequisites: ["wedge-turns"],
    nextSteps: ["hockey-stop", "edge-control-basics"],
    youtubeVideos: [
      {
        videoId: "yIaG__iHHFw",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Side Slipping an Essential Tool for Skiers",
        isPrimary: true,
        teachingStyle: "Fun, energetic with clear before-and-after demos",
      },
      {
        videoId: "R0cDTAOucSk",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Edge Control Drills for Better Carving",
        isPrimary: false,
        teachingStyle: "Drill-focused with progressive difficulty",
      },
    ],
  },
  {
    id: "ski:kick-turn",
    title: "Kick Turn",
    slug: "kick-turn",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Steep"],
    description:
      "A stationary technique for reversing direction on a steep slope — swinging one ski around 180 degrees while balancing on the other.",
    promise:
      "You'll be able to turn around on any slope without skiing, giving you an important safety option when terrain gets too challenging.",
    timestamps: [
      { time: "0:20", label: "Plant your poles", detail: "Plant both poles uphill for support before starting the kick" },
      { time: "1:00", label: "Kick the downhill ski", detail: "Swing your lower ski up, tip it toward you, then plant it in the new direction" },
      { time: "2:10", label: "Transfer your weight", detail: "Shift fully onto the turned ski before bringing the second ski around" },
      { time: "3:15", label: "Complete the turn", detail: "Swing the remaining ski to join the first — now you face the opposite direction" },
    ],
    feels: [
      "Deliberate and slightly awkward the first time — like a pivot on ice but on a steep snowy slope",
      "Your poles are anchors — lean on them confidently while your skis do the rotating",
      "A flash of commitment as you shift weight to the newly pointed ski before the second follows",
    ],
    mistakes: [
      { mistake: "Not planting poles firmly enough uphill", fix: "Drive poles into the slope above you — they are your only support during the swing" },
      { mistake: "Trying to swing both skis at once", fix: "One ski at a time — fully weight the first in its new direction before moving the second" },
      { mistake: "Doing the kick turn on too steep a slope to start", fix: "Learn on a very gentle pitch first until the movement feels automatic" },
    ],
    drills: [
      "Flat ground practice: perform kick turns on completely flat terrain first — removes the balance challenge so you can focus on the movement pattern",
      "Slow-motion kick: do each step with a 3-second pause between movements — builds confidence at each phase before connecting them",
      "Both directions: always practice the kick turn in both directions — your non-dominant side needs equal repetitions",
    ],
    prerequisites: ["wedge-turns"],
    nextSteps: ["sideslipping", "fall-line-awareness"],
    youtubeVideos: [
      {
        videoId: "qalV0fR6vK8",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Skiing How to Kick Turn",
        isPrimary: true,
        teachingStyle: "Clear step-by-step with safety focus",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow wedge turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:getting-up",
    title: "Getting Up After a Fall",
    slug: "getting-up",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["All"],
    description:
      "The practical techniques for safely and efficiently standing back up after falling on any type of slope with skis still attached.",
    promise:
      "Falls will stop being frustrating ordeals and start being minor interruptions — you will be back on your feet in seconds.",
    timestamps: [
      { time: "0:20", label: "Position your skis downhill", detail: "Get your skis below you and across the slope before attempting to stand" },
      { time: "1:05", label: "Roll onto your side", detail: "Get your weight over your skis — standing from directly flat is nearly impossible" },
      { time: "2:00", label: "Use your poles", detail: "Plant both poles uphill of you and push down with your hands to lever yourself up" },
      { time: "3:15", label: "On steep or icy slopes", detail: "Dig your uphill edges in before standing — stops you sliding while getting up" },
    ],
    feels: [
      "Like doing a seated crunch and push at the same time — core and arms working together",
      "The skis naturally want to slide — positioning them across the slope first removes that resistance",
      "A quick, confident motion once you have the technique — no more helpless flopping",
    ],
    mistakes: [
      { mistake: "Trying to stand with skis pointing downhill", fix: "Always position skis across the slope first — they will slide out from under you otherwise" },
      { mistake: "Not using poles to help", fix: "Plant poles firmly uphill and push — they provide crucial upward leverage" },
      { mistake: "Panicking and making jerky movements", fix: "Pause, reposition calmly, then stand in one smooth motion" },
    ],
    drills: [
      "Deliberate fall practice: on a gentle flat slope, fall sideways intentionally and practice getting up five times in a row until it feels automatic",
      "Speed challenge: time yourself getting up and try to beat your record — makes the technique feel game-like and builds speed through repetition",
      "No-pole get-up: practice getting up without using your poles — builds core strength for situations where poles are lost in a fall",
    ],
    prerequisites: [],
    nextSteps: ["snowplow-stop", "wedge-turns"],
    youtubeVideos: [
      {
        videoId: "WQbkZydXsMU",
        channel: "REI",
        channelUrl: "",
        title: "3 Ways to Stand Up After Falling on Skis",
        isPrimary: true,
        teachingStyle: "Practical with multiple technique options shown",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow wedge turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:chairlift-basics",
    title: "Chairlift Basics",
    slug: "chairlift-basics",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["All"],
    description:
      "Loading, riding, and unloading a chairlift safely — the essential mountain skill that gets you back to the top for every run.",
    promise:
      "Chairlift anxiety will disappear completely and you will load and unload smoothly without slowing down the line.",
    timestamps: [
      { time: "0:25", label: "Loading the chair", detail: "Wait behind the line, move into position when signaled, and sit back firmly as the chair arrives" },
      { time: "1:10", label: "Securing yourself", detail: "Lower the safety bar and rest your skis on the footrest — relax for the ride" },
      { time: "2:20", label: "Preparing to unload", detail: "Raise the bar early, tips up, and be ready to stand as the chair reaches the ramp" },
      { time: "3:30", label: "Unloading cleanly", detail: "Stand up with tips pointing forward and glide straight ahead away from the chair" },
    ],
    feels: [
      "The chair scoops you from behind — sit back into it rather than reaching for it",
      "A smooth glide off the ramp when you stand at exactly the right moment — too early and you stumble, too late and you twist",
      "Looking back once to confirm the chair has cleared you before moving off to the side",
    ],
    mistakes: [
      { mistake: "Standing up too early on the unload ramp", fix: "Wait until your skis are flat on the ramp before pushing off — let the slope do the work" },
      { mistake: "Poles tangled or pointing downward on loading", fix: "Loop poles over one wrist and hold them parallel to the ground during loading" },
      { mistake: "Moving away too slowly after unloading", fix: "Skate or glide immediately to the designated area — don't stop at the ramp" },
    ],
    drills: [
      "Watch before you load: spend 5 minutes observing others load and unload before your first attempt — pattern recognition speeds up learning enormously",
      "Verbal countdown: silently count to yourself as the ramp approaches — 3, 2, 1, stand — gives you a consistent unload timing cue",
      "Early bar raise: get in the habit of raising the safety bar at the second-to-last lift tower — builds the timing habit before it is urgent",
    ],
    prerequisites: [],
    nextSteps: ["getting-up", "wedge-turns"],
    youtubeVideos: [
      {
        videoId: "21U4WyZmU_M",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "How to Ride a Chairlift Safely",
        isPrimary: true,
        teachingStyle: "Friendly, practical with clear loading and unloading steps",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow wedge turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:athletic-stance",
    title: "Athletic Stance",
    slug: "athletic-stance",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "The foundational body position for all skiing — knees bent, weight forward, hands visible, and spine neutral — the platform everything else builds on.",
    promise:
      "Getting this posture right from the start will prevent bad habits that take years to undo and make every technique click faster.",
    timestamps: [
      { time: "0:20", label: "Foot position", detail: "Hip-width apart, flat on the full sole — not toes up or heels lifted" },
      { time: "1:05", label: "Knee flex", detail: "Soft knees, not locked — imagine hovering just above a chair" },
      { time: "2:10", label: "Forward lean and shin contact", detail: "Shins press the boot tongue — your weight is forward over the balls of your feet" },
      { time: "3:30", label: "Arms and hands", detail: "Hands at hip height, out in front where you can see them — not dangling at your sides" },
    ],
    feels: [
      "Like a soccer player or tennis player waiting to receive a ball — alert, springy, ready",
      "Your shins touching the front of your boots — this forward pressure is correct and essential",
      "Relaxed shoulders and a natural breathing rhythm — tension anywhere kills your balance",
    ],
    mistakes: [
      { mistake: "Sitting back on the tails of the skis", fix: "Press shins forward into boot tongues continuously — the tails should feel light" },
      { mistake: "Locking the knees straight", fix: "Sit into a slight squat — stiff legs cannot absorb terrain or respond to speed changes" },
      { mistake: "Hands dropping behind the hips", fix: "Keep both hands visible in your peripheral vision at all times" },
    ],
    drills: [
      "Wall check: stand in ski boots against a wall with heels 15cm away — correct stance means your shins and knees touch the wall before your torso",
      "Bounce test: in proper stance, gently bounce up and down — if you feel locked, bend your knees more until the bounce flows naturally",
      "Hand-visibility run: ski a full green run ensuring your hands stay in peripheral vision the entire time — hands in front keeps the whole chain correct",
    ],
    prerequisites: [],
    nextSteps: ["wedge-turns", "snowplow-stop"],
    youtubeVideos: [
      {
        videoId: "cccL51Iez2I",
        channel: "Snowii",
        channelUrl: "",
        title: "Skiing Posture Explained",
        isPrimary: true,
        teachingStyle: "Concise visual cues for stance and posture",
      },
      {
        videoId: "XOGbIRhi1sY",
        channel: "REI",
        channelUrl: "",
        title: "Balance Exercises for Skiing",
        isPrimary: false,
        teachingStyle: "Exercise-focused with clear on-slope demonstration",
      },
    ],
  },
  {
    id: "ski:dynamic-carving",
    title: "Dynamic Carving",
    slug: "dynamic-carving",
    discipline: "ski",
    difficulty: 8,
    rating: "black",
    terrain: ["Groomed"],
    description:
      "High-speed, high-edge-angle carving with aggressive angulation and complete commitment to the arc — the technique of expert racers applied to groomed runs.",
    promise:
      "You will experience G-forces and ski-grip sensations that most people never feel — the feeling of flying across a perfectly groomed slope.",
    timestamps: [
      { time: "0:40", label: "High edge angle commitment", detail: "Tipping the ski to 45 degrees or more — this requires total commitment to the arc" },
      { time: "1:30", label: "Dynamic angulation", detail: "Driving the hip dramatically into the turn creates the angle without banking the whole body" },
      { time: "2:50", label: "Cross-under transitions", detail: "At high speed, the skis swing under you rather than your body swinging over the skis" },
      { time: "4:15", label: "Reading the snow", detail: "Hard, groomed snow rewards dynamic carving — vary your technique based on conditions" },
    ],
    feels: [
      "Centrifugal force pressing you into the outside ski like a fighter pilot pulling Gs",
      "The ski bends dramatically underfoot into reverse camber — you can feel the whole length gripping",
      "Transitions are explosive and quick — a split second of lightness before the next arc loads up",
    ],
    mistakes: [
      { mistake: "Banking the body instead of angulating", fix: "Hip drives into the hill, not the whole body — keep the torso upright while the hip dips" },
      { mistake: "Rushing transitions at high speed", fix: "Let the ski finish its arc before releasing — premature release kills grip and causes skidding" },
      { mistake: "Attempting on icy or soft snow", fix: "Dynamic carving requires hard, packed groomed snow — wrong conditions cause dangerous edge release" },
    ],
    drills: [
      "Arc extension: on a steep groomed run, hold each carved arc as long as possible before transitioning — feel the maximum G-force building",
      "Touch the snow: in your carved turn, try to reach down and brush the snow with your inside hand — requires extreme angulation to achieve",
      "Speed progression: start at 60% of your max speed and increase by 5% each run — high-speed carving requires a controlled build-up",
    ],
    prerequisites: ["carved-turns", "upper-lower-separation"],
    nextSteps: ["steep-terrain"],
    youtubeVideos: [
      {
        videoId: "ihs5gT-WM6Q",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "ADVANCED CARVING TIPS Dynamic Skiing",
        isPrimary: true,
        teachingStyle: "High-energy with race technique analysis",
      },
      {
        videoId: "LrmCNarCzIY",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How to Carve on Skis 5 Tips",
        isPrimary: false,
        teachingStyle: "Energetic with clear visual comparison of techniques",
      },
    ],
  },
  {
    id: "ski:counter-rotation",
    title: "Counter-Rotation",
    slug: "counter-rotation",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Training your upper body to actively resist the direction of your legs — a slight counter-twist that keeps your chest facing downhill while your skis carve through each turn.",
    promise:
      "This one movement pattern will unlock a level of smoothness and edge grip that no amount of leg strength can provide.",
    timestamps: [
      { time: "0:30", label: "Rotation vs counter-rotation", detail: "Rotation throws the turn — counter-rotation stabilizes it, every time" },
      { time: "1:20", label: "The active resist concept", detail: "As legs turn right, gently resist with your shoulders left — a constant mild tension" },
      { time: "2:40", label: "Hands as the indicator", detail: "If hands move with the turn, you are rotating — keep them still and forward" },
      { time: "4:00", label: "Combining with pole plant", detail: "Pole plant and counter-rotation work together — planting the downhill pole locks the shoulders in place" },
    ],
    feels: [
      "A slight winding sensation in your core through every turn — like wringing a towel gently",
      "Your torso feels like an anchor while your lower body flows freely beneath it",
      "The turn initiates from the feet and knees, not from the shoulder swing",
    ],
    mistakes: [
      { mistake: "Confusing counter-rotation with stiffness", fix: "Stay relaxed — it is a subtle resistance, not a rigid lock" },
      { mistake: "Over-counter-rotating and blocking the turn", fix: "The resist should be mild and yielding — you are dampening rotation, not eliminating movement" },
      { mistake: "Losing it at speed when it matters most", fix: "Drill at slow speeds until it is automatic — the habit must be grooved before you add pace" },
    ],
    drills: [
      "Crossed arms run: fold arms across your chest and ski — any upper body rotation is immediately obvious and uncomfortable",
      "Pole-hold drill: hold both poles horizontally across your chest and ski — if they tilt with the turn, you are rotating and need more counter",
      "Slow-motion focus: ski a run at half speed with full mental focus on the subtle resist — slower speed makes the feedback clearer",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["carved-turns", "upper-lower-separation"],
    youtubeVideos: [
      {
        videoId: "hPONlALU_0Q",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "This Simple Drill Makes a HUGE Difference",
        isPrimary: true,
        teachingStyle: "Drill-focused with instant visible results",
      },
      {
        videoId: "uVcMhEBITRw",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Anticipated vs rotated vs countered",
        isPrimary: false,
        teachingStyle: "Technical with clear before/after comparison",
      },
    ],
  },
  {
    id: "ski:garland-exercise",
    title: "Garland Exercise",
    slug: "garland-exercise",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Linked half-turns that swing toward the fall line and back without fully completing the arc — a classic drill for building edge feel and turn initiation.",
    promise:
      "Garlands isolate the hardest part of carving — the turn initiation — and repeat it so many times it becomes effortless muscle memory.",
    timestamps: [
      { time: "0:35", label: "The garland shape", detail: "Swing toward the fall line, then steer back across — like scalloped curves along the slope" },
      { time: "1:20", label: "Edge loading in the swing", detail: "Feel the ski load up as you tip into each swing toward the fall line" },
      { time: "2:35", label: "Consistent rhythm", detail: "Keep the swings even in size and tempo — build a metronome quality" },
      { time: "3:50", label: "Direction switch", detail: "Run garlands in both directions across the slope — balance both sides equally" },
    ],
    feels: [
      "Like drawing linked S-curves on the slope that never quite close — a rhythmic, hypnotic motion",
      "The edge loading builds and releases on each swing — you can feel the ski gripping and releasing",
      "No complete turn means no speed buildup — it is a safe way to repeat the initiation phase endlessly",
    ],
    mistakes: [
      { mistake: "Turning completely across the slope and stopping the rhythm", fix: "Stop before the full turn — only swing 60-70 degrees toward the fall line then return" },
      { mistake: "Flat skis with no edge engagement", fix: "Tip the ski actively into each swing — garlands without edging are just traverses" },
      { mistake: "Rushing the rhythm", fix: "Slow down and make each swing deliberate — quality of edge feel beats number of repetitions" },
    ],
    drills: [
      "Counted garlands: perform exactly 10 garlands in one direction then 10 in the other — forces equal attention to both sides",
      "Garlands to full turn: do 3 garlands then complete one full turn — the contrast between half and full turn teaches you what initiation feels like",
      "Narrow stance garlands: perform garlands with feet touching — the close stance amplifies any imbalance and improves edge sensitivity",
    ],
    prerequisites: ["wedge-christie"],
    nextSteps: ["parallel-turns", "edge-control-basics"],
    youtubeVideos: [
      {
        videoId: "EqISrTGj088",
        channel: "Snowii",
        channelUrl: "",
        title: "Garland Ski Drill for Edging Skills",
        isPrimary: true,
        teachingStyle: "Clear drill demonstration with technique breakdown",
      },
      {
        videoId: "SIFDZVFYfJo",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How Edge Control Can Improve Your Skiing",
        isPrimary: false,
        teachingStyle: "Data-driven with real-time edge angle feedback",
      },
    ],
  },
  {
    id: "ski:traverse-technique",
    title: "Traverse Technique",
    slug: "traverse-technique",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Skiing diagonally across the slope in a controlled line — using your uphill edges to hold your position and regulate speed without turning.",
    promise:
      "A strong traverse gives you a critical tool for crossing any slope safely and sets up better turn initiation from a stable starting position.",
    timestamps: [
      { time: "0:30", label: "Body position in traverse", detail: "Hip-width stance, uphill hip slightly forward, weight on uphill edges" },
      { time: "1:15", label: "Edge engagement", detail: "Tip both skis onto their uphill edges — more angle equals more grip across the slope" },
      { time: "2:20", label: "Looking ahead", detail: "Eyes across the slope in the direction of travel — not down at your skis" },
      { time: "3:30", label: "Adjusting speed", detail: "Increase edge angle to slow the traverse, decrease it to allow more sliding" },
    ],
    feels: [
      "Like walking a tightrope across the slope — the uphill edge is your balancing wire",
      "Your uphill hip and shoulder leading slightly gives the body a comfortable natural position",
      "Confident and calm — traversing should feel like a resting state between dynamic turns",
    ],
    mistakes: [
      { mistake: "Both skis flat on the slope causing a slide downhill", fix: "Tip uphill edges in firmly — flat skis on any pitch will start sliding toward the valley" },
      { mistake: "Uphill shoulder dropped back", fix: "Keep the uphill shoulder and hip slightly forward — it aligns the whole body for edge hold" },
      { mistake: "Looking down at ski tips while traversing", fix: "Eyes across the slope in the direction you are heading — forward gaze improves balance" },
    ],
    drills: [
      "Full-width traverse: ski from one edge of the run all the way to the other without any turning — builds the endurance to hold a clean traverse line",
      "Edge-bite check: stop mid-traverse and see if you are holding your position without sliding — if you slide, add more edge angle",
      "Traverse to turn: ski a full traverse, then initiate a turn from that stable position — connects traverse skill directly to turn setup",
    ],
    prerequisites: ["wedge-turns"],
    nextSteps: ["sideslipping", "fall-line-awareness"],
    youtubeVideos: [
      {
        videoId: "nJZqR0mmXCY",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "Move off the Traverse",
        isPrimary: true,
        teachingStyle: "Technique-focused with clean on-slope demonstration",
      },
      {
        videoId: "hrUbJxSQiRc",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "How to Control Your Speed",
        isPrimary: false,
        teachingStyle: "Practical, drill-driven with clear explanations",
      },
    ],
  },
  {
    id: "ski:short-turns",
    title: "Short Turns",
    slug: "short-turns",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Compact, rhythmic turns with a tight arc and quick edge-to-edge transitions — the engine of speed control on steep groomed runs.",
    promise:
      "You'll develop a crisp, confident turn rhythm that keeps speed in check without ever feeling like you're fighting the mountain.",
    timestamps: [
      { time: "0:35", label: "Arc shape and radius", detail: "A short turn stays tight to the fall line — think quick windshield-wiper, not long arc" },
      { time: "1:20", label: "Edge-to-edge speed", detail: "The transition between turns must be decisive — no flat-ski gliding between arcs" },
      { time: "2:40", label: "Pole plant cadence", detail: "Every single turn gets a pole plant — it is the metronome that locks your rhythm in" },
      { time: "4:00", label: "Upper body quiet", detail: "Shoulders stay square to the fall line while legs flick left and right below" },
    ],
    feels: [
      "A rapid wiper-blade motion of the feet while your torso floats calmly downhill",
      "Each pole plant fires off the next turn like a trigger — plant, flip, plant, flip",
      "Speed is controlled without braking — the frequency of turns does all the work",
    ],
    mistakes: [
      { mistake: "Pausing between turns and letting speed build", fix: "Flow directly from one edge to the next — no flat-ski moment between arcs" },
      { mistake: "Shoulders rotating with each quick turn", fix: "Lock your chest to face downhill — only hips and below do the turning work" },
      { mistake: "Skipping pole plants when the rhythm gets fast", fix: "Slow down until every turn has a plant, then rebuild speed with the habit intact" },
    ],
    drills: [
      "Hop-turn entry: start by hopping your skis side to side down a gentle groomer — gradually lower the hops into short carved arcs as confidence builds",
      "Metronome app: set a beat at 100 BPM and try to match one full turn per click — builds the automatic rhythm short turns require",
      "Count the turns: pick a fixed section of slope and try to fit the maximum number of turns in — more turns means better short-turn control",
    ],
    prerequisites: ["parallel-turns", "pole-planting"],
    nextSteps: ["short-radius-turns", "pole-plant-timing"],
    youtubeVideos: [
      {
        videoId: "95Y2KyJpRfo",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Master Perfect Short Turn",
        isPrimary: true,
        teachingStyle: "High-energy with step-by-step progression and drill focus",
      },
      {
        videoId: "hPONlALU_0Q",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "This Simple Drill Makes a HUGE Difference",
        isPrimary: false,
        teachingStyle: "Drill-focused with instant visible results",
      },
    ],
    updatedAt: "2025-10",
  },
  {
    id: "ski:long-radius-turns",
    title: "Long Radius Turns",
    slug: "long-radius-turns",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Wide, sweeping arcs that use the full width of a groomed run — the technique that builds edge confidence and exposes the true feeling of ski geometry doing the work.",
    promise:
      "You'll discover how little effort a properly tipped ski requires to carve — and that revelation will upgrade every other turn you make.",
    timestamps: [
      { time: "0:40", label: "Why long radius first", detail: "Wide arcs give you more time to feel edge loading — the ski does the work if you let it" },
      { time: "1:25", label: "Early tip and commit", detail: "Start tipping the ski well before the fall line — give the geometry time to engage" },
      { time: "2:45", label: "Pressure through the arc", detail: "Feel the build-up of pressure through the turn — it peaks just past the fall line" },
      { time: "4:05", label: "Clean transition", detail: "Release both edges simultaneously and tip to the new edges — no pivot or twist" },
    ],
    feels: [
      "A slow, building G-force through the bottom of each arc — satisfying and reassuring",
      "The ski pulling you through the turn rather than you steering it — let it happen",
      "A smooth, almost lazy quality to each arc that somehow feels powerful",
    ],
    mistakes: [
      { mistake: "Rushing the arc and cutting it short", fix: "Follow the turn all the way until your skis point across the hill before transitioning" },
      { mistake: "Twisting the ski into the turn instead of tipping it", fix: "Roll the ankle and knee to tip the ski — rotation kills edge grip immediately" },
      { mistake: "Too upright with no angulation", fix: "Drive the knee into the hill through the arc — creates the edge angle that makes the ski grip" },
    ],
    drills: [
      "Full-width traverses: ski from edge to edge of the entire groomed run before each turn — slows you down and forces complete arcs",
      "Railroad tracks: ski slow long arcs and look back at your tracks — two thin parallel lines confirm a true carve",
      "Arms-out balance: extend arms wide like wings through each long arc — any wobble is immediately obvious and teaches balance in the turn",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["carved-turns", "dynamic-carving"],
    youtubeVideos: [
      {
        videoId: "Swb0vmz9VaU",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "Long Radius Turns",
        isPrimary: true,
        teachingStyle: "Technical with edge data and on-slope demonstration",
      },
      {
        videoId: "LrmCNarCzIY",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How to Carve on Skis 5 Tips",
        isPrimary: false,
        teachingStyle: "Energetic with clear visual comparison of skidding vs carving",
      },
    ],
  },
  {
    id: "ski:pole-plant-timing",
    title: "Pole Plant Timing",
    slug: "pole-plant-timing",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Dialing the exact moment your pole touches snow to trigger turn initiation — moving from a vague pole swing to a precise, consistent trigger for every arc.",
    promise:
      "Your turns will suddenly have a heartbeat — a consistent rhythm that makes skiing feel effortless instead of constantly improvised.",
    timestamps: [
      { time: "0:30", label: "The pole as a trigger", detail: "The plant does not happen after the turn starts — it starts the turn, every time" },
      { time: "1:15", label: "Wrist action only", detail: "The plant is a tiny flick from the wrist — the upper arm barely moves at all" },
      { time: "2:30", label: "Forward hand position", detail: "Both hands must stay forward — if you can not see your hands, they are too far back" },
      { time: "3:50", label: "Linking rhythm across terrain", detail: "On steeper terrain the rhythm speeds up — practice on moderate blue before taking it steep" },
    ],
    feels: [
      "A light, precise tap rather than a stab — you are touching the snow, not leaning on it",
      "The plant and the edge tip happen simultaneously — one motion, not two",
      "Your pole flicks forward between turns so it is always ready for the next one",
    ],
    mistakes: [
      { mistake: "Planting the pole behind your boot", fix: "Plant level with your downhill boot toe — anything behind creates a body rotation block" },
      { mistake: "Full arm swing on every plant", fix: "Freeze your upper arm and flick only from the wrist — check in a mirror or on video" },
      { mistake: "Inconsistent timing — sometimes before, sometimes after", fix: "Slow down completely and count plant-then-tip on every single turn until it becomes automatic" },
    ],
    drills: [
      "No-movement mime: stand still and practice the wrist-flick plant 30 times in a row — the arm should be nearly frozen while the wrist does all the work",
      "Tap and go: on a gentle slope, touch the snow with your pole before you are even thinking about the turn — the tap forces you to commit to turn timing",
      "Eyes-forward check: ski a run while looking at your hands — if they disappear from view, stop and reset your arm position before continuing",
    ],
    prerequisites: ["parallel-turns", "pole-planting"],
    nextSteps: ["short-turns", "short-radius-turns"],
    youtubeVideos: [
      {
        videoId: "MtmriL5iL4U",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Introducing Pole Plant",
        isPrimary: true,
        teachingStyle: "Clear breakdown of timing with common mistake callouts",
      },
      {
        videoId: "uVcMhEBITRw",
        channel: "Ski School App",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Anticipated vs Rotated vs Countered",
        isPrimary: false,
        teachingStyle: "Technical with clear before/after comparison",
      },
    ],
  },
  {
    id: "ski:hop-turns",
    title: "Hop Turns",
    slug: "hop-turns",
    discipline: "ski",
    difficulty: 7,
    rating: "black",
    terrain: ["Steep"],
    description:
      "Jumping both skis off the snow simultaneously to pivot direction on steep terrain — an active technique that resets your edge direction when carving is impossible.",
    promise:
      "Steep pitches that felt uncontrollable will become navigable — you will have a reliable tool for any gradient that exceeds your carving limits.",
    timestamps: [
      { time: "0:40", label: "When to use hop turns", detail: "Steep, variable, or icy terrain where carving edges will not grip long enough to arc" },
      { time: "1:25", label: "The compression and pop", detail: "Load the skis by pushing down, then spring up — both skis leave the snow together" },
      { time: "2:45", label: "Pivot in the air", detail: "Rotate the skis with your feet while airborne — land with skis already across the fall line" },
      { time: "4:00", label: "Pole plant as the launchpad", detail: "Plant the downhill pole firmly before the hop — it anchors your upper body while legs jump" },
    ],
    feels: [
      "A brief moment of weightlessness followed by an immediate edge set — land and grip",
      "Your upper body is totally calm while your legs jump and pivot below it",
      "The pole plant and hop are one linked motion — plant triggers the jump",
    ],
    mistakes: [
      { mistake: "Not using the pole plant before hopping", fix: "Always plant the downhill pole first — without it the jump rotates your whole body" },
      { mistake: "Landing flat-footed and sliding", fix: "Dig the edges in immediately on contact — land with intent, not passively" },
      { mistake: "Trying hop turns on moderate terrain first", fix: "Practice on a gentle groomed slope before taking the technique to steep pitches" },
    ],
    drills: [
      "Flat-slope bunny hops: on a gentle groomed run, practice jumping both skis and landing — get the airborne feel before adding the pivot",
      "Stationary pivot: standing on a steep slope, use poles to lift and pivot your skis 90 degrees without moving — isolates the rotation from the hop",
      "One-at-a-time steep entry: ski the top of a steep run with normal turns, then switch to hop turns for the steepest section — progressive exposure",
    ],
    prerequisites: ["parallel-turns", "short-radius-turns"],
    nextSteps: ["steep-terrain", "steep-skiing"],
    youtubeVideos: [
      {
        videoId: "os74z_ByH-U",
        channel: "Warren Smith Ski Academy",
        channelUrl: "https://www.youtube.com/@WarrenSmithSkiAcademy",
        title: "Steep Skiing Jump Turns",
        isPrimary: true,
        teachingStyle: "Expert steep-terrain coaching with progressive drills",
      },
      {
        videoId: "KBibkQdbIxw",
        channel: "Warren Smith Ski Academy",
        channelUrl: "https://www.youtube.com/@WarrenSmithSkiAcademy",
        title: "How to Ski Steeps WSSA",
        isPrimary: false,
        teachingStyle: "Steep technique focus with on-slope breakdown",
      },
    ],
  },
  {
    id: "ski:step-turns",
    title: "Step Turns",
    slug: "step-turns",
    discipline: "ski",
    difficulty: 7,
    rating: "black",
    terrain: ["Groomed"],
    description:
      "Stepping the uphill ski onto a new edge to actively redirect momentum — an aggressive, race-derived transition that generates speed rather than scrubbing it.",
    promise:
      "You will add an elite skill to your toolkit — the ability to accelerate into a turn instead of just surviving it.",
    timestamps: [
      { time: "0:35", label: "What a step turn is", detail: "Lifting and planting the uphill ski in the new direction before weighting it — an active, deliberate commitment" },
      { time: "1:20", label: "The step and weight transfer", detail: "Step, then transfer all your weight onto the new ski immediately — hesitation kills the technique" },
      { time: "2:40", label: "Creating edge angle on the step", detail: "Plant the new ski already tipped onto its edge — not flat and then angled" },
      { time: "4:00", label: "Linking step turns", detail: "Each step should flow into the next with no pause — the rhythm accelerates as you improve" },
    ],
    feels: [
      "Like a speed skater pushing off one blade onto the next — active, not passive",
      "A satisfying thump as the stepped ski bites into the snow and drives the new arc",
      "More energy at turn initiation rather than less — the step adds to your momentum",
    ],
    mistakes: [
      { mistake: "Stepping and then tipping the ski to edge", fix: "Tip the ski before you plant it — edge engagement must happen at the moment of contact" },
      { mistake: "Hesitating with weight on both skis", fix: "Commit fully to the new ski the instant it touches down — hold nothing back" },
      { mistake: "Using step turns on too gentle terrain", fix: "Step turns reward steeper, harder snow where the active edge set has traction to push from" },
    ],
    drills: [
      "Skating warmup: skate along flat terrain before each run — step turns are skating applied to carved arcs, the movement pattern is identical",
      "Single step drill: make one step turn, then ski normally for three turns — repeat down the run to isolate and feel each step clearly",
      "Step and look back: after each step turn, glance back at the snow — a clean edge-on imprint confirms correct angulation at the moment of contact",
    ],
    prerequisites: ["parallel-turns", "carved-turns"],
    nextSteps: ["dynamic-carving", "hop-turns"],
    youtubeVideos: [
      {
        videoId: "bRB9saJqLJc",
        channel: "Warren Smith Ski Academy",
        channelUrl: "https://www.youtube.com/@WarrenSmithSkiAcademy",
        title: "Step Turns Warren Smith",
        isPrimary: true,
        teachingStyle: "Expert technique coaching with on-slope drill progression",
      },
      {
        videoId: "LrmCNarCzIY",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How to Carve on Skis 5 Tips",
        isPrimary: false,
        teachingStyle: "Energetic with clear visual comparison of techniques",
      },
    ],
  },
  {
    id: "ski:j-turn",
    title: "J-Turn",
    slug: "j-turn",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "A single turn from a straight run into a stop across the slope — shaped like the letter J — the foundational movement for understanding how a ski actually turns.",
    promise:
      "You will feel for the first time how tipping and weighting a ski creates a turn without any twisting or pushing — the aha moment for beginner skiers.",
    timestamps: [
      { time: "0:25", label: "Start from a straight run", detail: "Point downhill and build a small amount of speed — you need momentum for the ski to arc" },
      { time: "1:10", label: "Tip the ski to initiate", detail: "Roll your ankle inward — the ski will start to curve on its own with no steering input" },
      { time: "2:20", label: "Follow the arc to a stop", detail: "Let the ski complete the J shape and bring you across the fall line until you slow to a halt" },
      { time: "3:30", label: "Both directions equally", detail: "Practice your J-turn to the left and right equally — most beginners prefer one side" },
    ],
    feels: [
      "The ski pulling you around the curve without you muscling it — almost magical the first time",
      "Weight pressing down through the outside ski as the arc tightens near the end",
      "A gentle, progressive curve rather than a sudden change of direction",
    ],
    mistakes: [
      { mistake: "Twisting the feet to make the turn happen", fix: "Just tip the ankle — rotation fights the ski's natural arc and causes skidding instead" },
      { mistake: "Not enough speed to initiate", fix: "You need a small amount of momentum — too slow and the ski cannot bend into its arc" },
      { mistake: "Looking down at the ski tips", fix: "Eyes forward down the slope — where you look is where you go" },
    ],
    drills: [
      "Tip-and-follow: start moving and tip your ski without thinking about where you go — trust the arc and see where the ski takes you",
      "J-left, J-right alternation: do a J-turn to the left, traverse back, J-turn to the right — builds equal familiarity with both directions",
      "Compare to wedge: ski a J-turn then immediately a wedge turn — feel the difference between passive geometry and active steering",
    ],
    prerequisites: ["athletic-stance", "snowplow-stop"],
    nextSteps: ["wedge-turns", "wedge-christie"],
    youtubeVideos: [
      {
        videoId: "PwQYLuERrKw",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Turn on Skis Beginners",
        isPrimary: true,
        teachingStyle: "Beginner-friendly with clear step-by-step cues",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:falling-leaf",
    title: "Falling Leaf",
    slug: "falling-leaf",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "A controlled diagonal sideslip that alternates forward and backward — drifting down the slope like a leaf floating in wind — a key drill for edging and balance.",
    promise:
      "Your edge control and fore-aft balance will improve dramatically, and sideslipping in any direction will feel natural and precise.",
    timestamps: [
      { time: "0:30", label: "The basic sideslip start", detail: "Begin from a static sideslip — flat skis, sliding straight down the fall line" },
      { time: "1:15", label: "Shifting forward", detail: "Press your toes to shift weight toward the tips — the skis drift diagonally forward-downhill" },
      { time: "2:25", label: "Shifting backward", detail: "Press your heels to shift weight toward the tails — the skis drift diagonally backward-downhill" },
      { time: "3:40", label: "Linking the pattern", detail: "Alternate forward-drift and backward-drift in a flowing S-pattern down the slope" },
    ],
    feels: [
      "Like you are steering a boat with your weight rather than your hands",
      "The skis responding instantly to where you shift your pressure — fore moves tips, aft moves tails",
      "A drifting, fluid motion that feels effortless once the fore-aft balance clicks",
    ],
    mistakes: [
      { mistake: "Edging too hard and stopping the drift", fix: "Keep skis nearly flat — just enough edge to control speed, not enough to grip and stop" },
      { mistake: "Using the whole body to shift instead of just the feet", fix: "Pressure comes from rolling your ankles toward toes or heels — the hips barely move" },
      { mistake: "Looking down at your skis", fix: "Eyes forward and across the slope — looking down shifts your weight back and disrupts the balance" },
    ],
    drills: [
      "Pure forward drift: sideslip and just press your toes — only drift forward-diagonal until you feel consistent control before adding the backward phase",
      "Rhythm counting: say 'forward, forward, back, back' out loud as you drift — the verbal cue links the weight shift to the movement pattern",
      "Narrow vs wide: do the falling leaf with a narrow stance then a wide stance — feel how stance width changes your balance point and drift direction",
    ],
    prerequisites: ["sideslipping", "wedge-turns"],
    nextSteps: ["speed-control", "stem-christie"],
    youtubeVideos: [
      {
        videoId: "CqW2AnC01kc",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Drills Falling Leaf",
        isPrimary: true,
        teachingStyle: "Clear drill breakdown with practical progression",
      },
      {
        videoId: "yIaG__iHHFw",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Side Slipping an Essential Tool for Skiers",
        isPrimary: false,
        teachingStyle: "Fun, energetic with clear before-and-after demos",
      },
    ],
  },
  {
    id: "ski:one-ski-drill",
    title: "One-Ski Drill",
    slug: "one-ski-drill",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Skiing entire turns balanced on a single ski with the other lifted — the most direct drill for forcing correct weight transfer and outside-ski dominance.",
    promise:
      "Any turn where your weight was on the wrong ski will become impossible to ignore — this drill exposes and fixes the problem in one run.",
    timestamps: [
      { time: "0:30", label: "Which ski to lift", detail: "Lift the inside ski — the one toward the center of the turn — and ski the arc on the outside ski only" },
      { time: "1:15", label: "Keeping the lifted ski stable", detail: "Hold the lifted ski parallel and at boot height — it should not swing or touch down" },
      { time: "2:30", label: "Full turns on one ski", detail: "Complete the entire arc from initiation to finish before switching to the other ski" },
      { time: "3:45", label: "Both directions equally", detail: "Most skiers have a dominant side — the weaker direction needs more reps" },
    ],
    feels: [
      "Instantly obvious when you are on the wrong ski — you wobble or tip over with no warning",
      "A locked, grippy, confident sensation when weight is correctly centered over the single ski",
      "Your ankle and knee working harder to maintain edge angle on one leg",
    ],
    mistakes: [
      { mistake: "Touching the lifted ski down when it gets hard", fix: "Let yourself struggle — the wobble is information, not failure, and it corrects the weight placement" },
      { mistake: "Leaning the whole body instead of tipping the ankle", fix: "Edge from ankle and knee — leaning the torso causes balance loss on a single ski" },
      { mistake: "Rushing the arc to get off the single ski", fix: "Slow down, even ski slower runs — the slower you go the clearer the balance feedback" },
    ],
    drills: [
      "Scooter warmup: push along flat terrain on one ski like a scooter, then switch — builds single-leg balance before adding a slope",
      "Touch-down permission: allow yourself to touch the ski down once per turn, but try to reduce that to zero by the end of the run",
      "Video check: film yourself skiing the one-ski drill — it is often surprising how much your body leans compared to what you feel",
    ],
    prerequisites: ["parallel-turns", "balance-drills"],
    nextSteps: ["carved-turns", "weight-transfer"],
    youtubeVideos: [
      {
        videoId: "XIDOZPJBPVU",
        channel: "Ski School App",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "One Ski Balance Drill",
        isPrimary: true,
        teachingStyle: "Clear drill instruction with technique focus",
      },
      {
        videoId: "XOGbIRhi1sY",
        channel: "REI",
        channelUrl: "",
        title: "Balance Exercises for Skiing",
        isPrimary: false,
        teachingStyle: "Exercise-focused with clear on-slope demonstration",
      },
    ],
  },
  {
    id: "ski:retraction-turns",
    title: "Retraction Turns",
    slug: "retraction-turns",
    discipline: "ski",
    difficulty: 7,
    rating: "black",
    terrain: ["Groomed"],
    description:
      "Initiating turns by actively pulling the feet up and retracting the legs rather than extending them — the technique that makes high-speed carved transitions effortless.",
    promise:
      "Your turn transitions will go from clunky weight-shifts to silky, athletic flows — a noticeable leap in the quality of your skiing.",
    timestamps: [
      { time: "0:45", label: "Extension vs retraction", detail: "Most skiers extend up to initiate — retraction pulls the feet up instead, keeping the body low and stable" },
      { time: "1:35", label: "The mechanics", detail: "At the end of the arc, retract both knees toward your chest — the skis unweight and switch edges naturally" },
      { time: "2:50", label: "Body height stays constant", detail: "Unlike extension turns, your head and hips barely rise — only the legs move up and down" },
      { time: "4:05", label: "Combining with high speed", detail: "Retraction turns shine at race pace — the low stable body position handles G-forces far better" },
    ],
    feels: [
      "Like pulling your knees up at the transition rather than pushing your body up",
      "Your core working to hold the body steady while the legs do all the moving",
      "A flowing, liquid quality to the transitions that extension turns cannot match",
    ],
    mistakes: [
      { mistake: "Still extending up out of habit", fix: "Film yourself and watch for head bobbing at each transition — bobbing means extension, not retraction" },
      { mistake: "Retracting too late — after the arc is complete", fix: "Start pulling the feet up just before the fall line — the retraction triggers the transition" },
      { mistake: "Collapsing the core when retracting", fix: "Keep your core firm and torso tall — only the legs move, the trunk is rigid" },
    ],
    drills: [
      "Flat-ski retraction drill: on a gentle slope, just pull both feet up rhythmically while skiing straight — feels odd but builds the physical awareness",
      "Retraction to stop: ski at medium speed, retract both legs fully and hold the position until you slow — proves you can control the unweighted moment",
      "Slow-motion video: record yourself at 120fps and watch the transitions — retraction turns show almost no vertical head movement between arcs",
    ],
    prerequisites: ["parallel-turns", "carved-turns"],
    nextSteps: ["dynamic-carving", "hop-turns"],
    youtubeVideos: [
      {
        videoId: "hQAePluhRSc",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Retraction Extension Turn 4 Steps",
        isPrimary: true,
        teachingStyle: "Step-by-step with clear drill breakdown and on-slope demo",
      },
      {
        videoId: "ihs5gT-WM6Q",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Advanced Carving Tips Dynamic Skiing",
        isPrimary: false,
        teachingStyle: "High-energy with race technique analysis",
      },
    ],
  },
  {
    id: "ski:skidded-to-carved",
    title: "Skidded to Carved Turns",
    slug: "skidded-to-carved",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Understanding exactly what separates a skidded turn from a carved one — then progressively eliminating skid until your arcs leave clean, thin tracks.",
    promise:
      "You will finally know what carving actually means and be able to feel the difference in real time rather than just guessing.",
    timestamps: [
      { time: "0:35", label: "How to identify skidding", detail: "Look at your tracks — a wide smear means skid, two thin parallel lines means carve" },
      { time: "1:20", label: "Why skidding happens", detail: "Twisting or pushing the ski into the turn instead of tipping it onto edge — the pivot kills the arc" },
      { time: "2:35", label: "The tipping fix", detail: "Roll the ankle to engage the edge before the turn starts — no twist, no push, just tip" },
      { time: "3:55", label: "Progressive edge angle", detail: "More edge angle equals less skid — experiment with increasingly aggressive tipping to feel the grip build" },
    ],
    feels: [
      "Skidding feels loose and sideways — the ski is sliding across the snow as much as along it",
      "Carving feels locked and forward — the ski grips and pulls you through the arc",
      "The moment skid disappears, a vibration replaces it — the edge chattering on hardpack as it grips",
    ],
    mistakes: [
      { mistake: "Pivoting the foot to start each turn", fix: "Tip the ankle inward without rotating the foot — the pivot is what causes every skid" },
      { mistake: "Trying to carve too fast too soon", fix: "Learn the tip-not-twist movement at slow speed — speed amplifies both carving and skidding" },
      { mistake: "Not reading the tracks after each run", fix: "Always look back — the snow tells you the truth about what your skis actually did" },
    ],
    drills: [
      "Track inspection: after every run, look back up the slope at your tracks and classify each turn as skid or carve — set a target of all carves by run five",
      "Tipping-only turns: make a turn using only ankle tipping with zero foot rotation — if the ski arcs without pivoting, you have the right movement",
      "Edge angle progression: make four turns with minimal tipping, then four with more, then four with maximum — feel the spectrum from full skid to full carve",
    ],
    prerequisites: ["parallel-turns", "edge-control-basics"],
    nextSteps: ["carved-turns", "garland-exercise"],
    youtubeVideos: [
      {
        videoId: "4REYYH8Yuvk",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "Skidded vs Carved Turns",
        isPrimary: true,
        teachingStyle: "Side-by-side comparison with real-time edge data",
      },
      {
        videoId: "LrmCNarCzIY",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How to Carve on Skis 5 Tips",
        isPrimary: false,
        teachingStyle: "Energetic with clear visual comparison of skidding vs carving",
      },
    ],
  },
  {
    id: "ski:bump-absorption",
    title: "Bump Absorption",
    slug: "bump-absorption",
    discipline: "ski",
    difficulty: 7,
    rating: "black",
    terrain: ["Moguls"],
    description:
      "Actively compressing and extending your legs to absorb each mogul as terrain, not as an obstacle — the foundation of smooth, controlled mogul skiing.",
    promise:
      "Bumps will stop launching you and start flowing beneath you — your upper body becomes a camera platform while your legs handle all the chaos.",
    timestamps: [
      { time: "0:45", label: "Legs as shock absorbers", detail: "The mogul pushes your feet up — let them come up by bending the knees rather than resisting" },
      { time: "1:30", label: "Active retraction on the crest", detail: "At the top of each bump, actively pull both feet toward your hips — do not wait to be pushed" },
      { time: "2:45", label: "Extension in the trough", detail: "Between bumps, push your feet down into the trough to maintain snow contact — skis that leave the snow lose control" },
      { time: "4:10", label: "Upper body anchor", detail: "Hands forward, chest still — let everything below the hips move while everything above stays calm" },
    ],
    feels: [
      "Your legs pistonning constantly — up at the crest, down in the trough, up again",
      "Hips staying level even as your feet move through a meter of vertical range",
      "A clicking, metronomic quality once the absorption rhythm locks in",
    ],
    mistakes: [
      { mistake: "Rigid legs getting bucked off each crest", fix: "Anticipate the bump and start bending before you reach it — active, not reactive" },
      { mistake: "Upper body pitching forward over each crest", fix: "Tight core and forward hands — the upper body is a fixed platform, nothing moves above the hips" },
      { mistake: "Skiing too fast before the absorption skill is solid", fix: "Go slow enough that you can absorb each bump fully — speed comes after the movement is automatic" },
    ],
    drills: [
      "Walk the bumps: side-step up a mogul run and practice the retract-extend motion on each bump from a stationary position — build the movement before adding speed",
      "Single-bump approach: ski straight at one isolated bump, absorb it fully, stop in the trough — master one before linking them",
      "Hands-on-hips run: place both hands on your hips while skiing bumps — if your hands bob up and down, your upper body is not staying calm",
    ],
    prerequisites: ["mogul-absorption", "parallel-turns"],
    nextSteps: ["steep-terrain", "tree-skiing"],
    youtubeVideos: [
      {
        videoId: "ehCP4tNo_B8",
        channel: "Warren Smith Ski Academy",
        channelUrl: "https://www.youtube.com/@WarrenSmithSkiAcademy",
        title: "Key to Skiing Bumps Absorption",
        isPrimary: true,
        teachingStyle: "Expert mogul coaching with detailed mechanical breakdown",
      },
      {
        videoId: "HlTKtm28ii4",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski Moguls for Beginners",
        isPrimary: false,
        teachingStyle: "Energetic with progressive difficulty drills",
      },
    ],
  },
  {
    id: "ski:flat-light-skiing",
    title: "Flat Light Skiing",
    slug: "flat-light-skiing",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["All"],
    description:
      "Adapting your technique and decision-making for white-out and flat-light conditions where contrast disappears and depth perception is severely reduced.",
    promise:
      "Overcast days and stormy visibility will stop shutting your skiing down — you will have strategies to ski safely when you cannot see the terrain.",
    timestamps: [
      { time: "0:35", label: "Why flat light is dangerous", detail: "Without shadows, bumps, dips, and ice patches become invisible — your eyes give you almost no terrain information" },
      { time: "1:20", label: "Slow down proactively", detail: "Cut your normal speed by 30-40% — the margin for terrain surprises must be much larger than usual" },
      { time: "2:35", label: "Feel the snow through your feet", detail: "When eyes fail, pressure feedback through your boots becomes your primary terrain sensor — stay centered and sensitive" },
      { time: "3:55", label: "Use contrast anchors", detail: "Look for poles, trees, lift towers — anything with visual contrast to anchor your sense of slope and direction" },
    ],
    feels: [
      "Slightly disorienting at first — trusting your feet more than your eyes is an unfamiliar sensation",
      "A heightened awareness of pressure underfoot as your other senses compensate for the lack of visual depth",
      "Calm and deliberate, not fast and reactive — flat light demands patience",
    ],
    mistakes: [
      { mistake: "Skiing at normal speed in white-out conditions", fix: "Reduce speed substantially — the reaction time needed for invisible terrain is much longer" },
      { mistake: "Staring down at the snow trying to see terrain", fix: "Look toward poles or trees for contrast — staring at the white ground gives you nothing" },
      { mistake: "Stopping in the middle of a run where others cannot see you", fix: "Always stop at the edge of a run, near visible markers — being invisible is a serious hazard" },
    ],
    drills: [
      "Eyes-closed traverse: on a safe gentle groomed run, close your eyes for two seconds during a traverse and feel the slope — builds terrain-through-feet sensitivity",
      "Slow run challenge: ski an entire groomed blue run at half your normal speed — builds patience and fine-tunes the feel-the-snow skill",
      "Pole-focus navigation: pick a distant pole and ski toward it without looking at the snow between you and it — trains the contrast-anchor technique",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["speed-control", "ice-technique"],
    youtubeVideos: [
      {
        videoId: "5WMdbLT6adE",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Skiing White Out 4 Hacks",
        isPrimary: true,
        teachingStyle: "Practical tips with real flat-light conditions footage",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:skating-on-skis",
    title: "Skating on Skis",
    slug: "skating-on-skis",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Propelling yourself across flat terrain by pushing off alternating skis in a V-shape — an essential skill for navigating runouts and lift lines without poles.",
    promise:
      "Flat sections will no longer strand you — you will glide efficiently and arrive at the lift without embarrassing pole-pushing or walking.",
    timestamps: [
      { time: "0:25", label: "The V position", detail: "Open your ski tips into a V with heels together — like the opposite of a snowplow" },
      { time: "1:10", label: "Push and glide", detail: "Push off the inside edge of one ski and glide on the other — alternate left and right" },
      { time: "2:15", label: "Upper body swing", detail: "Let your arms swing opposite to your pushing leg — the natural cross-body movement adds propulsion" },
      { time: "3:30", label: "Using a slope", detail: "A tiny downhill grade makes skating much easier — find a gentle slope to practice before flat terrain" },
    ],
    feels: [
      "Like ice skating or rollerblade skating — the push-off and glide rhythm is nearly identical",
      "Your weight shifting fully onto the gliding ski with each push — committed, not tentative",
      "A satisfying momentum building as each push adds to the last",
    ],
    mistakes: [
      { mistake: "Pushing with the flat ski instead of the edge", fix: "Angle the pushing ski so its inside edge grips the snow — without edge, there is nothing to push from" },
      { mistake: "Short, choppy strokes with no glide phase", fix: "Let yourself glide on the weighted ski for a full count before pushing again — slow strokes go further" },
      { mistake: "Looking down at your skis while skating", fix: "Eyes forward toward your destination — looking down causes a cascade of balance problems" },
    ],
    drills: [
      "One-foot glide contest: push once and see how far you can glide on a single ski before touching down — longer glides mean better balance and technique",
      "No-pole lap: skate an entire flat section with poles under your arm — forces proper leg-driven technique rather than leaning on poles",
      "Cadence build: start skating at a slow, deliberate pace then gradually increase stroke frequency — feel how rhythm affects speed more than raw power",
    ],
    prerequisites: ["athletic-stance"],
    nextSteps: ["parallel-turns", "balance-drills"],
    youtubeVideos: [
      {
        videoId: "0RDRpjPNTN4",
        channel: "SkiBro",
        channelUrl: "",
        title: "How to Skate While Skiing",
        isPrimary: true,
        teachingStyle: "Practical flat-terrain technique with step-by-step cues",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:herringbone",
    title: "Herringbone",
    slug: "herringbone",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Walking uphill on skis in a V-shape by stepping alternating skis outward and using their inside edges to grip — leaving a fishbone pattern in the snow behind you.",
    promise:
      "You will be able to climb short hills without removing your skis — a practical skill that saves time and builds edge awareness from your very first day.",
    timestamps: [
      { time: "0:20", label: "Open the V", detail: "Tips point outward in opposite directions — the wider the V the more grip you get but the harder it is to walk" },
      { time: "1:05", label: "Edge and step", detail: "Roll your ankle inward on each ski so the inside edge bites before you transfer weight" },
      { time: "2:10", label: "Alternate feet", detail: "Step one foot up, edge it, weight it — then step the other foot up — a walking rhythm" },
      { time: "3:20", label: "Poles for balance", detail: "Plant poles behind you alternating with each step — they provide push and prevent sliding back" },
    ],
    feels: [
      "Slightly duck-footed and awkward at first — like walking with flippers on",
      "The inside edge biting into the snow on each step giving you a solid push-off platform",
      "A rhythm that starts slow and becomes natural after a dozen steps",
    ],
    mistakes: [
      { mistake: "Not edging before weighting the new ski", fix: "Always engage the inside edge first — flat ski on a slope will slide downhill as soon as you weight it" },
      { mistake: "Too narrow a V to get grip", fix: "Open the tips wider — more V means more inside edge contact and better uphill bite" },
      { mistake: "Leaning too far back", fix: "Lean forward slightly into the slope — a back-weighted stance causes the skis to slide out from under you" },
    ],
    drills: [
      "Flat herringbone: practice the V-walk on completely flat ground first — builds the edge-and-step pattern without any slope to fight",
      "Short climb count: climb 10 herringbone steps, stop, then climb 10 more — builds endurance and makes the rhythm familiar before tackling a real hill",
      "Pole-free attempt: try climbing 5 steps without poles — forces your legs and edges to do more work and builds awareness of what the poles are compensating for",
    ],
    prerequisites: ["athletic-stance"],
    nextSteps: ["skating-on-skis", "wedge-turns"],
    youtubeVideos: [
      {
        videoId: "JdvUibe750k",
        channel: "Ski School App",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Basic Ski Techniques Herringbone",
        isPrimary: true,
        teachingStyle: "Clear step-by-step beginner instruction",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:edge-pressure",
    title: "Edge Pressure Control",
    slug: "edge-pressure",
    discipline: "ski",
    difficulty: 6,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Deliberately managing how much downward force you apply through the edge across the arc — the difference between a ski that holds and one that chatters or releases.",
    promise:
      "Your edges will grip predictably at any speed, and you will be able to tune your pressure to match whatever conditions the slope throws at you.",
    timestamps: [
      { time: "0:40", label: "Pressure vs edge angle", detail: "Edge angle sets grip potential — pressure loads the edge to achieve it — both must be right simultaneously" },
      { time: "1:30", label: "Progressive loading through the arc", detail: "Start the turn with light pressure, build it through the fall line, peak at the bottom — never slam in abruptly" },
      { time: "2:45", label: "What chatter tells you", detail: "Chattering edge means too much pressure too soon — ease in more gradually and the chatter disappears" },
      { time: "4:05", label: "Pressure release at transition", detail: "Releasing pressure cleanly before the transition sets up the next arc — abrupt releases cause skid" },
    ],
    feels: [
      "A building sensation through the boot as you load the arc — like inflating a tire gradually",
      "The difference between stepping on a scale gently and slamming your foot down — same force, completely different result",
      "Your outside leg extending slightly through the arc as it pushes down to load the edge",
    ],
    mistakes: [
      { mistake: "Applying maximum pressure immediately at turn initiation", fix: "Start with 40% pressure and build — abrupt loading breaks edge grip every time" },
      { mistake: "Holding pressure through the transition into the next turn", fix: "Release the edge cleanly before you tip to the new side — residual pressure causes wash-out" },
      { mistake: "Trying to add pressure by pushing straight down", fix: "Pressure is applied through the ski's direction of travel — push along the arc, not perpendicular to it" },
    ],
    drills: [
      "Pressure scale: make four turns thinking 25%, 50%, 75%, 100% pressure — feel the spectrum and find where grip begins and chatter starts",
      "Feather entry: initiate each turn with the lightest possible edge contact, then gradually add pressure — the feather entry prevents early chatter",
      "Release check: at each transition, consciously think 'release' before tipping — builds the habit of cleanly ending one arc before starting the next",
    ],
    prerequisites: ["parallel-turns", "edge-control-basics"],
    nextSteps: ["carved-turns", "dynamic-carving"],
    youtubeVideos: [
      {
        videoId: "qdXK0xsltaA",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "HOW TO BEND A SKI Pressure Edge",
        isPrimary: true,
        teachingStyle: "Technical with edge data overlay and clear mechanical explanation",
      },
      {
        videoId: "SIFDZVFYfJo",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How Edge Control Can Improve Your Skiing",
        isPrimary: false,
        teachingStyle: "Data-driven with real-time edge angle feedback",
      },
    ],
  },
  {
    id: "ski:turn-shape",
    title: "Turn Shape",
    slug: "turn-shape",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Deliberately controlling the geometry of each arc — from round C-shapes to tighter J-shapes — as the primary tool for managing speed and terrain.",
    promise:
      "You will stop reacting to speed and start choosing it — turn shape is the most powerful speed control tool in skiing and most people never consciously use it.",
    timestamps: [
      { time: "0:35", label: "What turn shape means", detail: "The path your ski draws in the snow — a tight C cross the hill more, a wide arc crosses the fall line less" },
      { time: "1:20", label: "Shape and speed relationship", detail: "More time across the fall line scrubs more speed — rounder shape equals slower speed, always" },
      { time: "2:40", label: "Adapting shape to terrain", detail: "Steeper slope needs rounder turns — start making the shape adjustment before the terrain pitches, not after" },
      { time: "4:00", label: "Mixing shapes in one run", detail: "Expert skiers vary turn shape constantly — round in steep sections, straight in mellow ones — consciously" },
    ],
    feels: [
      "Choosing to go slower by making your turns rounder — like turning the volume down with your feet",
      "The slope seeming less steep when your turns cross more of the hill laterally",
      "Control and predictability replacing the sensation of just holding on",
    ],
    mistakes: [
      { mistake: "Using the same turn shape everywhere regardless of terrain", fix: "Read the slope ahead and pre-adjust your shape before the gradient changes, not after it surprises you" },
      { mistake: "Braking with the wedge when a rounder turn would work better", fix: "Next time you want to brake, try a rounder turn instead — it is smoother and faster" },
      { mistake: "Letting the fall line end the turn prematurely", fix: "Finish the arc all the way across the hill — the turn shape only works if you complete it" },
    ],
    drills: [
      "Shape spectrum run: ski a run making the first third with the widest possible arcs, then medium, then tight — feel the speed change with shape",
      "Count to four: make each turn last a four-count before initiating the next — the slower rhythm forces a rounder shape",
      "Constant speed goal: pick a target speed and use only turn shape to maintain it all the way down — no stopping, no braking, shape only",
    ],
    prerequisites: ["parallel-turns", "speed-control"],
    nextSteps: ["short-turns", "short-radius-turns"],
    youtubeVideos: [
      {
        videoId: "sPK6M7FDzT4",
        channel: "Deb Armstrong Skiing",
        channelUrl: "https://www.youtube.com/@debarmstrongskiing",
        title: "Turn Shape Deb Armstrong",
        isPrimary: true,
        teachingStyle: "Technical coaching with on-slope demonstrations and clear conceptual breakdown",
      },
      {
        videoId: "LrmCNarCzIY",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "How to Carve on Skis 5 Tips",
        isPrimary: false,
        teachingStyle: "Energetic with clear visual comparison of skidding vs carving",
      },
    ],
  },
  {
    id: "ski:powder-entry",
    title: "Powder Entry",
    slug: "powder-entry",
    discipline: "ski",
    difficulty: 8,
    rating: "black",
    terrain: ["Powder"],
    description:
      "The specific adjustments needed to transition from groomed snow into deep powder — stance, timing, and commitment changes that prevent getting immediately bucked.",
    promise:
      "You will stop getting caught off guard at the groomed-to-powder boundary and start making that transition confidently every time.",
    timestamps: [
      { time: "0:40", label: "The transition problem", detail: "Powder entry fails when groomed habits carry over — the abrupt change in resistance catches most skiers unprepared" },
      { time: "1:25", label: "Stance adjustment at entry", detail: "Feet closer together, weight slightly rearward before you enter — not when you are already in trouble" },
      { time: "2:40", label: "Turn initiation in deep snow", detail: "Start the turn earlier than you would on groomed — powder slows initiation, so give it more time" },
      { time: "4:00", label: "Equal weighting both skis", detail: "Switch from outside-ski dominance to equal pressure on both — a weighted inside ski in powder sinks and bucks you" },
    ],
    feels: [
      "A wall of resistance as you enter that immediately softens into floating if your stance is right",
      "Both legs working as one wide platform rather than a dominant outside ski",
      "A slower, more patient turn than groomed skiing — the snow gives you more time but also demands more planning",
    ],
    mistakes: [
      { mistake: "Carrying groomed-snow stance into powder without adjustment", fix: "Make the weight and stance change before you enter — at the boundary, not after the first turn fails" },
      { mistake: "Initiating turns at the same moment as groomed runs", fix: "Start the turn earlier — powder has more resistance at initiation and needs the extra lead time" },
      { mistake: "Weighting the outside ski and getting immediately thrown", fix: "Switch to equal weighting the moment you enter powder — outside-ski bias sinks that ski instantly in deep snow" },
    ],
    drills: [
      "Boundary laps: repeatedly ski the edge where groomed meets powder and practice the stance transition — five entry laps before a full powder run",
      "Equal-weight bounce: on a gentle groomed slope, bounce with equal weight on both skis — builds the muscle memory needed for powder's equal-weighting requirement",
      "Slow entry first: enter powder at half your normal speed the first time — slower entry makes the resistance transition manageable while you adapt",
    ],
    prerequisites: ["parallel-turns", "powder-floating"],
    nextSteps: ["tree-skiing"],
    youtubeVideos: [
      {
        videoId: "GLrqdtXAJ6U",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Basic Powder Turn",
        isPrimary: true,
        teachingStyle: "Clear powder-specific technique with stance and timing focus",
      },
      {
        videoId: "WTX21DO7Qsc",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "How to Ski Powder Like a Pro",
        isPrimary: false,
        teachingStyle: "Immersive powder footage with technical coaching",
      },
    ],
  },
  {
    id: "ski:steep-skiing",
    title: "Steep Skiing",
    slug: "steep-skiing",
    discipline: "ski",
    difficulty: 8,
    rating: "black",
    terrain: ["Steep"],
    description:
      "Skiing sustained steep pitches with controlled aggression — using decisive pole plants, short-radius turns, and a committed downhill lean to stay in control.",
    promise:
      "The steepest runs on the mountain will become your playground rather than your nightmare — technical mastery replaces fear.",
    timestamps: [
      { time: "0:50", label: "The mental barrier first", detail: "Fear causes the back-seat lean that guarantees a fall — understanding this is step one of fixing it" },
      { time: "1:45", label: "Committing the upper body downhill", detail: "Your chest must face the valley aggressively — this feels wrong but is the only safe position on steep terrain" },
      { time: "3:00", label: "Decisive pole plant", detail: "Every turn starts with a firm, decisive plant — the pole anchors your body while the skis pivot beneath it" },
      { time: "4:20", label: "Line selection on steeps", detail: "Choose your next three turns before making the current one — steep terrain punishes reactive skiing" },
    ],
    feels: [
      "Hanging over the void in a way that eventually becomes comfortable — a controlled trust fall",
      "The pole plant as a physical anchor that stops the upper body from rotating with the turn",
      "Each short turn as a deliberate brake, not a panic reaction — speed is chosen, not happened upon",
    ],
    mistakes: [
      { mistake: "Leaning into the slope when scared", fix: "The instinct to hug the mountain is exactly backwards — lean away from it and over your skis" },
      { mistake: "Long, passive turns on steep terrain", fix: "Steep pitches demand short, active turns — the longer the arc the more you accelerate" },
      { mistake: "Looking only one turn ahead", fix: "Read three to five turns ahead on steep terrain — you cannot react fast enough if you wait to see problems" },
    ],
    drills: [
      "Steep sideslip: stand on the steepest slope you dare and sideslip the full length — builds confidence that you can control speed on that gradient",
      "One-run steeper: each session ski one pitch steeper than comfortable for three runs — your nervous system recalibrates quickly with repetition",
      "Planted pole pause: plant your pole on steep terrain and count one-two before starting the turn — removes the rush instinct and forces deliberate initiation",
    ],
    prerequisites: ["parallel-turns", "steep-terrain", "hop-turns"],
    nextSteps: ["tree-skiing"],
    youtubeVideos: [
      {
        videoId: "KBibkQdbIxw",
        channel: "Warren Smith Ski Academy",
        channelUrl: "https://www.youtube.com/@WarrenSmithSkiAcademy",
        title: "How to Ski Steeps WSSA",
        isPrimary: true,
        teachingStyle: "Expert steep-terrain technique with mental and physical coaching",
      },
      {
        videoId: "os74z_ByH-U",
        channel: "Warren Smith Ski Academy",
        channelUrl: "https://www.youtube.com/@WarrenSmithSkiAcademy",
        title: "Steep Skiing Jump Turns",
        isPrimary: false,
        teachingStyle: "Steep technique focus with progressive drill approach",
      },
    ],
  },
  {
    id: "ski:pizza-to-french-fries",
    title: "Pizza to French Fries",
    slug: "pizza-to-french-fries",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Transitioning from the pizza wedge position to parallel French fries stance — the most fundamental progression for new skiers learning to stand and glide naturally.",
    promise:
      "You'll graduate from the day-one snowplow grip to standing comfortably parallel, unlocking every technique that comes after.",
    timestamps: [
      { time: "0:20", label: "The pizza position", detail: "Tips together, tails apart — review the wedge before thinking about leaving it" },
      { time: "1:00", label: "The French fries position", detail: "Both skis parallel and hip-width apart — the stance you want to ski in" },
      { time: "2:10", label: "Transitioning between the two", detail: "Start in pizza, then gradually close the tails together as you gain confidence" },
      { time: "3:20", label: "Gliding in parallel", detail: "On flat terrain, stand in French fries and just glide — feel the difference from wedge" },
    ],
    feels: [
      "The pizza feels safe but restricted — French fries feel free but require more balance commitment",
      "Closing your tails together is a deliberate act of confidence — lean forward and let it happen",
      "Standing parallel on flat ground first makes the transition on a gentle slope much less scary",
    ],
    mistakes: [
      { mistake: "Jumping straight to French fries on a slope before mastering the wedge", fix: "Nail the pizza stop first — parallel only works when you already have braking confidence" },
      { mistake: "Trying to hold French fries while scared and reverting to a wide wedge", fix: "That's fine and expected — let the skis open naturally when you need control" },
      { mistake: "Feet too close together in the parallel position", fix: "Hip-width is correct — feet touching creates a balance problem that beginners don't need" },
    ],
    drills: [
      "Flat glide comparison: on a gentle flat section, glide first in pizza then in French fries — feel the difference in drag and stance",
      "Close on the run-out: ski a gentle slope with a long flat run-out, use pizza on the slope, then close to French fries on the flat — removes risk from the transition",
      "Count to three: start in pizza and count slowly to three before closing to parallel — builds deliberate control over the timing",
    ],
    prerequisites: ["athletic-stance"],
    nextSteps: ["wedge-turns", "snowplow-stop"],
    youtubeVideos: [
      {
        videoId: "NUGDh-qfYpQ",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Tips Up Pizza to French Fries",
        isPrimary: true,
        teachingStyle: "Beginner-friendly with clear visual comparison of both positions",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:snowplow-to-parallel",
    title: "Snowplow to Parallel",
    slug: "snowplow-to-parallel",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "The full transition from snowplow skiing to parallel stance — systematically reducing wedge dependency run by run until both skis move in unison.",
    promise:
      "You'll make the leap every beginner dreams of — ditching the snowplow for good and skiing like the people you've been watching all day.",
    timestamps: [
      { time: "0:30", label: "Why the inner ski holds you back", detail: "The trailing inside ski is the last link to the wedge — learning to match it is the whole skill" },
      { time: "1:20", label: "The matching moment", detail: "After crossing the fall line, actively draw the inside ski parallel — commit to the movement" },
      { time: "2:40", label: "Shrinking the wedge", detail: "Each run open a smaller V — the goal is to barely open at all before matching" },
      { time: "4:00", label: "Speed helps", detail: "A touch more speed makes parallel feel natural — being too slow makes the transition feel forced" },
    ],
    feels: [
      "The wedge feels like a safety net you're slowly pulling away from yourself — that's exactly right",
      "When the inside ski matches cleanly, there's a moment of pure parallel skiing that feels completely different",
      "Progress is non-linear — some runs feel like full parallel, others fall back to wedge — both are normal",
    ],
    mistakes: [
      { mistake: "Trying to be parallel from the very start of each turn", fix: "Use the wedge to initiate and match at the end — shrink the wedge each session, not overnight" },
      { mistake: "Matching too early in the turn before weight is transferred", fix: "Wait until you are past the fall line before drawing the inside ski in" },
      { mistake: "Forcing the parallel and losing control", fix: "If you feel unsafe, open back into a wedge — comfort builds the confidence to match naturally" },
    ],
    drills: [
      "End-of-turn match: ski a full wedge turn and only match the skis in the last meter of the arc — isolates the matching movement",
      "Wedge shrink game: rate your wedge opening on each turn from 1 to 5, and try to lower your average each run",
      "One perfect turn: make one clean wedge-to-parallel turn, stop and feel it, then make the next — quality over quantity",
    ],
    prerequisites: ["wedge-turns", "wedge-christie"],
    nextSteps: ["parallel-turns"],
    youtubeVideos: [
      {
        videoId: "Hwo-PgDFSXk",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "Fix Inner Ski Progress Plough to Parallel",
        isPrimary: true,
        teachingStyle: "Drill-driven with clear inside-ski focus and progression steps",
      },
      {
        videoId: "ZOxlBfACVyk",
        channel: "Ski School by Elate",
        channelUrl: "https://www.youtube.com/@SkiSchoolbyElate",
        title: "Wedge Christie MA 1",
        isPrimary: false,
        teachingStyle: "Progressive, beginner-to-intermediate focus",
      },
    ],
  },
  {
    id: "ski:side-stepping",
    title: "Side Stepping",
    slug: "side-stepping",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["Groomed", "Steep"],
    description:
      "Walking sideways uphill on skis by stepping alternating skis and using their uphill edges to grip — the simplest way to climb any slope with skis on.",
    promise:
      "You'll be able to reposition on a slope, retrieve a dropped pole, or climb short pitches without ever taking your skis off.",
    timestamps: [
      { time: "0:20", label: "The sideways stance", detail: "Skis parallel and perpendicular to the fall line — both edges biting into the slope" },
      { time: "1:00", label: "The step pattern", detail: "Step the uphill ski up first, plant it, edge it, then bring the lower ski up to meet it" },
      { time: "2:05", label: "Using poles for support", detail: "Plant poles uphill for balance — they prevent sliding back between steps" },
      { time: "3:10", label: "On steeper terrain", detail: "More aggressive edge angle required — really roll the ankle into the hill before weighting each step" },
    ],
    feels: [
      "Like climbing stairs sideways — a bit awkward at first but immediately intuitive",
      "The uphill edge of each ski must bite before you shift weight — rushing causes a slide-back",
      "Poles give stability that lets you focus on the stepping pattern without worrying about falling",
    ],
    mistakes: [
      { mistake: "Stepping with flat skis that slide downhill on contact", fix: "Edge the ski firmly against the slope before committing weight — edge first, then step" },
      { mistake: "Taking steps that are too large", fix: "Small, controlled steps are easier to balance — no more than shoulder-width per step" },
      { mistake: "Leaning away from the slope", fix: "Stay over your skis — leaning out reduces edge pressure and causes slipping" },
    ],
    drills: [
      "Flat ground practice: side-step on completely flat terrain first — build the alternating step pattern without a slope to fight",
      "Count ten steps: side-step exactly ten steps up, stop, then side-step back down — builds rhythm and confidence in both directions",
      "No-pole attempt: try five steps without poles — forces your edges and legs to do more work and builds awareness of what the poles compensate for",
    ],
    prerequisites: ["athletic-stance"],
    nextSteps: ["herringbone", "sideslipping"],
    youtubeVideos: [
      {
        videoId: "JbwkqZtaR5A",
        channel: "Ski School App",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Tips for Skinning Uphill",
        isPrimary: true,
        teachingStyle: "Step-by-step with clear edge and balance cues",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:emergency-stop",
    title: "Emergency Stop",
    slug: "emergency-stop",
    discipline: "ski",
    difficulty: 2,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "A fast, decisive stop executed from full skiing speed — using a powerful edge set and committed body position to halt in the shortest possible distance.",
    promise:
      "You'll have a reliable emergency brake for situations where a normal stop won't happen fast enough — a crucial safety skill every skier needs.",
    timestamps: [
      { time: "0:25", label: "When to use it", detail: "A person falls in your path, an unexpected obstacle — situations that demand immediate stopping" },
      { time: "1:05", label: "The pivot and edge set", detail: "Rotate both skis sharply across the fall line and dig edges in simultaneously — not sequentially" },
      { time: "2:15", label: "The body drop", detail: "Drop your weight low and into the hill as the edges bite — height bleeds off and grip increases" },
      { time: "3:25", label: "Both directions", detail: "An emergency can come from either side — drill stopping to the left and right equally" },
    ],
    feels: [
      "Explosive and immediate — you are committing 100%, not easing into it",
      "Your edges slamming into the snow with your full body weight behind them",
      "A spray of snow and a dead stop — if done correctly there is zero skidding after the edge set",
    ],
    mistakes: [
      { mistake: "Hesitating and trying to slow down gradually first", fix: "Emergency stops must be immediate — commit to the full edge set the instant you decide to stop" },
      { mistake: "Only pivoting the skis without dropping weight", fix: "The weight drop is what drives the edges deep — a pivot without weight produces a slow skid, not a stop" },
      { mistake: "Only practicing to the dominant side", fix: "Emergencies don't respect your preferred side — drill both directions every session" },
    ],
    drills: [
      "Signal stop: ski with a partner who shouts 'stop' at random — removes the anticipation and forces genuine reactive stopping",
      "Speed progression: practice the emergency stop from walking pace, medium speed, then fast — build confidence at each level before increasing",
      "Left-right equal reps: count your emergency stops each direction and keep drilling the weaker side until both feel identical",
    ],
    prerequisites: ["snowplow-stop", "wedge-turns"],
    nextSteps: ["hockey-stop", "speed-control"],
    youtubeVideos: [
      {
        videoId: "JzEqXIKQe-A",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Stop Fast Skiing",
        isPrimary: true,
        teachingStyle: "Safety-focused with clear decisive stopping technique",
      },
      {
        videoId: "fEIg28d2ttA",
        channel: "Snowii",
        channelUrl: "",
        title: "Learn How to STOP on Skis",
        isPrimary: false,
        teachingStyle: "Clear beginner-focused step-by-step breakdown",
      },
    ],
  },
  {
    id: "ski:chairlift-unloading",
    title: "Chairlift Unloading",
    slug: "chairlift-unloading",
    discipline: "ski",
    difficulty: 1,
    rating: "green",
    terrain: ["All"],
    description:
      "The specific technique for exiting a chairlift cleanly — timing your stand, pointing your tips, and gliding away without falling or blocking the ramp.",
    promise:
      "Unloading the lift will go from nerve-wracking to completely automatic — one less thing to worry about so you can focus on the skiing ahead.",
    timestamps: [
      { time: "0:20", label: "Raise the bar early", detail: "Lift the safety bar at the second-to-last tower — gives you time to prepare without rushing" },
      { time: "1:05", label: "Tips up and forward", detail: "As the chair reaches the ramp, tips pointing forward and slightly up — never drag them on the ground" },
      { time: "2:10", label: "Stand at the right moment", detail: "Push up from the chair as your skis make contact with the ramp — too early and you stumble, too late and you twist" },
      { time: "3:15", label: "Glide clear immediately", detail: "Ski straight ahead and move off to the side promptly — the chair is coming behind you and others are loading" },
    ],
    feels: [
      "The ramp slopes away from you — lean forward into it rather than sitting back into the chair",
      "A smooth push-off and immediate glide when the timing is right — the ramp does most of the work",
      "Looking ahead to where you're going rather than back at the chair makes the whole movement cleaner",
    ],
    mistakes: [
      { mistake: "Standing too early before skis touch the ramp", fix: "Wait for your skis to contact the ramp surface before pushing off — feel the ramp, then stand" },
      { mistake: "Stopping at the end of the ramp blocking others", fix: "Keep gliding forward and move clearly to the designated side — never stop at the ramp exit" },
      { mistake: "Poles hanging down and catching on the chair", fix: "Loop poles over one wrist with tips pointing up and back during the unload" },
    ],
    drills: [
      "Watch before you go: observe five other people unload before your first attempt — pattern recognition dramatically speeds up learning",
      "Verbal countdown: count 3-2-1 to yourself as the ramp approaches — gives you a consistent internal timing cue",
      "Pick a target: choose a spot 10 meters ahead of the ramp and ski to it — forward focus prevents the freeze that causes falls",
    ],
    prerequisites: ["chairlift-basics"],
    nextSteps: ["getting-up", "wedge-turns"],
    youtubeVideos: [
      {
        videoId: "7OYxMDwiBoQ",
        channel: "SkiBro",
        channelUrl: "",
        title: "Not Fall Unloading Ski Lift",
        isPrimary: true,
        teachingStyle: "Practical step-by-step with common mistake callouts",
      },
      {
        videoId: "21U4WyZmU_M",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "How to Ride a Chairlift Safely",
        isPrimary: false,
        teachingStyle: "Friendly, practical with clear loading and unloading steps",
      },
    ],
  },
  {
    id: "ski:linked-turns",
    title: "Linked Turns",
    slug: "linked-turns",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Connecting individual snowplow turns into a continuous flowing sequence — the moment skiing stops feeling like a series of separate events and starts feeling like movement.",
    promise:
      "You'll experience the rhythm of real skiing for the first time — a flowing chain of turns that carries you down the mountain without stopping between each one.",
    timestamps: [
      { time: "0:30", label: "Why linking matters", detail: "Each separate stop-and-turn builds bad habits — connected turns are how skiing is actually done" },
      { time: "1:15", label: "The transition timing", detail: "Begin the next turn as the current one finishes — there is no pause between them" },
      { time: "2:30", label: "Finding the rhythm", detail: "Count 'one, two' for each turn — the beat helps you feel when one ends and the next begins" },
      { time: "3:45", label: "Shape consistency", detail: "Try to make each turn roughly the same size and shape — consistency builds the rhythm that makes linking click" },
    ],
    feels: [
      "Like a pendulum swinging left and right — each turn flows into the next with no dead spot between",
      "Speed is constant rather than building and braking — linked turns manage speed automatically",
      "The mountain starts to feel like something you're dancing with, not fighting",
    ],
    mistakes: [
      { mistake: "Stopping completely between turns to prepare for the next", fix: "Trust that the next turn will happen — keep moving and let the rhythm connect them" },
      { mistake: "Rushing the transition and skidding into the next turn", fix: "Complete the current turn fully before committing to the next — patience in the finish creates the flow" },
      { mistake: "Looking at your ski tips between turns", fix: "Eyes downhill always — look toward your next turn, not at your feet" },
    ],
    drills: [
      "Count to 10: try to complete 10 linked turns without stopping — reset and try again until you can do it smoothly",
      "Humming rhythm: hum a simple beat while turning — the sound cue forces rhythmic timing that your brain naturally locks onto",
      "Shrink the pause: each run, try to make the gap between turns 10% shorter — gradually eliminate the hesitation until it disappears",
    ],
    prerequisites: ["wedge-turns"],
    nextSteps: ["speed-control", "wedge-christie"],
    youtubeVideos: [
      {
        videoId: "P8IydC8kxCk",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "HOW TO TURN ON SKIS Snowplough Beginners",
        isPrimary: true,
        teachingStyle: "Beginner-focused with clear rhythm and linking cues",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:inside-ski-steering",
    title: "Inside Ski Steering",
    slug: "inside-ski-steering",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Actively guiding the inside ski through each turn rather than leaving it passive — creating cleaner, more balanced arcs and eliminating the banking tendency that holds intermediates back.",
    promise:
      "Your turns will gain precision and symmetry you didn't know was missing — the inside ski becomes an active partner in every arc instead of dead weight.",
    timestamps: [
      { time: "0:35", label: "What the inside ski does normally", detail: "Most skiers let it trail passively — it gets dragged along rather than contributing to the turn" },
      { time: "1:20", label: "Active tipping of the inside ski", detail: "Tip the inside ski onto its little-toe edge simultaneously with the outside ski — both skis steer together" },
      { time: "2:40", label: "The balance improvement", detail: "When both skis steer, your weight distributes more evenly and banking disappears naturally" },
      { time: "4:00", label: "Feeling the difference", detail: "Compare a turn where the inside ski is passive versus active — the active version feels rounder and more secure" },
    ],
    feels: [
      "Both feet working as a coordinated pair rather than one foot driving and one following",
      "The inside ski tip steering into the turn rather than pointing somewhere slightly off the arc",
      "A cleaner, rounder turn shape that happens with less muscular effort",
    ],
    mistakes: [
      { mistake: "Tipping the inside ski too aggressively and crossing the tips", fix: "Match the tipping angle of the inside ski to the outside — it guides, it doesn't take over" },
      { mistake: "Focusing so much on the inside ski that outside-ski pressure drops", fix: "Outside ski still carries the weight — inside ski steers but doesn't load" },
      { mistake: "Only applying it on one side", fix: "Both directions need equal attention — most skiers have a lazy inside ski on their weaker turn side" },
    ],
    drills: [
      "Lifted-tip drill: slightly lift the inside ski tip off the snow while turning — forces you to actively steer it rather than drag it",
      "Two-ski awareness run: consciously feel both skis throughout a full run, narrating 'outside loads, inside tips' mentally on each turn",
      "Compare runs: ski one run with passive inside ski then one with active — look back at the tracks and compare the arc shape",
    ],
    prerequisites: ["parallel-turns", "counter-rotation"],
    nextSteps: ["carved-turns", "upper-lower-separation"],
    youtubeVideos: [
      {
        videoId: "lrrj95TJSkA",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "Steering the Inside Ski",
        isPrimary: true,
        teachingStyle: "Technical with data-driven edge analysis and on-slope demonstration",
      },
      {
        videoId: "hPONlALU_0Q",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "This Simple Drill Makes a HUGE Difference",
        isPrimary: false,
        teachingStyle: "Drill-focused with instant visible results",
      },
    ],
  },
  {
    id: "ski:outside-ski-pressure",
    title: "Outside Ski Pressure",
    slug: "outside-ski-pressure",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Maximizing pressure on the outside ski through each turn arc — the technique that creates edge grip, stability, and power on groomed slopes.",
    promise:
      "Your turns will suddenly feel grounded and confident instead of tipsy — proper outside-ski loading is the single biggest unlock for intermediate skiers.",
    timestamps: [
      { time: "0:35", label: "Which ski is the outside ski", detail: "It changes with every turn — the outside ski is the one on the outside of the arc, away from center" },
      { time: "1:20", label: "Driving pressure onto it", detail: "As the turn initiates, shift your hip toward the outside ski and feel it load under your foot" },
      { time: "2:40", label: "The 70-30 rule", detail: "70% of your weight on the outside ski through the arc — 30% on the inside for balance" },
      { time: "4:00", label: "Feeling the grip", detail: "Proper outside-ski pressure creates a sensation of being pushed into the slope — not sliding across it" },
    ],
    feels: [
      "Standing firmly on one leg through the whole arc — outside ski grips while the inside ski is light",
      "A building pressure under the outside foot that peaks at the bottom of the arc",
      "Confidence and stability replacing the wobbly sensation of evenly-split weight",
    ],
    mistakes: [
      { mistake: "Equal weighting on both skis causing the outside ski to wash out", fix: "Consciously press the outside ski harder — think about pushing through the outside heel" },
      { mistake: "Shifting weight too late after the turn has already started", fix: "Begin the weight shift as you initiate the turn — the pressure should be building from the start" },
      { mistake: "Inside ski crossing over the outside", fix: "Keep the inside ski parallel and light — it should follow the outside, not fight it" },
    ],
    drills: [
      "Lifted inside ski: raise your inside ski tip slightly off the snow through each turn — proves you have genuine outside-ski dominance",
      "Heel press: consciously press through the heel of your outside boot at the bottom of each arc — the heel is the most reliable pressure point",
      "One-ski run: ski 30 meters on just the outside ski per turn, actively changing feet between arcs — the extreme version builds the feeling fast",
    ],
    prerequisites: ["parallel-turns", "weight-transfer"],
    nextSteps: ["carved-turns", "hip-angulation"],
    youtubeVideos: [
      {
        videoId: "brE7-FSuYDc",
        channel: "Carv",
        channelUrl: "https://www.youtube.com/@CarvSki",
        title: "Increase Outside Ski Pressure",
        isPrimary: true,
        teachingStyle: "Data-driven with real-time pressure feedback and clear drill progression",
      },
      {
        videoId: "mzocKe2ldeo",
        channel: "SkiSchoolApp",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "How to Put Weight On Your Downhill Ski",
        isPrimary: false,
        teachingStyle: "Clear technical explanation with on-slope demonstration",
      },
    ],
  },
  {
    id: "ski:fore-aft-balance",
    title: "Fore-Aft Balance",
    slug: "fore-aft-balance",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed", "Steep"],
    description:
      "Maintaining your center of mass over the middle of the ski from tip to tail — preventing the back-seat and tip-heavy positions that cause loss of control on any terrain.",
    promise:
      "You'll stop getting pitched forward or left behind by terrain changes — centered balance is the foundation of adaptability on any slope.",
    timestamps: [
      { time: "0:40", label: "What fore-aft balance means", detail: "Your weight centered over the middle of the ski — not pressing the tails (back-seat) or the tips (diving)" },
      { time: "1:30", label: "The shin contact cue", detail: "Shins pressing gently against the front of the boots throughout every turn — this is the centered position" },
      { time: "2:45", label: "How terrain changes it", detail: "Steeper pitches pull you back — you must consciously drive forward to compensate as the slope pitches" },
      { time: "4:00", label: "Dynamic adjustment", detail: "Fore-aft balance is not a fixed position — it adjusts constantly as speed, terrain, and turn phase change" },
    ],
    feels: [
      "Shins in light continuous contact with boot tongues — not pressing hard, just touching",
      "Tails of the skis feel light and responsive, not dragging or heavy",
      "A centered, springy athletic position that can react to anything the terrain does",
    ],
    mistakes: [
      { mistake: "Sitting back on the tails when the slope steepens or speed increases", fix: "Drive your shins forward into the boots whenever it feels fast or scary — leaning back makes both worse" },
      { mistake: "Pressing too far forward and diving onto the tips", fix: "Equal shin contact, not aggressive forward lean — the tips should feel engaged, not overloaded" },
      { mistake: "A static body position that doesn't adjust to changing terrain", fix: "Move constantly fore-aft as the run changes — think of your body as continuously finding center" },
    ],
    drills: [
      "Shin contact check: every few turns, consciously notice whether your shins are touching your boot tongues — this single check resets your balance instantly",
      "Toe-to-heel roll: while traversing, roll your weight from toes to heels and back — find the midpoint where the ski feels most alive",
      "Steep entry focus: before every steeper section, drive your shins forward preemptively — don't wait for the slope to pull you back before correcting",
    ],
    prerequisites: ["parallel-turns", "athletic-stance"],
    nextSteps: ["steep-terrain", "carved-turns"],
    youtubeVideos: [
      {
        videoId: "6sdEFYz7i2g",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "HOW TO SKI STEEPER SLOPES Better Balance",
        isPrimary: true,
        teachingStyle: "Clear balance-focused breakdown with practical terrain application",
      },
      {
        videoId: "XOGbIRhi1sY",
        channel: "REI",
        channelUrl: "",
        title: "Balance Exercises for Skiing",
        isPrimary: false,
        teachingStyle: "Exercise-focused with clear on-slope demonstration",
      },
    ],
  },
  {
    id: "ski:terrain-park-basics",
    title: "Terrain Park Basics",
    slug: "terrain-park-basics",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["Park"],
    description:
      "First steps in the terrain park — safely approaching boxes and small jumps, understanding park etiquette, and building the fundamental air awareness needed to progress.",
    promise:
      "The terrain park will stop being an intimidating no-go zone and start being an exciting new part of your mountain experience.",
    timestamps: [
      { time: "0:40", label: "Park etiquette first", detail: "Wait your turn, call your drop, never stand in the landing zone — park rules exist because the consequences of ignoring them are serious" },
      { time: "1:30", label: "Approaching a box or rail", detail: "Flat, straight approach at a controlled speed — no extra turning or adjustment in the last 5 meters" },
      { time: "2:45", label: "Riding a feature", detail: "Balanced, centered stance — don't lean back or forward on a box, just stand evenly and slide across" },
      { time: "4:00", label: "Small jumps", detail: "Approach straight, ollie off the lip gently, keep skis level in the air, absorb the landing — four steps, in that order" },
    ],
    feels: [
      "A different kind of focus than groomed skiing — you're thinking feature-by-feature, not slope-by-slope",
      "The box feels slippery and foreign the first time — commit to your approach speed and don't adjust mid-feature",
      "Landing a small jump cleanly for the first time is an immediate, addictive reward",
    ],
    mistakes: [
      { mistake: "Going too fast on your first features", fix: "Slow is smooth — a controlled entry at lower speed gives you time to react and builds the correct habit" },
      { mistake: "Looking down at the feature instead of ahead", fix: "Eyes forward past the feature — looking down pulls your weight back and causes the tip catch that bucks you" },
      { mistake: "Standing in the landing zone while others are dropping in", fix: "Always clear the feature and landing zone before stopping — this is non-negotiable park etiquette" },
    ],
    drills: [
      "Ground spin practice: on a flat section, practice 180-degree pivots to get used to rotational awareness without height or speed",
      "Walk the feature: side-step up next to a small jump and study the lip angle and landing — visualizing from ground level removes mystery",
      "One feature at a time: pick one box and lap it five times before moving to anything else — mastery of one feature teaches everything",
    ],
    prerequisites: ["parallel-turns", "hockey-stop"],
    nextSteps: ["switch-skiing"],
    youtubeVideos: [
      {
        videoId: "4Hq3uvppgJ4",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Beginner Terrain Park",
        isPrimary: true,
        teachingStyle: "Safety-first with progressive feature introduction and etiquette focus",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:switch-skiing",
    title: "Switch Skiing",
    slug: "switch-skiing",
    discipline: "ski",
    difficulty: 7,
    rating: "black",
    terrain: ["Groomed"],
    description:
      "Skiing backwards — moving downhill with heels leading and tips trailing — a park skill that also significantly improves all-mountain balance and body awareness.",
    promise:
      "Switch will feel alien for exactly one session and then click — and the balance improvements will show up immediately in your forward skiing.",
    timestamps: [
      { time: "0:45", label: "Why skiing switch is hard", detail: "Your visual reference is reversed and your normal instincts fight you — understanding this is half the battle" },
      { time: "1:30", label: "The switch stance", detail: "Same athletic position as forward but your hips face the slope — look over your shoulder toward your direction of travel" },
      { time: "2:50", label: "Switch turns", detail: "The mechanics are identical to forward turns — the only difference is your orientation and where you look" },
      { time: "4:05", label: "Transitioning between switch and forward", detail: "A 180-degree hop or step links the two — practice the transition on flat terrain before a slope" },
    ],
    feels: [
      "Deeply uncomfortable for the first 30 minutes — your body is fighting every instinct",
      "The moment switch clicks, it feels like a mirror image of forward skiing — the same sensations, just backwards",
      "Your forward skiing feels noticeably more fluid after a session of switch work — the cross-training benefit is real",
    ],
    mistakes: [
      { mistake: "Looking down the slope the wrong way instead of over your shoulder", fix: "Always look in the direction you're traveling — look over the shoulder on the side your tips are pointing" },
      { mistake: "Going too fast before the switch stance is stable", fix: "Learn switch on the gentlest green run possible — speed amplifies the disorientation dramatically" },
      { mistake: "Reverting to forward skiing the moment it gets hard", fix: "Commit to staying switch for entire runs — the discomfort is temporary and progress requires time in the position" },
    ],
    drills: [
      "Flat switch glide: push off on flat terrain and just glide switch with no turning — gets the body comfortable with the orientation before adding a slope",
      "Switch traverse: traverse a gentle slope in switch stance without turning — builds edge feel and balance in the new orientation",
      "Five switch turns: aim for just five linked switch turns before returning to forward — quality over quantity at the start",
    ],
    prerequisites: ["parallel-turns", "terrain-park-basics"],
    nextSteps: ["dynamic-carving"],
    youtubeVideos: [
      {
        videoId: "eM12h0Tvv2M",
        channel: "SkiBro",
        channelUrl: "",
        title: "Tip Skiing Backwards SWITCH",
        isPrimary: true,
        teachingStyle: "Practical tip-focused with progressive backward skiing introduction",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:skiing-in-rain",
    title: "Skiing in Rain",
    slug: "skiing-in-rain",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["All"],
    description:
      "Adapting your technique, gear, and mindset for wet weather skiing — when snow gets heavy and visibility drops but the runs are yours alone.",
    promise:
      "You'll stop retreating to the lodge every time it rains and start enjoying the empty mountain that everyone else abandons.",
    timestamps: [
      { time: "0:35", label: "How rain changes snow", detail: "Wet snow is slower and heavier — it sticks to ski bases and changes how turns initiate" },
      { time: "1:20", label: "Gear adjustments", detail: "Waterproof everything, goggles over sunglasses, wax your bases before the day for better glide in wet snow" },
      { time: "2:35", label: "Technique in heavy snow", detail: "More deliberate turn initiation — wet snow resists the tip, so commit earlier and with more edge angle" },
      { time: "3:50", label: "Visibility management", detail: "Rain reduces contrast — slow down and use the same strategies as flat-light skiing" },
    ],
    feels: [
      "Quieter and more intimate than a bluebird day — rain skiing has its own meditative quality",
      "The snow feels heavier and more resistant at first — lean into turns with more commitment than on groomed hardpack",
      "Wet clothes and steamy goggles are the real challenge — proper gear eliminates 80% of the discomfort",
    ],
    mistakes: [
      { mistake: "Skiing at normal speed with reduced visibility", fix: "Slow down proportionally to visibility — treat rain like flat light, it hides the same terrain hazards" },
      { mistake: "Forgetting to wax or treat bases before a wet day", fix: "Wet snow sticks to untreated bases and turns are sluggish — a quick wax before the day pays dividends immediately" },
      { mistake: "Abandoning the mountain at the first drop", fix: "Rain often passes quickly — check the weather window, gear up properly, and enjoy the empty mountain" },
    ],
    drills: [
      "Deliberate initiation practice: on a wet day, consciously start each turn earlier than usual — feel how wet snow needs extra lead time compared to groomed hardpack",
      "Speed audit: ski a familiar run and compare your normal speed to a 30% reduced speed on the wet day — recheck your usual reference points",
      "Gear check lap: do one slow warmup run to feel how your skis and gear are performing in the wet before committing to normal terrain",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["flat-light-skiing", "spring-corn-snow"],
    youtubeVideos: [
      {
        videoId: "ZLMBViPQryY",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "Have You Risked the Rain",
        isPrimary: true,
        teachingStyle: "Practical wet-weather tips with gear and technique advice",
      },
      {
        videoId: "5WMdbLT6adE",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Skiing White Out 4 Hacks",
        isPrimary: false,
        teachingStyle: "Practical tips with real low-visibility conditions footage",
      },
    ],
  },
  {
    id: "ski:spring-corn-snow",
    title: "Spring Corn Snow",
    slug: "spring-corn-snow",
    discipline: "ski",
    difficulty: 5,
    rating: "blue",
    terrain: ["All"],
    description:
      "Reading and riding corn snow — the granular spring surface that skis unlike any other condition — by timing your runs for the optimal melt window.",
    promise:
      "Spring skiing will transform from 'the season is ending' into some of the most fun skiing of the year once you know when and how to ride it.",
    timestamps: [
      { time: "0:30", label: "What corn snow is", detail: "Freeze-thaw cycles create large rounded granules — it feels loose and forgiving, like skiing on ball bearings" },
      { time: "1:15", label: "Timing the window", detail: "Too early = hard and icy, too late = heavy mashed potato slush — the sweet spot is typically 10am-1pm on a sunny spring day" },
      { time: "2:30", label: "Technique on corn", detail: "Turns initiate easily and edges release predictably — you can be slightly more aggressive than on hardpack" },
      { time: "3:50", label: "Reading the slope aspect", detail: "South-facing slopes corn up first, north-facing later — adjust your run selection to the sun exposure" },
    ],
    feels: [
      "A satisfying crunch and give underfoot — corn grips edges with no ice chatter and no sticky wet resistance",
      "Turn initiation feels effortless compared to hardpack — the granules almost help the ski tip",
      "A lighter, more playful skiing day — corn snow invites creativity and high-speed carving equally",
    ],
    mistakes: [
      { mistake: "Arriving too early before the snow has softened", fix: "Check the sun angle on your target aspect and arrive at least an hour after it hits the slope directly" },
      { mistake: "Staying out too long as it transitions to heavy slush", fix: "When snow sticks to your bases and turns feel sluggish, the window has passed — call it a day" },
      { mistake: "Skiing corn with the same cautious technique as ice", fix: "Corn forgives edges and pressure — trust it and ski with more fluidity than you would on a hardpack morning" },
    ],
    drills: [
      "Aspect scouting: before dropping in, observe which slopes are in direct sun and which are still shaded — plan your corn window run by run",
      "Edge confidence test: make two or three turns with more edge angle than usual — feel how corn grips versus the icy morning surface from an hour ago",
      "Timed sessions: lap a south-facing run every 30 minutes from opening and feel the snow transform — builds intuitive timing for future spring days",
    ],
    prerequisites: ["parallel-turns", "speed-control"],
    nextSteps: ["skiing-in-rain"],
    youtubeVideos: [
      {
        videoId: "aBWUmcU4qo0",
        channel: "ELATE Media",
        channelUrl: "https://www.youtube.com/@ELATEmedia",
        title: "Quick Tip End of Season Slush",
        isPrimary: true,
        teachingStyle: "Practical spring-skiing tips with timing and technique focus",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:cat-track-skiing",
    title: "Cat Track Skiing",
    slug: "cat-track-skiing",
    discipline: "ski",
    difficulty: 3,
    rating: "green",
    terrain: ["Groomed"],
    description:
      "Navigating the narrow connecting trails between runs — managing momentum and position on tight paths where the usual skiing width is not available.",
    promise:
      "Cat tracks will stop being stressful bottlenecks and start being comfortable transitions that connect your skiing day seamlessly.",
    timestamps: [
      { time: "0:25", label: "The cat track challenge", detail: "Narrow width, flat to slight grade, often icy and crowded — a completely different problem than open groomed runs" },
      { time: "1:10", label: "Speed management on flats", detail: "Use skating or gentle poling to maintain momentum on flat sections — stopping is worse than moving slowly" },
      { time: "2:20", label: "Managing downhill cat tracks", detail: "Keep speed controlled with small checking turns — wide turns are impossible, so use frequent small ones" },
      { time: "3:30", label: "Awareness and positioning", detail: "Stay to the right, be visible around blind corners, give space to slower skiers ahead" },
    ],
    feels: [
      "Confined but manageable once you accept the narrowness — it's skiing, just with less room for error",
      "The flat sections require active work to keep moving — momentum is precious on a cat track",
      "A gentle patience replaces the wide open focus of groomed runs — cat tracks reward efficiency, not power",
    ],
    mistakes: [
      { mistake: "Going too fast and running out of room to turn on a narrow track", fix: "Enter cat tracks at 70% of your normal comfortable speed and control from there" },
      { mistake: "Stopping in the middle of the track and blocking others", fix: "If you need to stop, get to the widest point and step as far to the side as possible" },
      { mistake: "Pole-dragging that creates a wobble on confined paths", fix: "Hold poles tips-up and tight to your body on narrow sections — pole-catching on the bank is a common cause of falls" },
    ],
    drills: [
      "Narrow corridor drill: on an open groomed run, pick two imaginary parallel lines 3 meters apart and ski between them — simulates cat track width",
      "Small turn practice: use gentle checking turns on any flat section to get comfortable with tiny radius direction changes",
      "Skating practice: use cat track transitions as dedicated skating practice — flat sections are the perfect place to build skating confidence",
    ],
    prerequisites: ["wedge-turns", "speed-control"],
    nextSteps: ["traverse-technique", "sideslipping"],
    youtubeVideos: [
      {
        videoId: "OaAkYoDGyjs",
        channel: "Ski School App",
        channelUrl: "https://www.youtube.com/@SkiSchoolApp",
        title: "Skiing Narrow Trails Cat Tracks",
        isPrimary: true,
        teachingStyle: "Practical narrow-terrain navigation with positioning and speed tips",
      },
      {
        videoId: "T1BsQPFdt7w",
        channel: "Snowboard Addiction",
        channelUrl: "https://www.youtube.com/@snowboardaddiction",
        title: "Beginners Lesson 3.0 Snowplow Wedge Turns",
        isPrimary: false,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
    ],
  },
  {
    id: "ski:night-skiing",
    title: "Night Skiing",
    slug: "night-skiing",
    discipline: "ski",
    difficulty: 4,
    rating: "blue",
    terrain: ["Groomed"],
    description:
      "Adapting your stance, speed, and awareness for skiing under artificial lights — where shadows create unfamiliar depth cues and cold temperatures change snow texture.",
    promise:
      "Night skiing will open a completely different mountain experience — quiet runs, dramatic light, and a relationship with speed and terrain unlike anything in daylight.",
    timestamps: [
      { time: "0:35", label: "How night lighting changes perception", detail: "Artificial lights create hard shadows that hide bumps and ice — your eyes read the terrain differently than in daylight" },
      { time: "1:20", label: "Stance adjustment", detail: "Lower, more athletic stance than normal — more knee bend acts as a greater shock absorber for the terrain surprises the lighting hides" },
      { time: "2:35", label: "Cold temperature effects", detail: "Night snow is usually firmer and icier — treat it like morning hardpack and use the ice technique adjustments" },
      { time: "3:50", label: "Using the light", detail: "Ski toward the well-lit sections and slow before moving through shadow patches — let your eyes adjust before committing to speed" },
    ],
    feels: [
      "A heightened alertness compared to daytime — the altered depth perception keeps your brain more engaged",
      "The mountain feels private and quiet — fewer people, different sounds, a more contemplative experience",
      "Your feet do more of the reading than your eyes — trust the pressure feedback through your boots more than the visual information",
    ],
    mistakes: [
      { mistake: "Skiing at your normal daytime speed immediately", fix: "Do one slow warmup run to recalibrate your depth perception before building speed under lights" },
      { mistake: "Using sunglasses or clear lenses instead of appropriate night goggles", fix: "Yellow or light-amplifying lenses dramatically improve contrast under artificial light — the right lens is everything at night" },
      { mistake: "Ignoring how firm the snow is because it looks the same as afternoon", fix: "Touch the snow with your pole before dropping in — night snow is almost always firmer than the afternoon session" },
    ],
    drills: [
      "Warmup comparison lap: ski your first night run at half speed and compare the terrain surprises to your daytime memory of the same run — recalibrates your expectations",
      "Feel-the-snow traverse: traverse across the slope focusing only on boot pressure and not visual cues — builds the feel-first approach that night skiing rewards",
      "Light-to-shadow transition: ski from a well-lit section into a shadowed one deliberately — practice the slow-in-shadow habit before you need it instinctively",
    ],
    prerequisites: ["parallel-turns"],
    nextSteps: ["flat-light-skiing", "ice-technique"],
    youtubeVideos: [
      {
        videoId: "FCJh6cwN3Kw",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Fix Your Stance Better Control",
        isPrimary: true,
        teachingStyle: "Stance and control focused with practical terrain application",
      },
      {
        videoId: "5WMdbLT6adE",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Skiing White Out 4 Hacks",
        isPrimary: false,
        teachingStyle: "Practical tips for low-visibility and challenging light conditions",
      },
    ],
  },

  {
    id: "snowboard:snowboard-athletic-stance" as TechniqueId,
    title: "Snowboard Athletic Stance",
    slug: "snowboard-athletic-stance",
    discipline: "snowboard" as Discipline,
    difficulty: 1,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "The balanced, stacked posture that lets a snowboard move freely under you instead of fighting every little bump or edge change.",
    promise:
      "You'll feel centered over the board, calmer on easy terrain, and far less likely to get yanked into the back seat.",
    timestamps: [
      { time: "0:25", label: "Stack ribs over hips", detail: "Keep ankles, knees, hips, and shoulders soft and aligned instead of folding at the waist." },
      { time: "1:10", label: "Hands and gaze", detail: "Let your hands stay quiet in front of you and look where you want the board to travel." },
      { time: "2:05", label: "Flex both legs evenly", detail: "Use light ankle and knee flex so the board can absorb terrain without throwing you around." },
    ],
    feels: [
      "Like you could hop lightly in place without losing balance",
      "Pressure spread through both feet instead of hanging only on the back leg",
      "Your chest stays calm while the board moves underneath you",
    ],
    mistakes: [
      { mistake: "Locking the knees straight", fix: "Add a small athletic bend so the board can roll edge to edge smoothly." },
      { mistake: "Breaking at the waist", fix: "Stand taller through the torso and bend through ankles and knees first." },
      { mistake: "Letting the back hand drift behind you", fix: "Keep both hands relaxed and visible in your peripheral vision." },
    ],
    drills: [
      "Static stance check: strap in on flat snow and lightly bounce through both ankles until your posture feels springy rather than rigid.",
      "Garbage-bag arms: make three slow traverses keeping your hands quiet and your shoulders level.",
      "Micro-hops: do tiny two-foot hops on gentle terrain to confirm you are stacked over the middle of the board.",
    ],
    prerequisites: [] as string[],
    nextSteps: ["snowboard-flat-base-awareness", "snowboard-one-foot-riding"] as string[],
    youtubeVideos: [
      {
        videoId: "EgLrAtM2S3Q",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "Finding Good Snowboard Posture (For All Turn Types)",
        isPrimary: true,
        teachingStyle: "Calm, fundamentals-first posture coaching",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-one-foot-riding" as TechniqueId,
    title: "Snowboard One-Foot Riding",
    slug: "snowboard-one-foot-riding",
    discipline: "snowboard" as Discipline,
    difficulty: 1,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Gliding, steering, and braking with one foot strapped in so lift lines, unload ramps, and flat exits stop feeling chaotic.",
    promise:
      "You'll stop dreading cat tracks and chairlift exits because you'll know how to guide the board with one-foot control instead of panic.",
    timestamps: [
      { time: "0:20", label: "Free foot placement", detail: "Rest the free foot lightly against the stomp pad so the board tracks straight instead of fishtailing." },
      { time: "1:05", label: "Small pushes only", detail: "Use short skating pushes and return the free foot to the board quickly after each push." },
      { time: "2:15", label: "Flat board awareness", detail: "Stay mostly flat-based while gliding so the board does not unexpectedly grab an edge." },
    ],
    feels: [
      "Like a scooter more than a full snowboard turn",
      "Most of the control comes from balance and direction, not brute force",
      "Your free foot stays light and ready rather than stomping around",
    ],
    mistakes: [
      { mistake: "Pushing too hard and getting twisted open", fix: "Take smaller pushes and square yourself back over the board after each one." },
      { mistake: "Looking down at the board", fix: "Look ahead to the ramp or line you want to follow." },
      { mistake: "Trying to edge aggressively one-footed", fix: "Keep the board flatter and use subtle steering until you are stable." },
    ],
    drills: [
      "One-push glide: take one small push, place the free foot on the stomp pad, and coast as straight as possible.",
      "Scooter laps: practice skating 20–30 meters at a time on flat terrain without rushing the push cadence.",
      "Unstrap-and-return drill: repeatedly step off and back onto the board so the stomp-pad placement becomes automatic.",
    ],
    prerequisites: ["snowboard-athletic-stance"] as string[],
    nextSteps: ["snowboard-chairlift-basics", "snowboard-flat-base-awareness"] as string[],
    youtubeVideos: [
      {
        videoId: "MUB_YhSiK_o",
        channel: "SnowboardProCamp",
        channelUrl: "https://www.youtube.com/@SnowboardProCamp",
        title: "Tips for Snowboarding with One Foot",
        isPrimary: true,
        teachingStyle: "Short practical coaching for lift-line movement",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-chairlift-basics" as TechniqueId,
    title: "Snowboard Chairlift Basics",
    slug: "snowboard-chairlift-basics",
    discipline: "snowboard" as Discipline,
    difficulty: 1,
    rating: "green" as DifficultyRating,
    terrain: ["All"] as string[],
    description:
      "Loading, riding, and unloading the chairlift with one foot free and enough composure to clear the ramp cleanly.",
    promise:
      "You'll make lift rides feel routine instead of stressful, which means more energy for actual riding and fewer awkward unload crashes.",
    timestamps: [
      { time: "0:18", label: "Approach line", detail: "Shuffle into the loading zone with the board pointed straight and your free foot ready to stabilize." },
      { time: "1:08", label: "Sit and hold the board straight", detail: "As the chair scoops you up, keep the board lined with the ramp rather than letting it swing sideways." },
      { time: "2:00", label: "Stand and glide away", detail: "Stand smoothly, place the free foot on the stomp pad, and ride clear before trying to turn." },
    ],
    feels: [
      "Quiet and predictable, not rushed",
      "The board glides away flatter than you expect",
      "You leave the unload area before making any big movement",
    ],
    mistakes: [
      { mistake: "Trying to turn immediately off the chair", fix: "Ride straight for a moment first, then make your turn once you have space." },
      { mistake: "Letting the nose drift sideways while loading", fix: "Aim the board at the loading groove and keep your hips aligned with it." },
      { mistake: "Panicking if balance gets shaky", fix: "Use the free foot on the stomp pad and focus on gliding away, not on looking graceful." },
    ],
    drills: [
      "Unload rehearsal: on gentle terrain, practice standing up and gliding one-footed in a straight line for several meters.",
      "Straight-off challenge: each lift exit, count to two before turning so straight gliding becomes your default.",
      "One-foot stop zone: after unloading, practice slowing yourself under control before re-strapping.",
    ],
    prerequisites: ["snowboard-one-foot-riding"] as string[],
    nextSteps: ["snowboard-heelside-turns", "snowboard-toeside-turns"] as string[],
    youtubeVideos: [
      {
        videoId: "wl7sIvMgrqg",
        channel: "SnowboardProCamp",
        channelUrl: "https://www.youtube.com/@SnowboardProCamp",
        title: "How To Survive the Chairlift - Beginner Snowboarding",
        isPrimary: true,
        teachingStyle: "Simple lift-riding survival tips with beginner focus",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-flat-base-awareness" as TechniqueId,
    title: "Snowboard Flat-Base Awareness",
    slug: "snowboard-flat-base-awareness",
    discipline: "snowboard" as Discipline,
    difficulty: 1,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Learning when the board should stay flat and when it should gently roll to an edge so you stop surprise edge catches before they start.",
    promise:
      "You'll understand why edge catches happen and how to move across easy terrain with much less tension and random slamming.",
    timestamps: [
      { time: "0:30", label: "What causes edge catches", detail: "See how tiny unwanted edge angles grab the snow when the board should still be flatter." },
      { time: "1:20", label: "Center over the board", detail: "Keep your mass over the board instead of throwing it ahead of you during transitions." },
      { time: "2:35", label: "Roll, do not jerk", detail: "Move gradually from flat base to edge instead of snapping suddenly onto one side." },
    ],
    feels: [
      "Like the board is gliding quietly instead of twitching underneath you",
      "Transitions feel rounded, not abrupt",
      "You can sense when the edge begins to bite instead of getting surprised by it",
    ],
    mistakes: [
      { mistake: "Leaning uphill or downhill suddenly", fix: "Stay centered and let the ankles start the edge change gradually." },
      { mistake: "Trying to twist the shoulders to save balance", fix: "Use a smaller, calmer movement and keep the upper body quieter." },
      { mistake: "Rushing flat sections", fix: "Accept a little glide time and stay patient through the transition." },
    ],
    drills: [
      "Flat-glide drill: traverse a gentle slope while focusing on keeping the board flatter and your body centered.",
      "Slow-motion edge rolls: repeatedly move from flat to a tiny heel edge and back, then flat to a tiny toe edge and back.",
      "Quiet shoulders: ride easy terrain keeping the shoulders nearly still while the legs do the edge work.",
    ],
    prerequisites: ["snowboard-athletic-stance"] as string[],
    nextSteps: ["snowboard-side-slipping", "snowboard-heelside-turns"] as string[],
    youtubeVideos: [
      {
        videoId: "sVUnwWhz1x0",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "How to NOT Catch an Edge on your Snowboard",
        isPrimary: true,
        teachingStyle: "Beginner-friendly explanation of edge catches and prevention",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-side-slipping" as TechniqueId,
    title: "Snowboard Side Slipping",
    slug: "snowboard-side-slipping",
    discipline: "snowboard" as Discipline,
    difficulty: 2,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed", "Steep"] as string[],
    description:
      "Controlling a gentle slide down the hill with one edge engaged so you can manage speed and edge pressure without committing to a full turn.",
    promise:
      "You'll gain a safety skill that makes steeper beginner terrain feel less all-or-nothing and sets up better edge control for every turn after it.",
    timestamps: [
      { time: "0:40", label: "Match the board to the hill", detail: "Set the board across the slope and let a small release of edge start the slide." },
      { time: "1:25", label: "Feather the edge", detail: "Use tiny ankle changes to speed up or slow down instead of swinging the upper body." },
      { time: "2:30", label: "Stay stacked", detail: "Keep the body aligned over the edge that is holding you rather than sitting away from it." },
    ],
    feels: [
      "Like easing a handbrake on and off",
      "The board drifts while still feeling under control",
      "Small ankle inputs create big changes in speed",
    ],
    mistakes: [
      { mistake: "Dumping all the edge pressure at once", fix: "Release gradually until the board just starts to move." },
      { mistake: "Twisting the shoulders downhill", fix: "Keep the torso calm and use the ankles and knees to manage the slide." },
      { mistake: "Leaning uphill too hard", fix: "Stay balanced over the edge rather than trying to fight the hill from above it." },
    ],
    drills: [
      "Slip-start-stop: start a side slip for two board lengths, stop it, then repeat until the pressure changes feel precise.",
      "Heel and toe alternation: practice the same side-slip control on both edges in the same session.",
      "Feather ladder: aim for three speeds—very slow, medium, and faster—using only edge pressure adjustments.",
    ],
    prerequisites: ["snowboard-athletic-stance", "snowboard-flat-base-awareness"] as string[],
    nextSteps: ["snowboard-falling-leaf", "snowboard-garlands"] as string[],
    youtubeVideos: [
      {
        videoId: "J2HYpOV-nYM",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "Snowboard Edge Control Drills (RANKED EASY TO HARD)",
        isPrimary: true,
        teachingStyle: "Progressive drill ladder for edge control fundamentals",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-falling-leaf" as TechniqueId,
    title: "Snowboard Falling Leaf",
    slug: "snowboard-falling-leaf",
    discipline: "snowboard" as Discipline,
    difficulty: 2,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Sliding diagonally down the hill and back again on one edge so you learn how to direct the board before linking real turns.",
    promise:
      "You'll stop feeling trapped on a single edge and start controlling where the board drifts instead of just surviving the slide.",
    timestamps: [
      { time: "0:18", label: "Across-then-back rhythm", detail: "Let the board travel one way across the slope, then shift pressure to bring it back the other way." },
      { time: "1:12", label: "Lead with pressure, not panic", detail: "Use the front foot and subtle pressure changes to guide the board rather than flailing with the torso." },
      { time: "2:08", label: "Control the drift", detail: "Keep the speed low enough that you can reverse direction whenever you choose." },
    ],
    feels: [
      "Like windshield wipers on one edge",
      "The board moves because you guide pressure, not because you throw yourself around",
      "You should be able to pause the drift whenever you want",
    ],
    mistakes: [
      { mistake: "Letting the board point too far downhill", fix: "Keep more across-the-hill shape so the drift stays slow and recoverable." },
      { mistake: "Trying to reverse direction with the shoulders first", fix: "Initiate with front-foot pressure and let the board respond before the torso follows." },
      { mistake: "Staying too rigid through the legs", fix: "Keep ankles and knees soft enough to feather the edge continuously." },
    ],
    drills: [
      "Heel-edge leaf laps: repeat the drill until you can reverse direction three times without letting the board accelerate too much.",
      "Pause points: stop the drift on command halfway across the slope to prove you are controlling speed, not chasing it.",
      "Mirror-edge practice: once the pattern clicks on one edge, repeat it on the other edge while keeping the same tempo.",
    ],
    prerequisites: ["snowboard-side-slipping"] as string[],
    nextSteps: ["snowboard-heelside-turns", "snowboard-toeside-turns"] as string[],
    youtubeVideos: [
      {
        videoId: "H5Och_4QLyE",
        channel: "ALL aBOARD",
        channelUrl: "https://www.youtube.com/@ALLaBOARDvideos",
        title: "The Falling Leaf - Edge Practice For Beginners! How to Snowboard Step 3",
        isPrimary: true,
        teachingStyle: "Beginner drill-focused edge-control teaching",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-heelside-turns" as TechniqueId,
    title: "Snowboard Heel-Side Turns",
    slug: "snowboard-heelside-turns",
    discipline: "snowboard" as Discipline,
    difficulty: 2,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Using your heel edge to shape the board into a controlled turn while staying strong, stacked, and secure over the uphill side.",
    promise:
      "You'll feel safer and more stable on the heel edge, which gives you the confidence to control speed and commit to linked turns.",
    timestamps: [
      { time: "0:28", label: "Build a stronger heel-side shape", detail: "Create pressure through the heels while keeping the hips open enough to stay balanced." },
      { time: "1:18", label: "Look through the arc", detail: "Aim your eyes and chest where the board should finish instead of staring at the nose." },
      { time: "2:22", label: "Finish the turn fully", detail: "Let the turn complete across the hill so it naturally controls speed for you." },
    ],
    feels: [
      "Like standing taller and stronger against the hill",
      "The edge grips because your whole body is aligned behind it",
      "A finished heel-side turn automatically calms the speed down",
    ],
    mistakes: [
      { mistake: "Folding at the waist toward the snow", fix: "Stay stacked and let ankle and knee flex do more of the work." },
      { mistake: "Bailing out before the turn finishes", fix: "Hold the heel edge a little longer until the board points more across the hill." },
      { mistake: "Letting the back hand drag behind you", fix: "Keep both hands quiet and your chest more centered over the board." },
    ],
    drills: [
      "Heel-edge J turns: start in a traverse and finish one controlled heel-side turn to a stop, then repeat.",
      "Hold-the-finish drill: count one extra second at the end of each heel-side turn before changing edges.",
      "Slow linked heel exits: on easy terrain, prioritize clean heel-side finishes over making many turns quickly.",
    ],
    prerequisites: ["snowboard-falling-leaf", "snowboard-flat-base-awareness"] as string[],
    nextSteps: ["snowboard-linked-turns", "snowboard-speed-control"] as string[],
    youtubeVideos: [
      {
        videoId: "mAAIh-qwYVY",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "A STRONGER SAFER HEELSIDE",
        isPrimary: true,
        teachingStyle: "Specific heel-edge stability coaching with clear movement cues",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-toeside-turns" as TechniqueId,
    title: "Snowboard Toe-Side Turns",
    slug: "snowboard-toeside-turns",
    discipline: "snowboard" as Discipline,
    difficulty: 2,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Committing to the toe edge with enough ankle, knee, and hip movement to steer the board cleanly without getting pitched forward.",
    promise:
      "You'll stop dreading toe-side initiation and start trusting the front of the board to pull you into a real, useful turn.",
    timestamps: [
      { time: "0:24", label: "Get the ankles involved", detail: "Start the toe-side edge with ankle flex rather than only throwing the hips downhill." },
      { time: "1:10", label: "Move the body over the edge", detail: "Bring your center with the board so the toe edge can hold rather than skid away." },
      { time: "2:05", label: "Stay patient through the arc", detail: "Let the board draw the turn instead of forcing an abrupt pivot." },
    ],
    feels: [
      "Like pressing the shins into the boots while the board comes underneath you",
      "The toe edge bites more from alignment than from brute force",
      "The turn gets easier when you trust the edge long enough to finish it",
    ],
    mistakes: [
      { mistake: "Kicking the board around with the back foot", fix: "Lead the edge change from the front foot and let the board steer as one piece." },
      { mistake: "Only bending at the waist", fix: "Add ankle and knee flex so the whole lower body supports the edge." },
      { mistake: "Snapping off the edge too early", fix: "Hold the toe edge until the board clearly comes back across the hill." },
    ],
    drills: [
      "Toe-edge J turns: traverse on the toe edge and finish one deliberate toe-side arc to a stop.",
      "Three-count toe hold: after initiating the toe edge, count to three before releasing to train patience.",
      "Front-foot steering drill: exaggerate guiding the turn from the lead foot so the back foot stops kicking out.",
    ],
    prerequisites: ["snowboard-falling-leaf", "snowboard-flat-base-awareness"] as string[],
    nextSteps: ["snowboard-linked-turns", "snowboard-speed-control"] as string[],
    youtubeVideos: [
      {
        videoId: "-ingCiNILGE",
        channel: "SnowboardProCamp",
        channelUrl: "https://www.youtube.com/@SnowboardProCamp",
        title: "3 Beginner Snowboard Tips of Doing Toe Turns",
        isPrimary: true,
        teachingStyle: "Short tactical tips for beginner toe-side confidence",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-linked-turns" as TechniqueId,
    title: "Snowboard Linked Turns",
    slug: "snowboard-linked-turns",
    discipline: "snowboard" as Discipline,
    difficulty: 3,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Connecting heel-side and toe-side turns into a flowing S pattern instead of treating each turn like a separate emergency move.",
    promise:
      "You'll go from surviving one edge at a time to actually riding the slope with rhythm, direction, and repeatable control.",
    timestamps: [
      { time: "0:35", label: "Think in S turns", detail: "Each turn should finish in a way that naturally sets up the next edge change." },
      { time: "1:25", label: "Early edge change", detail: "Release the old edge before you feel trapped so transitions stay smooth instead of desperate." },
      { time: "2:30", label: "Keep the upper body calm", detail: "Let the legs and board create the shape while the torso stays balanced and quiet." },
    ],
    feels: [
      "Like one continuous line instead of stop-start movements",
      "The next turn starts before the previous one feels fully dead",
      "Your speed becomes easier to manage because the board is always doing useful work",
    ],
    mistakes: [
      { mistake: "Stalling between turns on a flat base for too long", fix: "Change edges a touch earlier while the board still has some direction." },
      { mistake: "Making the second turn only after panic sets in", fix: "Plan the next edge change while the current turn is still finishing." },
      { mistake: "Throwing the shoulders to start each turn", fix: "Use ankles, knees, and pressure change first, then let the rest follow." },
    ],
    drills: [
      "Two-turn resets: focus on making just two clean linked turns at a time, stop, then repeat.",
      "S-line tracing: visualize a wide S pattern and try to make the board follow it from top to bottom.",
      "Early-release drill: on gentle terrain, intentionally soften the old edge a fraction earlier than feels normal.",
    ],
    prerequisites: ["snowboard-heelside-turns", "snowboard-toeside-turns"] as string[],
    nextSteps: ["snowboard-speed-control", "snowboard-garlands"] as string[],
    youtubeVideos: [
      {
        videoId: "xAvBRqjyyjo",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "Snowboarding S Turns - Early Edge Change",
        isPrimary: true,
        teachingStyle: "Smooth turn-linking instruction with strong edge-change focus",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-speed-control" as TechniqueId,
    title: "Snowboard Speed Control",
    slug: "snowboard-speed-control",
    discipline: "snowboard" as Discipline,
    difficulty: 3,
    rating: "green" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Managing speed with turn shape, completion, and edge confidence instead of only trying to brake after things already feel too fast.",
    promise:
      "You'll stop feeling like the slope is in charge and start choosing a pace you can actually hold from top to bottom.",
    timestamps: [
      { time: "0:32", label: "Rounder turns slow you down", detail: "Use more across-the-hill shape instead of pointing the board straight and hoping to recover later." },
      { time: "1:22", label: "Finish every turn", detail: "A turn that actually comes across the hill sheds speed naturally before the next edge change." },
      { time: "2:18", label: "Stay ahead of the terrain", detail: "Decide on your turn size before the pitch gets intimidating, not after." },
    ],
    feels: [
      "Speed drops because the line is smarter, not because you are fighting harder",
      "Completed turns feel calmer than rushed traverses",
      "Your breathing stays more even because every turn has a plan",
    ],
    mistakes: [
      { mistake: "Letting the board run too straight between turns", fix: "Use rounder turn shapes and earlier edge changes to stay proactive." },
      { mistake: "Only trying to skid after panic sets in", fix: "Build speed control into the whole turn instead of adding it as a last-second correction." },
      { mistake: "Changing edges before the turn is finished", fix: "Let each arc do its braking job before releasing it." },
    ],
    drills: [
      "Three-shape drill: make one run with very round turns, one with medium turns, and one with narrow turns to feel the speed difference.",
      "Finish-to-the-side challenge: on easy terrain, try to bring every turn farther across the hill than usual.",
      "Breathing run: link turns at a pace where you can keep your breath steady all the way down.",
    ],
    prerequisites: ["snowboard-linked-turns"] as string[],
    nextSteps: ["snowboard-garlands", "snowboard-basic-carving"] as string[],
    youtubeVideos: [
      {
        videoId: "KXPA79lWVZw",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "From Beginner to Advanced Snowboard Turns – How to Improve Fast",
        isPrimary: true,
        teachingStyle: "Progression-focused turn coaching with useful line-management cues",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-garlands" as TechniqueId,
    title: "Snowboard Garlands",
    slug: "snowboard-garlands",
    discipline: "snowboard" as Discipline,
    difficulty: 4,
    rating: "blue" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Starting and shaping the top half of repeated turns on one edge so you can isolate pressure, steering, and confidence without committing to full direction changes.",
    promise:
      "You'll get a cleaner feel for how a turn starts, which makes full linked turns and carving progress much easier to build on purpose.",
    timestamps: [
      { time: "0:22", label: "Start the arc, then return", detail: "Let the board begin the turn, then guide it back before it crosses the fall line fully." },
      { time: "1:18", label: "Repeat on one edge", detail: "Build confidence in the top half of the turn before asking for full turn completion." },
      { time: "2:14", label: "Feel the initiation", detail: "Notice exactly which movements get the board to engage cleanly at the start of the arc." },
    ],
    feels: [
      "Like rehearsing the first half of a turn until it becomes automatic",
      "The board starts to obey subtle inputs much earlier in the arc",
      "You can isolate edge engagement without also solving the whole turn at once",
    ],
    mistakes: [
      { mistake: "Turning the exercise into full turns too soon", fix: "Come back before the board finishes the whole arc so the drill stays specific." },
      { mistake: "Rushing each repetition", fix: "Pause briefly between garlands so each start feels deliberate." },
      { mistake: "Using the upper body to yank the board downhill", fix: "Initiate with edge pressure and board movement first." },
    ],
    drills: [
      "Five-garland sets: make five clean garlands on one edge before switching to the other edge.",
      "Same-start challenge: try to make the first third of every garland feel identical in timing and pressure.",
      "Garland-to-turn combo: after several repetitions, turn the last one into a complete turn and compare the feeling.",
    ],
    prerequisites: ["snowboard-side-slipping", "snowboard-linked-turns"] as string[],
    nextSteps: ["snowboard-basic-carving", "snowboard-variable-snow-basics"] as string[],
    youtubeVideos: [
      {
        videoId: "60HUUK-zv-c",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "Snowboard Turn Exercises (RANKED WORST TO BEST)",
        isPrimary: true,
        teachingStyle: "Drill-ranking format that clarifies which turn exercises actually transfer",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-basic-carving" as TechniqueId,
    title: "Snowboard Basic Carving",
    slug: "snowboard-basic-carving",
    discipline: "snowboard" as Discipline,
    difficulty: 5,
    rating: "blue" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Progressing from skidded control into cleaner arcs where the edge does more of the turning and less of the braking.",
    promise:
      "You'll feel the board slice a cleaner path through the snow and start understanding the difference between carving and simply surviving a turn.",
    timestamps: [
      { time: "0:28", label: "Skidded vs gripped vs carved", detail: "Learn the difference so you know what to chase and what to let go of." },
      { time: "1:22", label: "Build edge angle progressively", detail: "Let the board earn more grip through the turn instead of jamming it onto edge instantly." },
      { time: "2:26", label: "Match line to skill", detail: "Use the right pitch and turn size so carving practice stays clean instead of defensive." },
    ],
    feels: [
      "Like the board is drawing the turn instead of just scraping through it",
      "More grip with less frantic correction",
      "Pressure builds smoothly as the edge engages through the arc",
    ],
    mistakes: [
      { mistake: "Trying to carve before basic turn shape is stable", fix: "Start from controlled linked turns and add cleaner edge grip gradually." },
      { mistake: "Forcing too much edge angle too early", fix: "Increase edge angle progressively through the arc." },
      { mistake: "Practicing on terrain that is too steep", fix: "Use forgiving groomers where you can focus on edge quality, not survival." },
    ],
    drills: [
      "Railroad-track attempts: on mellow groomers, aim for one or two cleaner edge-drawn arcs rather than a full run of forced carves.",
      "Progressive-build drill: start each turn gently and add edge angle later in the arc.",
      "Skid-to-grip comparison: intentionally make one skidded turn, then one cleaner gripped turn, and compare the sensation.",
    ],
    prerequisites: ["snowboard-speed-control", "snowboard-garlands"] as string[],
    nextSteps: ["snowboard-switch-basics", "snowboard-powder-basics"] as string[],
    youtubeVideos: [
      {
        videoId: "F-fePL_zvZo",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "SKIDDED GRIPPED OR CARVED TURNS?",
        isPrimary: true,
        teachingStyle: "Comparative coaching that makes carving progression less vague",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-switch-basics" as TechniqueId,
    title: "Snowboard Switch Basics",
    slug: "snowboard-switch-basics",
    discipline: "snowboard" as Discipline,
    difficulty: 5,
    rating: "blue" as DifficultyRating,
    terrain: ["Groomed"] as string[],
    description:
      "Riding in your non-dominant direction with enough posture, edge control, and patience that it becomes a real skill instead of a party trick.",
    promise:
      "You'll build a usable switch foundation without feeling like you have to go all the way back to day-one panic every run.",
    timestamps: [
      { time: "0:24", label: "Start from familiar movements", detail: "Reuse your regular riding mechanics rather than inventing a completely different posture." },
      { time: "1:18", label: "Make the slope easier", detail: "Use terrain that gives you time to think while the switch pattern is still new." },
      { time: "2:16", label: "Short, honest reps", detail: "Ride switch in manageable chunks so the quality stays high enough to learn from." },
    ],
    feels: [
      "Awkward but understandable rather than impossible",
      "Your edge control should feel simplified, not chaotic",
      "Short clean switch moments matter more than long desperate ones",
    ],
    mistakes: [
      { mistake: "Choosing terrain that is too hard", fix: "Drop the pitch and narrow the goals until you can repeat clean switch reps." },
      { mistake: "Trying to ride switch at full normal speed", fix: "Slow the whole exercise down and prioritize posture and line first." },
      { mistake: "Letting the upper body twist back to your normal direction", fix: "Commit to the new lead side and keep the torso organized around it." },
    ],
    drills: [
      "Five-second switch rule: ride switch only for a few seconds at a time, then return to normal stance and reset.",
      "Easy-run repetitions: dedicate one mellow run to repeated short switch segments instead of one long messy attempt.",
      "Mirror-turn drill: make one simple switch heel-side and one simple switch toe-side turn before reverting.",
    ],
    prerequisites: ["snowboard-linked-turns", "snowboard-basic-carving"] as string[],
    nextSteps: ["snowboard-variable-snow-basics"] as string[],
    youtubeVideos: [
      {
        videoId: "UWU233Y8yJM",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "How to Ride Switch on a Snowboard WITHOUT Going Back to Basics",
        isPrimary: true,
        teachingStyle: "Confidence-building switch progression for riders past day one",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-variable-snow-basics" as TechniqueId,
    title: "Snowboard Variable Snow Basics",
    slug: "snowboard-variable-snow-basics",
    discipline: "snowboard" as Discipline,
    difficulty: 6,
    rating: "blue" as DifficultyRating,
    terrain: ["All"] as string[],
    description:
      "Adjusting your stance, line, and edge decisions when the surface stops being predictable and starts changing from patch to patch.",
    promise:
      "You'll feel less ambushed by chopped-up or changing snow because you'll know how to soften, simplify, and stay ahead of it.",
    timestamps: [
      { time: "0:30", label: "Read the snow, not just the trail map", detail: "Notice when density, visibility, and grip change so you can adapt before the board gets weird." },
      { time: "1:24", label: "Stay softer through the legs", detail: "Use more absorption and less rigidity when the surface is inconsistent." },
      { time: "2:18", label: "Pick simpler lines", detail: "Use rounder, calmer turns while you learn what the snow is doing underneath you." },
    ],
    feels: [
      "Like the legs are acting as suspension rather than locks",
      "A little more patience gives you a lot more control",
      "You are adapting to the surface instead of arguing with it",
    ],
    mistakes: [
      { mistake: "Riding rough snow with the same rigidity as perfect groomers", fix: "Stay looser and let the board move under you more." },
      { mistake: "Keeping the line too straight when conditions get weird", fix: "Use simpler, rounder turns until the surface feels readable again." },
      { mistake: "Panicking at the first deflection", fix: "Expect some movement and focus on staying centered through it." },
    ],
    drills: [
      "Surface-scan laps: call out each snow change you feel during a run so you practice recognizing conditions early.",
      "Soft-leg drill: intentionally ride a chopped-up section with extra ankle and knee softness to feel the board settle down.",
      "Reset-line drill: when the snow changes, deliberately widen the next turn to buy back control.",
    ],
    prerequisites: ["snowboard-speed-control", "snowboard-garlands"] as string[],
    nextSteps: ["snowboard-powder-basics"] as string[],
    youtubeVideos: [
      {
        videoId: "UK4Pj4egGPI",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "Beginner Powder Tips + Changing Snow Explanation",
        isPrimary: true,
        teachingStyle: "Accessible explanation of how changing snow affects beginner technique choices",
      },
    ],
    updatedAt: "2026-04"
  },
  {
    id: "snowboard:snowboard-powder-basics" as TechniqueId,
    title: "Snowboard Powder Basics",
    slug: "snowboard-powder-basics",
    discipline: "snowboard" as Discipline,
    difficulty: 7,
    rating: "black" as DifficultyRating,
    terrain: ["Powder"] as string[],
    description:
      "Riding soft snow with enough speed, shape, and body management that the board floats instead of submarining or stalling out.",
    promise:
      "You'll stop treating powder like a mystery and start feeling how the board planes, turns, and breathes in softer snow.",
    timestamps: [
      { time: "0:25", label: "Let the board float", detail: "Carry enough momentum and trust the board to rise instead of forcing every movement." },
      { time: "1:15", label: "Use smoother turn shapes", detail: "Powder rewards patient, surfier arcs more than abrupt braking turns." },
      { time: "2:05", label: "Stay centered and adaptive", detail: "Avoid dramatic back-foot steering and let the whole board work through the snow." },
    ],
    feels: [
      "More like surfing than scraping across a groomer",
      "The board wants rhythm and flow, not panic stops",
      "Small balance changes matter a lot when the snow gets deeper",
    ],
    mistakes: [
      { mistake: "Trying to force normal groomer turns in powder", fix: "Use smoother, rounder arcs and let the snow support the board." },
      { mistake: "Overloading the back foot the entire run", fix: "Stay more centered and only bias aft when conditions truly demand it." },
      { mistake: "Going too slow into soft snow", fix: "Carry enough speed to keep the board planing and responsive." },
    ],
    drills: [
      "Powder rhythm drill: aim for consistent, surfy left-right arcs instead of stop-start corrections.",
      "Centered float drill: on shallow soft snow, focus on staying balanced over the middle of the board rather than retreating fully to the tail.",
      "Speed-preservation laps: pick lines that maintain just enough speed to keep the board lively through each section.",
    ],
    prerequisites: ["snowboard-speed-control", "snowboard-variable-snow-basics"] as string[],
    nextSteps: [] as string[],
    youtubeVideos: [
      {
        videoId: "yDSeCk04kvc",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "3 Simple Tips for Snowboarding in POWDER !!!",
        isPrimary: true,
        teachingStyle: "Compact powder-specific coaching for riders making the jump off groomers",
      },
      {
        videoId: "h86lL3Mjxn0",
        channel: "Malcolm Moore",
        channelUrl: "https://www.youtube.com/@malcolmmoore",
        title: "HOW TO RIDE POWDER / HAVE MORE FUN",
        isPrimary: false,
        teachingStyle: "Longer explanation of float, line choice, and rhythm in soft snow",
      },
    ],
    updatedAt: "2026-04"
  },
];
const techniquesById = new Map<TechniqueId, Technique>();
const techniquesBySlug = new Map<string, Technique>();

for (const technique of techniques) {
  if (techniquesById.has(technique.id)) {
    throw new Error(`Duplicate technique id found: ${technique.id}`);
  }

  if (techniquesBySlug.has(technique.slug)) {
    throw new Error(`Duplicate technique slug found: ${technique.slug}`);
  }

  if (!technique.id.startsWith(`${technique.discipline}:`)) {
    throw new Error(`Technique id must be namespaced by discipline: ${technique.id}`);
  }

  techniquesById.set(technique.id, technique);
  techniquesBySlug.set(technique.slug, technique);
}

for (const technique of techniques) {
  for (const prerequisiteSlug of technique.prerequisites) {
    const prerequisite = techniquesBySlug.get(prerequisiteSlug);

    if (!prerequisite) {
      throw new Error(`Technique prerequisite not found: ${technique.slug} -> ${prerequisiteSlug}`);
    }

    if (prerequisite.discipline !== technique.discipline) {
      throw new Error(
        `Technique prerequisite crosses disciplines: ${technique.slug} (${technique.discipline}) -> ${prerequisiteSlug} (${prerequisite.discipline})`,
      );
    }
  }

  for (const nextStepSlug of technique.nextSteps) {
    const nextStep = techniquesBySlug.get(nextStepSlug);

    if (!nextStep) {
      throw new Error(`Technique next step not found: ${technique.slug} -> ${nextStepSlug}`);
    }

    if (nextStep.discipline !== technique.discipline) {
      throw new Error(
        `Technique next step crosses disciplines: ${technique.slug} (${technique.discipline}) -> ${nextStepSlug} (${nextStep.discipline})`,
      );
    }
  }
}

export function getTechniqueById(id: TechniqueId): Technique | undefined {
  return techniquesById.get(id);
}

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return techniquesBySlug.get(slug);
}
