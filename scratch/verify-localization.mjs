import { t, getLanguage, getLLMPrompt } from '../lib/i18n.mjs';

console.log(`Current Language Detection: ${getLanguage()}`);

const keysToTest = [
  'bot.status.title',
  'bot.brief.title',
  'llm.evaluationPrompt',
  'bot.alertTiers.flash',
  'alerts.fields.confidence'
];

console.log('\n--- Translation Test ---');
for (const key of keysToTest) {
  const result = t(key);
  console.log(`[${key}]: ${result.substring(0, 50)}${result.length > 50 ? '...' : ''}`);
}

console.log('\n--- LLM Prompt Test ---');
const prompt = getLLMPrompt();
console.log(`LLM Prompt (first 100 chars): ${prompt.substring(0, 100)}...`);

if (prompt.includes('你是一家宏观情报公司') || prompt.includes('Crucix')) {
  console.log('\n✅ Verification successful: Translations are loading correctly.');
} else {
  console.log('\n❌ Verification failed: LLM prompt or translations not matching expected locale.');
}
