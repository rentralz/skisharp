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
        videoId: "Dz4l8YGlLj0",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski as a Complete Beginner: Wedge Turns",
        isPrimary: true,
        teachingStyle: "High-energy, beginner-friendly breakdown",
      },
      {
        videoId: "xE-j8RfIv8A",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "Pizza Turns: The First Skiing Skill",
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
        videoId: "o2MNfaci4wU",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Hockey Stop on Skis",
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
        videoId: "nNZ8oUFqrTE",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Control Your Speed on Skis",
        isPrimary: true,
        teachingStyle: "Practical, drill-driven with clear explanations",
      },
      {
        videoId: "f9Ww_aAXIfc",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "Speed Management: Turn Shape and Edge Control",
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
        videoId: "YK1cPCMdwUk",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Wedge Christie: The Step to Parallel Skiing",
        isPrimary: true,
        teachingStyle: "Progressive, beginner-to-intermediate focus",
      },
      {
        videoId: "aXQH5Oze5Ik",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Bridging the Gap: Wedge Christie Drill",
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
        videoId: "pXFRxSEVfz8",
        channel: "Elate Media",
        channelUrl: "https://www.youtube.com/@ElateMedia",
        title: "How to Do Parallel Turns",
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
        videoId: "GHlxaT8wZFk",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Plant Your Poles When Skiing",
        isPrimary: true,
        teachingStyle: "Clear, drill-focused with common mistake callouts",
      },
      {
        videoId: "yPq5kQ7amIo",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Pole Timing: The Rhythm of Expert Skiing",
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
        videoId: "7dq2bvMxmHE",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Hip Angulation in Skiing Explained",
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
        videoId: "lAFJn9AQSTY",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Upper-Lower Body Separation: The Key to Expert Skiing",
        isPrimary: true,
        teachingStyle: "Technical with on-slope demos and drills",
      },
      {
        videoId: "RN0fJKADsGI",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "Body Separation Drills for Intermediate Skiers",
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
        videoId: "dFNKWkWyNZQ",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Carve on Skis: Full Breakdown",
        isPrimary: true,
        teachingStyle: "Energetic with clear visual comparison of skidding vs carving",
      },
      {
        videoId: "mXqGHxsGxco",
        channel: "Elate Media",
        channelUrl: "https://www.youtube.com/@ElateMedia",
        title: "Carved Turns: Edge Pressure and Arc Technique",
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
        videoId: "qFuBPY7Xk-Q",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski on Ice: Edge Technique for Icy Slopes",
        isPrimary: true,
        teachingStyle: "Practical tips with real icy conditions footage",
      },
      {
        videoId: "X2HqXFaJzTY",
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
        videoId: "uQKtYuVNFMI",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "Short Radius Turns: Speed Control on Steep Terrain",
        isPrimary: true,
        teachingStyle: "High-energy with on-slope drills and clear before/after",
      },
      {
        videoId: "jLDKRUfLzfw",
        channel: "Tom Gellie",
        channelUrl: "https://www.youtube.com/@TomGellie",
        title: "Quick Turn Technique: Rhythm and Timing",
        isPrimary: false,
        teachingStyle: "Technical analysis with drill progression",
      },
      {
        videoId: "ZiIbMTEBt4k",
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
        videoId: "8JFKOmPH7_4",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski Trees: Tips for Forest and Glades",
        isPrimary: true,
        teachingStyle: "Practical safety-focused with real tree terrain footage",
      },
      {
        videoId: "BVRz6mWNw24",
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
        videoId: "Bgz0V1gD3qA",
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
        videoId: "K9PKpMv_Mfg",
        channel: "Stomp It Tutorials",
        channelUrl: "https://www.youtube.com/@StompItTutorials",
        title: "How to Ski Steep Terrain: Commit and Control",
        isPrimary: true,
        teachingStyle: "Honest fear acknowledgment with practical technique fixes",
      },
      {
        videoId: "8m_HFBQimtw",
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
        videoId: "QR3qa4rPBhM",
        channel: "Ski School by Elate Media",
        channelUrl: "https://www.youtube.com/@SkiSchool",
        title: "How to Ski Powder: Float and Flow",
        isPrimary: true,
        teachingStyle: "Immersive powder footage with voiceover coaching",
      },
    ],
  },
];

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return techniques.find((t) => t.slug === slug);
}
