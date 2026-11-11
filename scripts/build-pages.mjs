import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Support clean URLs on static servers without an SPA rewrite.
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const pages = { privacy: '개인정보처리방침', terms: '이용약관', contact: '문의하기' };
for (const [route, title] of Object.entries(pages)) {
  const directory = new URL(`../dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), template.replace(/<title>.*?<\/title>/, `<title>${title} · AMATAcop</title>`));
}
console.log('Static entry points generated: /privacy/, /terms/, /contact/');
