"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import { getTechniqueBySlug } from "@/data/techniques";
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

  const totalSteps = (track?.questions.length ?? 0) + 1;
  const currentStep = selectedDiscipline ? currentQuestionIndex + 2 : 1;
  const progress = track ? Math.round(((currentStep - 1) / totalSteps) * 100) : 0;
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

      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#aaa] font-medium">
                Step {currentStep} of {totalSteps}
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
          <>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B4835A] mb-3">
              Skill quiz
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#222] mb-3">
              Which discipline do you want this quiz to assess?
            </h1>
            <p className="text-[#646464] mb-8">
              Choose ski or snowboard first so we can send you through the right questions and technique recommendations.
            </p>

            <div className="space-y-3">
              {QUIZ_DISCIPLINE_OPTIONS.map((option, index) => (
                <button
                  key={option.discipline}
                  onClick={() => handleDisciplineSelect(option.discipline)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#B4835A] hover:bg-[#F5F2EF]/30 transition-all text-sm text-[#222] font-medium group"
                >
                  <span className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-[#B4835A] group-hover:text-white text-[#646464] text-xs font-bold flex items-center justify-center transition-colors shrink-0 mt-0.5">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>
                      <span className="block text-base text-[#222]">{option.label}</span>
                      <span className="block text-xs text-[#777] mt-1 leading-5">{option.detail}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </>
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
