# AMATAcop Hub

AMATAcop의 앱·게임·웹 플랫폼을 소개하는 한국어 반응형 허브입니다. React 19, TypeScript, Vite로 제작했습니다. 글꼴과 그래픽을 자체 제공하며, 외부 분석 도구·광고 SDK·회원가입·데이터베이스는 사용하지 않습니다.

## 개발 및 검증

Node.js 22.12 이상 또는 24 LTS를 사용하세요. 검증 환경은 Node.js 24입니다.

```sh
cd /workspace/AMATAhub
npm ci --cache /tmp/amata-npm-cache
npm run dev
```

```sh
npm run build
npm test
```

- 빌드: TypeScript 검사 후 `dist/` 생성. `/privacy/`, `/terms/`, `/contact/` 정적 진입점도 생성합니다.
- 테스트: 실제 Chromium에서 필터·상세 창·키보드 포커스·소식·정책 페이지·문의 이메일·모바일 레이아웃·AdMob 파일을 검증합니다.
- Chromium: 클라우드의 `/usr/bin/chromium`을 사용합니다. 다른 환경에서는 `npx playwright install chromium`으로 설치하거나 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`를 지정하세요.
- `npm run preview`: 프로덕션 빌드의 로컬 검토용입니다.
- 이 클라우드 작업은 이미 격리되어 있습니다. 기존 체크아웃을 사용하며, 별도 Git worktree를 만들 필요가 없습니다.

## 서비스 정보 수정

`src/content.ts`에서 프로젝트명, 분류, 설명, 태그를 관리합니다. 현재 Daily, Orbit, Canvas는 출시 제품이 아니라 **콘셉트 미리보기**입니다. 실제 서비스가 확정되면 콘텐츠와 `status: 'live'`, 검증된 HTTPS `url`을 설정하세요. 상세 창에 서비스 방문 버튼이 표시됩니다. 카테고리별 개수는 데이터에서 자동 계산합니다.

- 메인 디자인: `src/App.tsx`, `src/styles.css`
- 자체 제작 그래픽: `src/Artwork.tsx`
- 개인정보처리방침·이용안내·문의: `src/SupportPage.tsx`
- 문의 주소: `amatacop@gmail.com` (`mailto:` 링크, 전송 서버 없음)
- 메타데이터: `index.html`

## GitHub Pages 배포

- 저장소: **https://github.com/AMATAhub/amatahub.github.io**
- 사이트: **https://amatahub.github.io/**

1. 새 저장소에서 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
2. 프로젝트 파일과 `.github/workflows/deploy-pages.yml`을 `main` 브랜치에 반영합니다.
3. **Actions → Deploy AMATAcop to GitHub Pages**의 성공 여부를 확인합니다. 수동 실행은 **Run workflow**를 사용합니다.
4. 배포 후 홈페이지와 `/privacy/`, `/terms/`, `/contact/`를 확인합니다.

워크플로는 의존성 설치, 브라우저 테스트, 빌드, 정적 경로 검증을 거쳐 `dist/`를 배포합니다. GitHub가 제공하는 워크플로 토큰을 사용하므로 별도 PAT나 배포 비밀키는 필요하지 않습니다. 저장소에서 Pages와 Actions 사용이 허용되어 있어야 합니다.

이 저장소는 계정 사이트이므로 배포 경로는 `/`입니다. 이미지·글꼴·파비콘·내부 페이지 링크도 루트 경로를 사용합니다. 정책 페이지에는 실제 HTML 진입점이 있어 직접 접근하거나 새로고침해도 열립니다.

로컬에서 배포용 빌드와 정적 경로를 검증하려면:

```sh
npm run build:pages
npm run test:pages
```

`npm run build:pages`는 `npm run build`와 같은 루트용 빌드입니다. 설정과 로컬 테스트 완료가 실제 GitHub 배포 완료를 의미하지는 않으므로, 최종 공개 상태는 Actions 실행 결과와 사이트에서 확인하세요.

## AdMob

허브와 광고 판매자 파일을 **같은 저장소에서 함께 배포**합니다. 별도 루트 저장소나 추가 배포 파일은 필요하지 않습니다.

`public/app-ads.txt`가 빌드 결과의 `dist/app-ads.txt`로 복사되며, 공개 주소는 **https://amatahub.github.io/app-ads.txt** 입니다.

```text
google.com, pub-8897970860290371, DIRECT, f08c47fec0942fa0
```

배포 후 다음을 확인하세요.

1. 위 주소가 로그인 없이 HTTP 200과 HTML이 아닌 위의 일반 텍스트를 반환하는지 확인합니다.
2. Google Play/App Store의 개발자 웹사이트를 **https://amatahub.github.io/**로 설정합니다.
3. AdMob의 app-ads.txt 화면에서 크롤링·확인 상태를 점검합니다. 파일 배포가 Google의 인증 완료를 의미하지는 않습니다.

AdMob은 모바일 앱 광고용이며, 이 웹사이트에 광고 SDK나 AdSense를 삽입하지 않았습니다. 앱별 실제 SDK·광고 식별자·동의 방식에 맞는 개인정보처리방침도 별도로 제공해야 합니다. 허브의 개인정보처리방침은 허브 자체에만 적용됩니다.
