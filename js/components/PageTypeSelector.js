/**
 * Step 2: Page Type Selector Component
 * 1:1 Visual & Structural Inheritance from Step 0 (tech-10a-frame & Segmented Pill Tracks)
 */

import { builderStore } from '../store.js';

export class PageTypeSelector {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.PAGE_TYPES = [
      { id: 'about', name: '일반 소개형' },
      { id: 'history', name: '연혁 / 히스토리' },
      { id: 'board', name: '일반 게시판' },
      { id: 'gallery', name: '갤러리 게시판' },
      { id: 'calendar', name: '월간 캘린더' },
      { id: 'map', name: '오시는길 / 지도' },
      { id: 'contact', name: '온라인 문의 폼' },
      { id: 'faq', name: 'FAQ' },
      { id: 'custom', name: '맞춤형 빈 페이지' }
    ];
    this.activeMenuIndex = 0;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const state = window.builderStore.getState();
    const menus = state.menus || [];
    const pageOptions = state.pageOptions || {};

    if (menus.length === 0) {
      this.container.innerHTML = `
        <div class="step2-container">
          <div class="step2-empty-notice">
            <p>등록된 메뉴가 없습니다. 이전 단계에서 메뉴를 먼저 구성해 주세요.</p>
          </div>
        </div>
      `;
      return;
    }

    if (this.activeMenuIndex >= menus.length) {
      this.activeMenuIndex = 0;
    }

    const currentMain = menus[this.activeMenuIndex];
    const submenus = currentMain.submenus || [];

    this.container.innerHTML = `
      <div class="step2-container">
        
        <!-- Step 0 Style Unified Frame (tech-10a-frame 1:1 Match) -->
        <div class="step2-10a-frame">
          
          <!-- 1. Category Segment Header (Step 0 tech-10a-header 1:1 Match) -->
          <div class="step2-10a-header" style="grid-template-columns: repeat(${menus.length}, 1fr);">
            ${menus.map((main, idx) => {
              const isActive = idx === this.activeMenuIndex;
              return `
                <div class="step2-10a-tab ${isActive ? 'active' : ''}" data-cat-idx="${idx}">
                  <span class="step2-tab-code">0${idx + 1}</span>
                  <span class="step2-tab-name">${main.name}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- 2. Submenu Rows with Step 0 Segmented Pill Tracks -->
          <div class="step2-10a-body">
            <div class="step2-sub-rows">
              ${submenus.length === 0 ? `
                <div class="step2-sub-row" data-sub-id="${currentMain.id}">
                  <div class="step2-sub-title-wrap">
                    <span class="step2-sub-idx">1</span>
                    <span class="step2-sub-title">${currentMain.name}</span>
                  </div>
                  <div class="step2-segment-track">
                    ${this.PAGE_TYPES.map(pt => {
                      const currentType = pageOptions[currentMain.id]?.type || 'about';
                      const isMatch = pt.id === currentType;
                      return `
                        <button type="button" class="step2-seg-pill ${isMatch ? 'active' : ''}" data-type-id="${pt.id}" data-menu-id="${currentMain.id}">
                          ${pt.name}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : submenus.map((sub, sIdx) => {
                const config = pageOptions[sub.id] || { type: 'about' };
                const currentType = config.type || 'about';

                return `
                  <div class="step2-sub-row" data-sub-id="${sub.id}">
                    <div class="step2-sub-title-wrap">
                      <span class="step2-sub-idx">${sIdx + 1}</span>
                      <span class="step2-sub-title">${sub.name}</span>
                    </div>
                    <div class="step2-segment-track">
                      ${this.PAGE_TYPES.map(pt => {
                        const isMatch = pt.id === currentType;
                        return `
                          <button type="button" class="step2-seg-pill ${isMatch ? 'active' : ''}" data-type-id="${pt.id}" data-menu-id="${sub.id}">
                            ${pt.name}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

        <!-- 3. Next Step Button -->
        <div class="step-bottom-action-wrap">
          <button class="btn-step-next" id="btn-step2-next" type="button">
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
    // 1. Next Step Button
    const nextBtn = this.container.querySelector('#btn-step2-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const success = window.builderStore.setStep(3);
        if (success) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // 2. Category Segment Tab Switch
    this.container.querySelectorAll('.step2-10a-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const catIdx = parseInt(tab.getAttribute('data-cat-idx'), 10);
        if (this.activeMenuIndex !== catIdx) {
          this.activeMenuIndex = catIdx;
          this.render();
        }
      });
    });

    // 3. Segment Pill Click
    this.container.querySelectorAll('.step2-seg-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const menuId = btn.getAttribute('data-menu-id');
        const typeId = btn.getAttribute('data-type-id');

        const pageOptions = { ...window.builderStore.getState().pageOptions };
        pageOptions[menuId] = {
          type: typeId,
          options: this.getDefaultOptionsForType(typeId)
        };

        window.builderStore.updateState({ pageOptions });

        // Update active class on pills in this row
        const row = btn.closest('.step2-sub-row');
        if (row) {
          row.querySelectorAll('.step2-seg-pill').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-type-id') === typeId);
          });
        }
      });
    });
  }

  getDefaultOptionsForType(type) {
    switch (type) {
      case 'about': return { layout: 'subtab', sections: ['greeting', 'vision'] };
      case 'history': return { layout: 'vertical_timeline', interactive: true };
      case 'map': return { mode: 'address', transitInfo: true };
      case 'program': return { mode: 'admin_approval', maxQuota: 20, waitlist: true, cancelEnabled: true, fields: ['name', 'phone', 'birth', 'count', 'notes', 'terms'] };
      case 'calendar': return { view: 'month', tags: ['event', 'edu', 'off', 'apply'] };
      case 'board': return { layout: 'table', attach: true, search: true, perPage: 10 };
      case 'gallery': return { cols: 3, lightbox: true, ratio: '16:9' };
      case 'faq': return { categories: ['전체', '이용안내', '비용/환불', '기타'], mode: 'single', search: true };
      case 'contact': return { purpose: 'consult', fields: ['name', 'phone', 'email', 'content', 'terms'] };
      case 'archive': return { showExtBadge: true, showCount: true, perPage: 10 };
      case 'custom': return { template: 'clean' };
      default: return {};
    }
  }
}
