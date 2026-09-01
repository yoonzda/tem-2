/**
 * Left Side Floating Stepper Component (Proposal 6: Active-Only Expanding Glass Pill)
 * Fixed on the left side, transparent floating rail
 */

import { builderStore } from '../store.js';

export class HeaderStepper {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.steps = [
      { id: 0, num: '01', label: '기본 내용' },
      { id: 1, num: '02', label: '메뉴 구성' },
      { id: 2, num: '03', label: '페이지 유형' },
      { id: 3, num: '04', label: '기능 선택' },
      { id: 4, num: '05', label: '미리보기' }
    ];
    this.init();
  }

  init() {
    this.render();
    builderStore.subscribe(() => this.updateStepper());
  }

  render() {
    const state = builderStore.getState();
    const currentStep = state.currentStep || 0;
    const maxReached = state.maxStepReached || 0;

    let itemsHtml = '';
    this.steps.forEach((step, idx) => {
      const isActive = step.id === currentStep;
      const isCompleted = step.id < currentStep;
      const isAccessible = step.id <= maxReached;
      const classes = ['side-expand-item'];
      if (isActive) classes.push('active');
      if (isCompleted) classes.push('completed');

      itemsHtml += `
        <div class="${classes.join(' ')}" data-step="${step.id}" id="side-item-${step.id}" style="${!isAccessible ? 'opacity: 0.35; cursor: not-allowed;' : 'cursor: pointer;'}">
          <div class="side-expand-text-wrap">
            <span class="side-expand-title">${step.label}</span>
          </div>
          <div class="side-expand-circle" id="side-circle-${step.id}">
            ${isCompleted ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>' : (idx + 1)}
          </div>
        </div>
      `;
    });

    this.container.innerHTML = `
      <div class="side-expand-container">
        ${itemsHtml}
      </div>
    `;

    this.bindEvents();
  }

  updateStepper() {
    const state = builderStore.getState();
    const currentStep = state.currentStep || 0;
    const maxReached = state.maxStepReached || 0;

    this.steps.forEach((step, idx) => {
      const el = document.getElementById(`side-item-${step.id}`);
      const circle = document.getElementById(`side-circle-${step.id}`);
      if (!el || !circle) return;

      const isActive = step.id === currentStep;
      const isCompleted = step.id < currentStep;
      const isAccessible = step.id <= maxReached;

      el.classList.toggle('active', isActive);
      el.classList.toggle('completed', isCompleted);
      el.style.opacity = !isAccessible ? '0.35' : '1';
      el.style.cursor = !isAccessible ? 'not-allowed' : 'pointer';

      circle.innerHTML = isCompleted
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>'
        : (idx + 1);
    });
  }

  bindEvents() {
    this.container.querySelectorAll('.side-expand-item').forEach(item => {
      item.addEventListener('click', () => {
        const stepId = parseInt(item.getAttribute('data-step'), 10);
        const maxReached = builderStore.getState().maxStepReached || 0;
        if (stepId <= maxReached) {
          builderStore.setStep(stepId);
        }
      });
    });
  }
}
