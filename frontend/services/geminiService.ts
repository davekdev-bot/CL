export type AiProvider = 'gemini' | 'openai';

const PROVIDER_STORAGE_KEY = 'creator_compass_ai_provider_v1';

export function getAiProvider(): AiProvider {
  try {
    return localStorage.getItem(PROVIDER_STORAGE_KEY) === 'openai' ? 'openai' : 'gemini';
  } catch {
    return 'gemini';
  }
}

export function setAiProvider(provider: AiProvider): void {
  try {
    localStorage.setItem(PROVIDER_STORAGE_KEY, provider);
  } catch {
    // Storage can be unavailable in private/restricted browsing contexts.
  }
}

export async function generateAiContent(
  prompt: string,
  systemInstruction?: string,
  provider: AiProvider = getAiProvider(),
): Promise<string> {
  const response = await fetch('/api/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, systemInstruction, provider }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || `KI-Anfrage fehlgeschlagen (HTTP ${response.status}).`);
  }
  if (typeof data.text !== 'string' || !data.text.trim()) {
    throw new Error('Die KI hat keine Textantwort zurückgegeben.');
  }
  return data.text;
}
