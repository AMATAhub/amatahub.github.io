import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, X, Menu, Globe2, Smartphone, Gamepad2, Sparkles, Plus, Check } from 'lucide-react';
import { BrandMark, HeroArtwork, ProjectArtwork, Asterisk } from './Artwork';
import { projects, categoryLabels } from './content';
import type { Category, Project } from './content';
import SupportPage from './SupportPage';
import { getPage, sitePath } from './routes';
import type { Page } from './routes';

const countLabel = (count: number) => String(count).padStart(2, '0');

function App() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState<Page | null>(getPage);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const hasConcepts = projects.some(project => project.status === 'concept');
  const allConcepts = projects.every(project => project.status === 'concept');
  const filtered = projects.filter(project => filter === 'all' || project.category === filter);

  useEffect(() => {
    const onPop = () => { setPage(getPage()); setMenuOpen(false); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = page ? `${{ privacy: '개인정보처리방침', terms: '이용약관', contact: '문의하기' }[page]} · AMATAcop` : 'AMATAcop — 작은 생각, 새로운 가능성';
  }, [page]);

  useEffect(() => {
    if (selected) {
      const opener = document.activeElement as HTMLElement | null;
      modalRef.current?.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
        window.requestAnimationFrame(() => opener?.focus({ preventScroll: true }));
      };
    }
  }, [selected]);

  function navigate(next: Page | null) {
    window.history.pushState(null, '', sitePath(next ?? ''));
    setPage(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function section(id: string) {
    if (page) { window.history.pushState(null, '', sitePath(`#${id}`)); setPage(null); }
    setMenuOpen(false);
    window.setTimeout(() => {
      const target = document.getElementById(id);
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  const pageLink = (event: React.MouseEvent<HTMLAnchorElement>, next: Page | null) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigate(next);
  };

  const sectionLink = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); section(id);
  };

  return <>
    <a className="skip-link" href="#main">본문으로 바로가기</a>
    <header className="site-header"><div className="header-inner">
      <a className="brand" href={sitePath('')} aria-label="AMATAcop 홈" onClick={event => pageLink(event, null)}><BrandMark/><span>AMATA<span className="brand-light">cop</span><span className="brand-period">.</span></span></a>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="주요 메뉴">
        <a href={sitePath('#projects')} onClick={event => sectionLink(event, 'projects')}>프로젝트 <span>{countLabel(projects.length)}</span></a>
        <a href={sitePath('#about')} onClick={event => sectionLink(event, 'about')}>스튜디오 소개</a>
        <a href={sitePath('#updates')} onClick={event => sectionLink(event, 'updates')}>새로운 소식</a>
      </nav>
      <a className="header-contact" href={sitePath('contact')} onClick={event => pageLink(event, 'contact')}>함께 이야기해요 <ArrowUpRight size={15}/></a>
      <button className="menu-button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </div></header>

    {page ? <main id="main"><SupportPage page={page} onClose={() => navigate(null)}/></main> : <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> SMALL IDEAS. NEW POSSIBILITIES.</div>
          <h1 id="hero-title">작은 생각에서,<br/>더 <span className="orange-word">넓은 세상</span>으로<span className="hero-stop">.</span></h1>
          <p className="hero-description">일상에 쓸모를, 경험에 즐거움을.<br/>AMATAcop은 앱과 게임, 웹을 통해 새로운 가능성을 만듭니다.</p>
          <a className="button button-dark" href="#projects">우리의 프로젝트 <ArrowUpRight size={18}/></a>
          <div className="hero-footnote"><span className="mini-icons"><span><Smartphone size={15}/></span><span><Gamepad2 size={17}/></span><span><Globe2 size={16}/></span></span><span>Different experiences.<br/><strong>One connected world.</strong></span></div>
        </div>
        <HeroArtwork/>
        <div className="hero-bottom"><span>INDEPENDENT BY NATURE. CREATIVE BY CHOICE.</span><a href="#projects">SCROLL TO EXPLORE <ArrowDown size={13}/></a></div>
      </section>

      <div className="disciplines"><div className="container disciplines-inner"><span>생각을 넘어, 경험으로.</span><div><Smartphone size={18}/> APPS <i><Asterisk/></i> <Gamepad2 size={20}/> GAMES <i><Asterisk/></i> <Globe2 size={18}/> WEB & PLATFORMS</div><span>BUILT WITH CURIOSITY ↗</span></div></div>

      <section id="projects" className="projects-section container" aria-labelledby="projects-title">
        <div className="section-label"><span className="orange-line"/> OUR PROJECTS <span className="section-number">01 — {countLabel(projects.length)}</span></div>
        <div className="section-heading"><div><h2 id="projects-title">다양한 모습, 같은 호기심.</h2><p>우리의 아이디어가 일상과 만나는 방법을 소개합니다.</p></div><span className="project-note"><span className="status-dot"/> {allConcepts ? '지금, 새로운 경험을 준비 중이에요' : '우리의 새로운 경험을 만나보세요'}</span></div>
        <div className="project-toolbar"><div className="filter-tabs" role="group" aria-label="프로젝트 카테고리">{(['all', 'apps', 'games', 'web'] as const).map(category => <button key={category} className={filter === category ? 'filter-tab active' : 'filter-tab'} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category === 'all' ? '전체' : categoryLabels[category]}<span>{countLabel(category === 'all' ? projects.length : projects.filter(project => project.category === category).length)}</span></button>)}</div><span className="concept-caption">A GLIMPSE OF WHAT’S NEXT</span></div>
        <div className="projects-grid" aria-live="polite">{filtered.map(project => <article className="project-card" key={project.id}>
          <button className="project-visual-button" data-category={project.category} onClick={() => setSelected(project)} aria-label={`${project.name} ${project.status === 'concept' ? '콘셉트 ' : ''}자세히 보기`}><ProjectArtwork kind={project.id}/><span className="visual-badge">{project.status === 'concept' ? 'CONCEPT PREVIEW' : 'EXPLORE PROJECT'}</span><span className="visual-open"><ArrowUpRight size={19}/></span></button>
          <div className="project-meta"><span>{project.label}</span><span className="coming-soon">{project.status === 'concept' ? '준비 중' : '서비스 중'}</span></div>
          <button className="project-title-button" onClick={() => setSelected(project)}><h3>{project.name}<span>{project.tagline}</span></h3><ArrowUpRight size={20}/></button>
          <p className="project-description">{project.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </article>)}</div>
        {hasConcepts && <p className="concept-disclaimer"><Sparkles size={13}/> {allConcepts ? '위 프로젝트는 앞으로의 방향을 보여주는 콘셉트입니다. 실제 서비스는 출시와 함께 소개할게요.' : 'CONCEPT PREVIEW로 표시된 프로젝트는 앞으로의 방향을 보여주는 콘셉트이며, 아직 출시되지 않았습니다.'}</p>}
      </section>

      <section id="about" className="about-section container" aria-labelledby="about-title"><div className="about-art" aria-hidden="true"><div className="about-small-label">THE WAY WE CREATE</div><div className="about-sticker sticker-ideas">Ideas<span>시작은 작은 호기심</span><span className="sticker-star"><Asterisk/></span></div><div className="about-sticker sticker-life">Life<span>일상에 스며드는 경험</span><span className="sticker-arrow">↗</span></div><span className="about-art-footer">A LITTLE DIFFERENT. A LITTLE BETTER.</span></div><div className="about-copy"><div className="section-label"><span className="orange-line"/> THE STUDIO</div><h2 id="about-title">만드는 즐거움이,<br/>쓰는 즐거움으로.</h2><p>“이런 게 있으면 조금 더 좋지 않을까?”<br/>AMATAcop은 그 작은 질문에서 출발합니다.</p><p>매일 꺼내 쓰고 싶은 앱, 잠시 빠져들고 싶은 게임,<br className="desktop-break"/> 새로운 연결이 시작되는 플랫폼.<br/>형태는 달라도, 더 좋은 경험을 향한 마음은 같습니다.</p><div className="studio-principles"><span><Plus size={13}/>작게 시작하고</span><span><Plus size={13}/>즐겁게 만들고</span><span><Plus size={13}/>함께 연결해요</span></div></div></section>

      <section id="updates" className="updates-section container" aria-labelledby="updates-title"><div className="updates-heading"><div className="section-label"><span className="orange-line"/> WHAT’S NEW</div><h2 id="updates-title">우리의 다음 이야기.</h2><p>작은 시작부터 새로운 소식까지.</p></div><div className="update-list"><button className="update-row" aria-expanded={noticeOpen} onClick={() => setNoticeOpen(!noticeOpen)}><div><span className="update-category">STUDIO NOTE</span><h3>AMATAcop의 새로운 연결 공간을 소개합니다.</h3><span className="update-summary">우리의 앱, 게임, 웹을 한곳에서 만나는 곳.</span></div><span className={noticeOpen ? 'update-arrow expanded' : 'update-arrow'}>{noticeOpen ? <X size={19}/> : <ArrowUpRight size={21}/>}</span></button>{noticeOpen && <div className="update-detail"><p>AMATAcop 허브에 오신 것을 환영합니다. 이 공간에서 우리가 만드는 서비스와 그 안에 담긴 생각을 차근차근 소개할 예정입니다.</p><p>새로운 프로젝트의 콘셉트와 출시 소식을 이곳에서 소개합니다. 서비스 이용 링크는 각 프로젝트의 상세 보기에서 확인할 수 있습니다.</p><span><Check size={14}/> 다음 소식도 이곳에서 만나요.</span></div>}</div></section>

      <section className="contact-section container"><div className="contact-banner"><div><span className="section-label">LET’S MAKE SOMETHING GOOD.</span><h2>좋은 연결은, 작은 인사에서.</h2><p>새로운 아이디어도, 따뜻한 피드백도 언제나 반갑습니다.</p></div><a className="button button-white" href={sitePath('contact')} onClick={event => pageLink(event, 'contact')}>이야기 나누기 <ArrowUpRight size={18}/></a><span className="contact-decoration" aria-hidden="true"><Asterisk/></span></div></section>
    </main>}

    <footer className="site-footer container"><div className="footer-top"><div><a className="brand footer-brand" href={sitePath('')} onClick={event => pageLink(event, null)}><BrandMark/><span>AMATA<span className="brand-light">cop</span><span className="brand-period">.</span></span></a><p>Small ideas. New possibilities.</p></div><div className="footer-links"><a href={sitePath('privacy')} onClick={event => pageLink(event, 'privacy')}>개인정보처리방침</a><a href={sitePath('terms')} onClick={event => pageLink(event, 'terms')}>이용약관</a><a href={sitePath('contact')} onClick={event => pageLink(event, 'contact')}>문의하기 <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AMATAcop. All rights reserved.</span><span><span className="status-dot"/> MADE WITH CURIOSITY & A LITTLE PLAY.</span><a href="https://github.com/AMATAhub/amatahub.github.io" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12}/></a></div></footer>

    {selected && <dialog ref={modalRef} className="project-dialog" aria-labelledby="dialog-title" onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}><button className="dialog-close" aria-label="상세 보기 닫기" onClick={() => setSelected(null)}><X size={20}/></button><ProjectArtwork kind={selected.id}/><div className="dialog-content"><div className="project-meta"><span>{selected.label}</span><span className="coming-soon">{selected.status === 'concept' ? '콘셉트 미리보기' : '서비스 중'}</span></div><h2 id="dialog-title">{selected.name}</h2><h3>{selected.tagline}</h3><p>{selected.detail}</p>{selected.status === 'concept' && <div className="dialog-notice"><Sparkles size={18}/><span>아직 출시되지 않은 콘셉트입니다.<br/>출시 일정과 서비스 링크는 추후 안내합니다.</span></div>}{selected.status === 'live' && selected.url ? <a className="button button-dark" href={selected.url} target="_blank" rel="noreferrer">서비스 방문하기 <ArrowUpRight size={16}/></a> : <button className="dialog-return" onClick={() => setSelected(null)}>다른 프로젝트 둘러보기 <ArrowRight size={15}/></button>}</div></dialog>}
  </>;
}

export default App;
