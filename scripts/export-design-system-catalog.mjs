import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const prototype = args.has('--prototype');
const captureOnly = args.has('--capture-only');
const skipCaptures = args.has('--skip-captures');
const baseUrl = process.env.CATALOG_BASE_URL ?? 'http://localhost:3000';
const generatedDir = join(root, 'public', 'catalog-book-generated');
const scratchDir = join(root, 'tmp', 'pdfs', 'catalog-book');
const outputDir = join(root, 'output', 'pdf');
const rawPdf = join(scratchDir, prototype ? 'prototype-raw.pdf' : 'catalog-raw.pdf');
const finalPdf = prototype
  ? join(scratchDir, 'MResalat_Design_System_Catalog_FA_Prototype.pdf')
  : join(outputDir, 'MResalat_Design_System_Catalog_FA.pdf');

const browserCandidates = process.platform === 'win32'
  ? [
      process.env.CHROME_PATH,
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    ]
  : [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'];

const browser = browserCandidates.find((candidate) => candidate && existsSync(candidate));
if (!browser) throw new Error('Chrome or Edge was not found. Set CHROME_PATH to a Chromium executable.');

mkdirSync(generatedDir, { recursive: true });
mkdirSync(scratchDir, { recursive: true });
mkdirSync(outputDir, { recursive: true });

let server;
async function ensureServer() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(2500) });
    if (response.ok) return;
  } catch { /* start the local server below */ }
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  server = spawn(npm, ['run', 'dev'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1500) });
      if (response.ok) return;
    } catch { /* continue waiting */ }
  }
  throw new Error(`The local catalog server did not become ready at ${baseUrl}.`);
}

function runBrowser(browserArgs, label) {
  const profileDir = mkdtempSync(join(tmpdir(), 'mresalat-catalog-chrome-'));
  const result = spawnSync(browser, [
    '--headless=new',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--run-all-compositor-stages-before-draw',
    '--use-angle=swiftshader',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=${profileDir}`,
    ...browserArgs,
  ], { cwd: root, encoding: 'utf8', windowsHide: true, timeout: 120_000 });
  rmSync(profileDir, { recursive: true, force: true });
  if (result.status !== 0) throw new Error(`${label} failed.\n${result.stderr || result.stdout}`);
}

const figures = [
  { name: 'home-light', path: '/', theme: 'light' },
  { name: 'showcase-light', path: '/showcase', theme: 'light' },
  { name: 'showcase-dark', path: '/showcase', theme: 'dark' },
  { name: 'examples-light', path: '/examples', theme: 'light' },
  { name: 'catalog-light', path: '/catalog', theme: 'light' },
  { name: 'mascot-happy', path: '/qa/mascot/happy', theme: 'light', budget: 7000 },
  { name: 'mascot-thinking', path: '/qa/mascot/thinking', theme: 'light', budget: 7000 },
  { name: 'mascot-warning', path: '/qa/mascot/warning', theme: 'dark', budget: 7000 },
  { name: 'membership-domain', path: '/examples/membership', theme: 'light' },
  { name: 'membership-under18', path: '/examples/membership/under-18', theme: 'light' },
  { name: 'membership-organization', path: '/examples/membership/organization', theme: 'light' },
  { name: 'mhami-domain', path: '/examples/mhami', theme: 'light' },
  { name: 'mhami-loan', path: '/examples/mhami/loan-request', theme: 'light' },
  { name: 'mbazar-home', path: '/examples/mbazar', theme: 'light' },
  { name: 'mbazar-search', path: '/examples/mbazar/search', theme: 'light' },
  { name: 'mbazar-cart', path: '/examples/mbazar/cart', theme: 'dark' },
  { name: 'mbazar-checkout', path: '/examples/mbazar/checkout', theme: 'light' },
  { name: 'mbazar-installments', path: '/examples/mbazar/installments', theme: 'light' },
  { name: 'mbazar-orders', path: '/examples/mbazar/orders', theme: 'light' },
  { name: 'learning-domain', path: '/examples/learning', theme: 'light' },
  { name: 'learning-provider', path: '/examples/learning/mamouzesh', theme: 'light' },
  { name: 'mhesam-domain', path: '/examples/mhesam', theme: 'light' },
  { name: 'mhesam-transactions', path: '/examples/mhesam/transactions', theme: 'light' },
  { name: 'mhesam-withdraw', path: '/examples/mhesam/credit/withdraw', theme: 'light' },
  { name: 'mhesam-donate', path: '/examples/mhesam/credit/donate', theme: 'dark' },
  { name: 'heavenly-domain', path: '/examples/heavenly-resalat', theme: 'light' },
  { name: 'health-domain', path: '/examples/msalamat', theme: 'light' },
  { name: 'health-appointments', path: '/examples/msalamat/appointments', theme: 'light' },
  { name: 'insurance-domain', path: '/examples/mbime', theme: 'light' },
  { name: 'insurance-vehicle', path: '/examples/mbime/third-party', theme: 'light' },
  { name: 'auxiliary-domain', path: '/examples/auxiliary', theme: 'light' },
  { name: 'auxiliary-saya', path: '/examples/auxiliary/saya', theme: 'light' },
  { name: 'rahyar-domain', path: '/examples/rahyar', theme: 'light' },
  { name: 'banking-domain', path: '/examples/banking', theme: 'light' },
  { name: 'banking-satna', path: '/examples/banking/satna', theme: 'dark' },
  { name: 'communication-domain', path: '/examples/communication', theme: 'light' },
  { name: 'communication-mpayam', path: '/examples/communication/mpayam', theme: 'light' },
  { name: 'communication-map', path: '/examples/communication/map', theme: 'light' },
  { name: 'mobile-membership', path: '/examples/membership/under-18', theme: 'light', size: '390,844' },
  { name: 'mobile-checkout', path: '/examples/mbazar/checkout', theme: 'light', size: '390,844' },
  { name: 'mobile-transactions', path: '/examples/mhesam/transactions', theme: 'dark', size: '390,844' },
  { name: 'mobile-appointments', path: '/examples/msalamat/appointments', theme: 'light', size: '390,844' },
];

function captureFigures() {
  for (const figure of figures) {
    const target = join(generatedDir, `${figure.name}.png`);
    runBrowser([
      `--window-size=${figure.size ?? '1440,1000'}`,
      `--virtual-time-budget=${figure.budget ?? 4500}`,
      `--screenshot=${target}`,
      `${baseUrl}${figure.path}${figure.path.includes('?') ? '&' : '?'}catalog-theme=${figure.theme}`,
    ], `Capture ${figure.name}`);
    console.log(`Captured ${figure.name}`);
  }
}

async function printPdf() {
  const url = `${baseUrl}/design-system-catalog${prototype ? '?prototype=1' : ''}`;
  const outlineFile = join(scratchDir, 'outline.json');
  if (!prototype) {
    const outlineResponse = await fetch(`${baseUrl}/design-system-catalog/outline`);
    if (!outlineResponse.ok) throw new Error('Catalog outline registry could not be loaded.');
    writeFileSync(outlineFile, await outlineResponse.text(), 'utf8');
  }
  runBrowser([
    '--virtual-time-budget=12000',
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    '--print-to-pdf-no-footer',
    `--print-to-pdf=${rawPdf}`,
    url,
  ], 'PDF export');
  const python = process.env.CATALOG_PYTHON ?? (process.platform === 'win32' ? 'python' : 'python3');
  const post = spawnSync(python, [join(root, 'scripts', 'postprocess-design-system-catalog.py'), rawPdf, finalPdf, prototype ? 'prototype' : 'final', outlineFile], { cwd: root, encoding: 'utf8', windowsHide: true });
  if (post.status !== 0) throw new Error(`PDF post-processing failed.\n${post.stderr || post.stdout}`);
  console.log(finalPdf);
}

try {
  await ensureServer();
  if (!skipCaptures) captureFigures();
  if (!captureOnly) await printPdf();
} finally {
  if (server && !server.killed) server.kill();
}
