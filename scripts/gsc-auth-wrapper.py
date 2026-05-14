#!/usr/bin/env python3
"""Write the Google auth URL to a file, wait for the localhost callback, and save the token."""

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
URL_FILE = CREDENTIALS_DIR / "auth_url.txt"
PORT_FILE = CREDENTIALS_DIR / "auth_port.txt"
REDIRECT_PORT = 8080
REDIRECT_URI = f"http://localhost:{REDIRECT_PORT}/"
CALLBACK_TIMEOUT_SECONDS = 300


def ensure_private_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)
    os.chmod(path, 0o700)


def write_private_text(path: Path, content: str) -> None:
    path.write_text(content)
    os.chmod(path, 0o600)


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
        return 1

    try:
        enable_localhost_oauth_transport()
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRETS_PATH), SCOPES)
        flow.redirect_uri = REDIRECT_URI
        auth_url, callback_state["expected_state"] = flow.authorization_url(
            prompt="consent",
            access_type="offline",
        )

        write_private_text(URL_FILE, f"{auth_url}\n")
        write_private_text(PORT_FILE, f"{REDIRECT_PORT}\n")
        print(f"URL_WRITTEN port={REDIRECT_PORT}", flush=True)

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
        print(f"ERROR: {exc}", flush=True)
        return 1
    finally:
        server.server_close()
        URL_FILE.unlink(missing_ok=True)
        PORT_FILE.unlink(missing_ok=True)

    write_private_pickle(TOKEN_PATH, flow.credentials)

    print("SUCCESS", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
