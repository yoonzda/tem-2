/**
 * Global State Management Store for Web Builder Studio
 * Supports Smart Live Sync across all steps & Clean Reset-on-Reload policy
 */

const STORAGE_KEY = 'WEB_BUILDER_STUDIO_STATE_V3';

const DEFAULT_STATE = {
  currentStep: 0,
  maxStepReached: 0,
  techStack: null, // 'php' | 'static' | 'node' (null initially for Toss-style progressive onboarding)
  siteInfo: {
    siteTitle: '',
    companyName: '',
    companyNameEn: '',
    ownerName: '',
    bizNum: '',
    phone: '',
    address: '',
    charset: 'UTF-8'
  },
  adminAuth: {
    adminId: '',
    adminPw: ''
  },
  menus: [
    {
      id: 'm1',
      name: '회사 소개',
      submenus: [
        { id: 's1_1', name: '기업 개요' },
        { id: 's1_2', name: 'CEO 인사말' },
        { id: 's1_3', name: '연혁' },
        { id: 's1_4', name: '조직도' },
        { id: 's1_5', name: '오시는 길' }
      ]
    },
    {
      id: 'm2',
      name: '사업 분야',
      submenus: [
        { id: 's2_1', name: '주요 사업 소개' },
        { id: 's2_2', name: '솔루션 및 서비스' },
        { id: 's2_3', name: '주요 실적' }
      ]
    },
    {
      id: 'm3',
      name: '홍보 센터',
      submenus: [
        { id: 's3_1', name: '공지사항' },
        { id: 's3_2', name: '월간 일정' },
        { id: 's3_3', name: '홍보 갤러리' }
      ]
    },
    {
      id: 'm4',
      name: '고객 지원',
      submenus: [
        { id: 's4_1', name: '온라인 문의' },
        { id: 's4_2', name: '자주 묻는 질문' },
        { id: 's4_3', name: '자료실' }
      ]
    }
  ],
  pageOptions: {
    's1_1': { type: 'about', options: { layout: 'subtab', sections: ['greeting', 'vision'] } },
    's1_2': { type: 'about', options: { layout: 'subtab', sections: ['greeting'] } },
    's1_3': { type: 'history', options: { layout: 'vertical_timeline', interactive: true } },
    's1_4': { type: 'org', options: { layout: 'department_list', showAvatar: true, showContact: true } },
    's1_5': { type: 'map', options: { mode: 'address', transitInfo: true } },
    's2_1': { type: 'about', options: { layout: 'subtab', sections: ['greeting', 'vision'] } },
    's2_2': { type: 'board', options: { layout: 'card', attach: false, search: true, perPage: 10 } },
    's2_3': { type: 'gallery', options: { cols: 3, lightbox: true, ratio: '16:9' } },
    's3_1': { type: 'board', options: { layout: 'table', attach: true, search: true, perPage: 10 } },
    's3_2': { type: 'calendar', options: { view: 'month' } },
    's3_3': { type: 'gallery', options: { cols: 3, lightbox: true, ratio: '16:9' } },
    's4_1': { type: 'contact', options: { purpose: 'consult', fields: ['name', 'phone', 'email', 'content', 'terms'] } },
    's4_2': { type: 'faq', options: { categories: ['전체', '이용안내', '비용/환불', '기타'], mode: 'single', search: true } },
    's4_3': { type: 'download', options: { layout: 'card_grid', search: true, perPage: 9 } }
  },
  features: {
    kakaoChat: { enabled: false, channelUrl: '' },
    mapApi: { enabled: false, address: '' },
    mobileQuickbar: { enabled: false, items: ['call', 'kakao', 'map', 'inquiry', 'top'] },
    mainPopup: { enabled: false, title: '', content: '' },
    topBanner: { enabled: false, message: '' },
    snsLinks: { enabled: false, instagram: '', youtube: '', blog: '', facebook: '' },
    smtpMail: { enabled: false, receiverEmail: '' },
    adminConsole: { enabled: false },
    membership: { enabled: false },
    seo: { enabled: false, description: '' }
  },
  customContent: {
    heroSlogan: '미래를 선도하는 스마트 비즈니스 파트너',
    heroDesc: '최고의 전문성과 차별화된 기술력으로 고객의 가치를 극대화합니다. 지금 바로 함께 성장하는 비즈니스를 시작해보세요.'
  },
  subPageDescriptions: {},
  categoryDescriptions: {},
  uploadedAssets: {}
};

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  /**
   * Reset-on-Reload Policy:
   * Always clear localStorage and start with clean empty fields at Step 0 on initial page load / refresh.
   */
  loadState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('WEB_BUILDER_STUDIO_STATE_V1');
      localStorage.removeItem('WEB_BUILDER_LOCAL_APPLIES_V1');
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  updateState(partialState) {
    this.state = {
      ...this.state,
      ...partialState
    };

    // If menus were updated, automatically sync pageOptions
    if (partialState.menus) {
      this.syncPageOptions();
    }

    this.saveState();
  }

  /**
   * Smart Live Sync: Ensures every submenu in menus has a valid pageOption,
   * and prunes obsolete entries for deleted submenus.
   */
  syncPageOptions() {
    const menus = this.state.menus || [];
    const existingOptions = this.state.pageOptions || {};
    const updatedOptions = {};

    menus.forEach(main => {
      (main.submenus || []).forEach(sub => {
        if (existingOptions[sub.id]) {
          updatedOptions[sub.id] = existingOptions[sub.id];
        } else {
          const name = sub.name || '';
          let defaultType = 'about';
          let defaultOptions = { layout: 'subtab', sections: ['greeting'] };

          if (name.includes('연혁') || name.includes('발자취') || name.includes('히스토리') || name.includes('history')) {
            defaultType = 'history';
            defaultOptions = { layout: 'vertical_timeline', interactive: true };
          } else if (name.includes('조직도') || name.includes('임직원') || name.includes('구성원') || name.includes('조직') || name.includes('members') || name.includes('org')) {
            defaultType = 'org';
            defaultOptions = { layout: 'department_list', showAvatar: true, showContact: true };
          } else if (name.includes('진료과목') || name.includes('사업') || name.includes('솔루션') || name.includes('서비스')) {
            defaultType = 'about';
            defaultOptions = { layout: 'subtab', sections: ['vision'] };
          } else if (name.includes('게시판') || name.includes('공지') || name.includes('소식') || name.includes('보도')) {
            defaultType = 'board';
            defaultOptions = { layout: 'table', attach: true, search: true, perPage: 10 };
          } else if (name.includes('갤러리') || name.includes('사진') || name.includes('현장') || name.includes('스케치') || name.includes('실적')) {
            defaultType = 'gallery';
            defaultOptions = { cols: 3, lightbox: true, ratio: '16:9' };
          } else if (name.includes('문의') || name.includes('상담') || name.includes('신청') || name.includes('예약')) {
            defaultType = 'contact';
            defaultOptions = { purpose: 'consult', fields: ['name', 'phone', 'email', 'content', 'terms'] };
          } else if (name.includes('FAQ') || name.includes('질문') || name.includes('안내')) {
            defaultType = 'faq';
            defaultOptions = { categories: ['전체', '이용안내', '비용/환불', '기타'], mode: 'single', search: true };
          } else if (name.includes('오시는길') || name.includes('지도') || name.includes('위치')) {
            defaultType = 'map';
            defaultOptions = { mode: 'address', transitInfo: true };
          } else if (name.includes('자료') || name.includes('다운로드') || name.includes('서식') || name.includes('양식')) {
            defaultType = 'download';
            defaultOptions = { layout: 'card_grid', search: true, perPage: 9 };
          }

          updatedOptions[sub.id] = { type: defaultType, options: defaultOptions };
        }
      });
    });

    this.state.pageOptions = updatedOptions;
  }

  validateStep(stepIndex) {
    const state = this.state;
    if (stepIndex === 0) {
      // Direct DOM sync
      const siteTitle = (document.getElementById('input-site-title')?.value ?? state.siteInfo.siteTitle ?? '').trim();
      const companyName = (document.getElementById('input-company-name')?.value ?? state.siteInfo.companyName ?? '').trim();
      const companyNameEn = (document.getElementById('input-company-name-en')?.value ?? state.siteInfo.companyNameEn ?? '').trim();
      const ownerName = (document.getElementById('input-owner-name')?.value ?? state.siteInfo.ownerName ?? '').trim();
      const bizNum = (document.getElementById('input-biz-num')?.value ?? state.siteInfo.bizNum ?? '').trim();
      const phone = (document.getElementById('input-phone')?.value ?? state.siteInfo.phone ?? '').trim();
      const address = (document.getElementById('input-address')?.value ?? state.siteInfo.address ?? '').trim();
      const charset = document.getElementById('input-charset')?.value ?? state.siteInfo.charset ?? 'UTF-8';
      const adminId = (document.getElementById('input-admin-id')?.value ?? state.adminAuth.adminId ?? '').trim();
      const adminPw = (document.getElementById('input-admin-pw')?.value ?? state.adminAuth.adminPw ?? '').trim();

      // Sync state immediately
      this.state.siteInfo = { siteTitle, companyName, companyNameEn, ownerName, bizNum, phone, address, charset };
      this.state.adminAuth = { adminId, adminPw };
      this.saveState();

      if (!siteTitle) {
        return { isValid: false, message: '사이트명을 입력해주세요.', targetId: 'input-site-title' };
      }
      if (!companyName) {
        return { isValid: false, message: '업체명 (한글)을 입력해주세요.', targetId: 'input-company-name' };
      }
      if (!companyNameEn) {
        return { isValid: false, message: '업체명 (영문)을 입력해주세요.', targetId: 'input-company-name-en' };
      }
      if (!ownerName) {
        return { isValid: false, message: '대표자명을 입력해주세요.', targetId: 'input-owner-name' };
      }
      if (!bizNum) {
        return { isValid: false, message: '사업자등록번호를 입력해주세요.', targetId: 'input-biz-num' };
      }
      if (!phone) {
        return { isValid: false, message: '대표 전화번호를 입력해주세요.', targetId: 'input-phone' };
      }
      if (!address) {
        return { isValid: false, message: '소재지 주소를 입력해주세요.', targetId: 'input-address' };
      }
      if (!adminId) {
        return { isValid: false, message: '관리자 로그인 아이디를 입력해주세요.', targetId: 'input-admin-id' };
      }
      if (!adminPw) {
        return { isValid: false, message: '관리자 로그인 비밀번호를 입력해주세요.', targetId: 'input-admin-pw' };
      }
    } else if (stepIndex === 1) {
      if (!state.menus || state.menus.length === 0) {
        return { isValid: false, message: '최소 1개 이상의 대메뉴를 추가해주세요.' };
      }
      for (const main of state.menus) {
        if (!main.name || !main.name.trim()) {
          return { isValid: false, message: '대메뉴 이름을 모두 입력해주세요.' };
        }
        if (!main.submenus || main.submenus.length === 0) {
          return { isValid: false, message: `[${main.name}] 대메뉴에 최소 1개 이상의 하위 메뉴를 추가해주세요.` };
        }
        for (const sub of main.submenus) {
          if (!sub.name || !sub.name.trim()) {
            return { isValid: false, message: `[${main.name}]의 하위 메뉴 이름을 모두 입력해주세요.` };
          }
        }
      }
    } else if (stepIndex === 3) {
      if (state.features?.kakaoChat?.enabled && (!state.features.kakaoChat.channelUrl || !state.features.kakaoChat.channelUrl.trim())) {
        return { isValid: false, message: '카카오톡 채널 URL을 입력해주세요.' };
      }
      if (state.features?.smtpMail?.enabled && (!state.features.smtpMail.receiverEmail || !state.features.smtpMail.receiverEmail.trim())) {
        return { isValid: false, message: '알림 수신 이메일 주소를 입력해주세요.' };
      }
    }
    return { isValid: true };
  }

  showToast(message, type = 'warning') {
    const existing = document.querySelector('.builder-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `builder-toast toast-${type}`;
    toast.innerHTML = `
      <svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /**
   * Non-destructive fluid navigation:
   * Moving backward is always permitted and preserves data.
   * Moving forward validates all intermediate steps.
   */
  setStep(stepIndex) {
    if (stepIndex < 0 || stepIndex > 4) return false;

    // Moving forward requires step validation
    if (stepIndex > this.state.currentStep) {
      for (let s = this.state.currentStep; s < stepIndex; s++) {
        const result = this.validateStep(s);
        if (!result.isValid) {
          this.showToast(result.message, 'warning');
          if (result.targetId) {
            const targetEl = document.getElementById(result.targetId);
            if (targetEl) {
              targetEl.focus();
              targetEl.classList.add('input-error');
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              targetEl.addEventListener('input', () => {
                targetEl.classList.remove('input-error');
              }, { once: true });
            }
          }
          return false;
        }
      }
    }

    this.state.currentStep = stepIndex;
    if (stepIndex > (this.state.maxStepReached || 0)) {
      this.state.maxStepReached = stepIndex;
    }
    this.saveState();
    return true;
  }

  resetStore() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (e) {
        console.error('Error in store listener:', e);
      }
    });
  }
}

if (!window._globalBuilderStoreInstance) {
  window._globalBuilderStoreInstance = new Store();
}
export const builderStore = window._globalBuilderStoreInstance;
window.builderStore = builderStore;
