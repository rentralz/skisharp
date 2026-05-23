"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import { getTechniqueBySlug, techniques } from "@/data/techniques";
import {
  QUIZ_DISCIPLINE_OPTIONS,
  getQuizTrack,
  type QuestionOption,
  type SkillResult,
} from "@/data/quiz";
import { useDisciplinePreference } from "@/hooks/useDisciplinePreference";
import { trackEvent } from "@/lib/analytics";

function DifficultyDot({ rating }: { rating: SkillResult["rating"] }) {
  const dotClassName =
    rating === "green"
      ? "bg-emerald-500"
      : rating === "blue"
        ? "bg-blue-500"
        : rating === "black"
          ? "bg-gray-800"
          : "bg-purple-600";

  return <span className={`w-2 h-2 rounded-full shrink-0 ${dotClassName}`} />;
}

const QUIZ_TRACK_SUMMARY: Record<Discipline, { questionCount: number; techniqueCount: number }> = {
  ski: {
    questionCount: getQuizTrack("ski").questions.length,
    techniqueCount: techniques.filter((technique) => technique.discipline === "ski").length,
  },
  snowboard: {
    questionCount: getQuizTrack("snowboard").questions.length,
    techniqueCount: techniques.filter((technique) => technique.discipline === "snowboard").length,
  },
};

const QUIZ_START_PROMISES = [
  {
    label: "Quick read",
    value: `${QUIZ_TRACK_SUMMARY.ski.questionCount}–${QUIZ_TRACK_SUMMARY.snowboard.questionCount} prompts`,
    detail: "Short enough to finish before overthinking, but specific enough to avoid generic advice.",
  },
  {
    label: "Useful result",
    value: "Level + next goal",
    detail: "See where you are now and what to practice next instead of getting a vague beginner/intermediate label.",
  },
  {
    label: "Curated follow-through",
    value: `${techniques.length} mapped techniques`,
    detail: "Jump straight into the right TurnLab techniques after the result — no YouTube wandering required.",
  },
];

const QUIZ_START_OUTCOMES = [
  "A discipline-specific level based on how you actually ride right now",
  "Hand-picked techniques that match your current level and next breakthrough",
  "A cleaner first click into the library instead of guessing where to start",
];

export default function QuizPage() {
  const { setDiscipline: setPreferredDiscipline } = useDisciplinePreference();
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<SkillResult | null>(null);

  const track = useMemo(
    () => (selectedDiscipline ? getQuizTrack(selectedDiscipline) : null),
    [selectedDiscipline],
  );

  const totalSteps = track?.questions.length ?? 0;
  const currentStep = track ? currentQuestionIndex + 1 : 0;
  const progress = track && totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;
  const activeQuestion = track?.questions[currentQuestionIndex];
  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);

  const handleDisciplineSelect = (discipline: Discipline) => {
    trackEvent("quiz_start", {
      discipline,
      total_questions: getQuizTrack(discipline).questions.length,
    });
    setSelectedDiscipline(discipline);
    setPreferredDiscipline(discipline);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (option: QuestionOption) => {
    if (!track || !activeQuestion || !selectedDiscipline) {
      return;
    }

    trackEvent("quiz_answer_select", {
      discipline: selectedDiscipline,
      question_id: activeQuestion.id,
      question_index: currentQuestionIndex + 1,
      answer_label: option.label,
      answer_points: option.points,
    });

    const nextAnswers = [...answers, option.points];

    if (currentQuestionIndex < track.questions.length - 1) {
      setAnswers(nextAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    const score = nextAnswers.reduce((sum, answer) => sum + answer, 0);
    const nextResult = track.getResult(score);
    trackEvent("quiz_complete", {
      discipline: selectedDiscipline,
      score,
      result_level: nextResult.level,
      result_rating: nextResult.rating,
      result_title: nextResult.title,
      recommended_techniques: nextResult.techniques.length,
    });
    setAnswers(nextAnswers);
    setResult(nextResult);
  };

  const restart = () => {
    trackEvent("quiz_restart", {
      discipline: selectedDiscipline ?? "unknown",
      had_result: Boolean(result),
    });
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const changeDiscipline = () => {
    trackEvent("quiz_change_discipline", {
      previous_discipline: selectedDiscipline ?? "unknown",
      had_result: Boolean(result),
    });
    setSelectedDiscipline(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const disciplineInfo = selectedDiscipline ? DISCIPLINES[selectedDiscipline] : null;

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />

      <main
        id="main-content"
        className={`${!selectedDiscipline ? "max-w-5xl" : "max-w-2xl"} mx-auto px-4 sm:px-6 lg:px-8 py-12`}
      >
        {selectedDiscipline && !result && track && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#aaa] font-medium">
                Question {currentStep} of {totalSteps}
              </span>
              <span className="text-xs text-[#aaa]">{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B4835A] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {!selectedDiscipline ? (
          <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,400px)] lg:items-start">
            <div>
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#ead9ca] bg-[#f9f3ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b6a41]">
                <span>Skill quiz</span>
                <span className="text-[#d1b59d]">•</span>
                <span>About 1 minute</span>
                <span className="text-[#d1b59d]">•</span>
                <span>No signup</span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-[#222] sm:text-4xl md:text-[2.8rem] md:leading-[1.1]">
                Find your level fast — then get the right technique to practice next.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#554d46] sm:text-lg">
                Answer a short ski or snowboard check and TurnLab will point you toward the best next move,
                not just hand you a vague label. You&apos;ll finish with a level, a next goal, and curated
                technique recommendations that match how you actually ride right now.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {QUIZ_START_PROMISES.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#ebe3dc] bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b6a41]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[#201d1a]">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6c6259]">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#B4835A]">
                  Choose your discipline to start
                </p>

                <div className="space-y-3">
                  {QUIZ_DISCIPLINE_OPTIONS.map((option, index) => {
                    const summary = QUIZ_TRACK_SUMMARY[option.discipline];

                    return (
                      <button
                        key={option.discipline}
                        onClick={() => handleDisciplineSelect(option.discipline)}
                        className="w-full rounded-2xl border border-gray-200 bg-white p-5 text-left text-sm font-medium text-[#222] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#B4835A] hover:bg-[#F5F2EF]/40 hover:shadow-md group"
                      >
                        <span className="flex items-start gap-4">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-[#646464] transition-colors group-hover:bg-[#B4835A] group-hover:text-white">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="block text-lg text-[#222]">{option.label}</span>
                              <span className="rounded-full bg-[#f5efe8] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b6a41]">
                                {summary.questionCount} quick questions
                              </span>
                            </span>
                            <span className="mt-2 block text-sm leading-6 text-[#544b44]">{option.detail}</span>
                            <span className="mt-3 flex flex-wrap gap-2 text-xs text-[#5f564f]">
                              <span className="rounded-full border border-[#eadfd3] px-2.5 py-1">
                                {summary.techniqueCount} curated techniques behind the result
                              </span>
                              <span className="rounded-full border border-[#eadfd3] px-2.5 py-1">
                                Instant level + next-goal summary
                              </span>
                            </span>
                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#9b6a41]">
                              Start {option.label.toLowerCase()} quiz
                              <span aria-hidden="true">→</span>
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#eadfd3] bg-[#f8f4ef] p-6 shadow-sm lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b6a41]">What you get</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#201d1a]">
                Not just a label — a clean next move for your next day on snow.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#4f463f]">
                The quiz is designed to reduce guesswork fast. Finish it once, then jump straight into the
                techniques that match your real level instead of randomly sampling videos.
              </p>

              <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#efe4d9]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b6a41]">
                  After your result
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4f463f]">
                  {QUIZ_START_OUTCOMES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#201d1a] text-[10px] font-bold text-white">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#efe4d9]">
                  <p className="text-2xl font-bold text-[#201d1a]">{techniques.length}</p>
                  <p className="mt-1 text-sm leading-5 text-[#6f6258]">Curated techniques mapped into TurnLab progressions</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#efe4d9]">
                  <p className="text-2xl font-bold text-[#201d1a]">2</p>
                  <p className="mt-1 text-sm leading-5 text-[#6f6258]">Discipline-specific quiz paths with tailored results</p>
                </div>
              </div>
            </div>
          </section>
        ) : result || !track || !activeQuestion ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B4835A] mb-2">
                  {disciplineInfo?.label} profile
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#222] mb-2">
                  You&apos;re a Level {result?.level}: {result?.title}
                </h1>
                <p className="text-[#646464] max-w-md">{result?.description}</p>
              </div>
              <p className="text-5xl">{result?.emoji}</p>
            </div>

            {result && track && selectedDiscipline && disciplineInfo && (
              <>
                <div className={`rounded-2xl border p-6 mb-8 ${result.bgColor}`}>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h2 className="font-bold text-[#222]">Your {disciplineInfo.label} Profile</h2>
                    <span className={`text-sm font-bold ${result.color}`}>
                      Score: {totalScore}/{track.questions.length * 4}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { label: "Level", value: result.level.toString() },
                      { label: "Rating", value: result.rating.replace("double-", "2×") },
                      {
                        label: "Next Goal",
                        value: `${result.nextGoal.split(" ").slice(0, 3).join(" ")}...`,
                      },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="text-lg font-bold text-[#222]">{stat.value}</p>
                        <p className="text-xs text-[#888]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#222] mb-4">Your Recommended Techniques</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.techniques.map((slug) => {
                      const technique = getTechniqueBySlug(slug);
                      const label = technique?.title ?? slug.replace(/-/g, " ");

                      return (
                        <TrackedLink
                          key={slug}
                          href={`/techniques/${slug}?discipline=${selectedDiscipline}`}
                          linkKind="next"
                          eventName="quiz_result_technique_click"
                          eventParams={{
                            discipline: selectedDiscipline,
                            result_rating: result.rating,
                            result_level: result.level,
                            technique_slug: slug,
                            technique_title: label,
                          }}
                          className="group flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#B4835A] hover:shadow-sm transition-all"
                        >
                          <DifficultyDot rating={result.rating} />
                          <span className="text-sm text-[#222] group-hover:text-[#B4835A] transition-colors font-medium">
                            {label}
                          </span>
                          <span className="text-[#aaa] text-xs ml-auto">→</span>
                        </TrackedLink>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl bg-[#F5F2EF] p-5 mb-8">
                  <h3 className="text-sm font-bold text-[#B4835A] uppercase tracking-wide mb-2">
                    🎯 Your Next Goal
                  </h3>
                  <p className="text-[#222] text-sm">{result.nextGoal}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <TrackedLink
                    href={`/techniques?discipline=${selectedDiscipline}&rating=${result.rating}`}
                    linkKind="next"
                    eventName="quiz_result_browse_cta_click"
                    eventParams={{
                      discipline: selectedDiscipline,
                      result_rating: result.rating,
                      result_level: result.level,
                    }}
                    className="bg-[#222] hover:bg-[#333] text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
                  >
                    Browse {disciplineInfo.label.toLowerCase()} techniques →
                  </TrackedLink>
                  <button
                    onClick={changeDiscipline}
                    className="bg-white border border-gray-200 hover:border-gray-300 text-[#222] font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
                  >
                    Switch discipline
                  </button>
                  <button
                    onClick={restart}
                    className="bg-gray-100 hover:bg-gray-200 text-[#222] font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B4835A] mb-2">
                  {disciplineInfo?.label} assessment
                </p>
                <p className="text-[#646464] text-sm">
                  We&apos;ll tailor your result for {disciplineInfo?.pluralLabel.toLowerCase()}.
                </p>
              </div>
              <button
                onClick={changeDiscipline}
                className="text-sm font-medium text-[#B4835A] hover:text-[#946848] transition-colors"
              >
                Change discipline
              </button>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#222] mb-8">{activeQuestion.text}</h1>

            <div className="space-y-3">
              {activeQuestion.options.map((option, index) => (
                <button
                  key={`${activeQuestion.id}-${option.label}`}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#B4835A] hover:bg-[#F5F2EF]/30 transition-all text-sm text-[#222] font-medium group"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-[#B4835A] group-hover:text-white text-[#646464] text-xs font-bold flex items-center justify-center transition-colors">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
