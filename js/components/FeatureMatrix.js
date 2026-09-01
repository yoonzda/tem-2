/**
 * Step 3: Feature Matrix Component
 * 1-Column Wide C-5 Floating Corner Badge Pearl Cards
 * + Rich Hover Tooltip with Pure White "자세히 보기" Button
 * + In-Depth Feature Specification & Guide Modal
 */

import { builderStore } from '../store.js';

export class FeatureMatrix {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.FEATURES = [
      {
        id: 'kakaoChat',
        name: '카카오톡 1:1 상담 버튼',
        category: '소통 & 편의',
        shortDesc: '웹사이트 우측 하단에 상시 떠 있는 카카오톡 원형 버튼을 노출하여, 방문자가 별도 앱 전환이나 복잡한 인증 없이 상담원 또는 챗봇 채널로 1:1 실시간 대화를 시작할 수 있는 고객 전환 극대화 도구입니다.',
        details: {
          benefit: '방문자의 상담 진입 장벽을 대폭 낮추어 유입 고객의 문의 전환율을 300% 이상 증대시킵니다.',
          steps: [
            '카카오톡 채널 관리자센터(center-pf.kakao.com)에 접속하여 로그인합니다.',
            '[관리] > [상세설정] 메뉴에서 생성된 \'채널 홈 URL\'(예: http://pf.kakao.com/_xxxx)을 복사합니다.',
            '배포된 config.php 또는 관리자 설정 화면에 URL을 등록하면 모든 페이지에 우측 하단 플로팅 버튼이 자동 생성됩니다.'
          ],
          techNotes: '모바일 환경에서는 카카오톡 앱이 직접 실행되며, PC 브라우저 환경에서는 웹 카카오톡 채팅창 또는 QR 코드가 즉시 호출됩니다.'
        }
      },
      {
        id: 'mapApi',
        name: '네이버 지도 / 카카오맵 연동',
        category: '소통 & 편의',
        shortDesc: '회사 소개 및 오시는 길 페이지에 정확한 사업장 위치를 대화형 지도로 표시하며, 방문자가 스마트폰으로 원클릭 시 네이버 지도/카카오맵 앱의 실시간 내비게이션 길찾기로 직통 연결됩니다.',
        details: {
          benefit: '방문객이 헤매지 않고 사무실, 매장, 연구소를 찾아올 수 있도록 대중교통 및 실시간 길안내를 제공합니다.',
          steps: [
            '단순 주소 모드: 별도 API Key 발급 없이 도로명 주소만 입력하면 지도 블록 및 네이버/카카오 길찾기 바로가기 버튼이 자동 연동됩니다.',
            '동적 인터랙티브 지도 모드: 네이버 클라우드 플랫폼(ncloud.com)에서 Web Dynamic Map Client ID를 발급받아 등록 시 고해상도 확대/축소 지도가 활성화됩니다.'
          ],
          techNotes: '도로명 주소 지오코딩(Geocoding)을 통해 위도/경도를 자동 산출하며 대중교통(지하철/버스) 및 주차 안내 블록을 함께 출력합니다.'
        }
      },
      {
        id: 'mobileQuickbar',
        name: '모바일 하단 고정 퀵바',
        category: '소통 & 편의',
        shortDesc: '스마트폰 사용자가 사이트에 접속했을 때 화면 하단에 엄지손가락으로 쉽게 누를 수 있는 터치 전용 퀵메뉴(전화걸기, 카카오상담, 오시는길, 온라인문의, 맨위로)를 상시 고정 노출합니다.',
        details: {
          benefit: '스마트폰 화면 어디서든 손쉬운 원터치 터치로 즉각적인 전화 통화 및 상담 문의를 유도합니다.',
          steps: [
            '스마트폰으로 사이트 접속 시 손가락 터치에 최적화된 글래스모피즘 하단 바가 자동 실행됩니다.',
            'Step 0에 등록된 대표 전화번호와 카카오 채널 링크가 퀵바 버튼에 자동 연동됩니다.'
          ],
          techNotes: '모바일 화면(768px 이하)에서만 렌더링되며, PC 환경에서는 본문 콘텐츠를 가리지 않도록 자동 숨김 처리됩니다.'
        }
      },
      {
        id: 'mainPopup',
        name: '메인 레이어 팝업 공지',
        category: '공지 & 마케팅',
        shortDesc: '웹사이트 첫 접속 시 화면 중앙에 모달 레이어로 중요 공지사항, 프로모션, 긴급 알림을 노출하며, 방문자가 \'오늘 하루 보지 않기\'를 선택하면 24시간 동안 재노출을 방지하는 스마트 팝업입니다.',
        details: {
          benefit: '신제품 출시, 서비스 점검, 휴무일 등 방문자에게 반드시 전달해야 하는 핵심 소식을 완벽하게 전달합니다.',
          steps: [
            '관리자 콘솔(/admin) > [팝업/배너 관리]에서 팝업 이미지 업로드, 문구 편집, 활성화 여부를 언제든지 실시간으로 제어할 수 있습니다.',
            '방문자가 \'오늘 하루 보지 않기\'를 누르면 LocalStorage 및 Session Cookie에 24시간 동안 만료 플래그가 보관됩니다.'
          ],
          techNotes: '모바일/PC 반응형 크기 자동 조절 기능과 부드러운 페이드인 모달 애니메이션이 내장되어 있습니다.'
        }
      },
      {
        id: 'topBanner',
        name: '홈페이지 최상단 띠 배너',
        category: '공지 & 마케팅',
        shortDesc: '헤더 최상단에 슬림한 컬러 알림 바를 고정하여 사이트 전체 방문자에게 공휴일 휴무, 시스템 점검, 특별 이벤트 소식을 사이트 디자인과 자연스럽게 결합하여 알립니다.',
        details: {
          benefit: '본문 레이아웃을 해치지 않고 사이트 최상단에서 중요 알림을 상시 강조할 수 있습니다.',
          steps: [
            '관리자 페이지에서 한 줄 공지 텍스트와 링크 URL을 설정할 수 있습니다.',
            '방문자가 우측 닫기(X)를 누르면 현재 브라우저 세션 동안 띠 배너가 숨겨집니다.'
          ],
          techNotes: '헤더 고정(Sticky/Fixed) 상태에서도 상단 여백을 자동으로 계산하여 콘텐츠가 가려지지 않도록 보정합니다.'
        }
      },
      {
        id: 'snsLinks',
        name: '공식 SNS 채널 바로가기 연동',
        category: '공지 & 마케팅',
        shortDesc: '인스타그램, 유튜브, 네이버 블로그, 페이스북 등 공식 소셜 미디어 채널 주소를 등록하면 웹사이트 상단 헤더와 하단 푸터에 브랜드 공식 컬러 아이콘 링크가 깔끔하게 자동 생성됩니다.',
        details: {
          benefit: '웹사이트 방문자를 브랜드 공식 SNS 채널의 팔로워 및 구독자로 손쉽게 확장 연결합니다.',
          steps: [
            '인스타그램, 유튜브, 네이버 블로그, 페이스북 채널 주소를 입력합니다.',
            '주소가 등록된 채널의 고유 브랜드 아이콘만 선별되어 헤더/푸터에 자동 배치됩니다.'
          ],
          techNotes: '미입력된 SNS 항목은 자동으로 화면에서 숨김 처리되어 빈 링크나 깨진 레이아웃이 발생하지 않습니다.'
        }
      },
      {
        id: 'smtpMail',
        name: '온라인 문의 시 관리자 이메일 알림',
        category: '시스템 & 운영',
        shortDesc: '고객이 웹사이트에서 1:1 온라인 상담 폼이나 프로그램 신청서를 제출하는 즉시, 관리자의 이메일함으로 접수자 성함, 연락처, 문의 내용이 포함된 알림 메일을 실시간 자동 발송합니다.',
        details: {
          benefit: '고객 문의 접수 시 관리자가 즉각 알림을 받아 빠른 응대와 고객 만족도 향상이 가능합니다.',
          steps: [
            'Google 계정 관리(myaccount.google.com) > [보안] 탭에서 [2단계 인증] 활성화 후 [앱 비밀번호]를 생성합니다.',
            '생성된 16자리 앱 비밀번호를 config.php 내 SMTP_PASS에 등록합니다.',
            '온라인 문의 제출 즉시 안전한 TLS 암호화 채널을 통해 관리자 수신 메일로 실시간 전달됩니다.'
          ],
          techNotes: 'PHPMailer / NodeMailer 기반의 표준 SMTP 프로토콜을 사용하며 SPF/DKIM 스팸 차단 방지 헤더가 기본 적용됩니다.'
        }
      },
      {
        id: 'adminConsole',
        name: '관리자 전용 운영 콘솔 (/admin)',
        category: '시스템 & 운영',
        shortDesc: '비전문가도 웹사이트의 게시판 글 작성/수정, 1:1 고객 문의 내역 확인 및 답변 발송, 팝업/배너 제어, 프로그램 접수자 명단 엑셀(CSV) 다운로드를 직관적으로 관리할 수 있는 전용 백오피스입니다.',
        details: {
          benefit: '개발자에게 의존하지 않고 운영자가 직접 사이트 콘텐츠와 고객 데이터를 손쉽게 관리합니다.',
          steps: [
            '배포된 웹사이트 주소 뒤에 /admin 경로로 접속합니다. (예: https://yoursite.com/admin)',
            'Step 0에서 지정한 관리자 ID와 비밀번호로 안전하게 로그인합니다.',
            '대시보드에서 신규 접수 현황, 게시글 관리, 팝업 설정을 원클릭으로 운영할 수 있습니다.'
          ],
          techNotes: '세션 암호화, 비밀번호 bcrypt 해싱, CSRF 방어 및 SQL Injection 방어 로직이 100% 내장되어 있습니다.'
        }
      },
      {
        id: 'membership',
        name: '일반 사용자 회원가입 및 로그인',
        category: '시스템 & 운영',
        shortDesc: '방문자가 웹사이트에서 이메일 또는 아이디로 직접 회원가입 및 로그인을 진행하고, 회원 전용 비공개 게시판 열람, 마이페이지 내 신청 내역 조회 및 프로필 관리를 할 수 있는 계정 시스템입니다.',
        details: {
          benefit: '고정 충성 고객 확보 및 회원 전용 프리미엄 서비스 제공이 가능해집니다.',
          steps: [
            '이용약관 동의, 이메일/비밀번호 입력 기반의 표준 회원가입 폼이 제공됩니다.',
            '로그인 후 [마이페이지]에서 본인이 작성한 글과 프로그램 신청 접수 상태를 실시간 확인할 수 있습니다.'
          ],
          techNotes: '회원 데이터는 데이터베이스(MySQL / JSON DB)에 안전하게 암호화되어 보관되며 비밀번호 찾기 기능이 지원됩니다.'
        }
      },
      {
        id: 'seo',
        name: '검색엔진 최적화 (SEO Meta 태그)',
        category: '시스템 & 운영',
        shortDesc: '네이버, 구글, 다음 등 포털 검색 결과에 우리 웹사이트의 제목과 설명문이 고품질로 노출되도록 최적화 메타태그를 생성하고, 카카오톡/SNS 링크 공유 시 썸네일과 문구가 예쁘게 뜨는 OpenGraph를 설정합니다.',
        details: {
          benefit: '자연 검색(Organic Search) 유입 트래픽을 극대화하고 SNS 링크 공유 시 브랜드 신뢰도를 향상시킵니다.',
          steps: [
            '네이버 서치어드바이저(searchadvisor.naver.com)와 구글 서치콘솔에 사이트 URL을 등록합니다.',
            '발급받은 사이트 소유확인 메타태그를 등록하면 검색 로봇이 사이트의 모든 페이지를 자동으로 인덱싱합니다.'
          ],
          techNotes: '표준 OpenGraph 태그(og:title, og:description, og:image, og:url) 및 Semantic HTML5 태그 구조가 기본 적용됩니다.'
        }
      }
    ];
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const state = window.builderStore.getState();
    const f = state.features || {};

    this.container.innerHTML = `
      <div class="step3-container">
        
        <!-- 1-Column Wide C-5 Style Rows List -->
        <div class="step3-rows-list">
          ${this.FEATURES.map((feat, idx) => {
            const isChecked = !!(f[feat.id]?.enabled);

            return `
              <div class="step3-row-card-wrap">
                <label class="step3-row-card ${isChecked ? 'active' : ''}" data-feat-id="${feat.id}" data-feat-index="${idx}">
                  <input 
                    type="checkbox" 
                    data-feat="${feat.id}" 
                    ${isChecked ? 'checked' : ''} 
                  />
                  <span class="step3-corner-badge">${isChecked ? '✓' : '+'}</span>
                  <span class="step3-tile-name">${feat.name}</span>
                </label>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Step 3 Bottom Action Button -->
        <div class="step-bottom-action-wrap">
          <button class="btn-step-next" id="btn-step3-next" type="button">
            <span class="linear-infill-layer"></span>
            <span class="btn-content-inner">
              <span class="btn-text">다음 단계</span>
              <span class="linear-chevron-group">
                <svg class="linear-ch1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                <svg class="linear-ch2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </span>
            </span>
          </button>
        </div>

      </div>

      <!-- Dynamic Cursor Tracking Speech Bubble Tooltip (시안 12-3: 소프트 라운드 삼각 꼬리) -->
      <div id="step3-cursor-tooltip" class="step3-cursor-tooltip">
        <svg class="step3-tooltip-arrow" viewBox="0 0 24 12" fill="none">
          <path d="M2 12L10.2 2.2C11.1 1.1 12.9 1.1 13.8 2.2L22 12" stroke="#3f3f46" stroke-width="1.2" fill="#18181b"/>
          <rect x="0" y="11" width="24" height="3" fill="#18181b"/>
        </svg>
        <p class="step3-tooltip-desc" id="cursor-tooltip-desc">기능 설명</p>
      </div>

      <!-- Detail Guide Modal Container -->
      <div id="step3-detail-modal" class="step3-modal-backdrop" style="display:none;">
        <div class="step3-modal-dialog">
          <div class="step3-modal-header">
            <div class="step3-modal-title-wrap">
              <span class="step3-modal-badge" id="modal-feat-category">카테고리</span>
              <h3 class="step3-modal-title" id="modal-feat-title">기능 상세 가이드</h3>
            </div>
            <button type="button" class="btn-modal-close" id="btn-modal-close" title="닫기">✕</button>
          </div>
          <div class="step3-modal-body" id="modal-feat-body">
            <!-- Dynamic Content Injected Here -->
          </div>
          <div class="step3-modal-footer">
            <button type="button" class="btn-modal-confirm" id="btn-modal-confirm">확인 완료</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  openDetailModal(featId) {
    const feat = this.FEATURES.find(item => item.id === featId);
    if (!feat) return;

    const modal = document.getElementById('step3-detail-modal');
    const catEl = document.getElementById('modal-feat-category');
    const titleEl = document.getElementById('modal-feat-title');
    const bodyEl = document.getElementById('modal-feat-body');

    if (!modal || !catEl || !titleEl || !bodyEl) return;

    catEl.textContent = feat.category;
    titleEl.textContent = feat.name;

    bodyEl.innerHTML = `
      <div class="modal-section">
        <h4 class="modal-section-title">💡 기능 핵심 혜택 및 목적</h4>
        <p class="modal-text">${feat.details.benefit}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">⚙️ 실전 연동 및 동작 프로세스</h4>
        <ol class="modal-step-list">
          ${feat.details.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">🔒 기술 사양 및 운영 관리</h4>
        <p class="modal-text-sub">${feat.details.techNotes}</p>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeDetailModal() {
    const modal = document.getElementById('step3-detail-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  bindEvents() {
    // 1. Next Step Button
    const nextBtn = this.container.querySelector('#btn-step3-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const success = window.builderStore.setStep(4);
        if (success) {
          window.scrollTo(0, 0);
        }
      });
    }

    // 2. Row Checkbox Toggle
    this.container.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', () => {
        const featId = input.getAttribute('data-feat');
        const isChecked = input.checked;

        const features = { ...window.builderStore.getState().features };
        if (!features[featId]) features[featId] = {};
        features[featId].enabled = isChecked;
        window.builderStore.updateState({ features });

        const rowCard = input.closest('.step3-row-card');
        if (rowCard) {
          rowCard.classList.toggle('active', isChecked);
          const badge = rowCard.querySelector('.step3-corner-badge');
          if (badge) {
            badge.textContent = isChecked ? '✓' : '+';
          }
        }
      });
    });

    // 3. Dynamic Cursor-Tracking Speech Bubble Tooltip
    const tooltip = this.container.querySelector('#step3-cursor-tooltip');
    const descEl = this.container.querySelector('#cursor-tooltip-desc');

    let activeFeatId = null;

    const positionTooltip = (clientX, clientY) => {
      if (!tooltip) return;
      const arrow = tooltip.querySelector('.step3-tooltip-arrow');
      const offsetY = 36;
      const defaultTailLeft = 28;

      const rect = tooltip.getBoundingClientRect();
      const w = rect.width || 500;
      const h = rect.height || 140;

      // Position tooltip directly below cursor with tail aligned right under cursor
      let left = clientX - defaultTailLeft - 8;
      let top = clientY + offsetY;

      let isFlippedY = false;

      // Flip above if near bottom of screen
      if (top + h > window.innerHeight - 16) {
        top = clientY - h - 26;
        isFlippedY = true;
      }

      // Clamp horizontally within screen
      const minLeft = 16;
      const maxLeft = window.innerWidth - w - 16;
      const clampedLeft = Math.max(minLeft, Math.min(left, maxLeft));

      // Dynamically align tail X to point directly under mouse cursor
      if (arrow) {
        const arrowX = Math.max(20, Math.min(w - 36, clientX - clampedLeft - 8));
        arrow.style.left = `${arrowX}px`;
      }

      tooltip.classList.toggle('tail-bottom', isFlippedY);

      tooltip.style.left = `${clampedLeft}px`;
      tooltip.style.top = `${Math.max(12, top)}px`;
    };

    this.container.querySelectorAll('.step3-row-card').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const featId = card.getAttribute('data-feat-id');
        const featIndex = parseInt(card.getAttribute('data-feat-index') || '0', 10);
        const isSwitched = (activeFeatId !== featId);
        activeFeatId = featId;
        const feat = this.FEATURES.find(item => item.id === featId);
        if (!feat || !tooltip) return;

        // Alternate theme between Odd (0, 2, 4...) and Even (1, 3, 5...)
        const isEven = (featIndex % 2 === 1);
        tooltip.classList.toggle('theme-even', isEven);

        if (descEl) descEl.textContent = feat.shortDesc;

        if (isSwitched) {
          tooltip.classList.remove('content-animating');
          void tooltip.offsetWidth; // Force reflow
          tooltip.classList.add('content-animating');
        }

        positionTooltip(e.clientX, e.clientY);
        tooltip.classList.add('visible');
      });

      card.addEventListener('mousemove', (e) => {
        positionTooltip(e.clientX, e.clientY);
      });

      card.addEventListener('mouseleave', () => {
        if (tooltip) tooltip.classList.remove('visible');
      });
    });

    // 4. Modal Close Events
    const modal = document.getElementById('step3-detail-modal');
    const closeBtn = document.getElementById('btn-modal-close');
    const confirmBtn = document.getElementById('btn-modal-confirm');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDetailModal());
    if (confirmBtn) confirmBtn.addEventListener('click', () => this.closeDetailModal());

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeDetailModal();
        }
      });
    }
  }
}
