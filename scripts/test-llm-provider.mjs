#!/usr/bin/env node
// Test script for OpenAIProvider using .env config

import '../apis/utils/env.mjs';
import { OpenAIProvider } from '../lib/llm/openai.mjs';

const config = {
  apiKey: process.env.LLM_API_KEY,
  model: process.env.LLM_MODEL,
  baseUrl: process.env.LLM_BASE_URL,
  timeout: parseInt(process.env.CRUCIX_TIMEOUT_LLM) || 90000,
};

console.log('='.repeat(60));
console.log('LLM Configuration Test');
console.log('='.repeat(60));
console.log('Provider: openai');
console.log('Model:', config.model);
console.log('Base URL:', config.baseUrl);
console.log('API Key:', config.apiKey ? '(set)' : '(not set)');
console.log('Timeout:', config.timeout, 'ms');
console.log();

const provider = new OpenAIProvider(config);

console.log('Provider created:', provider.name);
console.log('Is configured:', provider.isConfigured);
console.log();

if (!provider.isConfigured) {
  console.error('Error: LLM not configured - check LLM_API_KEY in .env');
  process.exit(1);
}

console.log('Testing LLM with a simple prompt...');
console.log('-' .repeat(60));

try {
  const result = await provider.complete(
    'You are a helpful assistant who responds in JSON format only.',
    'Say hello and provide a JSON with message: "hello", timestamp: current ISO time',
    { timeout: config.timeout }
  );

  console.log('✅ Success!');
  console.log();
  console.log('Response:');
  console.log(result.text);
  console.log();
  console.log('Usage:');
  console.log('  Input tokens:', result.usage.inputTokens);
  console.log('  Output tokens:', result.usage.outputTokens);
  console.log('  Model:', result.model);
  console.log();
  console.log('='.repeat(60));
  console.log('Test passed!');

} catch (err) {
  console.error('❌ Test failed:');
  console.error('  Error:', err.message);
  console.error();
  console.error('='.repeat(60));
  process.exit(1);
}
