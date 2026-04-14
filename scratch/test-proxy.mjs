import config from '../crucix.config.mjs';

console.log('=== CRUCIX NETWORK VERIFICATION ===\n');
console.log('Configured Proxy:', config.network.proxy || 'NONE');
console.log('Timeout Sweep:  ', config.network.timeoutSweep, 'ms');
console.log('Timeout RSS:    ', config.network.timeoutRss, 'ms');
console.log('Timeout LLM:    ', config.network.timeoutLlm, 'ms');
console.log('------------------------------------\n');

async function testFetch(label, url, timeout) {
  console.log(`[${label}] Fetching ${url}...`);
  const start = Date.now();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    const elapsed = Date.now() - start;
    console.log(`✅ ${label} SUCCESS: HTTP ${res.status} (${elapsed}ms)`);
    return true;
  } catch (err) {
    const elapsed = Date.now() - start;
    console.log(`❌ ${label} FAILED: ${err.message} (${elapsed}ms)`);
    return false;
  }
}

// 1. External connectivity test
console.log('Step 1: Testing connectivity...');
await testFetch('OpenAI API', 'https://api.openai.com/v1/chat/completions', 10000);
await testFetch('BBC RSS', 'https://feeds.bbci.co.uk/news/world/rss.xml', 10000);

console.log('\nStep 2: Testing intentional timeout (1ms)...');
await testFetch('Timeout Test', 'https://www.google.com', 1);

console.log('\n=== VERIFICATION COMPLETE ===');
