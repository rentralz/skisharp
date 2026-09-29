#!/usr/bin/env python3
"""
Fetch Google Search Console data and report SEO opportunities.
Designed to run as a cron job.
"""

import os
import sys
import json
import pickle
from pathlib import Path
from datetime import datetime, timedelta
from collections import defaultdict

from google.auth.exceptions import RefreshError
from google.auth.transport.requests import Request
from google.oauth2 import service_account
from googleapiclient.discovery import build

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
SITE_URL = "https://turnlab.co/"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDENTIALS_DIR = Path.home() / ".config" / "turnlab" / "gsc"
TOKEN_PATH = CREDENTIALS_DIR / "token.pickle"
CLIENT_SECRETS_PATH = CREDENTIALS_DIR / "client_secrets.json"
# Preferred for cron: a service-account key never needs browser re-consent.
# Add the service account's email as a user on the Search Console property.
SERVICE_ACCOUNT_PATH = CREDENTIALS_DIR / "service_account.json"

DAYS_SHORT = 7    # recent trend
DAYS_LONG = 28    # broader view


def print_setup_instructions():
    print("Setup options:", file=sys.stderr)
    print("A) Service account (recommended for cron, never expires):", file=sys.stderr)
    print("   1. console.cloud.google.com > IAM & Admin > Service Accounts > Create", file=sys.stderr)
    print("   2. Keys > Add key > JSON, save it to:", file=sys.stderr)
    print(f"      {SERVICE_ACCOUNT_PATH}", file=sys.stderr)
    print("   3. search.google.com/search-console > Settings > Users and permissions >", file=sys.stderr)
    print("      Add user: the service account email, permission Restricted", file=sys.stderr)
    print("B) OAuth user token:", file=sys.stderr)
    print("   1. Google Auth Platform > Audience: set publishing status to 'In production'", file=sys.stderr)
    print("      (apps left in 'Testing' get refresh tokens that expire after 7 days)", file=sys.stderr)
    print("   2. Run: python3 scripts/gsc-auth-manual.py", file=sys.stderr)


def get_credentials():
    """Load service-account credentials, or load/refresh the OAuth token."""
    if SERVICE_ACCOUNT_PATH.exists():
        return service_account.Credentials.from_service_account_file(
            str(SERVICE_ACCOUNT_PATH), scopes=SCOPES
        )

    if not TOKEN_PATH.exists():
        print("ERROR: No Search Console credentials found.", file=sys.stderr)
        print(file=sys.stderr)
        print_setup_instructions()
        sys.exit(1)

    with open(TOKEN_PATH, "rb") as token:
        creds = pickle.load(token)

    if not creds.valid:
        if creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except RefreshError as e:
                print(f"ERROR: Google rejected the saved OAuth refresh token ({e}).", file=sys.stderr)
                print("The token was revoked or expired. If the OAuth app is still in", file=sys.stderr)
                print("'Testing' status, every new token dies again after 7 days.", file=sys.stderr)
                print(file=sys.stderr)
                print_setup_instructions()
                sys.exit(1)
            with open(TOKEN_PATH, "wb") as token:
                pickle.dump(creds, token)
        else:
            print("ERROR: Token expired and cannot be refreshed.", file=sys.stderr)
            print(file=sys.stderr)
            print_setup_instructions()
            sys.exit(1)

    return creds


def fetch_query_data(service, site_url, days):
    """Fetch top queries for the last N days."""
    end = datetime.now().date()
    start = end - timedelta(days=days)

    request = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["query"],
        "rowLimit": 50,
        "startRow": 0,
    }

    response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
    return response.get("rows", [])


def fetch_page_data(service, site_url, days):
    """Fetch top pages for the last N days."""
    end = datetime.now().date()
    start = end - timedelta(days=days)

    request = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["page"],
        "rowLimit": 50,
        "startRow": 0,
    }

    response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
    return response.get("rows", [])


def fetch_query_page_data(service, site_url, days):
    """Fetch query+page combo for CTR analysis."""
    end = datetime.now().date()
    start = end - timedelta(days=days)

    request = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["page", "query"],
        "rowLimit": 100,
        "startRow": 0,
    }

    response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
    return response.get("rows", [])


def analyze_opportunities(rows, top_n=10):
    """Find high-impression, low-CTR opportunities."""
    opportunities = []
    for row in rows:
        keys = row.get("keys", [])
        clicks = row.get("clicks", 0)
        impressions = row.get("impressions", 0)
        ctr = row.get("ctr", 0)
        position = row.get("position", 0)

        if impressions < 10:
            continue

        # Opportunity score: high impressions * (1 - CTR) * position factor
        # Pages ranking 4-15 with high impressions and low CTR = title/meta opportunity
        opportunity_score = impressions * (1 - min(ctr * 2, 1)) * max(0, 1 - (position - 1) / 20)

        opportunities.append({
            "keys": keys,
            "clicks": clicks,
            "impressions": impressions,
            "ctr": round(ctr * 100, 2),
            "position": round(position, 1),
            "score": round(opportunity_score, 1),
        })

    opportunities.sort(key=lambda x: x["score"], reverse=True)
    return opportunities[:top_n]


def format_report(short_rows, long_rows, page_rows, query_page_rows):
    """Build a human-readable markdown report."""
    lines = []
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    lines.append(f"# 📊 TurnLab Search Console Report — {now}")
    lines.append("")

    # Summary
    total_clicks_short = sum(r.get("clicks", 0) for r in short_rows)
    total_impressions_short = sum(r.get("impressions", 0) for r in short_rows)
    avg_ctr_short = (total_clicks_short / total_impressions_short * 100) if total_impressions_short else 0

    total_clicks_long = sum(r.get("clicks", 0) for r in long_rows)
    total_impressions_long = sum(r.get("impressions", 0) for r in long_rows)
    avg_ctr_long = (total_clicks_long / total_impressions_long * 100) if total_impressions_long else 0

    lines.append("## 📈 Summary")
    lines.append("")
    lines.append(f"| Period | Clicks | Impressions | Avg CTR |")
    lines.append(f"|--------|--------|-------------|---------|")
    lines.append(f"| Last 7 days | {total_clicks_short:,} | {total_impressions_short:,} | {avg_ctr_short:.2f}% |")
    lines.append(f"| Last 28 days | {total_clicks_long:,} | {total_impressions_long:,} | {avg_ctr_long:.2f}% |")
    lines.append("")

    # Top queries
    lines.append(f"## 🔍 Top Queries (Last {DAYS_LONG} days)")
    lines.append("")
    lines.append("| Query | Clicks | Impressions | CTR | Position |")
    lines.append("|-------|--------|-------------|-----|----------|")
    for row in long_rows[:15]:
        query = row.get("keys", ["?"])[0]
        clicks = row.get("clicks", 0)
        impressions = row.get("impressions", 0)
        ctr = row.get("ctr", 0) * 100
        position = row.get("position", 0)
        lines.append(f"| {query} | {clicks:,} | {impressions:,} | {ctr:.1f}% | {position:.1f} |")
    lines.append("")

    # Top pages
    lines.append(f"## 📝 Top Pages (Last {DAYS_LONG} days)")
    lines.append("")
    lines.append("| Page | Clicks | Impressions | CTR | Position |")
    lines.append("|------|--------|-------------|-----|----------|")
    for row in page_rows[:10]:
        page = row.get("keys", ["?"])[0]
        clicks = row.get("clicks", 0)
        impressions = row.get("impressions", 0)
        ctr = row.get("ctr", 0) * 100
        position = row.get("position", 0)
        # Truncate page URL for readability
        page_short = page.replace("https://turnlab.co", "") or "/"
        lines.append(f"| {page_short} | {clicks:,} | {impressions:,} | {ctr:.1f}% | {position:.1f} |")
    lines.append("")

    # Opportunities
    opportunities = analyze_opportunities(query_page_rows, top_n=10)
    if opportunities:
        lines.append("## 🎯 Opportunities (High Impressions × Low CTR)")
        lines.append("")
        lines.append("These pages/queries have visibility but aren't getting clicks. Consider improving titles, meta descriptions, or content relevance.")
        lines.append("")
        lines.append("| Page | Query | Impressions | CTR | Position | Action |")
        lines.append("|------|-------|-------------|-----|----------|--------|")
        for opp in opportunities:
            page = opp["keys"][0].replace("https://turnlab.co", "") if len(opp["keys"]) > 0 else "?"
            query = opp["keys"][1] if len(opp["keys"]) > 1 else "?"
            action = "Improve title/meta" if opp["position"] <= 10 else "Content + backlinks"
            lines.append(f"| {page} | {query} | {opp['impressions']:,} | {opp['ctr']}% | {opp['position']} | {action} |")
        lines.append("")

    # Content gaps
    lines.append("## 📖 Content Gap Hints")
    lines.append("")
    lines.append("Queries you're showing for but may not have dedicated pages:")
    lines.append("")
    gap_queries = [r for r in long_rows if r.get("impressions", 0) > 100]
    for row in gap_queries[:8]:
        query = row.get("keys", ["?"])[0]
        clicks = row.get("clicks", 0)
        impressions = row.get("impressions", 0)
        lines.append(f"- **{query}** ({clicks} clicks / {impressions} impressions)")
    lines.append("")

    lines.append("---")
    lines.append("")
    lines.append("Next steps: Pick the highest-opportunity item and create a GitHub issue or daily-improvement task.")

    return "\n".join(lines)


def main():
    creds = get_credentials()
    service = build("webmasters", "v3", credentials=creds, cache_discovery=False)

    # Verify site access
    try:
        service.sites().get(siteUrl=SITE_URL).execute()
    except Exception as e:
        print(f"ERROR: Cannot access {SITE_URL} in Search Console.")
        print(f"Details: {e}")
        print("Make sure the authenticated Google account has access to this property.")
        sys.exit(1)

    # Fetch data
    short_queries = fetch_query_data(service, SITE_URL, DAYS_SHORT)
    long_queries = fetch_query_data(service, SITE_URL, DAYS_LONG)
    pages = fetch_page_data(service, SITE_URL, DAYS_LONG)
    query_pages = fetch_query_page_data(service, SITE_URL, DAYS_LONG)

    # Generate report
    report = format_report(short_queries, long_queries, pages, query_pages)
    print(report)

    # Also save to file for cron delivery
    output_dir = Path.home() / ".hermes" / "cron" / "output"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"gsc-report-{datetime.now().strftime('%Y%m%d')}.md"
    with open(output_path, "w") as f:
        f.write(report)

    return 0


if __name__ == "__main__":
    exit(main())
