import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, expect } from '@playwright/test';

const project = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(project, 'dist');
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
const script = html.match(/<script\b[^>]*\bsrc="([^"]+)"/i)?.[1];
assert(script?.startsWith('/'), 'Build output must contain an absolute Vite script URL.');
const assetIndex = script.indexOf('/assets/');
assert(assetIndex >= 0, 'Cannot determine the deployment base from the build assets.');
const base = script.slice(0, assetIndex + 1);
assert.equal(base, '/', 'amatahub.github.io must be built for the domain root.');
const sellerRecord = 'google.com, pub-8897970860290371, DIRECT, f08c47fec0942fa0';
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

// Serve real files only: this deliberately does not provide an SPA fallback.
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405).end();
      return;
    }
    if (base !== '/' && pathname === base.slice(0, -1)) {
      response.writeHead(301, { Location: `${base}${url.search}` }).end();
      return;
    }
    const inProject = pathname.startsWith(base);
    const directory = inProject ? dist : null;
    if (!directory) {
      response.writeHead(404).end('Not found');
      return;
    }
    const relative = inProject ? pathname.slice(base.length) : pathname.replace(/^\/+/, '');
    let filename = resolve(directory, relative || '.');
    if (filename !== directory && !filename.startsWith(`${directory}${sep}`)) {
      response.writeHead(403).end();
      return;
    }
    const info = await stat(filename);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith('/')) {
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
        return;
      }
      filename = resolve(filename, 'index.html');
    }
    const body = await readFile(filename);
    response.writeHead(200, { 'Content-Type': contentTypes[extname(filename)] || 'application/octet-stream' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500).end('Not found');
  }
});

let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveListen);
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const site = `${origin}${base}`;
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  const badResponses = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
  });

  async function checkLinks() {
    const links = await page.locator('a[href]').evaluateAll(anchors => anchors
      .map(anchor => new URL(anchor.href))
      .filter(url => url.origin === window.location.origin)
      .map(url => url.pathname));
    assert(links.length > 0, 'No internal links found.');
    for (const pathname of links) assert(pathname.startsWith(base), `Internal link escapes deployment base: ${pathname}`);
  }

  const routes = [
    ['', '작은 생각에서'],
    ['privacy/', '개인정보처리방침'],
    ['terms/', '이용안내'],
    ['contact/', '이야기를 기다립니다.'],
  ];
  for (const [route, heading] of routes) {
    const response = await page.goto(`${site}${route}`);
    assert.equal(response.status(), 200, `Direct route failed: ${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
    await page.evaluate(() => document.fonts.ready);
    await checkLinks();
    if (route) {
      const reloaded = await page.reload();
      assert.equal(reloaded.status(), 200);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
      await page.evaluate(() => document.fonts.ready);
      const redirect = await page.request.get(`${site}${route.slice(0, -1)}`, { maxRedirects: 0 });
      assert.equal(redirect.status(), 301);
      assert.equal(redirect.headers().location, `${base}${route}`);
    }
  }
  console.log(`PASS static direct routes, reloads, slash redirects and links at ${base}`);

  await page.goto(site);
  await page.getByRole('link', { name: '개인정보처리방침', exact: true }).click();
  assert.equal(new URL(page.url()).pathname.replace(/\/$/, ''), `${base}privacy`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('개인정보처리방침');
  await page.getByRole('link', { name: '문의하기', exact: true }).click();
  assert.equal(new URL(page.url()).pathname.replace(/\/$/, ''), `${base}contact`);
  await expect(page.getByRole('link', { name: /amatacop@gmail.com/ })).toHaveAttribute('href', 'mailto:amatacop@gmail.com');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('개인정보처리방침');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('이야기를 기다립니다.');
  await page.getByRole('button', { name: /허브로 돌아가기/ }).click();
  assert.equal(new URL(page.url()).pathname, base);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('작은 생각에서');
  await page.getByRole('link', { name: '개인정보처리방침', exact: true }).click();
  await page.getByRole('navigation').getByRole('link', { name: /프로젝트/ }).click();
  await expect(page.locator('#projects')).toBeFocused();
  assert.equal(new URL(page.url()).pathname, base);
  assert.equal(new URL(page.url()).hash, '#projects');
  console.log('PASS navigation, history, email and section links');

  async function checkSeller(url) {
    const response = await page.request.get(url);
    assert.equal(response.status(), 200);
    assert(response.headers()['content-type'].startsWith('text/plain'));
    assert.equal((await response.text()).trim(), sellerRecord);
  }
  await checkSeller(`${site}app-ads.txt`);
  const missing = await page.request.get(`${site}does-not-exist`);
  assert.equal(missing.status(), 404, 'Server must not hide missing files behind an SPA fallback.');
  assert.deepEqual(errors, [], 'Browser runtime errors occurred.');
  assert.deepEqual(badResponses, [], 'Page assets or fonts failed to load.');
  console.log('PASS domain-root seller text, assets and fonts; no runtime errors');
} finally {
  if (browser) await browser.close();
  await new Promise((resolveClose, reject) => {
    server.close(error => error ? reject(error) : resolveClose());
    server.closeAllConnections();
  });
}
