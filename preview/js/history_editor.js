/**
 * History Live Editor for User Preview
 * 연혁 실시간 인라인 편집 & 우클릭(Context Menu) 레이어 컨트롤러
 * - 좌클릭: 직접 텍스트 인라인 수정
 * - 우클릭: 포커스 대신 메뉴 레이어 오픈 ([수정하기], [위로 추가], [아래로 추가], [삭제])
 */

window.HistoryEditor = (function() {
  const STORAGE_KEY = 'WEB_BUILDER_STUDIO_STATE_V3';
  const HISTORY_STORAGE_KEY = 'WEB_BUILDER_CUSTOM_HISTORY_V1';

  // 1. Initial Standard Dataset
  const DEFAULT_HISTORY_DATA = [
    {
      year: "2026",
      months: [
        {
          month: "10",
          items: [
            "디지털 3D 구강 스캐너 및 원데이 CAD/CAM 보철 전용 가공실 확장 오픈",
            "차세대 구강 내 미생물 유전자 정밀 검사 시스템 도입"
          ]
        },
        {
          month: "08",
          items: [
            "첨단 3D AI 가이드 임플란트 및 고난도 수술 전용 센터 구축",
            "환자 안심 케어를 위한 실시간 바이탈 모니터링 무통 마취 시스템 가동"
          ]
        },
        {
          month: "05",
          items: [
            "대학병원급 중앙 멸균 소독실 및 1인 1기구 무균 감염 관리 클린존 리뉴얼",
            "네이버 예약 및 카카오 알림톡 실시간 통합 스마트 접수 시스템 도입"
          ]
        },
        {
          month: "03",
          items: [
            "서울마음치과 제2진료실 증설 및 프라이빗 1:1 상담실 리모델링",
            "지역 사회 의료 취약계층 대상 무료 구강검진 및 보건 나눔 캠페인 전개"
          ]
        },
        {
          month: "01",
          items: [
            "2026년도 신년 환자 만족도 평가 최우수 의료기관 선정"
          ]
        }
      ]
    },
    {
      year: "2025",
      months: [
        {
          month: "12",
          items: [
            "임플란트 및 고난도 치주 구강 수술 누적 10,000례 달성",
            "대한치과의사협회 학술대회 최우수 임상 연구 사례 발표"
          ]
        },
        {
          month: "10",
          items: [
            "보건복지부 인증 통합치의학 우수 의료기관 표창 수상"
          ]
        },
        {
          month: "07",
          items: [
            "초정밀 저선량 3D Green CT 및 턱관절 물리치료 전용 레이저 장비 도입",
            "비보험 수가 사전 안내제 및 책임 진료 보증서 발급 제도 본격 시행"
          ]
        },
        {
          month: "04",
          items: [
            "환자 프라이버시 보호를 위한 전자 차트 및 디지털 동의서 클라우드 시스템 전면 개편",
            "구강외과 및 교정과 분과별 협진 시스템 가동"
          ]
        },
        {
          month: "02",
          items: [
            "대한민국 소비자 선호도 1위 의료브랜드(치과 부문) 대상 수상",
            "감염 예방 우수 안심 병원 클린 클리닉 인증 획득"
          ]
        }
      ]
    },
    {
      year: "2024",
      months: [
        {
          month: "11",
          items: [
            "통합치의학과 및 보존과 전문의 추가 영입 (분과별 원장 협진 체계 구축)",
            "컴퓨터 제어 미세 무통 마취기 전 체어 도입"
          ]
        },
        {
          month: "09",
          items: [
            "미국치과임플란트학회(AAID) 정회원 위촉 및 글로벌 임상 연구 협력 협약 체결"
          ]
        },
        {
          month: "06",
          items: [
            "임플란트 수술실 에어샤워 및 양압 공조 무균 수술 시스템 완비",
            "사랑니 당일 발치 및 급성 치통 원스톱 응급 진료 프로토콜 수립"
          ]
        },
        {
          month: "03",
          items: [
            "개원 4주년 기념 진료 품질 향상 및 고객 서비스 헌장 선포",
            "디지털 덴탈 엑스레이 및 파노라마 영상 AI 판독 보조 소프트웨어 도입"
          ]
        },
        {
          month: "01",
          items: [
            "지역 유관기관 및 학교 주치의 결연 협약 체결"
          ]
        }
      ]
    },
    {
      year: "2022",
      months: [
        {
          month: "09",
          items: [
            "환자 맞춤형 평생 구강 관리 주치의 프로그램 '마음 케어' 런칭",
            "대한치주과학회 정기 학술대회 우수 구연 발표상 수상"
          ]
        },
        {
          month: "03",
          items: [
            "원내 전 체어 멸균 정수 살균수 배관 시스템 전면 교체"
          ]
        }
      ]
    },
    {
      year: "2021",
      months: [
        {
          month: "11",
          items: [
            "오스템 및 덴티움 우수 임상 연구 지정 병원 협약",
            "미세 현미경 신경치료 및 자연치아 보존 특화 클리닉 개설"
          ]
        },
        {
          month: "05",
          items: [
            "의료 질 향상 및 환자 안전 관리 전담팀 신설"
          ]
        }
      ]
    },
    {
      year: "2020",
      months: [
        {
          month: "08",
          items: [
            "대한심미치과학회 및 구강악안면임플란트학회 정회원 등록"
          ]
        },
        {
          month: "03",
          items: [
            "서울마음치과 설립 및 정식 진료 개시 (대표원장 송문호)"
          ]
        }
      ]
    }
  ];

  let currentHistoryData = null;
  let targetContainer = null;
  let contextMenuEl = null;

  // 2. Load Data from Storage
  function loadData() {
    try {
      const rawCustom = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (rawCustom) {
        currentHistoryData = JSON.parse(rawCustom);
        return currentHistoryData;
      }
      const rawState = localStorage.getItem(STORAGE_KEY);
      if (rawState) {
        const parsedState = JSON.parse(rawState);
        if (parsedState && parsedState.customHistoryData && Array.isArray(parsedState.customHistoryData)) {
          currentHistoryData = parsedState.customHistoryData;
          return currentHistoryData;
        }
      }
    } catch (e) {
      console.warn('HistoryEditor load error:', e);
    }
    currentHistoryData = JSON.parse(JSON.stringify(DEFAULT_HISTORY_DATA));
    return currentHistoryData;
  }

  // 3. Save Data to Storage
  function saveData() {
    if (!currentHistoryData) return;
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(currentHistoryData));
      const rawState = localStorage.getItem(STORAGE_KEY);
      let state = rawState ? JSON.parse(rawState) : {};
      state.customHistoryData = currentHistoryData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

      if (window.opener && window.opener.builderStore && typeof window.opener.builderStore.updateState === 'function') {
        window.opener.builderStore.updateState({ customHistoryData: currentHistoryData });
      }
    } catch (e) {
      console.warn('HistoryEditor save error:', e);
    }
  }

  // 4. Render Clean HTML Structure
  function render(container) {
    if (!container) return;
    targetContainer = container;
    const data = currentHistoryData || loadData();

    const html = `
      <section class="sub-history-section">
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>
            서울마음치과 <b>연혁</b>
          </h2>
          <p>정직과 신뢰를 바탕으로 환자와 함께 성장해온 서울마음치과의 발자취입니다.</p>
        </div>

        <div class="history-main-container layout-max layout-padding">
          ${data.map((yearBlock, yIdx) => `
            <div class="history-year-block scroll-reveal in-view" data-yidx="${yIdx}">
              
              <!-- Left Year Side -->
              <div class="history-year-side" data-target-type="year" data-yidx="${yIdx}">
                <div class="history-year-num history-editable-text" contenteditable="true" data-type="year" data-yidx="${yIdx}" title="수정하기" spellcheck="false">${yearBlock.year}</div>
              </div>

              <!-- Right Content Area -->
              <div class="history-year-content">
                ${(yearBlock.months || []).map((mRow, mIdx) => `
                  <div class="history-month-row" data-yidx="${yIdx}" data-midx="${mIdx}">
                    <div class="history-month-num history-editable-text" contenteditable="true" data-type="month" data-yidx="${yIdx}" data-midx="${mIdx}" data-target-type="month" title="수정하기" spellcheck="false">${mRow.month}</div>
                    
                    <div class="history-month-items">
                      <ul class="history-list">
                        ${(mRow.items || []).map((itemText, iIdx) => `
                          <li class="history-list-item-wrap" data-yidx="${yIdx}" data-midx="${mIdx}" data-iidx="${iIdx}" data-target-type="item">
                            <span class="history-item-text history-editable-text" contenteditable="true" data-type="item" data-yidx="${yIdx}" data-midx="${mIdx}" data-iidx="${iIdx}" title="수정하기" spellcheck="false">${itemText}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    container.innerHTML = html;
    bindEvents(container);
  }

  // 5. Context Menu Layer Management ([수정하기], [위로 추가], [아래로 추가], [삭제])
  function getOrCreateContextMenu() {
    let menu = document.getElementById('history-context-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'history-context-menu';
      menu.className = 'figma-context-menu';
      document.body.appendChild(menu);
    }
    contextMenuEl = menu;
    return menu;
  }

  function hideContextMenu() {
    if (contextMenuEl) {
      contextMenuEl.classList.remove('open');
    }
  }

  function showContextMenu(e, targetType, yIdx, mIdx, iIdx, targetEl) {
    const menu = getOrCreateContextMenu();
    const data = currentHistoryData;
    if (!data || !data[yIdx]) return;

    // 4가지 깔끔한 액션: 수정하기 / 위로 추가 / 아래로 추가 / 삭제
    menu.innerHTML = `
      <div class="context-menu-group">
        <button type="button" class="context-menu-item" data-action="edit" data-target-type="${targetType}" data-yidx="${yIdx}" data-midx="${mIdx || 0}" data-iidx="${iIdx || 0}">
          <span class="material-symbols-outlined">edit</span>
          <span>수정하기</span>
        </button>
        <button type="button" class="context-menu-item" data-action="add-above" data-target-type="${targetType}" data-yidx="${yIdx}" data-midx="${mIdx || 0}" data-iidx="${iIdx || 0}">
          <span class="material-symbols-outlined">arrow_upward</span>
          <span>위로 추가</span>
        </button>
        <button type="button" class="context-menu-item" data-action="add-below" data-target-type="${targetType}" data-yidx="${yIdx}" data-midx="${mIdx || 0}" data-iidx="${iIdx || 0}">
          <span class="material-symbols-outlined">arrow_downward</span>
          <span>아래로 추가</span>
        </button>
        <button type="button" class="context-menu-item item-danger" data-action="delete" data-target-type="${targetType}" data-yidx="${yIdx}" data-midx="${mIdx || 0}" data-iidx="${iIdx || 0}">
          <span class="material-symbols-outlined">delete</span>
          <span>삭제</span>
        </button>
      </div>
    `;

    // Position Context Menu
    const posX = Math.min(e.clientX, window.innerWidth - 170);
    const posY = Math.min(e.clientY, window.innerHeight - 190);

    menu.style.left = `${posX}px`;
    menu.style.top = `${posY}px`;
    menu.classList.add('open');

    // Bind Context Menu Actions
    menu.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        hideContextMenu();

        const action = this.getAttribute('data-action');
        const tType = this.getAttribute('data-target-type');
        const targetY = parseInt(this.getAttribute('data-yidx'), 10);
        const targetM = parseInt(this.getAttribute('data-midx'), 10);
        const targetI = parseInt(this.getAttribute('data-iidx'), 10);

        if (action === 'edit') {
          if (targetEl) {
            targetEl.focus();
            try {
              const range = document.createRange();
              const sel = window.getSelection();
              range.selectNodeContents(targetEl);
              sel.removeAllRanges();
              sel.addRange(range);
            } catch (err) {}
          }
        } else if (tType === 'year') {
          if (action === 'add-above') addYear(targetY, 'above');
          else if (action === 'add-below') addYear(targetY, 'below');
          else if (action === 'delete') deleteYear(targetY);
        } else if (tType === 'month') {
          if (action === 'add-above') addMonth(targetY, targetM, 'above');
          else if (action === 'add-below') addMonth(targetY, targetM, 'below');
          else if (action === 'delete') deleteMonth(targetY, targetM);
        } else {
          // item
          if (action === 'add-above') addItemAt(targetY, targetM, targetI, 'above');
          else if (action === 'add-below') addItemAt(targetY, targetM, targetI, 'below');
          else if (action === 'delete') deleteItem(targetY, targetM, targetI);
        }
      });
    });
  }

  // 6. Bind User Interaction Events
  function bindEvents(container) {
    // A. Right Click Context Menu Handler (우클릭 시 포커스 해제 후 메뉴 레이어 노출)
    container.addEventListener('contextmenu', function(e) {
      const targetItem = e.target.closest('[data-target-type="item"]');
      const targetMonth = e.target.closest('[data-target-type="month"]');
      const targetYear = e.target.closest('[data-target-type="year"]');

      if (!targetItem && !targetMonth && !targetYear) return;

      e.preventDefault();

      // 우클릭 시 텍스트 포커스 해제
      if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('history-editable-text')) {
        document.activeElement.blur();
      }

      if (targetItem) {
        const yIdx = parseInt(targetItem.getAttribute('data-yidx'), 10);
        const mIdx = parseInt(targetItem.getAttribute('data-midx'), 10);
        const iIdx = parseInt(targetItem.getAttribute('data-iidx'), 10);
        const editableEl = targetItem.querySelector('.history-editable-text') || targetItem;
        showContextMenu(e, 'item', yIdx, mIdx, iIdx, editableEl);
      } else if (targetMonth) {
        const yIdx = parseInt(targetMonth.getAttribute('data-yidx'), 10);
        const mIdx = parseInt(targetMonth.getAttribute('data-midx'), 10);
        const editableEl = targetMonth.classList.contains('history-editable-text') ? targetMonth : targetMonth.querySelector('.history-editable-text');
        showContextMenu(e, 'month', yIdx, mIdx, 0, editableEl);
      } else if (targetYear) {
        const yIdx = parseInt(targetYear.getAttribute('data-yidx'), 10);
        const editableEl = targetYear.classList.contains('history-editable-text') ? targetYear : targetYear.querySelector('.history-editable-text');
        showContextMenu(e, 'year', yIdx, 0, 0, editableEl);
      }
    });

    // Close Context Menu on Click Outside / Esc
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

    // B. Text In-place Editing (contenteditable) - 좌클릭 직접 수정
    const editableElements = container.querySelectorAll('.history-editable-text');
    editableElements.forEach(el => {
      el.addEventListener('blur', function() {
        const type = this.getAttribute('data-type');
        const yIdx = parseInt(this.getAttribute('data-yidx'), 10);
        const mIdx = parseInt(this.getAttribute('data-midx'), 10);
        const iIdx = parseInt(this.getAttribute('data-iidx'), 10);
        const newText = this.textContent.trim();

        if (!currentHistoryData || !currentHistoryData[yIdx]) return;

        if (type === 'year') {
          currentHistoryData[yIdx].year = newText || '2026';
        } else if (type === 'month') {
          if (currentHistoryData[yIdx].months[mIdx]) {
            currentHistoryData[yIdx].months[mIdx].month = newText || '01';
          }
        } else if (type === 'item') {
          if (currentHistoryData[yIdx].months[mIdx] && currentHistoryData[yIdx].months[mIdx].items) {
            currentHistoryData[yIdx].months[mIdx].items[iIdx] = newText || '새로운 연혁 내용을 입력하세요.';
          }
        }
        saveData();
      });

      el.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (this.getAttribute('data-type') === 'year' || this.getAttribute('data-type') === 'month')) {
          e.preventDefault();
          this.blur();
        }
      });
    });
  }

  // 7. CRUD Operations
  function addYear(targetIndex, position) {
    if (!currentHistoryData) return;
    const targetYearNum = parseInt(currentHistoryData[targetIndex].year, 10) || 2026;
    const newYearNum = position === 'above' ? String(targetYearNum + 1) : String(targetYearNum - 1);

    const newYearBlock = {
      year: newYearNum,
      months: [
        {
          month: "01",
          items: ["새로운 연혁 내용을 입력하세요."]
        }
      ]
    };

    const insertIdx = position === 'above' ? targetIndex : targetIndex + 1;
    currentHistoryData.splice(insertIdx, 0, newYearBlock);
    saveData();
    render(targetContainer);
  }

  function deleteYear(targetIndex) {
    if (!currentHistoryData || currentHistoryData.length <= 1) return;
    if (!confirm(`${currentHistoryData[targetIndex].year}년도 연혁 블록을 삭제하시겠습니까?`)) return;
    currentHistoryData.splice(targetIndex, 1);
    saveData();
    render(targetContainer);
  }

  function addMonth(yearIndex, monthIndex, position) {
    if (!currentHistoryData || !currentHistoryData[yearIndex]) return;
    const newMonthRow = {
      month: "01",
      items: ["새로운 연혁 내역을 입력하세요."]
    };
    const insertIdx = position === 'above' ? monthIndex : monthIndex + 1;
    currentHistoryData[yearIndex].months.splice(insertIdx, 0, newMonthRow);
    saveData();
    render(targetContainer);
  }

  function deleteMonth(yearIndex, monthIndex) {
    if (!currentHistoryData || !currentHistoryData[yearIndex] || currentHistoryData[yearIndex].months.length <= 1) return;
    currentHistoryData[yearIndex].months.splice(monthIndex, 1);
    saveData();
    render(targetContainer);
  }

  function addItemAt(yearIndex, monthIndex, itemIndex, position) {
    if (!currentHistoryData || !currentHistoryData[yearIndex] || !currentHistoryData[yearIndex].months[monthIndex]) return;
    const insertIdx = position === 'above' ? itemIndex : itemIndex + 1;
    currentHistoryData[yearIndex].months[monthIndex].items.splice(insertIdx, 0, "새로운 세부 내역을 입력하세요.");
    saveData();
    render(targetContainer);
  }

  function deleteItem(yearIndex, monthIndex, itemIndex) {
    if (!currentHistoryData || !currentHistoryData[yearIndex] || !currentHistoryData[yearIndex].months[monthIndex]) return;
    if (currentHistoryData[yearIndex].months[monthIndex].items.length <= 1) {
      if (currentHistoryData[yearIndex].months.length > 1) {
        deleteMonth(yearIndex, monthIndex);
      }
      return;
    }
    currentHistoryData[yearIndex].months[monthIndex].items.splice(itemIndex, 1);
    saveData();
    render(targetContainer);
  }

  return {
    init: function(container) {
      loadData();
      render(container);
    },
    getData: function() {
      return currentHistoryData || loadData();
    },
    resetToDefault: function() {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      currentHistoryData = JSON.parse(JSON.stringify(DEFAULT_HISTORY_DATA));
      saveData();
      if (targetContainer) render(targetContainer);
    }
  };
})();
