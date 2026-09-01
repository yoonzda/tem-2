# Web Builder Studio - Strict Anti-Regression & Work Scope Rules

## 1. Strict Scope Isolation (요청 범위 한정 원칙)
- 사용자가 수정을 요청한 정확한 대상만 수정합니다.
- 요청받지 않은 다른 컴포넌트, 섹션, 디자인, 스타일, 텍스트를 임의로 수정하거나 "개선"하지 않습니다.

## 2. Frozen Decisions Protection (기존 확정 사항 불변 원칙)
- 이전에 사용자 요청으로 수정/확정된 다음 규칙들은 어떠한 후속 작업에서도 절대 번복하거나 변경하지 않습니다:
  1. **NO Placeholders**: 모든 input / textarea / select에 `placeholder` 속성 추가 절대 금지 (빈 입력창 유지).
  2. **Clean Reset on Refresh**: 새로고침(F5) 시 모든 입력창은 완전히 빈칸으로 Step 0에서 시작.
  3. **FLOWLY User Preview 1:1 Match**: 사용자 미리보기(`user_preview.html`)는 승인된 1번 원본 목업(`spacious_minimal_longpage_1787286368604.jpg`) 6대 섹션으로 영구 고정.
  4. **Sample Autofill Button**: 샘플 자동입력 버튼은 텍스트 없이 **아이콘만 있는 순수 아이콘 버튼**으로 유지 (클릭 시에만 데이터 입력).

## 3. Surgical Line-Level Edits (정밀 국소 수정)
- 코드 수정 시 관련 없는 영역이 휩쓸려 변경되지 않도록 필요한 위치만 정밀 타겟팅하여 수정합니다.

## 4. Self-Verification Before Response (작업 완료 전 회귀 검증)
- 수정 완료 후 다음 사항을 필수 점검합니다:
  - 사용자가 요청한 범위 외의 다른 부분을 건드리지 않았는지 확인.
  - 기존에 합의된 확정 사항들이 100% 온전하게 유지되고 있는지 확인.
