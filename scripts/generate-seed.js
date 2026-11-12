const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const rootDir = path.resolve(__dirname, '..');
const storagePath = path.join(rootDir, 'assets', 'js', 'storage.js');
const outPath = path.join(rootDir, 'api', '_seed-data.json');

const source = fs.readFileSync(storagePath, 'utf8');

const sandbox = {
  console,
  window: {
    location: { protocol: 'http:', hostname: 'localhost', port: '80', pathname: '/' }
  },
  localStorage: {
    _data: {},
    getItem(k) { return Object.prototype.hasOwnProperty.call(this._data, k) ? this._data[k] : null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  },
  fetch: async () => ({ ok: false }),
  setTimeout,
  clearTimeout
};
sandbox.globalThis = sandbox;
sandbox.location = sandbox.window.location;

const instrumented = `${source}\n;this.__SEED_EXPORT__ = { users: DEFAULT_USERS, modules: DEFAULT_MODULES, quizzes: DEFAULT_QUIZZES };`;
vm.runInNewContext(instrumented, sandbox, { filename: 'storage.js' });

const seed = sandbox.__SEED_EXPORT__;
if (!seed || !Array.isArray(seed.users) || !Array.isArray(seed.modules) || !Array.isArray(seed.quizzes)) {
  throw new Error('Failed to extract seed arrays from assets/js/storage.js');
}

fs.writeFileSync(outPath, JSON.stringify(seed, null, 2), 'utf8');
console.log(`Generated ${outPath}: ${seed.users.length} users, ${seed.modules.length} modules, ${seed.quizzes.length} quizzes.`);

