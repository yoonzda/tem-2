/**
 * FAQ Live Editor for User Preview (자주 묻는 질문 실시간 에디터)
 * - 아코디언: 순수 CSS Grid 기반의 실키 스무스 트랜지션 (자연스럽게 스르륵 열리고 닫히는 모션)
 * - 인라인 실시간 텍스트 수정: 좌클릭 시 contenteditable="true" 진입 (title="수정하기", 제목 호버 박스는 글자 너비에 딱 맞춤)
 * - 순서 변경 기능: 체브론 옆 미니멀 위/아래 이동 버튼(▲/▼) 및 우클릭 메뉴 [위로 이동], [아래로 이동] 지원
 * - 우클릭 컨텍스트 메뉴: [수정하기], [위로 이동], [아래로 이동], [위로 질문 추가], [아래로 질문 추가], [삭제]
 * - 하단 질문 추가 버튼: 원클릭으로 신규 질문 즉시 등록
 * - 관리자 페이지와 1:1 실시간 양방향 동기화
 * - Q. 폰트 굵기: 400
 */

window.FaqEditor = (function() {
  const STORAGE_KEY = 'WEB_BUILDER_STUDIO_STATE_V3';
  const FAQ_STORAGE_KEY = 'WEB_BUILDER_CUSTOM_FAQ_V1';

  // 1. Initial Standard FAQ Dataset
  const DEFAULT_FAQ_DATA = [
    {
      id: 'faq_1',
      q: '서울마음치과의 초진 예약은 어떻게 진행되나요?',
      a: '온라인 문의 접수 또는 대표전화(02-1234-5678)를 통해 원하시는 날짜와 시간을 사전 예약하시면 대기 시간을 최소화하여 편안하게 진료받으실 수 있습니다.',
      isOpen: true
    },
    {
      id: 'faq_2',
      q: '야간 진료나 주말 진료도 가능한가요?',
      a: '네, 매주 화요일은 오후 7시 30분까지 야간 진료를 운영하며, 토요일은 점심시간 없이 오후 2시까지 진료하고 있습니다.',
      isOpen: false
    },
    {
      id: 'faq_3',
      q: '과잉진료 없이 투명하게 치료 계획을 안내받을 수 있나요?',
      a: '저희는 1인 1기구 원칙과 디지털 정밀 진료를 바탕으로 과잉진료 없이 꼭 필요한 치료만을 정직하게 설명드리고 진행합니다.',
      isOpen: false
    },
    {
      id: 'faq_4',
      q: '주차 공간이 마련되어 있나요?',
      a: '건물 전용 주차장을 이용하실 수 있으며, 방문 고객께 무료 주차권을 제공해 드립니다.',
      isOpen: false
    },
    {
      id: 'faq_5',
      q: '치료 후 사후 관리 및 보증 제도가 있나요?',
      a: '임플란트 및 보철 치료 등 주요 진료에 대해 책임 진료 보증제를 실시하여 사후 정기 검진을 체계적으로 지원합니다.',
      isOpen: false
    }
  ];

  let currentFaqData = null;
  let targetContainer = null;
  let currentSubName = '자주 묻는 질문';
  let contextMenuEl = null;

  function cleanPlainText(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.innerHTML = str;
    return (temp.textContent || temp.innerText || '').trim();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // 2. Load Data from Storage
  function loadData() {
    try {
      const rawCustom = localStorage.getItem(FAQ_STORAGE_KEY);
      if (rawCustom) {
        currentFaqData = JSON.parse(rawCustom);
        if (Array.isArray(currentFaqData) && currentFaqData.length > 0) {
          currentFaqData.forEach(item => {
            item.q = cleanPlainText(item.q);
            item.a = cleanPlainText(item.a);
            if (item.isVisible === undefined) item.isVisible = true;
          });
          return currentFaqData;
        }
      }
      const rawState = localStorage.getItem(STORAGE_KEY);
      if (rawState) {
        const parsedState = JSON.parse(rawState);
        if (parsedState && parsedState.customFaqData && Array.isArray(parsedState.customFaqData) && parsedState.customFaqData.length > 0) {
          currentFaqData = parsedState.customFaqData;
          currentFaqData.forEach(item => {
            item.q = cleanPlainText(item.q);
            item.a = cleanPlainText(item.a);
            if (item.isVisible === undefined) item.isVisible = true;
          });
          return currentFaqData;
        }
      }
    } catch (e) {
      console.warn('FaqEditor load error:', e);
    }
    currentFaqData = JSON.parse(JSON.stringify(DEFAULT_FAQ_DATA));
    currentFaqData.forEach(item => {
      item.q = cleanPlainText(item.q);
      item.a = cleanPlainText(item.a);
      if (item.isVisible === undefined) item.isVisible = true;
    });
    return currentFaqData;
  }

  // 3. Save Data to Storage
  function saveData() {
    if (!currentFaqData) return;
    try {
      localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(currentFaqData));
      const rawState = localStorage.getItem(STORAGE_KEY);
      let state = rawState ? JSON.parse(rawState) : {};
      state.customFaqData = currentFaqData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

      // Dispatch custom storage event for same-tab and openers
      window.dispatchEvent(new Event('storage'));

      if (window.opener && window.opener.builderStore && typeof window.opener.builderStore.updateState === 'function') {
        window.opener.builderStore.updateState({ customFaqData: currentFaqData });
      }
    } catch (e) {
      console.warn('FaqEditor save error:', e);
    }
  }

  // 4. Render Clean HTML Structure
  function render(container, subName) {
    if (!container) return;
    targetContainer = container;
    if (subName) currentSubName = subName;

    const data = currentFaqData || loadData();
    const visibleData = data.filter(item => item.isVisible !== false);

    const html = `
      <section class="sub-page-section sub-faq-section">
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>
            서울마음치과 <b>${currentSubName}</b>
          </h2>
          <p>자주 묻는 질문을 확인하시고 궁금한 사항을 빠르게 해결하세요.</p>
        </div>

        <div class="layout-max layout-padding">
          <div class="sub-faq-list">
            ${visibleData.map((item) => {
              const origIdx = data.indexOf(item);
              return `
              <div class="sub-faq-item ${item.isOpen ? 'open' : ''}" data-idx="${origIdx}">
                <div class="sub-faq-question" data-idx="${origIdx}">
                  <div class="sub-faq-q-text">
                    <span class="sub-faq-q-badge">Q.</span>
                    <span class="sub-faq-editable-text sub-faq-q-val" data-field="q" data-idx="${origIdx}" title="수정하기" spellcheck="false">${escapeHtml(cleanPlainText(item.q))}</span>
                  </div>
                  <span class="material-symbols-outlined sub-faq-chevron">expand_more</span>
                </div>
                <div class="sub-faq-answer-wrap">
                  <div class="sub-faq-answer">
                    <div class="sub-faq-editable-text sub-faq-a-val" data-field="a" data-idx="${origIdx}" title="수정하기" spellcheck="false">${escapeHtml(cleanPlainText(item.a))}</div>
                  </div>
                </div>
              </div>
            `;}).join('')}
          </div>

          <!-- 신규 질문 추가 버튼 -->
          <div class="sub-faq-actions">
            <button type="button" class="sub-faq-add-btn">
              <span class="material-symbols-outlined">add</span>
              <span>질문 추가</span>
            </button>
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
    bindEvents(container);
  }

  // 5. Context Menu Layer Management
  function getOrCreateContextMenu() {
    let menu = document.getElementById('faq-context-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'faq-context-menu';
      menu.className = 'figma-context-menu faq-ctx-menu';
      document.body.appendChild(menu);
    }
    contextMenuEl = menu;
    return menu;
  }

  function hideContextMenu() {
    if (contextMenuEl) {
      contextMenuEl.classList.remove('open');
      contextMenuEl.innerHTML = '';
    }
    document.querySelectorAll('.sub-faq-item.active-target').forEach(el => {
      el.classList.remove('active-target');
    });
  }

  function showContextMenu(e, targetIdx, targetField, targetEl, hostItemEl) {
    e.preventDefault();
    e.stopPropagation();

    hideContextMenu();
    if (hostItemEl) {
      hostItemEl.classList.add('active-target');
    }

    const menu = getOrCreateContextMenu();
    const idx = parseInt(targetIdx, 10);
    if (!currentFaqData || !currentFaqData[idx]) return;

    menu.innerHTML = `
      <div class="context-menu-group">
        <button type="button" class="context-menu-item" data-action="edit" data-idx="${idx}" data-field="${targetField || 'q'}">
          <span class="material-symbols-outlined">edit</span>
          <span>수정하기</span>
        </button>
        ${idx > 0 ? `
          <button type="button" class="context-menu-item" data-action="move-up" data-idx="${idx}">
            <span class="material-symbols-outlined">arrow_upward</span>
            <span>위로 이동</span>
          </button>
        ` : ''}
        ${idx < currentFaqData.length - 1 ? `
          <button type="button" class="context-menu-item" data-action="move-down" data-idx="${idx}">
            <span class="material-symbols-outlined">arrow_downward</span>
            <span>아래로 이동</span>
          </button>
        ` : ''}
        <button type="button" class="context-menu-item" data-action="add-above" data-idx="${idx}">
          <span class="material-symbols-outlined">add</span>
          <span>위로 질문 추가</span>
        </button>
        <button type="button" class="context-menu-item" data-action="add-below" data-idx="${idx}">
          <span class="material-symbols-outlined">add</span>
          <span>아래로 질문 추가</span>
        </button>
        <button type="button" class="context-menu-item item-danger" data-action="delete" data-idx="${idx}">
          <span class="material-symbols-outlined">delete</span>
          <span>삭제</span>
        </button>
      </div>
    `;

    // Position Menu within Viewport
    const posX = Math.min(e.clientX, window.innerWidth - 180);
    const posY = Math.min(e.clientY, window.innerHeight - 240);

    menu.style.left = `${Math.max(10, posX)}px`;
    menu.style.top = `${Math.max(10, posY)}px`;
    menu.classList.add('open');

    // Bind Context Menu Item Actions
    menu.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        hideContextMenu();

        const action = this.getAttribute('data-action');
        const itemIdx = parseInt(this.getAttribute('data-idx'), 10);
        const field = this.getAttribute('data-field') || 'q';

        if (action === 'edit') {
          focusEditableField(itemIdx, field);
        } else if (action === 'move-up') {
          moveQuestion(itemIdx, -1);
        } else if (action === 'move-down') {
          moveQuestion(itemIdx, 1);
        } else if (action === 'add-above') {
          addQuestion(itemIdx, 'above');
        } else if (action === 'add-below') {
          addQuestion(itemIdx, 'below');
        } else if (action === 'delete') {
          deleteQuestion(itemIdx);
        }
      });
    });
  }

  // 6. Data Mutation Operations
  function moveQuestion(idx, direction) {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= currentFaqData.length) return;
    const [moved] = currentFaqData.splice(idx, 1);
    currentFaqData.splice(targetIdx, 0, moved);
    saveData();
    render(targetContainer);

    setTimeout(() => {
      const itemEl = targetContainer.querySelector(`.sub-faq-item[data-idx="${targetIdx}"]`);
      if (itemEl) {
        itemEl.classList.add('active-target');
        setTimeout(() => itemEl.classList.remove('active-target'), 1000);
      }
    }, 50);
  }

  function addQuestion(idx, position) {
    const insertIdx = position === 'above' ? idx : idx + 1;
    const newFaq = {
      id: 'faq_' + Date.now(),
      q: '새로운 질문을 입력하세요.',
      a: '질문에 대한 상세 답변을 입력하세요.',
      isOpen: true
    };

    currentFaqData.splice(insertIdx, 0, newFaq);
    saveData();
    render(targetContainer);

    setTimeout(() => {
      focusEditableField(insertIdx, 'q');
    }, 60);
  }

  function addQuestionAtEnd() {
    const newFaq = {
      id: 'faq_' + Date.now(),
      q: '새로운 질문을 입력하세요.',
      a: '질문에 대한 상세 답변을 입력하세요.',
      isOpen: true
    };

    currentFaqData.push(newFaq);
    const newIdx = currentFaqData.length - 1;
    saveData();
    render(targetContainer);

    setTimeout(() => {
      const items = targetContainer.querySelectorAll('.sub-faq-item');
      if (items[newIdx]) {
        items[newIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      focusEditableField(newIdx, 'q');
    }, 80);
  }

  function deleteQuestion(idx) {
    if (currentFaqData.length <= 1) {
      alert('최소 1개 이상의 질문이 유지되어야 합니다.');
      return;
    }

    currentFaqData.splice(idx, 1);
    saveData();
    render(targetContainer);
  }

  function focusEditableField(idx, field) {
    const itemEl = targetContainer.querySelector(`.sub-faq-item[data-idx="${idx}"]`);
    if (!itemEl) return;

    if (!itemEl.classList.contains('open')) {
      itemEl.classList.add('open');
      if (currentFaqData[idx]) currentFaqData[idx].isOpen = true;
    }

    const targetEl = itemEl.querySelector(`.sub-faq-editable-text[data-field="${field}"]`);
    if (targetEl) {
      targetEl.setAttribute('contenteditable', 'true');
      targetEl.focus();
      try {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(targetEl);
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (err) {}
    }
  }

  // 7. Event Binding & Interactivity
  function bindEvents(container) {
    // A. Accordion Toggle & Editable Focus Handler
    container.querySelectorAll('.sub-faq-question').forEach(questionEl => {
      questionEl.addEventListener('click', function(e) {
        const itemEl = this.closest('.sub-faq-item');
        if (!itemEl) return;
        const idx = parseInt(itemEl.getAttribute('data-idx'), 10);
        const editableEl = e.target.closest('.sub-faq-editable-text');

        if (editableEl) {
          // 질문 텍스트 클릭 시: 아코디언이 닫혀있으면 부드럽게 펼쳐주고 인라인 수정 모드 진입
          if (!itemEl.classList.contains('open')) {
            itemEl.classList.add('open');
            if (currentFaqData[idx]) currentFaqData[idx].isOpen = true;
          }
          if (editableEl.getAttribute('contenteditable') !== 'true') {
            editableEl.setAttribute('contenteditable', 'true');
            editableEl.focus();
          }
        } else {
          // 질문 텍스트 영역 외 (체브론, 배경, Q. 뱃지 등) 클릭 시: 아코디언 부드럽게 토글
          const isOpen = itemEl.classList.toggle('open');
          if (currentFaqData[idx]) currentFaqData[idx].isOpen = isOpen;
        }
      });
    });

    // B. Direct In-place Editing: contenteditable 관리 및 Blur 시 저장
    container.querySelectorAll('.sub-faq-editable-text').forEach(el => {
      let isComposing = false;
      el.addEventListener('compositionstart', () => isComposing = true);
      el.addEventListener('compositionend', () => isComposing = false);

      el.addEventListener('click', function(e) {
        if (e.button === 0) { // 좌클릭
          if (this.getAttribute('contenteditable') !== 'true') {
            this.setAttribute('contenteditable', 'true');
            this.focus();
          }
        }
      });

      el.addEventListener('keydown', function(e) {
        const field = this.getAttribute('data-field');
        if (field === 'q' && e.key === 'Enter' && !isComposing) {
          e.preventDefault();
          this.blur();
        }
      });

      el.addEventListener('paste', function(e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text/plain') || '';
        document.execCommand('insertText', false, text);
      });

      el.addEventListener('blur', function() {
        this.removeAttribute('contenteditable');
        const field = this.getAttribute('data-field');
        const idx = parseInt(this.getAttribute('data-idx'), 10);
        const val = cleanPlainText(this.innerText.trim());

        if (currentFaqData && currentFaqData[idx]) {
          if (field === 'q') {
            currentFaqData[idx].q = val || '질문을 입력하세요.';
          } else if (field === 'a') {
            currentFaqData[idx].a = val || '답변을 입력하세요.';
          }
          saveData();
        }
      });
    });

    // C. Right Click Context Menu Handler
    container.addEventListener('contextmenu', function(e) {
      const itemEl = e.target.closest('.sub-faq-item');
      if (!itemEl) return;

      const idx = parseInt(itemEl.getAttribute('data-idx'), 10);
      const editableEl = e.target.closest('.sub-faq-editable-text');
      const field = editableEl ? editableEl.getAttribute('data-field') : 'q';

      // 우클릭 시 현재 활성화된 contenteditable 포커스 해제
      if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('sub-faq-editable-text')) {
        document.activeElement.blur();
      }

      showContextMenu(e, idx, field, editableEl, itemEl);
    });

    // E. 하단 질문 추가 버튼
    const addBtn = container.querySelector('.sub-faq-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addQuestionAtEnd();
      });
    }
  }

  // Global Context Menu Closers (바깥 클릭, ESC 키, 스크롤)
  document.addEventListener('click', function(e) {
    if (contextMenuEl && !contextMenuEl.contains(e.target)) {
      hideContextMenu();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideContextMenu();
    }
  });

  window.addEventListener('scroll', function() {
    hideContextMenu();
  }, { passive: true });

  return {
    init: function(container, subName) {
      loadData();
      render(container, subName);
    },
    getData: function() {
      return currentFaqData || loadData();
    },
    resetToDefault: function() {
      localStorage.removeItem(FAQ_STORAGE_KEY);
      currentFaqData = JSON.parse(JSON.stringify(DEFAULT_FAQ_DATA));
      saveData();
      if (targetContainer) render(targetContainer, currentSubName);
    }
  };
})();
