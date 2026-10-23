# Creator Compass / Creator Vault

This project contains a React + TypeScript + Vite frontend and an Express backend. AI features call the backend; API keys are never required in browser code.

## Requirements

- Node.js 20 or newer (for native `fetch`, `AbortSignal.timeout`, and `--env-file`)
- npm
- A Gemini API key from Google AI Studio and/or an OpenAI API key

## First-time setup

1. Make a backup of this folder.
2. Copy `backend/.env.example` to `backend/.env.local`.
3. Put your Gemini and/or OpenAI API key only in `backend/.env.local`. Never paste keys into the chat, frontend files, or Git.
4. In the project root, run `npm install`.
5. Start both apps with `npm run dev`.
6. Open the Vite URL printed in the terminal (normally `http://127.0.0.1:5173`).

The backend listens on `127.0.0.1:5000` by default. The frontend proxies `/api/*` requests to it.

## AI provider selection

Use the `KI` selector in the top navigation to choose Gemini or OpenAI. The selection is saved in this browser. All existing calls to `generateAiContent` use the selected provider unless a provider is passed explicitly.

Backend routes:

- `GET /api/ai/status` — reports whether each provider is configured; never returns secrets.
- `POST /api/ai/generate` — body: `{ "provider": "gemini" | "openai", "prompt": "...", "systemInstruction": "..." }`.

Configure models through `GEMINI_MODEL` and `OPENAI_MODEL` in the backend environment file. The defaults are `gemini-2.5-flash` and `gpt-4.1-mini`. API usage can incur separate charges; a ChatGPT subscription does not automatically include OpenAI API credits.

## Security and deployment status

**This remains a local development prototype, not production-ready.** The app currently has no user login/session system. The AI generation route deliberately returns HTTP 503 when `NODE_ENV=production` until authentication and per-user quotas are implemented. Do not expose the backend publicly or change its bind host to `0.0.0.0` as a workaround. Add authenticated sessions, per-user rate/cost quotas, CSRF/origin controls as appropriate, and monitoring before deployment.

The old Vertex proxy is disabled by default. It requires `ENABLE_LEGACY_VERTEX_PROXY=true`, valid Google Cloud configuration, and a private `PROXY_HEADER`; do not enable it unless you explicitly need that legacy path. The old frontend interceptor is no longer loaded.

## Project structure

- `frontend/` — React UI and AI client wrapper
- `frontend/services/geminiService.ts` — shared AI provider client (despite its historical filename, supports both providers)
- `backend/server.js` — server-side Gemini/OpenAI API calls and optional legacy Vertex proxy
- `backend/.env.example` — safe template; copy to `.env.local` for local secrets
