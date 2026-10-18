
const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'qwen2.5-coder:7b';

async function generatePlaywrightTest(requirement: string): Promise<string> {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: `You are an expert QA automation engineer.
Generate one Playwright test using TypeScript and @playwright/test.

Application: https://www.saucedemo.com
Requirement: ${requirement}

Rules:
- Return only TypeScript code.
- Use test and expect from @playwright/test.
- Use reliable locators and meaningful assertions.
- Do not modify application data or existing project files.
- Do not include markdown code fences.`,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama request failed: ${response.status} ${response.statusText}`,
    );
  }

  const result = (await response.json()) as { response: string };
  return result.response.trim();
}

async function main(): Promise<void> {
  const requirement =
    process.argv.slice(2).join(' ') ||
    'Verify that the Sauce Demo login page displays the username and password fields.';

  console.log('\nGenerating a Playwright test...\n');

  const generatedCode = await generatePlaywrightTest(requirement);

  console.log('--- AI-GENERATED TEST ---\n');
  const cleanedCode = generatedCode
  .replace(/^```(?:typescript|ts|javascript|js)?\s*/i, '')
  .replace(/\s*```$/, '')
  .trim();

const outputDir = 'ai/generated-tests';
const fs = await import('node:fs/promises');
const path = await import('node:path');

await fs.mkdir(outputDir, { recursive: true });

const outputFile = path.join(outputDir, 'login-page.spec.ts');

await fs.writeFile(outputFile, cleanedCode, 'utf8');

console.log(`Generated test saved to: ${outputFile}`);
console.log('\nReview the file before executing it.');
  console.log('\n--- END OF GENERATED TEST ---\n');
}

main().catch((error: unknown) => {
  console.error('Test generation failed:', error);
  process.exitCode = 1;
});
