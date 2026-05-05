"use server";

import { appendFile } from "node:fs/promises";
import { headers } from "next/headers";

const DEFAULT_INTEREST = "all_ski_deals";
const VALID_INTERESTS = new Set([
  DEFAULT_INTEREST,
  "jackets_layers",
  "skis_boots",
  "goggles_accessories",
  "passes_travel",
]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export type DealAlertSignupState = {
  status: "idle" | "success" | "error" | "disabled";
  message?: string;
  fieldErrors?: {
    email?: string;
    interest?: string;
  };
};

async function writeLocalLead(payload: Record<string, string>) {
  await appendFile("/tmp/turnlab-deal-alert-signups.jsonl", `${JSON.stringify(payload)}\n`, "utf8");
}

export async function submitDealAlertSignup(
  _prevState: DealAlertSignupState,
  formData: FormData,
): Promise<DealAlertSignupState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const interest = String(formData.get("interest") ?? DEFAULT_INTEREST).trim() || DEFAULT_INTEREST;
  const company = String(formData.get("company") ?? "").trim();

  if (company) {
    return {
      status: "success",
      message: "You’re in. We’ll send the best ski deals when they’re worth opening.",
    };
  }

  const fieldErrors: DealAlertSignupState["fieldErrors"] = {};

  if (!email || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email so we know where to send the alerts.";
  }

  if (!VALID_INTERESTS.has(interest)) {
    fieldErrors.interest = "Choose one of the listed gear interests.";
  }

  if (fieldErrors.email || fieldErrors.interest) {
    return {
      status: "error",
      message: "Please fix the highlighted field and try again.",
      fieldErrors,
    };
  }

  const headersList = await headers();
  const payload = {
    email,
    interest,
    source: "deals_page",
    path: "/deals",
    submittedAt: new Date().toISOString(),
    referrer: headersList.get("referer") ?? "",
    userAgent: headersList.get("user-agent") ?? "",
  };

  try {
    if (process.env.DEALS_ALERTS_WEBHOOK_URL) {
      const webhookHeaders: Record<string, string> = {
        "content-type": "application/json",
      };

      if (process.env.DEALS_ALERTS_WEBHOOK_SECRET) {
        webhookHeaders.authorization = `Bearer ${process.env.DEALS_ALERTS_WEBHOOK_SECRET}`;
      }

      const response = await fetch(process.env.DEALS_ALERTS_WEBHOOK_URL, {
        method: "POST",
        headers: webhookHeaders,
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }
    } else if (!process.env.VERCEL) {
      await writeLocalLead(payload);
    } else {
      return {
        status: "disabled",
        message: "Deal alerts are not live yet, but the page will show them here once signups are connected.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Couldn’t save your signup just yet. Please try again in a moment.",
    };
  }

  return {
    status: "success",
    message: "You’re in. We’ll send the best ski deals when they’re worth opening.",
  };
}
