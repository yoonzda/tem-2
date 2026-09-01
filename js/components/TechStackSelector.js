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
    const hasSiteTitle = hasStack && (!!siteInfo.siteTitle);
    const hasCompanyName = hasSiteTitle && (!!siteInfo.companyName);
    const hasCompanyNameEn = hasCompanyName && (!!siteInfo.companyNameEn);
    const hasOwnerName = hasCompanyNameEn && (!!siteInfo.ownerName);
    const hasBizNum = hasOwnerName && (!!siteInfo.bizNum);
    const hasPhone = hasBizNum && (!!siteInfo.phone);
    const hasAddress = hasPhone && (!!siteInfo.address);
    const hasAdminId = hasAddress && (!!adminAuth.adminId);
    const hasAdminPw = hasAdminId && (!!adminAuth.adminPw);

    this.container.innerHTML = `
      <div class="step0-container ${hasStack ? 'has-started' : ''}" style="${hasStack ? 'padding-top: 20px;' : ''}">
        <!-- Top Floating Utility (Autofill Sample Button) -->
        <div class="step0-top-utility">
          <button type="button" class="btn-autofill" id="btn-autofill-sample" title="테스트 데이터 자동 입력">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
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

        <!-- 2. Unboxed Linear Form Stream (Single Progressive Flow - Toss Style) -->
        <div class="horizontal-form-list">
          <!-- Row 1: 사이트명 -->
          <div class="horizontal-form-row ${hasStack ? 'toss-reveal' : ''}" id="row-site-title">
            <label class="horizontal-label" for="input-site-title">
              사이트명 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-site-title" class="form-input" value="${escapeHtml(siteInfo.siteTitle || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 2: 업체명 (한글) -->
          <div class="horizontal-form-row ${hasSiteTitle ? 'toss-reveal' : ''}" id="row-company-name">
            <label class="horizontal-label" for="input-company-name">
              업체명 (한글) <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-company-name" class="form-input" value="${escapeHtml(siteInfo.companyName || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 3: 업체명 (영문) -->
          <div class="horizontal-form-row ${hasCompanyName ? 'toss-reveal' : ''}" id="row-company-name-en">
            <label class="horizontal-label" for="input-company-name-en">
              업체명 (영문) <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-company-name-en" class="form-input" value="${escapeHtml(siteInfo.companyNameEn || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 4: 대표자명 -->
          <div class="horizontal-form-row ${hasCompanyNameEn ? 'toss-reveal' : ''}" id="row-owner-name">
            <label class="horizontal-label" for="input-owner-name">
              대표자명 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-owner-name" class="form-input" value="${escapeHtml(siteInfo.ownerName || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 4: 사업자 등록번호 -->
          <div class="horizontal-form-row ${hasOwnerName ? 'toss-reveal' : ''}" id="row-biz-num">
            <label class="horizontal-label" for="input-biz-num">
              사업자 등록번호 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-biz-num" class="form-input" value="${escapeHtml(siteInfo.bizNum || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 5: 대표 전화번호 -->
          <div class="horizontal-form-row ${hasBizNum ? 'toss-reveal' : ''}" id="row-phone">
            <label class="horizontal-label" for="input-phone">
              대표 전화번호 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-phone" class="form-input" value="${escapeHtml(siteInfo.phone || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 6: 사업장 주소 -->
          <div class="horizontal-form-row ${hasPhone ? 'toss-reveal' : ''}" id="row-address">
            <label class="horizontal-label" for="input-address">
              사업장 주소 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-address" class="form-input" value="${escapeHtml(siteInfo.address || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 7: 문자셋 / 인코딩 -->
          <div class="horizontal-form-row ${hasAddress ? 'toss-reveal' : ''}" id="row-charset">
            <label class="horizontal-label" for="input-charset">
              문자셋 / 인코딩 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <select id="input-charset" class="form-select">
                <option value="UTF-8" ${(siteInfo.charset || 'UTF-8') === 'UTF-8' ? 'selected' : ''}>UTF-8 (글로벌 표준 - 권장)</option>
                <option value="EUC-KR" ${siteInfo.charset === 'EUC-KR' ? 'selected' : ''}>EUC-KR (레거시 한국어)</option>
              </select>
            </div>
          </div>

          <!-- Row 8: 관리자 아이디 -->
          <div class="horizontal-form-row ${hasAddress ? 'toss-reveal' : ''}" id="row-admin-id">
            <label class="horizontal-label" for="input-admin-id">
              관리자 아이디 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap">
              <input type="text" id="input-admin-id" class="form-input" value="${escapeHtml(adminAuth.adminId || '')}" autocomplete="off" />
            </div>
          </div>

          <!-- Row 9: 관리자 비밀번호 -->
          <div class="horizontal-form-row ${hasAdminId ? 'toss-reveal' : ''}" id="row-admin-pw">
            <label class="horizontal-label" for="input-admin-pw">
              관리자 비밀번호 <span class="required-star">*</span>
            </label>
            <div class="horizontal-input-wrap" style="position: relative;">
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

        <!-- Row 10: Step 0 Next Step Button -->
        <div class="step-bottom-action-wrap ${hasAdminPw ? 'toss-reveal' : ''}" id="row-next-action">
          <button class="btn-step-next" id="btn-step0-next" type="button">
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
    `;
    this.bindEvents();
  }

  bindEvents() {
    // Next Step Button
    const nextBtn = this.container.querySelector('#btn-step0-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const state = window.builderStore.getState();
        if (!state.techStack) {
          window.builderStore.showToast('기술 스택을 먼저 선택해주세요.', 'warning');
          return;
        }
        const success = window.builderStore.setStep(1);
        if (success) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

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

    let currentPaddingTop = null;

    const advanceProgressiveStep = (element, shouldFocus = true) => {
      if (!element) return;

      const targetInput = element.querySelector('input, select, button');
      if (shouldFocus && targetInput) {
        targetInput.focus({ preventScroll: true });
      }

      const container = this.container.querySelector('.step0-container');
      if (!container) return;

      const viewportHeight = window.innerHeight;

      if (currentPaddingTop === null) {
        currentPaddingTop = Math.round((viewportHeight / 2) - 120);
      }

      // Smoothly reduce padding-top down to 24px (natural top)
      if (currentPaddingTop > 24) {
        currentPaddingTop = Math.max(24, currentPaddingTop - 60);
        container.style.paddingTop = `${currentPaddingTop}px`;
      }

      // Smoothly scroll window if element is below vertical center
      requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const absoluteElementTop = rect.top + window.pageYOffset;
        const targetScrollY = absoluteElementTop - (viewportHeight / 2) + (rect.height / 2);

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth'
        });
      });
    };

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

        // Auto reveal Row 1 (사이트명) and smoothly position to center
        const row1 = this.container.querySelector('#row-site-title');
        if (row1) {
          const isNew = !row1.classList.contains('toss-reveal');
          if (isNew) {
            row1.classList.add('toss-reveal');
            advanceProgressiveStep(row1, true);
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

    // Sequential 1-Row-at-a-Time Progression
    const setupProgressiveRow = (currentInput, nextRowId) => {
      if (!currentInput) return;
      
      currentInput.addEventListener('input', () => {
        updateSiteInfo();
        updateAdminAuth();
      });

      currentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          updateSiteInfo();
          updateAdminAuth();
          if (currentInput.value.trim().length > 0) {
            const nextRow = this.container.querySelector(nextRowId);
            if (nextRow) {
              const isNew = !nextRow.classList.contains('toss-reveal');
              if (isNew) {
                nextRow.classList.add('toss-reveal');
                advanceProgressiveStep(nextRow, true);
              } else {
                const nextInput = nextRow.querySelector('input, select, button');
                if (nextInput) nextInput.focus();
              }
            }
          }
        }
      });

      currentInput.addEventListener('blur', () => {
        updateSiteInfo();
        updateAdminAuth();
        if (currentInput.value.trim().length > 0) {
          const nextRow = this.container.querySelector(nextRowId);
          if (nextRow && !nextRow.classList.contains('toss-reveal')) {
            nextRow.classList.add('toss-reveal');
          }
        }
      });
    };

    setupProgressiveRow(siteTitleInput, '#row-company-name');
    setupProgressiveRow(companyNameInput, '#row-company-name-en');
    setupProgressiveRow(companyNameEnInput, '#row-owner-name');
    setupProgressiveRow(ownerNameInput, '#row-biz-num');
    setupProgressiveRow(bizNumInput, '#row-phone');
    setupProgressiveRow(phoneInput, '#row-address');
    
    if (addressInput) {
      addressInput.addEventListener('input', () => updateSiteInfo());
      addressInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          updateSiteInfo();
          if (addressInput.value.trim().length > 0) {
            const nextRow = this.container.querySelector('#row-charset');
            if (nextRow) {
              const isNew = !nextRow.classList.contains('toss-reveal');
              if (isNew) {
                nextRow.classList.add('toss-reveal');
                advanceProgressiveStep(nextRow, true);
              } else {
                const nextInput = nextRow.querySelector('input, select, button');
                if (nextInput) nextInput.focus();
              }
            }
          }
        }
      });
      addressInput.addEventListener('blur', () => {
        updateSiteInfo();
        if (addressInput.value.trim().length > 0) {
          const nextRow = this.container.querySelector('#row-charset');
          if (nextRow && !nextRow.classList.contains('toss-reveal')) {
            nextRow.classList.add('toss-reveal');
          }
        }
      });
    }

    if (charsetInput) {
      const advanceFromCharset = (fromEnter = false) => {
        updateSiteInfo();
        const nextRow = this.container.querySelector('#row-admin-id');
        if (nextRow) {
          const isNew = !nextRow.classList.contains('toss-reveal');
          if (isNew) {
            nextRow.classList.add('toss-reveal');
            advanceProgressiveStep(nextRow, true);
          } else if (fromEnter) {
            const nextInput = nextRow.querySelector('input, select, button');
            if (nextInput) nextInput.focus();
          }
        }
      };

      charsetInput.addEventListener('change', () => advanceFromCharset(false));
      charsetInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          advanceFromCharset(true);
        }
      });
    }

    setupProgressiveRow(adminIdInput, '#row-admin-pw');

    if (adminPwInput) {
      adminPwInput.addEventListener('input', () => updateAdminAuth());
      adminPwInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          updateAdminAuth();
          if (adminPwInput.value.trim().length > 0) {
            const nextRow = this.container.querySelector('#row-next-action');
            if (nextRow) {
              const isNew = !nextRow.classList.contains('toss-reveal');
              if (isNew) {
                nextRow.classList.add('toss-reveal');
                advanceProgressiveStep(nextRow, true);
              } else {
                const nextBtn = nextRow.querySelector('button');
                if (nextBtn) nextBtn.focus();
              }
            }
          }
        }
      });
      adminPwInput.addEventListener('blur', () => {
        updateAdminAuth();
        if (adminPwInput.value.trim().length > 0) {
          const nextRow = this.container.querySelector('#row-next-action');
          if (nextRow && !nextRow.classList.contains('toss-reveal')) {
            nextRow.classList.add('toss-reveal');
          }
        }
      });
    }

    // Toggle Password Visibility
    if (togglePwBtn && adminPwInput) {
      togglePwBtn.addEventListener('click', () => {
        const isPw = adminPwInput.type === 'password';
        adminPwInput.type = isPw ? 'text' : 'password';
        const eyeIcon = togglePwBtn.querySelector('.icon-eye');
        const eyeOffIcon = togglePwBtn.querySelector('.icon-eye-off');
        if (eyeIcon && eyeOffIcon) {
          eyeIcon.style.display = isPw ? 'none' : 'block';
          eyeOffIcon.style.display = isPw ? 'block' : 'none';
        }
      });
    }

    // Sample Autofill Button
    const autofillBtn = this.container.querySelector('#btn-autofill-sample');
    if (autofillBtn) {
      autofillBtn.addEventListener('click', () => {
        const state = window.builderStore.getState();
        if (!state.techStack) {
          window.builderStore.updateState({ techStack: 'php' });
          const phpTab = this.container.querySelector('.tech-10a-tab[data-stack="php"]');
          if (phpTab) {
            this.container.querySelectorAll('.tech-10a-tab').forEach(t => {
              t.classList.remove('active');
              const title = t.querySelector('.tech-tab-title');
              if (title) title.style.color = '#64748b';
            });
            phpTab.classList.add('active');
            const title = phpTab.querySelector('.tech-tab-title');
            if (title) title.style.color = '#0f172a';
          }
          const bodyEl = this.container.querySelector('#tech-10a-body');
          if (bodyEl) {
            bodyEl.classList.add('active-body');
            const d = stackInfoMap.php;
            document.getElementById('tech-10a-title').textContent = d.title;
            document.getElementById('tech-10a-badge').textContent = d.badge;
            document.getElementById('tech-10a-desc').textContent = d.desc;
            document.getElementById('tech-10a-chips').innerHTML = d.chips.map(chip => `<span class="tech-10a-dot-chip">${chip}</span>`).join('');
          }
        }

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

        if (siteTitleInput) siteTitleInput.value = sampleSiteInfo.siteTitle;
        if (companyNameInput) companyNameInput.value = sampleSiteInfo.companyName;
        if (companyNameEnInput) companyNameEnInput.value = sampleSiteInfo.companyNameEn;
        if (ownerNameInput) ownerNameInput.value = sampleSiteInfo.ownerName;
        if (bizNumInput) bizNumInput.value = sampleSiteInfo.bizNum;
        if (phoneInput) phoneInput.value = sampleSiteInfo.phone;
        if (addressInput) addressInput.value = sampleSiteInfo.address;
        if (charsetInput) charsetInput.value = sampleSiteInfo.charset;
        if (adminIdInput) adminIdInput.value = sampleAdminAuth.adminId;
        if (adminPwInput) adminPwInput.value = sampleAdminAuth.adminPw;

        window.builderStore.updateState({
          siteInfo: sampleSiteInfo,
          adminAuth: sampleAdminAuth
        });

        // Reveal all sequential rows immediately
        [
          '#row-site-title', '#row-company-name', '#row-company-name-en', '#row-owner-name',
          '#row-biz-num', '#row-phone', '#row-address',
          '#row-charset', '#row-admin-id', '#row-admin-pw',
          '#row-next-action'
        ].forEach(selector => {
          const row = this.container.querySelector(selector);
          if (row && !row.classList.contains('toss-reveal')) {
            row.classList.add('toss-reveal');
          }
        });

        const container = this.container.querySelector('.step0-container');
        if (container) container.style.paddingTop = '24px';
        const nextActionRow = this.container.querySelector('#row-next-action');
        if (nextActionRow) {
          setTimeout(() => {
            const elRect = nextActionRow.getBoundingClientRect();
            const targetScrollY = window.scrollY + elRect.top - (window.innerHeight / 2) + (elRect.height / 2);
            if (targetScrollY > 0) {
              window.scrollTo({ top: Math.max(0, targetScrollY), behavior: 'smooth' });
            }
          }, 80);
        }
      });
    }
  }
}
