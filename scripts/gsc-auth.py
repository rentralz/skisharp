#!/usr/bin/env python3
"""
One-time Google Search Console OAuth setup.
Uses a fixed localhost callback on port 8080 so it matches the TurnLab GCP setup.
"""

import os
import pickle
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDENTIALS_DIR = Path.home() / ".config" / "turnlab" / "gsc"
CLIENT_SECRETS_PATH = CREDENTIALS_DIR / "client_secrets.json"
TOKEN_PATH = CREDENTIALS_DIR / "token.pickle"
REDIRECT_PORT = 8080
REDIRECT_URI = f"http://localhost:{REDIRECT_PORT}/"
CALLBACK_TIMEOUT_SECONDS = int(os.environ.get("GSC_AUTH_TIMEOUT_SECONDS", "300"))


def ensure_private_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)
    os.chmod(path, 0o700)


def write_private_pickle(path: Path, payload) -> None:
    with open(path, "wb") as handle:
        pickle.dump(payload, handle)
    os.chmod(path, 0o600)


def print_setup_instructions() -> None:
    print(f"ERROR: {CLIENT_SECRETS_PATH} not found.", flush=True)
    print(flush=True)
    print("To set up:", flush=True)
    print("1. Go to https://console.cloud.google.com/", flush=True)
    print("2. Create/select a project", flush=True)
    print("3. Enable 'Google Search Console API'", flush=True)
    print("4. Go to APIs & Services > Credentials", flush=True)
    print("5. Create OAuth 2.0 credentials (Desktop app)", flush=True)
    print("6. If using this fixed localhost callback, add this redirect URI:", flush=True)
    print(f"   {REDIRECT_URI}", flush=True)
    print("7. Download JSON and save it to:", flush=True)
    print(f"   {CLIENT_SECRETS_PATH}", flush=True)
    print(flush=True)
    print("Then run this script again.", flush=True)


def enable_localhost_oauth_transport() -> None:
    if REDIRECT_URI.startswith("http://localhost:") or REDIRECT_URI.startswith("http://127.0.0.1:"):
        os.environ.setdefault("OAUTHLIB_INSECURE_TRANSPORT", "1")
        return
    raise RuntimeError(f"Refusing insecure OAuth transport for non-local redirect URI: {REDIRECT_URI}")


def main() -> int:
    ensure_private_dir(CREDENTIALS_DIR)

    print("=" * 60, flush=True)
    print("TurnLab Google Search Console OAuth Setup", flush=True)
    print("=" * 60, flush=True)
    print(flush=True)

    if not CLIENT_SECRETS_PATH.exists():
        print_setup_instructions()
        return 1

    callback_state = {"expected_state": None, "path": None, "error": None}

    class CallbackHandler(BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            parsed = urlparse(self.path)
            params = parse_qs(parsed.query)
            returned_state = params.get("state", [None])[0]
            auth_code = params.get("code", [None])[0]
            auth_error = params.get("error", [None])[0]
            auth_error_description = params.get("error_description", [None])[0]

            if auth_error:
                callback_state["error"] = auth_error_description or auth_error
                self.send_response(400)
                message = f"Authentication failed: {callback_state['error']}"
            elif returned_state == callback_state["expected_state"] and auth_code:
                callback_state["path"] = self.path
                self.send_response(200)
                message = "Authentication complete. You can close this tab."
            else:
                self.send_response(400)
                message = "Ignoring non-matching callback. Return to the Google auth flow and try again."

            self.send_header("Content-type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write(message.encode("utf-8"))

        def log_message(self, format, *args):  # noqa: A003
            return

    try:
        server = HTTPServer(("localhost", REDIRECT_PORT), CallbackHandler)
    except OSError as exc:
        print(f"ERROR: Could not bind localhost:{REDIRECT_PORT}: {exc}", flush=True)
        print("Stop the process using port 8080 and try again.", flush=True)
        return 1

    try:
        enable_localhost_oauth_transport()
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRETS_PATH), SCOPES)
        flow.redirect_uri = REDIRECT_URI
        auth_url, callback_state["expected_state"] = flow.authorization_url(
            prompt="consent",
            access_type="offline",
        )

        print("Open this URL and approve access:", flush=True)
        print(flush=True)
        print(auth_url, flush=True)
        print(flush=True)
        print(
            f"Waiting for Google callback on {REDIRECT_URI} "
            f"(timeout: {CALLBACK_TIMEOUT_SECONDS}s)",
            flush=True,
        )

        server.timeout = 1
        deadline = time.time() + CALLBACK_TIMEOUT_SECONDS
        while not callback_state["path"] and not callback_state["error"] and time.time() < deadline:
            server.handle_request()

        if callback_state["error"]:
            raise RuntimeError(callback_state["error"])
        if not callback_state["path"]:
            raise TimeoutError("Timed out waiting for the OAuth callback.")

        authorization_response = f"http://localhost:{REDIRECT_PORT}{callback_state['path']}"
        flow.fetch_token(authorization_response=authorization_response)
    except Exception as exc:
        print(f"ERROR: OAuth setup failed: {exc}", flush=True)
        return 1
    finally:
        server.server_close()

    write_private_pickle(TOKEN_PATH, flow.credentials)

    print(flush=True)
    print(f"✅ Token saved to {TOKEN_PATH}", flush=True)
    print("The weekly Search Console cron can now run automatically.", flush=True)
    print(flush=True)
    print("Test it now with:", flush=True)
    print("  scripts/run-gsc-report.sh", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
