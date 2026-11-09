/**
 * Step 2: Page Type Selector Component
 * 1:1 Visual & Structural Inheritance from Step 0 (tech-10a-frame & Segmented Pill Tracks)
 */

import { builderStore } from '../store.js';

export class PageTypeSelector {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.PAGE_TYPES = [
      { id: 'about', name: '일반소개' },
      { id: 'history', name: '연혁' },
      { id: 'org', name: '구성원' },
      { id: 'board', name: '게시판' },
      { id: 'download', name: '자료실' },
      { id: 'gallery', name: '갤러리' },
      { id: 'calendar', name: '캘린더' },
      { id: 'map', name: '오시는길' },
      { id: 'contact', name: '온라인 문의' },
      { id: 'faq', name: 'FAQ' },
      { id: 'custom', name: '빈 페이지' }
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

    if (this.activeMenuIndex >= menus.length) {
      this.activeMenuIndex = Math.max(0, menus.length - 1);
    }

    const currentMain = menus[this.activeMenuIndex];
    const submenus = currentMain ? (currentMain.submenus || []) : [];

    this.container.innerHTML = `
      <div class="step2-container">
        <div class="onepage-zone-header">
          <h2 class="onepage-zone-title">메뉴 구성 및 페이지 유형</h2>
        </div>

        <div class="step2-10a-frame">
          <!-- 1. Unified Main Category Header Bar (Select / Rename / Add / Delete Main Menu) -->
          <div class="step2-10a-header">
            <div class="step2-tabs-track">
              ${menus.map((main, idx) => {
                const isActive = idx === this.activeMenuIndex;
                return `
                  <div class="step2-10a-tab ${isActive ? 'active' : ''}" data-cat-idx="${idx}">
                    <span class="step2-tab-code">0${idx + 1}</span>
                    <span class="step2-tab-name" ${isActive ? 'contenteditable="true" spellcheck="false" title="수정하기"' : ''} data-cat-idx="${idx}">${main.name}</span>
                    ${menus.length > 1 ? `<button type="button" class="btn-delete-x cat-del" data-action="del-cat" data-cat-idx="${idx}" title="대메뉴 삭제">✕</button>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
            <button type="button" class="btn-unified-add-main" id="btn-unified-add-main">+ 대메뉴 추가</button>
          </div>

          <!-- 2. Submenu Rows + Page Type Pill Track -->
          <div class="step2-10a-body">
            <div class="step2-sub-rows">
              ${submenus.map((sub, sIdx) => {
                const config = pageOptions[sub.id] || { type: 'about' };
                const rawType = config.type || 'about';
                const currentType = (rawType === 'departments' || rawType === 'business' || rawType === 'service') ? 'about' : rawType;

                return `
                  <div class="step2-sub-row" data-sub-id="${sub.id}">
                    <div class="step2-sub-title-wrap">
                      <span class="step2-sub-idx">${sIdx + 1}</span>
                      <span class="step2-sub-title" contenteditable="true" spellcheck="false" data-cat-idx="${this.activeMenuIndex}" data-sub-idx="${sIdx}" title="수정하기">${sub.name}</span>
                      ${submenus.length > 1 ? `<button type="button" class="btn-delete-x sub-del" data-action="del-sub" data-cat-idx="${this.activeMenuIndex}" data-sub-idx="${sIdx}" title="하위메뉴 삭제">✕</button>` : ''}
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

            <!-- Add Submenu Action Row -->
            <div class="step2-add-sub-wrap">
              <button type="button" class="btn-unified-add-sub" id="btn-unified-add-sub" data-cat-idx="${this.activeMenuIndex}">+ 하위메뉴 추가</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // 1. Category Tab Switch
    this.container.querySelectorAll('.step2-10a-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        if (e.target.closest('[data-action="del-cat"]')) return;
        const catIdx = parseInt(tab.getAttribute('data-cat-idx'), 10);
        if (this.activeMenuIndex !== catIdx) {
          this.activeMenuIndex = catIdx;
          this.render();
        }
      });
    });

    // 2. Main Category Name Inline Edit (IME Safe)
    this.container.querySelectorAll('.step2-tab-name[contenteditable="true"]').forEach(span => {
      let isComposing = false;
      span.addEventListener('compositionstart', () => { isComposing = true; });
      span.addEventListener('compositionend', () => { isComposing = false; });
      span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !isComposing) {
          e.preventDefault();
          span.blur();
        }
      });
      span.addEventListener('blur', () => {
        const catIdx = parseInt(span.getAttribute('data-cat-idx'), 10);
        const menus = JSON.parse(JSON.stringify(window.builderStore.getState().menus));
        const curCat = menus[catIdx];
        if (!curCat) return;

        const originalText = curCat.name;
        const newText = span.textContent.trim();
        if (!newText) {
          span.textContent = originalText;
          return;
        }
        if (newText !== originalText) {
          curCat.name = newText;
          window.builderStore.updateState({ menus });
        }
      });
    });

    // 3. Submenu Name Inline Edit (IME Safe)
    this.container.querySelectorAll('.step2-sub-title[contenteditable="true"]').forEach(span => {
      let isComposing = false;
      span.addEventListener('compositionstart', () => { isComposing = true; });
      span.addEventListener('compositionend', () => { isComposing = false; });
      span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !isComposing) {
          e.preventDefault();
          span.blur();
        }
      });
      span.addEventListener('blur', () => {
        const catIdx = parseInt(span.getAttribute('data-cat-idx'), 10);
        const subIdx = parseInt(span.getAttribute('data-sub-idx'), 10);
        const menus = JSON.parse(JSON.stringify(window.builderStore.getState().menus));
        const curCat = menus[catIdx];
        if (!curCat || !curCat.submenus || !curCat.submenus[subIdx]) return;

        const originalText = curCat.submenus[subIdx].name;
        const newText = span.textContent.trim();
        if (!newText) {
          span.textContent = originalText;
          return;
        }
        if (newText !== originalText) {
          curCat.submenus[subIdx].name = newText;
          window.builderStore.updateState({ menus });
        }
      });
    });

    // 4. Add Main Category
    const btnAddMain = this.container.querySelector('#btn-unified-add-main');
    if (btnAddMain) {
      btnAddMain.addEventListener('click', (e) => {
        e.stopPropagation();
        const menus = JSON.parse(JSON.stringify(window.builderStore.getState().menus));
        const newMainId = `m_${Date.now()}`;
        const newSubId = `s_${Date.now()}_1`;
        menus.push({
          id: newMainId,
          name: '새 대메뉴',
          submenus: [
            { id: newSubId, name: '기본 메뉴' }
          ]
        });

        const pageOptions = { ...window.builderStore.getState().pageOptions };
        pageOptions[newSubId] = { type: 'about', options: { layout: 'subtab', sections: ['greeting'] } };

        this.activeMenuIndex = menus.length - 1;
        window.builderStore.updateState({ menus, pageOptions });
        this.render();

        const newSpan = this.container.querySelector(`.step2-tab-name[data-cat-idx="${this.activeMenuIndex}"]`);
        if (newSpan) this.focusContentEditable(newSpan);
      });
    }

    // 5. Delete Main Category
    this.container.querySelectorAll('[data-action="del-cat"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catIdx = parseInt(btn.getAttribute('data-cat-idx'), 10);
        const menus = JSON.parse(JSON.stringify(window.builderStore.getState().menus));
        if (menus.length <= 1) {
          window.builderStore.showToast('최소 1개 이상의 대메뉴가 필요합니다.', 'warning');
          return;
        }
        menus.splice(catIdx, 1);
        if (this.activeMenuIndex >= menus.length) {
          this.activeMenuIndex = Math.max(0, menus.length - 1);
        }
        window.builderStore.updateState({ menus });
        this.render();
      });
    });

    // 6. Add Submenu
    const btnAddSub = this.container.querySelector('#btn-unified-add-sub');
    if (btnAddSub) {
      btnAddSub.addEventListener('click', (e) => {
        e.stopPropagation();
        const catIdx = parseInt(btnAddSub.getAttribute('data-cat-idx'), 10);
        const menus = JSON.parse(JSON.stringify(window.builderStore.getState().menus));
        const curCat = menus[catIdx];
        if (!curCat) return;

        const newSubId = `s_${Date.now()}`;
        if (!curCat.submenus) curCat.submenus = [];
        curCat.submenus.push({ id: newSubId, name: '새 메뉴' });

        const pageOptions = { ...window.builderStore.getState().pageOptions };
        pageOptions[newSubId] = { type: 'about', options: { layout: 'subtab', sections: ['greeting'] } };

        window.builderStore.updateState({ menus, pageOptions });
        this.render();

        const newSubIdx = curCat.submenus.length - 1;
        const newSpan = this.container.querySelector(`.step2-sub-title[data-cat-idx="${catIdx}"][data-sub-idx="${newSubIdx}"]`);
        if (newSpan) this.focusContentEditable(newSpan);
      });
    }

    // 7. Delete Submenu
    this.container.querySelectorAll('[data-action="del-sub"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catIdx = parseInt(btn.getAttribute('data-cat-idx'), 10);
        const subIdx = parseInt(btn.getAttribute('data-sub-idx'), 10);
        const menus = JSON.parse(JSON.stringify(window.builderStore.getState().menus));
        const curCat = menus[catIdx];
        if (!curCat || !curCat.submenus) return;
        if (curCat.submenus.length <= 1) {
          window.builderStore.showToast('최소 1개 이상의 하위메뉴가 필요합니다.', 'warning');
          return;
        }
        curCat.submenus.splice(subIdx, 1);
        window.builderStore.updateState({ menus });
        this.render();
      });
    });

    // 8. Segment Pill Click (Page Type Selection)
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

        const row = btn.closest('.step2-sub-row');
        if (row) {
          row.querySelectorAll('.step2-seg-pill').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-type-id') === typeId);
          });
        }
      });
    });
  }

  focusContentEditable(el) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  getDefaultOptionsForType(type) {
    switch (type) {
      case 'about': return { layout: 'subtab', sections: ['greeting', 'vision'] };
      case 'history': return { layout: 'vertical_timeline', interactive: true };
      case 'org': return { layout: 'department_list', showAvatar: true, showContact: true };
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
