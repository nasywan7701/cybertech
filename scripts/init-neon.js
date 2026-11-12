const fs = require('node:fs');
const path = require('node:path');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex <= 0) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let val = trimmed.slice(eqIndex + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(path.resolve(__dirname, '..', '.env.local'));
loadEnvFile(path.resolve(__dirname, '..', '.env'));

const { getSql, ensureInitialized, resetInitCacheForTest } = require('../api/_db');

async function main() {
  resetInitCacheForTest();
  const sql = getSql();
  await ensureInitialized(sql);

  const [{ cnt: userCount }] = await sql.query('SELECT COUNT(*)::int AS cnt FROM users');
  const [{ cnt: moduleCount }] = await sql.query('SELECT COUNT(*)::int AS cnt FROM modules');
  const [{ cnt: quizCount }] = await sql.query('SELECT COUNT(*)::int AS cnt FROM quizzes');

  console.log(`Neon Postgres ready: ${userCount} users, ${moduleCount} modules, ${quizCount} quizzes.`);
}

main().catch((err) => {
  console.error('Database initialization failed:', err.message);
  process.exit(1);
});
