// Base LLM Provider — all providers implement this interface

export class LLMProvider {
  constructor(config) {
    this.config = config;
    this.name = 'base';
  }

  /**
   * Complete a prompt with system + user messages
   * @returns {{ text: string, usage: { inputTokens: number, outputTokens: number }, model: string }}
   */
  async complete(systemPrompt, userMessage, opts = {}) {
    throw new Error(`${this.name}: complete() not implemented`);
  }

  get isConfigured() { return false; }

  /**
   * Log LLM request and response details
   */
  logRequest(systemPrompt, userMessage, result, startTime, opts) {
    const duration = Date.now() - startTime;
    const inputTokens = result?.usage?.inputTokens || 0;
    const outputTokens = result?.usage?.outputTokens || 0;
    const totalTokens = inputTokens + outputTokens;
    
    console.log('\n');
    console.log(`[${this.name.toUpperCase()} LLM] Request completed in ${duration}ms`);
    console.log(`[${this.name.toUpperCase()} LLM] Model: ${result.model}`);
    console.log(`[${this.name.toUpperCase()} LLM] Tokens: ${inputTokens} in, ${outputTokens} out, ${totalTokens} total`);
    console.log(`[${this.name.toUpperCase()} LLM] Timeout: ${opts.timeout || this.config.timeout || 'default'}ms`);
    console.log('\n');
    console.log(`[${this.name.toUpperCase()} LLM] ========== SYSTEM PROMPT ==========`);
    console.log(systemPrompt);
    console.log('\n');
    console.log(`[${this.name.toUpperCase()} LLM] ========== USER MESSAGE ==========`);
    console.log(userMessage);
    console.log('\n');
    console.log(`[${this.name.toUpperCase()} LLM] ========== RESPONSE ==========`);
    console.log(result.text);
    console.log('\n');
    console.log(`[${this.name.toUpperCase()} LLM] ========== END OF RESPONSE ==========`);
    console.log('\n');
  }

  /**
   * Log request error including timeout
   */
  logError(error, systemPrompt, userMessage) {
    console.error('\n');
    console.error(`[${this.name.toUpperCase()} LLM] Request FAILED: ${error.message}`);
    console.error('\n');
    console.error(`[${this.name.toUpperCase()} LLM] ========== SYSTEM PROMPT ==========`);
    console.error(systemPrompt);
    console.error('\n');
    console.error(`[${this.name.toUpperCase()} LLM] ========== USER MESSAGE ==========`);
    console.error(userMessage);
    console.error('\n');
    console.error(`[${this.name.toUpperCase()} LLM] ========== END OF FAILED REQUEST ==========`);
    console.error('\n');
  }
}
