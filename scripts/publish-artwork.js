const { execSync } = require('child_process');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const run = (command, options = {}) =>
  execSync(command, { cwd: repoRoot, stdio: 'inherit', ...options });

const commitMessage = process.argv.slice(2).join(' ') || `Update artwork data - ${new Date().toISOString().slice(0, 10)}`;

function hasStagedChanges() {
  try {
    execSync('git diff --cached --quiet', { cwd: repoRoot });
    return false;
  } catch {
    return true;
  }
}

const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: repoRoot }).toString().trim();

run('git add data/artwork.json artwork/');

if (hasStagedChanges()) {
  run(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
} else {
  console.log('No staged artwork changes — skipping commit.');
}

run(`git push origin ${branch}`);

console.log('Artwork published.');
