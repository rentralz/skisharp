"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Question {
  id: string;
  text: string;
  options: { label: string; points: number; detail?: string }[];
}

const QUESTIONS: Question[] = [
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
    text: "How do you currently turn?",
    options: [
      { label: "I can't really turn yet", points: 0 },
      { label: "Snowplow / pizza turns", points: 1 },
      { label: "Skidded parallel turns (skis mostly together)", points: 2 },
      { label: "Carved turns with edge grip", points: 3 },
      { label: "Dynamic short turns at speed", points: 4 },
    ],
  },
  {
    id: "stopping",
    text: "How do you stop?",
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

interface SkillResult {
  level: number;
  title: string;
  emoji: string;
  color: string;
  bgColor: string;
  rating: string;
  description: string;
  techniques: string[];
  nextGoal: string;
}

function getResult(score: number): SkillResult {
  if (score <= 3) {
    return {
      level: 1,
      title: "First Timer",
      emoji: "🟢",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      rating: "green",
      description: "You're at the very beginning — and that's exciting! Focus on the fundamentals: how to stop, how to turn, and how to ride the chairlift without drama.",
      techniques: ["athletic-stance", "getting-up", "chairlift-basics", "wedge-turns", "snowplow-stop", "pizza-to-french-fries"],
      nextGoal: "Master the snowplow stop and linked wedge turns on green terrain",
    };
  } else if (score <= 8) {
    return {
      level: 2,
      title: "Progressing Beginner",
      emoji: "🟢",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      rating: "green",
      description: "You can get down a green run but you're still relying on the snowplow. Time to start bringing those skis parallel and building real edge control.",
      techniques: ["hockey-stop", "speed-control", "stem-christie", "balance-drills", "sideslipping", "linked-turns"],
      nextGoal: "Transition from wedge turns to parallel turns on blue terrain",
    };
  } else if (score <= 13) {
    return {
      level: 3,
      title: "Intermediate Cruiser",
      emoji: "🔵",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      rating: "blue",
      description: "You can ski blues in parallel and stop with a hockey stop. Now it's about refining your technique — edge control, weight transfer, and turn shape.",
      techniques: ["parallel-turns", "edge-control-basics", "weight-transfer", "pole-planting", "fore-aft-balance", "garland-exercise"],
      nextGoal: "Develop clean carved turns and confident pole planting",
    };
  } else if (score <= 18) {
    return {
      level: 4,
      title: "Advanced Skier",
      emoji: "⬛",
      color: "text-gray-800",
      bgColor: "bg-gray-100 border-gray-300",
      rating: "black",
      description: "You handle black runs and varied conditions. Time to push into dynamic carving, mogul absorption, and off-piste technique.",
      techniques: ["carved-turns", "dynamic-carving", "hip-angulation", "short-turns", "mogul-absorption", "steep-skiing"],
      nextGoal: "Master dynamic short turns and mogul line selection",
    };
  } else {
    return {
      level: 5,
      title: "Expert / All-Mountain",
      emoji: "⬛⬛",
      color: "text-purple-700",
      bgColor: "bg-purple-50 border-purple-200",
      rating: "double-black",
      description: "You ski everything the mountain throws at you. Your focus is on mastery — perfecting technique in all conditions and terrains.",
      techniques: ["powder-floating", "tree-skiing", "retraction-turns", "step-turns", "hop-turns", "steep-terrain"],
      nextGoal: "Refine technique in extreme conditions — deep powder, steep chutes, variable snow",
    };
  }
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<SkillResult | null>(null);

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    if (currentQ < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      setAnswers(newAnswers);
      setResult(getResult(total));
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />

      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#aaa] font-medium">
                  Question {currentQ + 1} of {QUESTIONS.length}
                </span>
                <span className="text-xs text-[#aaa]">
                  {Math.round(((currentQ) / QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B4835A] rounded-full transition-all duration-300"
                  style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#222] mb-8">
              {QUESTIONS[currentQ].text}
            </h1>

            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.points)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#B4835A] hover:bg-[#F5F2EF]/30 transition-all text-sm text-[#222] font-medium group"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-[#B4835A] group-hover:text-white text-[#646464] text-xs font-bold flex items-center justify-center transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Results */
          <div>
            <div className="text-center mb-8">
              <p className="text-5xl mb-4">{result.emoji}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#222] mb-2">
                You&apos;re a Level {result.level}: {result.title}
              </h1>
              <p className="text-[#646464] max-w-md mx-auto">{result.description}</p>
            </div>

            {/* Score card */}
            <div className={`rounded-2xl border p-6 mb-8 ${result.bgColor}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#222]">Your Ski Profile</h2>
                <span className={`text-sm font-bold ${result.color}`}>
                  Score: {answers.reduce((a, b) => a + b, 0)}/{QUESTIONS.length * 4}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Level", value: result.level.toString() },
                  { label: "Rating", value: result.rating.replace("double-", "2×") },
                  { label: "Next Goal", value: result.nextGoal.split(" ").slice(0, 3).join(" ") + "..." },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-lg font-bold text-[#222]">{stat.value}</p>
                    <p className="text-xs text-[#888]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended techniques */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#222] mb-4">Your Recommended Techniques</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.techniques.map((slug) => (
                  <Link
                    key={slug}
                    href={`/techniques/${slug}`}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#B4835A] hover:shadow-sm transition-all"
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      result.rating === "green" ? "bg-emerald-500" :
                      result.rating === "blue" ? "bg-blue-500" :
                      result.rating === "black" ? "bg-gray-800" : "bg-purple-600"
                    }`} />
                    <span className="text-sm text-[#222] group-hover:text-[#B4835A] transition-colors font-medium capitalize">
                      {slug.replace(/-/g, " ")}
                    </span>
                    <span className="text-[#aaa] text-xs ml-auto">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Next goal */}
            <div className="rounded-xl bg-[#F5F2EF] p-5 mb-8">
              <h3 className="text-sm font-bold text-[#B4835A] uppercase tracking-wide mb-2">🎯 Your Next Goal</h3>
              <p className="text-[#222] text-sm">{result.nextGoal}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/techniques?rating=${result.rating}`}
                className="bg-[#222] hover:bg-[#333] text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
              >
                Browse {result.title} Techniques →
              </Link>
              <button
                onClick={restart}
                className="bg-gray-100 hover:bg-gray-200 text-[#222] font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
