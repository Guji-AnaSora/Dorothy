// OpenRouter Provider — raw fetch, no SDK

import { LLMProvider } from './provider.mjs';

export class OpenRouterProvider extends LLMProvider {
  constructor(config) {
    super(config);
    this.name = 'openrouter';
    this.apiKey = config.apiKey;
    this.model = config.model || 'openrouter/auto';
  }

  get isConfigured() { return !!this.apiKey; }

  async complete(systemPrompt, userMessage, opts = {}) {
    const startTime = Date.now();

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://github.com/calesthio/Crucix',
          'X-Title': 'Crucix',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: opts.maxTokens || 4096,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
        }),
        signal: AbortSignal.timeout(opts.timeout || this.config.timeout || 60000),
      });

      if (!res.ok) {
        const err = await res.text().catch(() => '');
        throw new Error(`OpenRouter API ${res.status}: ${err.substring(0, 200)}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || '';

      const result = {
        text,
        usage: {
          inputTokens: data.usage?.prompt_tokens || 0,
          outputTokens: data.usage?.completion_tokens || 0,
        },
        model: data.model || this.model,
      };

      this.logRequest(systemPrompt, userMessage, result, startTime, opts);
      return result;
    } catch (err) {
      this.logError(err, systemPrompt, userMessage);
      throw err;
    }
  }
}
