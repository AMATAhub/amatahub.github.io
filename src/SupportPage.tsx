import { Asterisk } from './Artwork';
import './support.css'

type SupportPageProps = {
  page: 'privacy' | 'terms' | 'contact'
  onClose: () => void
}

const titles = {
  privacy: { eyebrow: 'PRIVACY POLICY', title: '개인정보처리방침', description: '당신의 일상만큼, 당신의 정보도 소중하게 생각합니다.' },
  terms: { eyebrow: 'TERMS OF USE', title: '이용안내', description: 'AMATAcop의 작은 가능성을 함께 둘러보기 전에.' },
  contact: { eyebrow: 'LET’S CONNECT', title: '이야기를 기다립니다.', description: '서비스에 대한 생각부터 새로운 협업의 가능성까지.' },
}

export default function SupportPage({ page, onClose }: SupportPageProps) {
  const content = titles[page]

  return (
    <div className="support-page" id="main-content">
      <button className="support-back" onClick={onClose} type="button">
        <span aria-hidden="true">↖</span> 허브로 돌아가기
      </button>
      <header className="support-header">
        <p className="support-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="support-intro">{content.description}</p>
        {page !== 'contact' && <p className="support-date">시행일 · 2026년 11월 11일</p>}
      </header>

      {page === 'privacy' && (
        <div className="support-body">
          <section>
            <h2>01. 이 방침의 적용 범위</h2>
            <p>이 방침은 AMATAcop의 앱, 게임, 웹 서비스를 소개하는 허브 웹사이트에 적용됩니다. 연결된 개별 앱·게임·외부 플랫폼의 개인정보 처리에는 해당 서비스에서 제공하는 별도의 개인정보처리방침이 적용됩니다.</p>
          </section>
          <section>
            <h2>02. 수집하는 정보</h2>
            <p>현재 이 웹사이트는 회원가입, 로그인, 결제 또는 개인정보를 수집하는 문의 양식을 제공하지 않습니다. 웹사이트 안에서 방문자가 개인정보를 직접 제출하는 기능도 없습니다.</p>
            <p>이메일로 문의하시는 경우 발신자 이메일 주소, 문의 내용 및 자발적으로 제공한 정보는 문의 확인과 답변을 위해 처리됩니다. 문의에 필요한 정보만 보내주시고, 비밀번호나 민감정보는 포함하지 말아 주세요.</p>
            <p>웹사이트를 제공하는 호스팅 사업자는 서비스 제공과 보안을 위해 IP 주소, 브라우저 정보, 요청 시각과 같은 접속 기록을 처리할 수 있습니다. 실제 호스팅 환경과 사업자가 확정되면 해당 처리 내역을 반영해 이 방침을 업데이트합니다.</p>
          </section>
          <section>
            <h2>03. 쿠키, 분석 도구와 광고</h2>
            <p>현재 허브에는 분석 도구, 광고 SDK 또는 광고용 쿠키가 적용되어 있지 않으며, 방문자의 광고 식별자를 수집하지 않습니다.</p>
            <p>개별 모바일 앱에서 Google AdMob을 이용하는 경우에는 광고 식별자, 기기 정보 및 광고 상호작용 정보 등이 처리될 수 있습니다. 실제 사용하는 SDK, 처리 항목, 동의와 철회 방법은 해당 앱의 개인정보처리방침에서 확인할 수 있도록 별도로 안내합니다. 이 허브의 방침만으로 개별 앱의 개인정보 처리를 설명하지 않습니다.</p>
          </section>
          <section>
            <h2>04. 외부 서비스로의 이동</h2>
            <p>외부 링크를 선택하면 AMATAcop 허브를 벗어나게 됩니다. 이동한 웹사이트나 앱 마켓의 정보 처리에는 해당 사업자의 정책이 적용되므로 이용 전에 확인해 주세요.</p>
          </section>
          <section>
            <h2>05. 정보의 보관과 권리</h2>
            <p>이메일 문의 정보는 문의 처리에 필요한 기간 동안 보관하며, 처리 목적이 달성되면 삭제합니다. 관련 법령에 따라 보관이 필요한 경우에는 해당 기간 동안 보관할 수 있습니다. 제공하신 정보의 열람, 정정 또는 삭제를 원하시면 아래 연락처로 요청해 주세요.</p>
          </section>
          <section>
            <h2>06. 문의 및 방침 변경</h2>
            <p>개인정보 관련 문의는 AMATAcop 이메일 <a href="mailto:amatacop@gmail.com">amatacop@gmail.com</a>으로 보내주세요. 기능이나 개인정보 처리 방식이 바뀌면 적용 전에 방침과 시행일을 업데이트합니다.</p>
          </section>
          <aside className="support-note">서비스별 개인정보처리방침은 각 서비스가 공개될 때 해당 소개 페이지에서도 연결됩니다.</aside>
        </div>
      )}

      {page === 'terms' && (
        <div className="support-body">
          <section>
            <h2>01. 허브에 대하여</h2>
            <p>AMATAcop 허브는 우리가 만드는 앱, 게임, 웹 플랫폼을 소개하고 각 서비스로 연결하는 공간입니다. 현재 공개된 콘셉트와 준비 중인 프로젝트는 출시 여부, 기능 및 일정이 달라질 수 있습니다.</p>
          </section>
          <section>
            <h2>02. 서비스 이용</h2>
            <p>허브의 콘텐츠는 별도의 회원가입 없이 열람할 수 있습니다. 각 앱·게임·플랫폼을 이용할 때는 해당 서비스의 이용약관, 연령 요건 및 개인정보처리방침을 확인해 주세요.</p>
          </section>
          <section>
            <h2>03. 콘텐츠와 권리</h2>
            <p>이 웹사이트에서 제공하는 브랜드, 디자인과 콘텐츠의 권리는 각 권리자에게 있습니다. 타인의 권리를 침해하거나 서비스 운영을 방해하는 방식으로 콘텐츠를 이용해서는 안 됩니다. 제3자의 서비스명과 상표는 각 권리자에게 귀속됩니다.</p>
          </section>
          <section>
            <h2>04. 정보의 변경</h2>
            <p>소개 내용과 외부 연결은 프로젝트 진행에 따라 변경될 수 있습니다. 외부 서비스의 제공 범위와 운영 여부는 해당 서비스의 안내를 기준으로 확인해 주세요.</p>
          </section>
          <section>
            <h2>05. 문의</h2>
            <p>서비스 이용 및 콘텐츠 관련 문의는 <a href="mailto:amatacop@gmail.com">amatacop@gmail.com</a>으로 보내주세요.</p>
          </section>
        </div>
      )}

      {page === 'contact' && (
        <div className="support-contact">
          <section className="support-contact-card">
            <span className="support-contact-symbol" aria-hidden="true"><Asterisk/></span>
            <p className="support-eyebrow">A CONVERSATION STARTS HERE</p>
            <h2>좋은 연결은,<br />한 통의 메일에서.</h2>
            <p>서비스를 사용하며 떠오른 생각, 궁금한 점, 함께 만들고 싶은 일. 편하게 이야기를 들려주세요.</p>
            <a className="support-email" href="mailto:amatacop@gmail.com">amatacop@gmail.com <span aria-hidden="true">↗</span></a>
            <p className="support-mail-hint">이메일 앱에서 새 메일이 열립니다.</p>
          </section>
          <section className="support-project-link">
            <div>
              <p className="support-eyebrow">BEHIND THE SCENES</p>
              <h2>허브가 만들어지는 곳</h2>
              <p>AMATAhub의 프로젝트 저장소를 살펴보세요.</p>
            </div>
            <a href="https://github.com/AMATAhub/amatahub.github.io" target="_blank" rel="noopener noreferrer">GitHub에서 보기 <span aria-hidden="true">↗</span><span className="support-sr-only"> (새 탭)</span></a>
          </section>
        </div>
      )}
      <footer className="support-footer"><span>AMATAcop</span> Small ideas. Meaningful experiences.</footer>
    </div>
  )
}
