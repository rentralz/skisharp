export type DifficultyRating = "green" | "blue" | "black" | "double-black";

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
  id: string;
  title: string;
  slug: string;
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
}

export const techniques: Technique[] = [
  {
    id: "wedge-turns",
    title: "Wedge Turns",
    slug: "wedge-turns",
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
  },
  {
    id: "hockey-stop",
    title: "Hockey Stop",
    slug: "hockey-stop",
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
  },
  {
    id: "speed-control",
    title: "Speed Control",
    slug: "speed-control",
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
  },
  {
    id: "wedge-christie",
    title: "Wedge Christie",
    slug: "wedge-christie",
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
    id: "parallel-turns",
    title: "Parallel Turns",
    slug: "parallel-turns",
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
  },
  {
    id: "pole-planting",
    title: "Pole Planting",
    slug: "pole-planting",
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
  },
  {
    id: "hip-angulation",
    title: "Hip Angulation",
    slug: "hip-angulation",
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
    id: "upper-lower-separation",
    title: "Upper-Lower Body Separation",
    slug: "upper-lower-separation",
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
    id: "carved-turns",
    title: "Carved Turns",
    slug: "carved-turns",
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
    id: "ice-technique",
    title: "Ice Technique",
    slug: "ice-technique",
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
    id: "short-radius-turns",
    title: "Short Radius Turns",
    slug: "short-radius-turns",
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
    id: "tree-skiing",
    title: "Tree Skiing",
    slug: "tree-skiing",
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
    id: "mogul-absorption",
    title: "Mogul Absorption",
    slug: "mogul-absorption",
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
    id: "steep-terrain",
    title: "Steep Terrain",
    slug: "steep-terrain",
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
    id: "powder-floating",
    title: "Powder Floating",
    slug: "powder-floating",
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
    id: "snowplow-stop",
    title: "Snowplow Stop",
    slug: "snowplow-stop",
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
    id: "stem-christie",
    title: "Stem Christie",
    slug: "stem-christie",
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
    id: "balance-drills",
    title: "Balance Drills",
    slug: "balance-drills",
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
    id: "edge-control-basics",
    title: "Edge Control Basics",
    slug: "edge-control-basics",
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
    id: "weight-transfer",
    title: "Weight Transfer",
    slug: "weight-transfer",
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
    id: "fall-line-awareness",
    title: "Fall Line Awareness",
    slug: "fall-line-awareness",
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
    id: "sideslipping",
    title: "Sideslipping",
    slug: "sideslipping",
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
    id: "kick-turn",
    title: "Kick Turn",
    slug: "kick-turn",
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
    id: "getting-up",
    title: "Getting Up After a Fall",
    slug: "getting-up",
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
    id: "chairlift-basics",
    title: "Chairlift Basics",
    slug: "chairlift-basics",
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
    id: "athletic-stance",
    title: "Athletic Stance",
    slug: "athletic-stance",
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
    id: "dynamic-carving",
    title: "Dynamic Carving",
    slug: "dynamic-carving",
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
    id: "counter-rotation",
    title: "Counter-Rotation",
    slug: "counter-rotation",
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
    id: "garland-exercise",
    title: "Garland Exercise",
    slug: "garland-exercise",
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
    id: "traverse-technique",
    title: "Traverse Technique",
    slug: "traverse-technique",
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
];

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return techniques.find((t) => t.slug === slug);
}
