import { ArrowUpRight, Check, Plus, Sparkles, Play, Layers, Smile, Sun } from 'lucide-react';

export function Asterisk() {
  return <svg width="1em" height="1em" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <rect key={index} x="45" y="6" width="10" height="40" rx="5" transform={`rotate(${index * 45} 50 50)`}/>)}<circle cx="50" cy="50" r="9"/></svg>;
}

export function BrandMark({ className = '' }: { className?: string }) {
  return <svg className={className} width="33" height="33" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M5 51 25 9h14l20 42H43L32 26 21 51Z" fill="currentColor"/><circle cx="32" cy="50" r="5" fill="currentColor"/></svg>;
}

export function HeroArtwork() {
  return <div className="hero-art" aria-hidden="true">
    <div className="art-grid" />
    <div className="orbit-circle orbit-circle-one" /><div className="orbit-circle orbit-circle-two" />
    <span className="art-coordinate coordinate-top">EXPERIMENT. CREATE. CONNECT.</span>
    <span className="art-coordinate coordinate-bottom">A WORLD OF POSSIBILITIES ↗</span>
    <div className="tiny-plus plus-one">+</div><div className="tiny-plus plus-two">+</div>
    <div className="hero-core">
      <svg viewBox="0 0 360 380" className="sculpture">
        <defs>
          <linearGradient id="orange-face" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffbe89"/><stop offset=".38" stopColor="#ff8846"/><stop offset="1" stopColor="#ed592b"/></linearGradient>
          <linearGradient id="orange-side" x1="0" y1="0" x2="1" y2=".3"><stop stopColor="#b9401e"/><stop offset="1" stopColor="#e96930"/></linearGradient>
          <linearGradient id="orange-bottom" x1="0" y1="0" x2=".4" y2="1"><stop stopColor="#ffb47b"/><stop offset="1" stopColor="#f4703d"/></linearGradient>
          <radialGradient id="orb"><stop stopColor="#ffd4ae"/><stop offset=".5" stopColor="#ff9b61"/><stop offset="1" stopColor="#e8632f"/></radialGradient>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
        </defs>
        <ellipse cx="182" cy="335" rx="120" ry="17" fill="#a44e28" opacity=".18" filter="url(#soft-shadow)"/>
        <path d="m61 277 95-212 55-13 110 221-35 32-75-161-76 161Z" fill="url(#orange-side)"/>
        <path d="m27 283 95-212 54-14 110 248-72 1-66-155-58 141Z" fill="url(#orange-face)"/>
        <path d="m27 283 34-6 74 28-45-13Z" fill="url(#orange-bottom)"/>
        <path d="m122 71 34-6 55-13-35 5Z" fill="#ffd4a5"/>
        <path d="m214 306 72-1 35-32-72 2Z" fill="#cd4d25"/>
        <ellipse cx="159" cy="285" rx="27" ry="29" transform="rotate(-18 159 285)" fill="url(#orb)"/>
        <path d="m122 72 54-14 109 247" fill="none" stroke="#ffd0a3" strokeOpacity=".7" strokeWidth="1.5"/>
      </svg>
    </div>
    <div className="floating-label label-app"><span className="label-icon"><Layers size={15}/></span> Made for everyday <span className="label-dot"/></div>
    <div className="floating-label label-game"><span className="game-label-icon"><Play size={13} fill="currentColor"/></span> A little more play.</div>
    <div className="float-app-icon app-icon-green"><Smile size={36} strokeWidth={1.5}/></div>
    <div className="float-app-icon app-icon-purple"><Sparkles size={35} fill="currentColor" strokeWidth={1}/></div>
    <div className="float-app-icon app-icon-cream"><ArrowUpRight size={38} strokeWidth={1.5}/></div>
    <div className="small-sphere sphere-orange"/><div className="small-sphere sphere-green"/>
    <span className="sparkle-one"><Asterisk/></span>
  </div>;
}

export function ProjectArtwork({ kind }: { kind: string }) {
  if (kind === 'daily') return <div className="project-art daily-art" aria-hidden="true"><span className="daily-large-circle"/><div className="daily-decor">a little<br/>better, daily.</div><div className="daily-phone"><div className="phone-camera"/><div className="phone-greeting">MONDAY, 24 <Sun size={14}/></div><div className="phone-title">Hello, today <span><Asterisk/></span></div><div className="phone-subtitle">나만의 속도로, 좋은 하루.</div><div className="daily-progress"><div className="progress-copy"><span>오늘의 작은 성취</span><strong>3 <small>/ 5</small></strong></div><div className="progress-flower"><Asterisk/></div></div><div className="phone-task"><span className="check-circle"><Check size={10}/></span>아침 햇살과 스트레칭</div><div className="phone-task"><span className="check-circle"><Check size={10}/></span>나를 위한 책 10페이지</div><div className="phone-task"><span className="empty-circle"/>산책하며 생각 정리하기</div><div className="phone-bottom"><span>오늘</span><span>기록</span><Plus size={16}/></div></div><div className="daily-small-tag"><Check size={13}/> Small steps, big changes.</div></div>;
  if (kind === 'orbit') return <div className="project-art orbit-art" aria-hidden="true"><div className="game-stars"/><div className="game-orbit orbit-a"/><div className="game-orbit orbit-b"/><span className="planet planet-one"/><span className="planet planet-two"/><span className="planet planet-three"/><span className="orbit-spark star-a">✧</span><span className="orbit-spark star-b">✦</span><div className="orbit-game-title">orbit<span>A SMALL ADVENTURE</span></div><div className="game-character"><span/><span/></div><div className="orbit-play"><Play size={10} fill="currentColor"/> LET’S PLAY</div><span className="game-floor"/></div>;
  return <div className="project-art canvas-art" aria-hidden="true"><div className="canvas-dot-grid"/><div className="canvas-window"><div className="canvas-window-bar"><div><i/><i/><i/></div><span>your canvas, your ideas.</span><Plus size={10}/></div><div className="canvas-content"><div className="canvas-title">A space for<br/><i>what’s next.</i><span>↗</span></div><div className="canvas-blocks"><div className="moodboard"><span>MOODBOARD</span><div className="mood-shape"/></div><div className="canvas-note">Make room<br/>for good ideas.<span><Asterisk/></span></div></div></div></div><div className="canvas-pointer"><svg width="18" height="20" viewBox="0 0 18 20"><path d="m2 1 13 10-7 1-3 7Z" fill="#f2764f" stroke="#fff" strokeWidth="1.5"/></svg><span>You</span></div></div>;
}
