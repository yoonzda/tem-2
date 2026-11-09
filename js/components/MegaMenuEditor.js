/**
 * Step 1: Mega-Menu Layer Hierarchy Component
 * (Protected Fixed Index & Direct Pure Text Editing)
 */

import { builderStore } from '../store.js';

export class MegaMenuEditor {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const state = builderStore.getState();
    const menus = state.menus || [];

    this.container.innerHTML = `
      <div class="hz-flow-container">
        <div class="hz-flow-wrap" id="hz-flow-wrap">
          ${menus.map((cat, catIdx) => `
            <div class="hz-flow-row" data-cat-idx="${catIdx}">
              <!-- Left: Main Category Label (Fixed 01 index + Editable name) -->
              <div class="hz-cat-label-wrap">
                <div class="hz-cat-label">
                  <span class="hz-cat-num">0${catIdx + 1}</span>
                  <span class="hz-cat-name" contenteditable="true" spellcheck="false" data-cat-idx="${catIdx}" title="클릭하여 대메뉴명 수정">${cat.name}</span>
                </div>
                ${menus.length > 1 ? `<button class="btn-delete-x cat-del" data-action="del-cat" data-cat-idx="${catIdx}" title="대메뉴 삭제" type="button">✕</button>` : ''}
              </div>

              <!-- Right: Submenu Chips Flow -->
              <div class="hz-sub-chips">
                ${(cat.submenus || []).map((sub, itemIdx) => `
                  <div class="hz-chip" data-cat-idx="${catIdx}" data-sub-idx="${itemIdx}">
                    <span class="hz-chip-name" contenteditable="true" spellcheck="false" data-cat-idx="${catIdx}" data-sub-idx="${itemIdx}" title="클릭하여 메뉴명 수정">${sub.name}</span>
                    <button class="btn-delete-x" data-action="del-sub" data-cat-idx="${catIdx}" data-sub-idx="${itemIdx}" title="메뉴 삭제" type="button">✕</button>
                  </div>
                `).join('')}
                <button class="btn-hz-add" data-action="add-sub" data-cat-idx="${catIdx}" type="button">+ 메뉴 추가</button>
              </div>
            </div>
          `).join('')}

          <!-- Add Main Category Full Width Row (Single Clean Button) -->
          <div class="hz-add-main-wrap">
            <button class="btn-hz-add-main" id="btn-hz-add-main" type="button">+ 대메뉴 추가</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // 1. Direct ContentEditable Edit for Submenus (IME Safe)
    this.container.querySelectorAll('.hz-chip-name[contenteditable="true"]').forEach(span => {
      let isComposing = false;

      span.addEventListener('compositionstart', () => {
        isComposing = true;
      });

      span.addEventListener('compositionend', () => {
        isComposing = false;
      });

      span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !isComposing) {
          e.preventDefault();
          span.blur();
        }
      });

      span.addEventListener('blur', () => {
        const catIdx = parseInt(span.getAttribute('data-cat-idx'), 10);
        const subIdx = parseInt(span.getAttribute('data-sub-idx'), 10);
        const menus = JSON.parse(JSON.stringify(builderStore.getState().menus));
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
          builderStore.updateState({ menus });
        }
      });
    });

    // 2. Direct ContentEditable Edit for Category Names Only (01 is protected)
    this.container.querySelectorAll('.hz-cat-name[contenteditable="true"]').forEach(span => {
      let isComposing = false;

      span.addEventListener('compositionstart', () => {
        isComposing = true;
      });

      span.addEventListener('compositionend', () => {
        isComposing = false;
      });

      span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !isComposing) {
          e.preventDefault();
          span.blur();
        }
      });

      span.addEventListener('blur', () => {
        const catIdx = parseInt(span.getAttribute('data-cat-idx'), 10);
        const menus = JSON.parse(JSON.stringify(builderStore.getState().menus));
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
          builderStore.updateState({ menus });
        }
      });
    });

    // 3. Delete Submenu
    this.container.querySelectorAll('[data-action="del-sub"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catIdx = parseInt(btn.getAttribute('data-cat-idx'), 10);
        const subIdx = parseInt(btn.getAttribute('data-sub-idx'), 10);
        const menus = JSON.parse(JSON.stringify(builderStore.getState().menus));
        const curCat = menus[catIdx];
        if (!curCat || !curCat.submenus || !curCat.submenus[subIdx]) return;

        curCat.submenus.splice(subIdx, 1);
        builderStore.updateState({ menus });
        this.render();
      });
    });

    // 4. Delete Category
    this.container.querySelectorAll('[data-action="del-cat"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catIdx = parseInt(btn.getAttribute('data-cat-idx'), 10);
        const menus = JSON.parse(JSON.stringify(builderStore.getState().menus));
        if (menus.length <= 1) {
          builderStore.showToast('최소 1개 이상의 대메뉴가 필요합니다.', 'warning');
          return;
        }

        menus.splice(catIdx, 1);
        builderStore.updateState({ menus });
        this.render();
      });
    });

    // 5. Add Submenu
    this.container.querySelectorAll('[data-action="add-sub"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catIdx = parseInt(btn.getAttribute('data-cat-idx'), 10);
        const menus = JSON.parse(JSON.stringify(builderStore.getState().menus));
        const curCat = menus[catIdx];
        if (!curCat) return;

        const newSubId = `s_${Date.now()}`;
        if (!curCat.submenus) curCat.submenus = [];
        curCat.submenus.push({ id: newSubId, name: '새 메뉴' });

        const pageOptions = { ...builderStore.getState().pageOptions };
        pageOptions[newSubId] = { type: 'about', options: { layout: 'subtab', sections: ['greeting'] } };

        builderStore.updateState({ menus, pageOptions });
        this.render();

        // Focus the newly added editable text
        const newSubIdx = curCat.submenus.length - 1;
        const newSpan = this.container.querySelector(`.hz-chip-name[data-cat-idx="${catIdx}"][data-sub-idx="${newSubIdx}"]`);
        if (newSpan) {
          this.focusContentEditable(newSpan);
        }
      });
    });

    // 6. Add Main Category
    const btnAddMain = this.container.querySelector('#btn-hz-add-main');
    if (btnAddMain) {
      btnAddMain.addEventListener('click', (e) => {
        e.stopPropagation();
        const menus = JSON.parse(JSON.stringify(builderStore.getState().menus));
        const newMainId = `m_${Date.now()}`;
        const newSubId = `s_${Date.now()}_1`;
        menus.push({
          id: newMainId,
          name: '새 대메뉴',
          submenus: [
            { id: newSubId, name: '기본 메뉴' }
          ]
        });

        const pageOptions = { ...builderStore.getState().pageOptions };
        pageOptions[newSubId] = { type: 'about', options: { layout: 'subtab', sections: ['greeting'] } };

        builderStore.updateState({ menus, pageOptions });
        this.render();

        // Focus the newly added category text
        const newCatIdx = menus.length - 1;
        const newSpan = this.container.querySelector(`.hz-cat-name[data-cat-idx="${newCatIdx}"]`);
        if (newSpan) {
          this.focusContentEditable(newSpan);
        }
      });
    }
  }

  focusContentEditable(el) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
