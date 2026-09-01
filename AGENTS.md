# BUILDER STUDIO - Mandatory Agent Working Rules & Anti-Regression Policy

## ⚠️ CRITICAL CORE DIRECTIVE: Anti-Regression & Scope Isolation

### 1. Strict Scope Isolation (요청 범위 한정 원칙)
- **수정 요청된 대상만 수정할 것**: 사용자가 특정 부분(A)의 수정을 요청했을 때, 요청 범위 밖의 다른 부분(B, C, D)을 임의로 건드리거나 수정하지 않습니다.
- **임의 개선 및 부수 변경 절대 금지**: "더 보기 좋게 하겠다"는 이유로 사용자가 요청하지 않은 섹션, 스타일, 텍스트, 로직을 임의로 변경하지 않습니다.

### 2. Frozen Decisions Protection (기존 확정 내역 영구 보존 원칙)
- **이미 수정/확정된 사항은 절대 되돌리지(Revert) 않는다**:
  1. **NO Placeholders**: 모든 input / textarea 요소에 `placeholder` 속성 추가 절대 금지.
  2. **Clean Reset on Refresh (F5)**: 새로고침 시 모든 입력창은 빈 상태로 Step 0에서 시작.
  3. **User Preview 1:1 Match**: 사용자 페이지(`user_preview.html`)는 승인된 1:1 `example` 템플릿(서울마음치과 원페이지 퍼블리싱 구조, 스타일, 스크립트 및 에셋)으로 영구 고정.
  4. **Sample Autofill Button**: 샘플 자동입력 버튼은 텍스트 없이 **아이콘만 있는 순수 아이콘 버튼**으로 유지 (클릭 시에만 데이터 입력).
  5. **Step 0 Tech Stack Logos Frozen (B-3 42px)**: Step 0의 3대 기술 스택 로고는 **B-3 조합 (Gilbarbara PHP: `assets/logos/php/php_gilbarbara.svg`, HTML5: `assets/logos/html5/html5_gilbarbara.svg`, Node.js: `assets/logos/nodejs/nodejs_gilbarbara_icon.svg`, 크기: 42px)**으로 영구 고정하며, 향후 어떠한 작업에서도 절대 임의 수정/교체/되돌리기 금지.
  6. **NO Hover Floating / Lift Effects (호버 시 떠오르는 효과 절대 금지)**: 모든 카드, 버튼, 뱃지, 아이템 등 UI 요소에 마우스 호버(`:hover`) 시 물리적으로 위로 떠오르거나 확대되는 모션(`transform: translateY(-...)`, `transform: scale(...)` 등) 추가 절대 금지. 색상, 테두리, 미세한 그림자 등 정적이고 안정적인 인터랙션만 사용.
  7. **Subpage Standard Grid & 1280px Alignment Frozen**: 모든 서브페이지의 레이아웃은 `.layout-max` (1620px) 및 `.layout-padding` (1280px 이상 `padding-inline: 8%`, 1280px 미만 `4%`) 표준 규칙을 적용하며, 서브 컨테이너에 하드코딩된 좌우 패딩(`padding: ... 0 ... 0;`)으로 `.layout-padding`을 무효화하는 것을 절대 금지.
  8. **In-Place Live Editor & Context Menu Standards Frozen**: 모든 인라인 편집 가능한 텍스트는 간결한 `title="수정하기"` 툴팁을 사용하고, 우클릭 시에는 텍스트 포커스 대신 미니멀한 컨텍스트 메뉴(`[수정하기], [위로 추가], [아래로 추가], [삭제]`)를 제공하며, UI 전체에서 이모지(Emoji) 사용은 100% 금지하고 Material Symbols Outlined 벡터 아이콘만 사용.
- 새로운 수정 작업을 진행할 때, 위 확정 사항이 손상되지 않도록 100% 보존합니다.

### 3. Surgical Precision Editing (정밀 국소 수정 원칙)
- 불필요하게 전체 파일을 통째로 덮어쓰거나 재작성하지 않고, 수정이 필요한 특정 함수/블록만 정밀하게 타겟팅하여 수정합니다.

### 4. Pre-Commit Regression Checklist (작업 완료 전 자가 검증 의무)
- 코드를 변경한 후 사용자에게 답변하기 전에 반드시 다음을 자가 검증합니다:
  - [ ] 사용자가 요청한 범위 외의 다른 파일/컴포넌트를 임의로 변경하지 않았는가?
  - [ ] 이전에 사용자와 확정한 규칙(Placeholder 금지, 새로고침 리셋, 1:1 뷰, 호버 떠오름 금지, 1280px 그리드 표준, 이모지 금지 등)을 위반하지 않았는가?
