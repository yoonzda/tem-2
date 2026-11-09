/**
 * Step 0: Tech Stack & Basic Info Settings Component
 * 10-A: Segment Floating Pill Track + Indicator Dot Chips
 * Pure Vector Developer Logos (PHP, HTML5, Node.js - B-3 42px)
 * Rule: NO placeholder attributes on input fields (per project guideline)
 */

import { builderStore } from '../store.js';

const stackInfoMap = {
  php: {
    title: 'Standard PHP 아키텍처',
    badge: '기본 추천',
    desc: '표준 호스팅 기반 웹 아키텍처',
    chips: ['FTP 즉시 배포', 'SQLite 내장 DB', '제로 빌드']
  },
  static: {
    title: 'Static HTML5 아키텍처',
    badge: '서버리스 정적',
    desc: '서버리스 정적 웹 아키텍처',
    chips: ['GitHub Pages', 'LocalStorage', '순수 클라이언트']
  },
  node: {
    title: 'Node.js Express 아키텍처',
    badge: '풀스택 JS',
    desc: '풀스택 JavaScript 아키텍처',
    chips: ['REST API', 'Docker 컨테이너', 'NPM 에코시스템']
  }
};

export class TechStackSelector {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const state = window.builderStore.getState();
    const currentStack = state.techStack; // null on clean initial start
    const currentStackInfo = currentStack ? (stackInfoMap[currentStack] || stackInfoMap.php) : null;
    const { siteInfo, adminAuth } = state;

    const escapeHtml = (str) => (str || '').toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const hasStack = !!currentStack;

    this.container.innerHTML = `
      <div class="step0-container has-started">
        <div class="onepage-zone-header">
          <h2 class="onepage-zone-title">기본 환경 및 사이트 정보</h2>
        </div>

        <!-- 1. Tech Stack (10-A Segment Floating Pill Track) -->
        <div class="tech-10a-frame">
          <div class="tech-10a-header">
            <div class="tech-10a-tab ${currentStack === 'php' ? 'active' : ''}" data-stack="php">
              <img src="assets/logos/php/php_gilbarbara.svg" width="42" height="42" class="tech-brand-icon" alt="PHP Official Logo"/>
              <span class="tech-tab-title" style="color: ${currentStack === 'php' ? '#0f172a' : '#64748b'};">Standard PHP</span>
            </div>
            <div class="tech-10a-tab ${currentStack === 'static' ? 'active' : ''}" data-stack="static">
              <img src="assets/logos/html5/html5_gilbarbara.svg" width="42" height="42" class="tech-brand-icon" alt="HTML5 Official Logo"/>
              <span class="tech-tab-title" style="color: ${currentStack === 'static' ? '#0f172a' : '#64748b'};">Static HTML5</span>
            </div>
            <div class="tech-10a-tab ${currentStack === 'node' ? 'active' : ''}" data-stack="node">
              <img src="assets/logos/nodejs/nodejs_gilbarbara_icon.svg" width="42" height="42" class="tech-brand-icon" alt="Node.js Official Logo"/>
              <span class="tech-tab-title" style="color: ${currentStack === 'node' ? '#0f172a' : '#64748b'};">Node.js Express</span>
            </div>
          </div>

          <!-- Active Stack Specification Card Body (Smooth Expanding Frame) -->
          <div class="tech-10a-body ${hasStack ? 'active-body' : ''}" id="tech-10a-body">
            <div class="tech-10a-title-row">
              <h4 class="tech-10a-title" id="tech-10a-title">${currentStackInfo ? currentStackInfo.title : ''}</h4>
              <span class="tech-10a-badge" id="tech-10a-badge">${currentStackInfo ? currentStackInfo.badge : ''}</span>
            </div>
            <p class="tech-10a-desc" id="tech-10a-desc">${currentStackInfo ? currentStackInfo.desc : ''}</p>
            <div class="tech-10a-chips" id="tech-10a-chips">
              ${currentStackInfo ? currentStackInfo.chips.map(chip => `<span class="tech-10a-dot-chip">${chip}</span>`).join('') : ''}
            </div>
          </div>
        </div>

        <!-- 2. Compact Multi-Column Basic Info Grid Card -->
        <div class="step0-compact-form-card">
          <div class="step0-grid-form">
            <!-- Row 1: 사이트명 / 업체명(한글) / 업체명(영문) -->
            <div class="step0-grid-field span-2" id="row-site-title">
              <label class="step0-field-label" for="input-site-title">
                사이트명 <span class="required-star">*</span>
              </label>
              <input type="text" id="input-site-title" class="form-input" value="${escapeHtml(siteInfo.siteTitle || '')}" autocomplete="off" />
            </div>

            <div class="step0-grid-field span-2" id="row-company-name">
              <label class="step0-field-label" for="input-company-name">
                업체명 (한글) <span class="required-star">*</span>
              </label>
              <input type="text" id="input-company-name" class="form-input" value="${escapeHtml(siteInfo.companyName || '')}" autocomplete="off" />
            </div>

            <div class="step0-grid-field span-2" id="row-company-name-en">
              <label class="step0-field-label" for="input-company-name-en">
                업체명 (영문) <span class="required-star">*</span>
              </label>
              <input type="text" id="input-company-name-en" class="form-input" value="${escapeHtml(siteInfo.companyNameEn || '')}" autocomplete="off" />
            </div>

            <!-- Row 2: 대표자명 / 사업자 등록번호 / 대표 전화번호 -->
            <div class="step0-grid-field span-2" id="row-owner-name">
              <label class="step0-field-label" for="input-owner-name">
                대표자명 <span class="required-star">*</span>
              </label>
              <input type="text" id="input-owner-name" class="form-input" value="${escapeHtml(siteInfo.ownerName || '')}" autocomplete="off" />
            </div>

            <div class="step0-grid-field span-2" id="row-biz-num">
              <label class="step0-field-label" for="input-biz-num">
                사업자 등록번호 <span class="required-star">*</span>
              </label>
              <input type="text" id="input-biz-num" class="form-input" value="${escapeHtml(siteInfo.bizNum || '')}" autocomplete="off" />
            </div>

            <div class="step0-grid-field span-2" id="row-phone">
              <label class="step0-field-label" for="input-phone">
                대표 전화번호 <span class="required-star">*</span>
              </label>
              <input type="text" id="input-phone" class="form-input" value="${escapeHtml(siteInfo.phone || '')}" autocomplete="off" />
            </div>

            <!-- Row 3: 사업장 주소 (span 4) / 문자셋·인코딩 (span 2) -->
            <div class="step0-grid-field span-4" id="row-address">
              <label class="step0-field-label" for="input-address">
                사업장 주소 <span class="required-star">*</span>
              </label>
              <input type="text" id="input-address" class="form-input" value="${escapeHtml(siteInfo.address || '')}" autocomplete="off" />
            </div>

            <div class="step0-grid-field span-2" id="row-charset">
              <label class="step0-field-label" for="input-charset">
                문자셋 / 인코딩 <span class="required-star">*</span>
              </label>
              <select id="input-charset" class="form-select">
                <option value="UTF-8" ${(siteInfo.charset || 'UTF-8') === 'UTF-8' ? 'selected' : ''}>UTF-8 (글로벌 표준 - 권장)</option>
                <option value="EUC-KR" ${siteInfo.charset === 'EUC-KR' ? 'selected' : ''}>EUC-KR (레거시 한국어)</option>
              </select>
            </div>

            <!-- Row 4: 관리자 아이디 (span 3) / 관리자 비밀번호 (span 3) -->
            <div class="step0-grid-field span-3" id="row-admin-id">
              <label class="step0-field-label" for="input-admin-id">
                관리자 아이디 <span class="required-star">*</span>
              </label>
              <input type="text" id="input-admin-id" class="form-input" value="${escapeHtml(adminAuth.adminId || '')}" autocomplete="off" />
            </div>

            <div class="step0-grid-field span-3" id="row-admin-pw">
              <label class="step0-field-label" for="input-admin-pw">
                관리자 비밀번호 <span class="required-star">*</span>
              </label>
              <div class="step0-pw-wrap">
                <input type="password" id="input-admin-pw" class="form-input" value="${escapeHtml(adminAuth.adminPw || '')}" autocomplete="off" />
                <button type="button" class="btn-toggle-pw" id="btn-toggle-pw" title="비밀번호 표시/숨김">
                  <svg class="eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg class="eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    // Site Info Inputs Elements
    const siteTitleInput = this.container.querySelector('#input-site-title');
    const companyNameInput = this.container.querySelector('#input-company-name');
    const companyNameEnInput = this.container.querySelector('#input-company-name-en');
    const ownerNameInput = this.container.querySelector('#input-owner-name');
    const bizNumInput = this.container.querySelector('#input-biz-num');
    const phoneInput = this.container.querySelector('#input-phone');
    const addressInput = this.container.querySelector('#input-address');
    const charsetInput = this.container.querySelector('#input-charset');
    const adminIdInput = this.container.querySelector('#input-admin-id');
    const adminPwInput = this.container.querySelector('#input-admin-pw');
    const togglePwBtn = this.container.querySelector('#btn-toggle-pw');

    // Tech Stack Tabs Selection
    this.container.querySelectorAll('.tech-10a-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const stack = tab.getAttribute('data-stack');
        window.builderStore.updateState({ techStack: stack });

        this.container.querySelectorAll('.tech-10a-tab').forEach(t => {
          const isCurrent = t === tab;
          t.classList.toggle('active', isCurrent);
          const title = t.querySelector('.tech-tab-title');
          if (title) {
            title.style.color = isCurrent ? '#0f172a' : '#64748b';
          }
        });

        const bodyEl = this.container.querySelector('#tech-10a-body');
        if (bodyEl) {
          bodyEl.classList.add('active-body');
          const info = stackInfoMap[stack];
          if (info) {
            document.getElementById('tech-10a-title').textContent = info.title;
            document.getElementById('tech-10a-badge').textContent = info.badge;
            document.getElementById('tech-10a-desc').textContent = info.desc;
            document.getElementById('tech-10a-chips').innerHTML = info.chips.map(chip => `<span class="tech-10a-dot-chip">${chip}</span>`).join('');
          }
        }
      });
    });

    const updateSiteInfo = () => {
      window.builderStore.updateState({
        siteInfo: {
          siteTitle: siteTitleInput ? siteTitleInput.value.trim() : '',
          companyName: companyNameInput ? companyNameInput.value.trim() : '',
          companyNameEn: companyNameEnInput ? companyNameEnInput.value.trim() : '',
          ownerName: ownerNameInput ? ownerNameInput.value.trim() : '',
          bizNum: bizNumInput ? bizNumInput.value.trim() : '',
          phone: phoneInput ? phoneInput.value.trim() : '',
          address: addressInput ? addressInput.value.trim() : '',
          charset: charsetInput ? charsetInput.value : 'UTF-8'
        }
      });
    };

    const updateAdminAuth = () => {
      window.builderStore.updateState({
        adminAuth: {
          adminId: adminIdInput ? adminIdInput.value.trim() : '',
          adminPw: adminPwInput ? adminPwInput.value.trim() : ''
        }
      });
    };

    [
      siteTitleInput,
      companyNameInput,
      companyNameEnInput,
      ownerNameInput,
      bizNumInput,
      phoneInput,
      addressInput,
      adminIdInput,
      adminPwInput
    ].forEach((input, idx, arr) => {
      if (!input) return;
      input.addEventListener('input', () => {
        updateSiteInfo();
        updateAdminAuth();
      });
      input.addEventListener('blur', () => {
        updateSiteInfo();
        updateAdminAuth();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          updateSiteInfo();
          updateAdminAuth();
          const nextInput = arr[idx + 1];
          if (nextInput) nextInput.focus();
        }
      });
    });

    if (charsetInput) {
      charsetInput.addEventListener('change', () => updateSiteInfo());
    }

    // Toggle Password Visibility
    if (togglePwBtn && adminPwInput) {
      togglePwBtn.addEventListener('click', () => {
        const isPw = adminPwInput.type === 'password';
        adminPwInput.type = isPw ? 'text' : 'password';
        const eyeIcon = togglePwBtn.querySelector('.eye-open');
        const eyeOffIcon = togglePwBtn.querySelector('.eye-closed');
        if (eyeIcon && eyeOffIcon) {
          eyeIcon.style.display = isPw ? 'none' : 'block';
          eyeOffIcon.style.display = isPw ? 'block' : 'none';
        }
      });
    }
  }

  autofillSample() {
    const state = window.builderStore.getState();
    const targetStack = state.techStack || 'php';

    const sampleSiteInfo = {
      siteTitle: 'FLOWLY',
      companyName: '(주)플로울리',
      companyNameEn: 'FLOWLY Inc.',
      ownerName: '홍길동',
      bizNum: '123-45-67890',
      phone: '02-1234-5678',
      address: '서울특별시 강남구 테헤란로 123, 플로울리 타워 8층',
      charset: 'UTF-8'
    };
    const sampleAdminAuth = {
      adminId: 'admin',
      adminPw: 'admin1234'
    };

    window.builderStore.updateState({
      techStack: targetStack,
      siteInfo: sampleSiteInfo,
      adminAuth: sampleAdminAuth
    });

    this.render();
  }
}
