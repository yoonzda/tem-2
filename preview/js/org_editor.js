/**
 * Organization Live Editor for User Preview (조직도 실시간 에디터)
 * - 부서 헤더: 32px 대형 타이포그래피 & 영문 서브 캡션
 * - 인원 명단: 200x240 고정 사진 + 핵심 정보 (이름, 직책, 연락처, 이메일)
 * - 좌클릭 시에만 즉시 인라인 수정 모드 진입 (우클릭 시에는 수정 모드 진입 원천 제한 및 레이어만 노출)
 * - 우클릭 메뉴 [수정하기] 클릭 시 명시적 편집 모드 진입
 * - 2열 가로 분할형 플랫 그리드
 */

window.OrgEditor = (function() {
  const STORAGE_KEY = 'WEB_BUILDER_STUDIO_STATE_V3';
  const ORG_STORAGE_KEY = 'WEB_BUILDER_CUSTOM_ORG_V1';

  // 1. Initial Standard Organization Dataset
  const DEFAULT_ORG_DATA = [
    {
      id: "dept_1",
      name: "임원진 및 대표원장",
      members: [
        {
          id: "mem_1_1",
          name: "송문호",
          position: "대표원장 (통합치의학 전문의)",
          phone: "02-1234-5678",
          email: "director@company.com",
          avatar: "https://placehold.co/200x240?text=200x240"
        },
        {
          id: "mem_1_2",
          name: "김지현",
          position: "진료부원장 (치과보존과 전문의)",
          phone: "02-1234-5679",
          email: "jihyun@company.com",
          avatar: "https://placehold.co/200x240?text=200x240"
        }
      ]
    },
    {
      id: "dept_2",
      name: "전문 진료팀 및 연구센터",
      members: [
        {
          id: "mem_2_1",
          name: "이진우",
          position: "수석 원장 (구강악안면외과)",
          phone: "02-1234-5680",
          email: "jinwoo@company.com",
          avatar: "https://placehold.co/200x240?text=200x240"
        },
        {
          id: "mem_2_2",
          name: "박서연",
          position: "임상 연구실장 (수석 치과위생사)",
          phone: "02-1234-5681",
          email: "seoyeon@company.com",
          avatar: "https://placehold.co/200x240?text=200x240"
        },
        {
          id: "mem_2_3",
          name: "최영민",
          position: "수석 기공실장 (디지털 CAD·CAM 전담)",
          phone: "02-1234-5682",
          email: "youngmin@company.com",
          avatar: "https://placehold.co/200x240?text=200x240"
        }
      ]
    },
    {
      id: "dept_3",
      name: "경영지원 및 고객만족팀",
      members: [
        {
          id: "mem_3_1",
          name: "정하나",
          position: "총괄 실장 (고객상담 기획)",
          phone: "02-1234-5683",
          email: "hana@company.com",
          avatar: "https://placehold.co/200x240?text=200x240"
        },
        {
          id: "mem_3_2",
          name: "강민수",
          position: "경영기획 팀장 (CS 총괄 매니저)",
          phone: "02-1234-5684",
          email: "minsu@company.com",
          avatar: "https://placehold.co/200x240?text=200x240"
        }
      ]
    }
  ];

  let currentOrgData = null;
  let targetContainer = null;
  let contextMenuEl = null;

  // 2. Load Data from Storage
  function loadData() {
    try {
      const rawCustom = localStorage.getItem(ORG_STORAGE_KEY);
      if (rawCustom) {
        currentOrgData = JSON.parse(rawCustom);
        currentOrgData.forEach(dept => {
          (dept.members || []).forEach(m => {
            if (m.avatar && m.avatar.includes('placehold.co')) {
              m.avatar = 'https://placehold.co/200x240?text=200x240';
            }
          });
        });
        return currentOrgData;
      }
      const rawState = localStorage.getItem(STORAGE_KEY);
      if (rawState) {
        const parsedState = JSON.parse(rawState);
        if (parsedState && parsedState.customOrgData && Array.isArray(parsedState.customOrgData)) {
          currentOrgData = parsedState.customOrgData;
          return currentOrgData;
        }
      }
    } catch (e) {
      console.warn('OrgEditor load error:', e);
    }
    currentOrgData = JSON.parse(JSON.stringify(DEFAULT_ORG_DATA));
    return currentOrgData;
  }

  // 3. Save Data to Storage
  function saveData() {
    if (!currentOrgData) return;
    try {
      localStorage.setItem(ORG_STORAGE_KEY, JSON.stringify(currentOrgData));
      const rawState = localStorage.getItem(STORAGE_KEY);
      let state = rawState ? JSON.parse(rawState) : {};
      state.customOrgData = currentOrgData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

      if (window.opener && window.opener.builderStore && typeof window.opener.builderStore.updateState === 'function') {
        window.opener.builderStore.updateState({ customOrgData: currentOrgData });
      }
    } catch (e) {
      console.warn('OrgEditor save error:', e);
    }
  }

  // 4. Render Clean Semantic HTML Structure (contenteditable 평소 미부착)
  function render(container) {
    if (!container) return;
    targetContainer = container;
    const data = currentOrgData || loadData();

    const html = `
      <section class="sub-org-section">
        <!-- 타이틀 헤더 -->
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>서울마음치과 <b>조직도</b></h2>
          <p>분야별 최고의 전문성과 신뢰를 바탕으로 환자 중심의 의료 서비스를 제공합니다.</p>
        </div>

        <div class="org-main-container layout-max layout-padding">
          <!-- 1. 대단위 부서 목록 (ul) -->
          <ul class="org-department-list">
            ${data.map((dept, dIdx) => `
              <li class="org-department-item" data-dept-idx="${dIdx}">
                
                <!-- 부서 헤더 -->
                <div class="org-dept-header" data-target-type="dept" data-dept-idx="${dIdx}">
                  <span class="org-dept-sub-label">DEPARTMENT ${dIdx < 9 ? '0' + (dIdx + 1) : (dIdx + 1)}</span>
                  <h3 class="org-dept-title org-editable-text" data-type="dept-title" data-dept-idx="${dIdx}" title="수정하기" spellcheck="false">${dept.name}</h3>
                </div>

                <!-- 2. 부서 내 구성원 목록 (ol: 2열 가로 분할형 플랫 그리드) -->
                <ol class="org-member-list" data-dept-idx="${dIdx}">
                  ${(dept.members || []).map((mem, mIdx) => `
                    <li class="org-member-card" data-dept-idx="${dIdx}" data-member-idx="${mIdx}" data-target-type="member">
                      
                      <!-- 좌측 프로필 사진 영역 (200x240 고정, 얇고 각진 정중앙 + 버튼) -->
                      <div class="org-avatar-wrap" data-dept-idx="${dIdx}" data-member-idx="${mIdx}" title="사진 변경">
                        <img class="org-avatar-img" src="${mem.avatar || 'https://placehold.co/200x240?text=200x240'}" alt="${mem.name} 프로필">
                        <div class="org-avatar-hover-layer">
                          <div class="org-avatar-plus-circle">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19M5 12H19" stroke="#1A1714" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/>
                            </svg>
                          </div>
                        </div>
                        <input type="file" class="org-file-input" data-dept-idx="${dIdx}" data-member-idx="${mIdx}" accept="image/*" style="display:none;">
                      </div>

                      <!-- 우측 구성원 핵심 정보 영역 -->
                      <div class="org-info-wrap">
                        <!-- 이름 -->
                        <h4 class="org-member-name org-editable-text" data-type="name" data-dept-idx="${dIdx}" data-member-idx="${mIdx}" title="수정하기" spellcheck="false">${mem.name}</h4>
                        
                        <!-- 직책 -->
                        <div class="org-info-row">
                          <span class="org-info-label">직책</span>
                          <span class="org-info-val org-member-pos org-editable-text" data-type="position" data-dept-idx="${dIdx}" data-member-idx="${mIdx}" title="수정하기" spellcheck="false">${mem.position}</span>
                        </div>

                        <!-- 연락처 -->
                        <div class="org-info-row">
                          <span class="org-info-label">연락처</span>
                          <span class="org-info-val org-member-phone org-editable-text" data-type="phone" data-dept-idx="${dIdx}" data-member-idx="${mIdx}" title="수정하기" spellcheck="false">${mem.phone || '02-1234-5678'}</span>
                        </div>

                        <!-- 이메일 -->
                        <div class="org-info-row">
                          <span class="org-info-label">이메일</span>
                          <span class="org-info-val org-member-email org-editable-text" data-type="email" data-dept-idx="${dIdx}" data-member-idx="${mIdx}" title="수정하기" spellcheck="false">${mem.email || 'contact@company.com'}</span>
                        </div>
                      </div>

                    </li>
                  `).join('')}
                </ol>

              </li>
            `).join('')}
          </ul>
        </div>
      </section>
    `;

    container.innerHTML = html;
    bindEvents(container);
  }

  // 5. Context Menu Layer Management
  function getOrCreateContextMenu() {
    let menu = document.getElementById('org-context-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'org-context-menu';
      menu.className = 'figma-context-menu org-ctx-menu';
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
    // 모든 활성 타겟 하이라이트 해제
    document.querySelectorAll('.active-target').forEach(el => {
      el.classList.remove('active-target');
    });
  }

  function showContextMenu(e, targetType, deptIdx, memberIdx, targetEl, hostCardEl) {
    e.preventDefault();
    e.stopPropagation();

    // 기존 타겟 하이라이트 초기화 후 현재 대상에 하이라이트 부여
    hideContextMenu();
    if (hostCardEl) {
      hostCardEl.classList.add('active-target');
    }

    const menu = getOrCreateContextMenu();
    deptIdx = parseInt(deptIdx, 10);
    memberIdx = (memberIdx !== undefined && memberIdx !== null) ? parseInt(memberIdx, 10) : null;

    let itemsHtml = '';

    if (targetType === 'dept') {
      // 부서 우클릭 메뉴 (헤더 캡션 없이 심플 액션 메뉴)
      itemsHtml = `
        <div class="ctx-item" data-action="edit" data-target="dept" data-didx="${deptIdx}">
          <span class="material-symbols-outlined ctx-icon">edit</span>
          <span class="ctx-label">부서명 수정하기</span>
        </div>
        <div class="ctx-divider"></div>
        <div class="ctx-item" data-action="add-dept-before" data-didx="${deptIdx}">
          <span class="material-symbols-outlined ctx-icon">arrow_upward</span>
          <span class="ctx-label">위로 부서 추가</span>
        </div>
        <div class="ctx-item" data-action="add-dept-after" data-didx="${deptIdx}">
          <span class="material-symbols-outlined ctx-icon">arrow_downward</span>
          <span class="ctx-label">아래로 부서 추가</span>
        </div>
        <div class="ctx-divider"></div>
        <div class="ctx-item ctx-danger" data-action="delete-dept" data-didx="${deptIdx}">
          <span class="material-symbols-outlined ctx-icon">delete</span>
          <span class="ctx-label">부서 삭제</span>
        </div>
      `;
    } else {
      // 구성원 카드 우클릭 메뉴 (헤더 캡션 없이 심플 액션 메뉴)
      const curDept = currentOrgData[deptIdx];
      const deptListHtml = currentOrgData.map((d, dI) => {
        if (dI === deptIdx) return '';
        return `<div class="ctx-sub-item" data-action="move-to-dept" data-from-dept="${deptIdx}" data-from-mem="${memberIdx}" data-to-dept="${dI}">${d.name}</div>`;
      }).filter(Boolean).join('');

      itemsHtml = `
        <div class="ctx-item" data-action="edit" data-target="member" data-didx="${deptIdx}" data-midx="${memberIdx}">
          <span class="material-symbols-outlined ctx-icon">edit</span>
          <span class="ctx-label">수정하기</span>
        </div>
        <div class="ctx-divider"></div>
        <div class="ctx-item" data-action="add-mem-before" data-didx="${deptIdx}" data-midx="${memberIdx}">
          <span class="material-symbols-outlined ctx-icon">arrow_back</span>
          <span class="ctx-label">앞에 인원 추가</span>
        </div>
        <div class="ctx-item" data-action="add-mem-after" data-didx="${deptIdx}" data-midx="${memberIdx}">
          <span class="material-symbols-outlined ctx-icon">arrow_forward</span>
          <span class="ctx-label">뒤에 인원 추가</span>
        </div>
        <div class="ctx-divider"></div>
        <div class="ctx-item ctx-has-sub" data-action="move-dept-menu">
          <span class="material-symbols-outlined ctx-icon">drive_file_move</span>
          <span class="ctx-label">부서 이동</span>
          <span class="material-symbols-outlined ctx-arrow">chevron_right</span>
          <div class="ctx-sub-menu">
            ${deptListHtml || '<div class="ctx-sub-empty">이동할 다른 부서가 없습니다</div>'}
          </div>
        </div>
        <div class="ctx-divider"></div>
        <div class="ctx-item ctx-danger" data-action="delete-mem" data-didx="${deptIdx}" data-midx="${memberIdx}">
          <span class="material-symbols-outlined ctx-icon">delete</span>
          <span class="ctx-label">인원 삭제</span>
        </div>
      `;
    }

    menu.innerHTML = itemsHtml;

    // Position Menu within Viewport
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    menu.style.display = 'block';
    menu.classList.add('open');

    const menuW = menu.offsetWidth || 210;
    const menuH = menu.offsetHeight || 220;

    let left = mouseX + 4;
    let top = mouseY + 4;

    if (left + menuW > winW - 10) left = mouseX - menuW - 4;
    if (top + menuH > winH - 10) top = winH - menuH - 10;

    menu.style.left = Math.max(10, left) + 'px';
    menu.style.top = Math.max(10, top) + 'px';

    // Bind Context Menu Item Actions
    menu.querySelectorAll('.ctx-item, .ctx-sub-item').forEach(item => {
      item.onclick = function(clickEvt) {
        clickEvt.stopPropagation();
        const action = this.getAttribute('data-action');
        const dI = parseInt(this.getAttribute('data-didx'), 10);
        const mI = parseInt(this.getAttribute('data-midx'), 10);

        hideContextMenu();

        if (action === 'edit') {
          if (targetEl) {
            targetEl.setAttribute('contenteditable', 'true');
            targetEl.focus();
            const range = document.createRange();
            range.selectNodeContents(targetEl);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
        } else if (action === 'add-dept-before') {
          addDept(dI, 0);
        } else if (action === 'add-dept-after') {
          addDept(dI, 1);
        } else if (action === 'delete-dept') {
          deleteDept(dI);
        } else if (action === 'add-mem-before') {
          addMember(dI, mI, 0);
        } else if (action === 'add-mem-after') {
          addMember(dI, mI, 1);
        } else if (action === 'delete-mem') {
          deleteMember(dI, mI);
        } else if (action === 'move-to-dept') {
          const fromDept = parseInt(this.getAttribute('data-from-dept'), 10);
          const fromMem = parseInt(this.getAttribute('data-from-mem'), 10);
          const toDept = parseInt(this.getAttribute('data-to-dept'), 10);
          moveMemberToDept(fromDept, fromMem, toDept);
        }
      };
    });
  }

  // 6. Data Mutation Operations
  function addDept(dIdx, offset) {
    const insertIndex = dIdx + offset;
    const newDept = {
      id: 'dept_' + Date.now(),
      name: '새로운 부서 ' + (currentOrgData.length + 1),
      members: [
        {
          id: 'mem_' + Date.now(),
          name: '구성원 성함',
          position: '직책 (담당 업무)',
          phone: '02-1234-5678',
          email: 'member@company.com',
          avatar: 'https://placehold.co/200x240?text=200x240'
        }
      ]
    };
    currentOrgData.splice(insertIndex, 0, newDept);
    saveData();
    render(targetContainer);
  }

  function deleteDept(dIdx) {
    if (currentOrgData.length <= 1) {
      alert('최소 1개 이상의 부서가 필요합니다.');
      return;
    }
    if (confirm(`'${currentOrgData[dIdx].name}' 부서를 삭제하시겠습니까?`)) {
      currentOrgData.splice(dIdx, 1);
      saveData();
      render(targetContainer);
    }
  }

  function addMember(dIdx, mIdx, offset) {
    const dept = currentOrgData[dIdx];
    if (!dept) return;
    const insertIndex = mIdx + offset;
    const newMem = {
      id: 'mem_' + Date.now(),
      name: '신규 구성원',
      position: '직책 (담당)',
      phone: '02-1234-5678',
      email: 'new_member@company.com',
      avatar: 'https://placehold.co/200x240?text=200x240'
    };
    dept.members.splice(insertIndex, 0, newMem);
    saveData();
    render(targetContainer);
  }

  function deleteMember(dIdx, mIdx) {
    const dept = currentOrgData[dIdx];
    if (!dept || !dept.members) return;
    if (dept.members.length <= 1) {
      alert('부서 내 최소 1명의 구성원이 유지되어야 합니다.');
      return;
    }
    const memName = dept.members[mIdx]?.name || '구성원';
    if (confirm(`'${memName}' 구성원을 삭제하시겠습니까?`)) {
      dept.members.splice(mIdx, 1);
      saveData();
      render(targetContainer);
    }
  }

  function moveMemberToDept(fromDeptIdx, fromMemIdx, toDeptIdx) {
    const fromDept = currentOrgData[fromDeptIdx];
    const toDept = currentOrgData[toDeptIdx];
    if (!fromDept || !toDept) return;

    if (fromDept.members.length <= 1) {
      alert('부서 내 최소 1명의 구성원이 유지되어야 합니다.');
      return;
    }

    const [movedMem] = fromDept.members.splice(fromMemIdx, 1);
    toDept.members.push(movedMem);

    saveData();
    render(targetContainer);
  }

  // 7. Event Binding & Interactivity (좌클릭 시에만 직접 수정 활성화)
  function bindEvents(container) {
    // A. Direct In-place Editing: 좌클릭 시에만 contenteditable=true 부여 후 포커스
    container.querySelectorAll('.org-editable-text').forEach(el => {
      let isComposing = false;
      el.addEventListener('compositionstart', () => isComposing = true);
      el.addEventListener('compositionend', () => isComposing = false);

      // 좌클릭 시에만 편집 모드 진입
      el.addEventListener('click', function(e) {
        if (e.button === 0) { // 좌클릭
          if (this.getAttribute('contenteditable') !== 'true') {
            this.setAttribute('contenteditable', 'true');
            this.focus();
          }
        }
      });

      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !isComposing) {
          e.preventDefault();
          el.blur();
        }
      });

      // 포커스 해제 시 contenteditable 제거 및 데이터 저장
      el.addEventListener('blur', function() {
        this.removeAttribute('contenteditable');
        const type = this.getAttribute('data-type');
        const dIdx = parseInt(this.getAttribute('data-dept-idx'), 10);
        const mIdx = parseInt(this.getAttribute('data-member-idx'), 10);
        const val = this.innerText.trim();

        if (type === 'dept-title') {
          if (currentOrgData[dIdx]) {
            currentOrgData[dIdx].name = val || '부서명';
          }
        } else if (currentOrgData[dIdx] && currentOrgData[dIdx].members[mIdx]) {
          const mem = currentOrgData[dIdx].members[mIdx];
          if (type === 'name') mem.name = val || '성함';
          else if (type === 'position') mem.position = val || '직책';
          else if (type === 'phone') mem.phone = val || '02-1234-5678';
          else if (type === 'email') mem.email = val || 'contact@company.com';
        }
        saveData();
      });
    });

    // B. Profile Avatar File Upload (Local Image Only)
    container.querySelectorAll('.org-avatar-wrap').forEach(avatarWrap => {
      const fileInput = avatarWrap.querySelector('.org-file-input');
      const imgEl = avatarWrap.querySelector('.org-avatar-img');
      const dIdx = parseInt(avatarWrap.getAttribute('data-dept-idx'), 10);
      const mIdx = parseInt(avatarWrap.getAttribute('data-member-idx'), 10);

      avatarWrap.addEventListener('click', e => {
        e.stopPropagation();
        if (fileInput) fileInput.click();
      });

      if (fileInput) {
        fileInput.addEventListener('change', function() {
          const file = this.files && this.files[0];
          if (!file) return;

          if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 등록할 수 있습니다.');
            return;
          }

          const reader = new FileReader();
          reader.onload = function(evt) {
            const dataUrl = evt.target.result;
            if (imgEl) imgEl.src = dataUrl;

            if (currentOrgData[dIdx] && currentOrgData[dIdx].members[mIdx]) {
              currentOrgData[dIdx].members[mIdx].avatar = dataUrl;
              saveData();
            }
          };
          reader.readAsDataURL(file);
        });
      }
    });

    // C. Right-Click Context Menu Trigger (우클릭 시 수정 모드 진입 원천 차단 및 메뉴 레이어만 노출)
    container.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();

      const memberCard = e.target.closest('.org-member-card');
      const deptItem = e.target.closest('.org-department-item');
      const deptHeader = e.target.closest('.org-dept-header');

      if (memberCard) {
        const dIdx = memberCard.getAttribute('data-dept-idx');
        const mIdx = memberCard.getAttribute('data-member-idx');
        const clickedEditable = e.target.closest('.org-editable-text') || memberCard.querySelector('.org-member-name');
        showContextMenu(e, 'member', dIdx, mIdx, clickedEditable, memberCard);
      } else if (deptHeader || deptItem) {
        const targetDeptItem = deptItem || (deptHeader && deptHeader.closest('.org-department-item'));
        const dIdx = targetDeptItem.getAttribute('data-dept-idx');
        showContextMenu(e, 'dept', dIdx, null, targetDeptItem.querySelector('.org-dept-title'), targetDeptItem);
      }
    });
  }

  // Global Context Menu Closer (바깥 클릭, ESC 키, 마우스 휠 스크롤 시 닫힘)
  document.addEventListener('click', e => {
    if (!e.target.closest('#org-context-menu')) {
      hideContextMenu();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      hideContextMenu();
    }
  });

  window.addEventListener('scroll', () => {
    hideContextMenu();
  }, { passive: true });

  return {
    init: function(container) {
      loadData();
      render(container);
    },
    getData: function() {
      return currentOrgData || loadData();
    }
  };
})();
