import { test, expect } from '@playwright/test';

test('home renders all concepts without browser errors or desktop overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('작은 생각에서');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.getByText('위 프로젝트는 앞으로의 방향을 보여주는 콘셉트입니다.', { exact: false })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: '/tmp/amata-desktop.png', fullPage: true, animations: 'disabled' });
  for (const width of [320, 600, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `horizontal overflow at ${width}px`).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('category filtering opens the relevant concept, Escape restores focus, and all restores the list', async ({ page }) => {
  await page.goto('/');
  const filters = page.getByRole('group', { name: '프로젝트 카테고리' });
  await filters.getByRole('button', { name: /^게임/ }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  const orbitButton = page.getByRole('button', { name: 'Orbit 콘셉트 자세히 보기' });
  await orbitButton.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Orbit', exact: true })).toBeVisible();
  await expect(dialog.getByText('아직 출시되지 않은 콘셉트입니다.', { exact: false })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(orbitButton).toBeFocused();
  await filters.getByRole('button', { name: /^앱/ }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  const dailyButton = page.getByRole('button', { name: 'Daily 콘셉트 자세히 보기' });
  await dailyButton.click();
  await page.getByRole('button', { name: '상세 보기 닫기' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(dailyButton).toBeFocused();
  await filters.getByRole('button', { name: /^웹/ }).click();
  await expect(page.getByRole('button', { name: 'Canvas 콘셉트 자세히 보기' })).toBeVisible();
  await filters.getByRole('button', { name: /^전체/ }).click();
  await expect(page.locator('.project-card')).toHaveCount(3);
});

test('studio news opens and closes the full article', async ({ page }) => {
  await page.goto('/');
  const article = page.getByRole('button', { name: /AMATAcop의 새로운 연결 공간을 소개합니다/ });
  await expect(article).toHaveAttribute('aria-expanded', 'false');
  await article.click();
  await expect(article).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('다음 소식도 이곳에서 만나요.')).toBeVisible();
  await article.click();
  await expect(page.getByText('다음 소식도 이곳에서 만나요.')).toHaveCount(0);
});

test('privacy and contact navigation support browser history and direct URLs', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '개인정보처리방침', exact: true }).click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole('heading', { level: 1, name: '개인정보처리방침' })).toBeVisible();
  await page.getByRole('link', { name: '문의하기', exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('link', { name: /amatacop@gmail.com/ })).toHaveAttribute('href', 'mailto:amatacop@gmail.com');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1, name: '개인정보처리방침' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: '개인정보처리방침' })).toBeVisible();
  await page.goto('/terms');
  await expect(page.getByRole('heading', { level: 1, name: '이용안내' })).toBeVisible();
  await page.getByRole('button', { name: /허브로 돌아가기/ }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('작은 생각에서');
});

test('AdMob seller record is available as plain text at the domain root', async ({ request }) => {
  const response = await request.get('/app-ads.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/plain');
  expect((await response.text()).trim()).toBe('google.com, pub-8897970860290371, DIRECT, f08c47fec0942fa0');
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('User-agent: *');
});

test('mobile menu, projects and supporting pages fit a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toBeHidden();
  await page.getByRole('button', { name: '메뉴 열기' }).click();
  await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: /프로젝트/ }).click();
  await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toBeHidden();
  await expect(page.locator('#projects')).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: '/tmp/amata-mobile.png', fullPage: true, animations: 'disabled' });
  await page.getByRole('link', { name: '문의하기', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: '이야기를 기다립니다.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto('/privacy');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
