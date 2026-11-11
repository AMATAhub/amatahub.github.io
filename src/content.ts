export type Category = 'apps' | 'games' | 'web';
export interface Project {
  id: string;
  name: string;
  category: Category;
  label: string;
  tagline: string;
  description: string;
  detail: string;
  tags: string[];
  status: 'concept' | 'live';
  url?: string;
}

// Concept previews, not released products. Replace with real products and verified URLs when available.
export const projects: Project[] = [
  { id: 'daily', name: 'Daily', category: 'apps', status: 'concept', label: 'LIFESTYLE APP', tagline: '조금 더 나다운 하루.', description: '복잡함은 덜고, 소중한 일상에 집중하는 도구.', detail: '할 일과 작은 습관을 한곳에 담는 라이프스타일 앱의 콘셉트입니다. 편안한 인터페이스와 꼭 필요한 기능으로 하루의 여유를 만드는 경험을 구상하고 있습니다.', tags: ['라이프스타일', '모바일 앱'] },
  { id: 'orbit', name: 'Orbit', category: 'games', status: 'concept', label: 'CASUAL GAME', tagline: '잠깐의 플레이, 새로운 세계.', description: '가볍게 시작해서 오래 기억되는 즐거움.', detail: '작은 행성 사이를 여행하는 캐주얼 게임의 콘셉트입니다. 짧은 휴식에도 즐길 수 있는 조작과 새로운 세계를 발견하는 재미를 구상하고 있습니다.', tags: ['캐주얼', '모바일 게임'] },
  { id: 'canvas', name: 'Canvas', category: 'web', status: 'concept', label: 'WEB PLATFORM', tagline: '아이디어가 만나는 공간.', description: '흩어진 생각을 연결하고, 가능성을 넓히는 곳.', detail: '아이디어와 참고 자료를 모아 나만의 공간을 만드는 웹 플랫폼의 콘셉트입니다. 흩어진 생각이 다음 프로젝트로 이어지는 경험을 구상하고 있습니다.', tags: ['크리에이티브', '웹 플랫폼'] },
];

export const categoryLabels: Record<Category, string> = { apps: '앱', games: '게임', web: '웹 · 플랫폼' };
