#!/usr/bin/env python3
"""Manual Google Search Console OAuth bootstrap.

Use when the localhost callback cannot be reached automatically (for example,
when the auth link is opened on a different device). It generates an auth URL
and then exchanges the final redirected localhost URL pasted by the user.
"""

import os
import pickle
import sys
from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDENTIALS_DIR = Path.home() / ".config" / "turnlab" / "gsc"
CLIENT_SECRETS_PATH = CREDENTIALS_DIR / "client_secrets.json"
TOKEN_PATH = CREDENTIALS_DIR / "token.pickle"
REDIRECT_PORT = 8080
REDIRECT_URI = f"http://localhost:{REDIRECT_PORT}/"


def ensure_private_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)
    os.chmod(path, 0o700)


def write_private_pickle(path: Path, payload) -> None:
    with open(path, "wb") as handle:
        pickle.dump(payload, handle)
    os.chmod(path, 0o600)


def enable_localhost_oauth_transport() -> None:
    if REDIRECT_URI.startswith("http://localhost:") or REDIRECT_URI.startswith("http://127.0.0.1:"):
        os.environ.setdefault("OAUTHLIB_INSECURE_TRANSPORT", "1")
        return
    raise RuntimeError(f"Refusing insecure OAuth transport for non-local redirect URI: {REDIRECT_URI}")


def main() -> int:
    ensure_private_dir(CREDENTIALS_DIR)
    if not CLIENT_SECRETS_PATH.exists():
        print(f"ERROR: Missing client secrets at {CLIENT_SECRETS_PATH}", flush=True)
        return 1

    enable_localhost_oauth_transport()
    flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRETS_PATH), SCOPES)
    flow.redirect_uri = REDIRECT_URI
    auth_url, _ = flow.authorization_url(prompt="consent", access_type="offline")

    print("=" * 60, flush=True)
    print("TurnLab Google Search Console Manual OAuth", flush=True)
    print("=" * 60, flush=True)
    print(flush=True)
    print("1) Open this URL in a browser:", flush=True)
    print(auth_url, flush=True)
    print(flush=True)
    print("2) Approve access.", flush=True)
    print(
        "3) After approval, your browser may fail to load localhost:8080. "
        "That is OK.",
        flush=True,
    )
    print(
        "4) Copy the FULL URL from the browser address bar (it should start with "
        f"{REDIRECT_URI}?state=...&code=...).",
        flush=True,
    )
    print(flush=True)

    response_url = os.environ.get("GSC_AUTH_RESPONSE_URL", "").strip()
    if not response_url:
        print("Paste the full redirected URL and press Enter:", flush=True)
        response_url = input().strip()

    if not response_url.startswith(REDIRECT_URI):
        print(f"ERROR: Expected a URL starting with {REDIRECT_URI}", flush=True)
        return 1

    try:
        flow.fetch_token(authorization_response=response_url)
    except Exception as exc:
        print(f"ERROR: OAuth token exchange failed: {exc}", flush=True)
        return 1

    write_private_pickle(TOKEN_PATH, flow.credentials)
    print(flush=True)
    print(f"✅ Token saved to {TOKEN_PATH}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
