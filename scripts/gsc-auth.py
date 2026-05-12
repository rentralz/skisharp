#!/usr/bin/env python3
"""
One-time Google Search Console OAuth setup.
Run this interactively to get a refresh token for the cron job.
"""

import os
import json
import pickle
from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDENTIALS_DIR = Path.home() / ".config" / "turnlab" / "gsc"
CREDENTIALS_DIR.mkdir(parents=True, exist_ok=True)

CLIENT_SECRETS_PATH = CREDENTIALS_DIR / "client_secrets.json"
TOKEN_PATH = CREDENTIALS_DIR / "token.pickle"


def main():
    print("=" * 60)
    print("TurnLab Google Search Console OAuth Setup")
    print("=" * 60)
    print()

    if not CLIENT_SECRETS_PATH.exists():
        print(f"ERROR: {CLIENT_SECRETS_PATH} not found.")
        print()
        print("To set up:")
        print("1. Go to https://console.cloud.google.com/")
        print("2. Create/select a project")
        print("3. Enable 'Google Search Console API'")
        print("4. Go to APIs & Services > Credentials")
        print("5. Create OAuth 2.0 credentials (Desktop app)")
        print("6. Download JSON and save it to:")
        print(f"   {CLIENT_SECRETS_PATH}")
        print()
        print("Then run this script again.")
        return 1

    flow = InstalledAppFlow.from_client_secrets_file(
        str(CLIENT_SECRETS_PATH),
        SCOPES,
    )

    print("A browser window will open for Google authorization.")
    print("Please log in and grant access to Search Console data.")
    print()

    creds = flow.run_local_server(port=0)

    with open(TOKEN_PATH, "wb") as token:
        pickle.dump(creds, token)

    print()
    print(f"✅ Token saved to {TOKEN_PATH}")
    print("The cron job can now fetch Search Console data automatically.")
    return 0


if __name__ == "__main__":
    exit(main())
