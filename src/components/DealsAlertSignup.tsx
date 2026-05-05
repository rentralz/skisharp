"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  submitDealAlertSignup,
  type DealAlertSignupState,
} from "@/app/deals/actions";
import { trackEvent } from "@/lib/analytics";

const INITIAL_STATE: DealAlertSignupState = {
  status: "idle",
};

const INTEREST_OPTIONS = [
  { value: "all_ski_deals", label: "All ski deals" },
  { value: "jackets_layers", label: "Jackets, pants, and layers" },
  { value: "skis_boots", label: "Skis, boots, and bindings" },
  { value: "goggles_accessories", label: "Goggles, helmets, and accessories" },
  { value: "passes_travel", label: "Passes, travel, and trip extras" },
] as const;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-[#201d1a] px-5 py-3 text-sm font-semibold text-white transition-transform transition-colors hover:-translate-y-0.5 hover:bg-[#342f2a] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Joining…" : "Get deal alerts"}
    </button>
  );
}

export default function DealsAlertSignup({ enabled }: { enabled: boolean }) {
  const [state, formAction] = useActionState(submitDealAlertSignup, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);
  const lastTrackedResult = useRef<string>("");

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }

    if (state.status === "idle") {
      return;
    }

    const trackingKey = `${state.status}:${state.message ?? ""}`;
    if (trackingKey === lastTrackedResult.current) {
      return;
    }

    lastTrackedResult.current = trackingKey;
    trackEvent("deals_alert_signup_result", {
      signup_status: state.status,
      has_email_error: Boolean(state.fieldErrors?.email),
      has_interest_error: Boolean(state.fieldErrors?.interest),
    });
  }, [state]);

  if (!enabled) {
    return (
      <div className="rounded-[28px] border border-[#eadfd6] bg-white p-6 shadow-[0_12px_30px_rgba(92,68,43,0.05)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a56f43]">
          Deal alerts coming soon
        </p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-[#201d1a]">
          This is where the inbox signup will live.
        </h3>
        <p className="mt-4 text-sm leading-7 text-[#6b635b] sm:text-base">
          Once the email destination is connected, shoppers will be able to subscribe here for
          the best ski deals without refreshing the page manually.
        </p>
        <div className="mt-5 rounded-2xl border border-dashed border-[#d9c6b5] bg-[#fcfaf8] px-4 py-3 text-sm text-[#7a6e63]">
          For now, the featured community picks and category shortcuts above remain the fastest
          way to browse current offers.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[#eadfd6] bg-white p-6 shadow-[0_12px_30px_rgba(92,68,43,0.05)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a56f43]">
        Email signup
      </p>
      <h3 className="mt-3 text-2xl font-black tracking-tight text-[#201d1a]">
        Get the best deals before sizes disappear.
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#6b635b] sm:text-base">
        Best picks only — no spammy daily blast. Expect a short email when something is actually
        worth opening.
      </p>

      <form
        ref={formRef}
        action={formAction}
        className="mt-6 space-y-4"
        onSubmitCapture={() => {
          trackEvent("deals_alert_signup_attempt", {
            form_location: "deals_page",
            form_variant: "email_capture",
          });
        }}
      >
        <div>
          <label htmlFor="deals-alert-email" className="mb-2 block text-sm font-semibold text-[#201d1a]">
            Email
          </label>
          <input
            id="deals-alert-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="w-full rounded-2xl border border-[#d9c6b5] bg-[#fffdfb] px-4 py-3 text-sm text-[#201d1a] outline-none transition-colors placeholder:text-[#9d8f83] focus:border-[#a56f43]"
          />
          {state.fieldErrors?.email ? (
            <p className="mt-2 text-sm text-[#b24d2b]">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="deals-alert-interest" className="mb-2 block text-sm font-semibold text-[#201d1a]">
            Most interested in
          </label>
          <select
            id="deals-alert-interest"
            name="interest"
            defaultValue="all_ski_deals"
            className="w-full rounded-2xl border border-[#d9c6b5] bg-[#fffdfb] px-4 py-3 text-sm text-[#201d1a] outline-none transition-colors focus:border-[#a56f43]"
          >
            {INTEREST_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {state.fieldErrors?.interest ? (
            <p className="mt-2 text-sm text-[#b24d2b]">{state.fieldErrors.interest}</p>
          ) : null}
        </div>

        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

        <SubmitButton />

        <p className="text-xs leading-6 text-[#8a7a6d]">
          By joining, you’re asking TurnLab to send ski-deal alerts and occasional related gear
          recommendations. Unsubscribe any time.
        </p>

        {state.message ? (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              state.status === "success"
                ? "bg-[#eff8f1] text-[#2f6f44]"
                : state.status === "disabled"
                  ? "bg-[#fff5eb] text-[#8a5a2f]"
                  : "bg-[#fff1ee] text-[#b24d2b]"
            }`}
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
