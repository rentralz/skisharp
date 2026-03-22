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
  prerequisites: string[];
  nextSteps: string[];
  youtubeVideos: VideoEntry[];
}

export const techniques: Technique[] = [
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
    prerequisites: ["Basic snowplow", "Snowplow turns"],
    nextSteps: ["hip-angulation", "mogul-absorption"],
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
      { mistake: "Stopping only to one side", fix: "Drill on your weaker side every session" },
      { mistake: "Sitting back during the stop", fix: "Stay centered — lean back and you lose edge control" },
      { mistake: "Rotating shoulders with the skis", fix: "Counter-rotate — shoulders stay downhill" },
    ],
    prerequisites: ["Basic snowplow"],
    nextSteps: ["parallel-turns"],
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
    prerequisites: ["parallel-turns", "hockey-stop"],
    nextSteps: ["hip-angulation"],
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
    prerequisites: ["parallel-turns"],
    nextSteps: ["mogul-absorption", "powder-floating"],
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
