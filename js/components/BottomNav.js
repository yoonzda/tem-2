/**
 * Bottom Navigation Controls Component
 * Strictly 0-Radius Flat Dark Action Buttons
 */

export class BottomNav {
  constructor() {
    this.init();
  }

  init() {
    window.builderStore.subscribe(() => this.updateNav());
    this.bindEvents();
    this.updateNav();
  }

  updateNav() {
    const state = window.builderStore.getState();
    const currentStep = state.currentStep;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === 4;

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (btnPrev) {
      btnPrev.disabled = isFirstStep;
    }

    if (btnNext) {
      btnNext.innerHTML = `
        <span>${isLastStep ? '설정 완료' : '다음 단계'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${isLastStep ? '<path d="M20 6L9 17l-5-5"/>' : '<path d="M9 18l6-6-6-6"/>'}</svg>
      `;
    }
  }

  bindEvents() {
    const btnReset = document.getElementById('btn-reset');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (btnReset) {
      btnReset.addEventListener('click', () => this.showResetModal());
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const state = window.builderStore.getState();
        if (state.currentStep > 0) {
          window.builderStore.setStep(state.currentStep - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const state = window.builderStore.getState();
        if (state.currentStep === 4) {
          const downloadBtn = document.getElementById('btn-download-project');
          if (downloadBtn) {
            downloadBtn.scrollIntoView({ behavior: 'smooth' });
            downloadBtn.focus();
          }
        } else {
          const success = window.builderStore.setStep(state.currentStep + 1);
          if (success) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
    }
  }

  showResetModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box" style="border-radius: 0 !important;">
        <h3 class="modal-title">설정 초기화 확인</h3>
        <p class="modal-desc">
          모든 메뉴 구성, 페이지 옵션, 부가 기능 설정이 기본 표준값으로 초기화됩니다.<br>
          계속 진행하시겠습니까?
        </p>
        <div class="modal-actions">
          <button class="btn-dark-secondary" id="modal-cancel-btn" style="border-radius: 0 !important;">취소</button>
          <button class="btn btn-danger" id="modal-confirm-btn" style="border-radius: 0 !important;">초기화 실행</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#modal-cancel-btn').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.querySelector('#modal-confirm-btn').addEventListener('click', () => {
      window.builderStore.resetStore();
      document.body.removeChild(modal);
    });
  }
}
