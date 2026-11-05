import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const REPO = 'DeruiDENG/blog';
const TARGET_ENV_FILE = path.resolve(process.cwd(), '.env.local');

console.log(`📡 Initializing local environment and fetching variables from GitHub repository: ${REPO}...`);

try {
  // 1. Verify GitHub CLI is installed
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch {
    console.error('❌ GitHub CLI (gh) is not installed. Please install it first (e.g. brew install gh).');
    process.exit(1);
  }

  // 2. Verify authentication status
  try {
    execSync('gh auth status', { stdio: 'ignore' });
  } catch {
    console.error('❌ You are not logged into GitHub CLI. Run "gh auth login" first.');
    process.exit(1);
  }

  // 3. Fetch repository variables
  const output = execSync(`gh variable list --repo ${REPO} --json name,value`, {
    encoding: 'utf-8',
  });
  const variables = JSON.parse(output);

  if (!Array.isArray(variables) || variables.length === 0) {
    console.warn(`⚠️ No variables found in repository ${REPO}.`);
    process.exit(0);
  }

  // 4. Parse existing .env.local to avoid overwriting other custom local variables
  let existingEnv = {};
  if (fs.existsSync(TARGET_ENV_FILE)) {
    const lines = fs.readFileSync(TARGET_ENV_FILE, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        existingEnv[match[1].trim()] = match[2].trim();
      }
    }
  }

  // 5. Merge and update Giscus variables
  let updatedCount = 0;
  for (const v of variables) {
    existingEnv[v.name] = v.value;
    updatedCount++;
    console.log(`  ✓ Pulled ${v.name}`);
  }

  // 6. Write back to .env.local
  const newContent =
    Object.entries(existingEnv)
      .map(([key, val]) => `${key}=${val}`)
      .join('\n') + '\n';

  fs.writeFileSync(TARGET_ENV_FILE, newContent, 'utf-8');
  console.log(`✅ Successfully initialized local environment: ${updatedCount} variable(s) synced into .env.local!`);
} catch (error) {
  console.error('❌ Failed to initialize local environment:', error.message);
  process.exit(1);
}
