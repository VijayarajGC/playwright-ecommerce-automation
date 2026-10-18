
export {};

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'qwen2.5-coder:7b';

async function analyzeFailure(
  failureDetails: string,
): Promise<string> {
  const prompt = `
You are a senior QA automation engineer.

Analyze this Playwright test failure.

Provide:
1. Likely root cause.
2. Evidence from the failure details.
3. Recommended fix.
4. A corrected code example, if enough information is available.

Be honest about uncertainty.
Do not modify or execute any files.

Failure details:
${failureDetails}
`;

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama request failed: ${response.status} ${response.statusText}`,
    );
  }

  const result = (await response.json()) as {
    response: string;
  };

  return result.response.trim();
}

async function main(): Promise<void> {
  const failureDetails = process.argv.slice(2).join(' ');

  if (!failureDetails) {
    console.error(
      'Usage: npx tsx ai/failure-analyzer.ts "Paste failure details here"',
    );
    process.exitCode = 1;
    return;
  }

  try {
    console.log('\nAnalyzing Playwright failure with local AI...\n');

    const analysis = await analyzeFailure(failureDetails);

    console.log('--- FAILURE ANALYSIS ---\n');
    console.log(analysis);
    console.log('\n--- END OF ANALYSIS ---\n');
  } catch (error: unknown) {
    console.error('Failure analysis failed:', error);
    process.exitCode = 1;
  }
}

main();
