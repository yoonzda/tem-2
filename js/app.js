/**
 * Main Application Orchestrator
 * Connects store, stepper, step views, and standard beforeunload warning
 */

import { builderStore } from './store.js';
import { HeaderStepper } from './components/HeaderStepper.js';
import { TechStackSelector } from './components/TechStackSelector.js';
import { MegaMenuEditor } from './components/MegaMenuEditor.js';
import { PageTypeSelector } from './components/PageTypeSelector.js';
import { FeatureMatrix } from './components/FeatureMatrix.js';
import { Exporter } from './components/Exporter.js';

class App {
  constructor() {
    this.stepper = null;
    this.activeComponent = null;
    this.currentRenderedStep = null;
    this.init();
  }

  init() {
    // 1. Initialize Stepper in Fixed Bottom Bar
    this.stepper = new HeaderStepper('stepper-root');

    // 2. Subscribe to step changes
    builderStore.subscribe((state) => {
      if (this.currentRenderedStep !== state.currentStep) {
        this.renderCurrentStep(state.currentStep);
      }
    });

    // 3. Render initial step (Step 0 on fresh start)
    this.renderCurrentStep(builderStore.getState().currentStep);

    // 4. Standard Browser BeforeUnload Warning
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  }

  renderCurrentStep(stepIndex) {
    this.currentRenderedStep = stepIndex;
    window.scrollTo(0, 0);
    const contentRoot = document.getElementById('step-content-root');
    if (!contentRoot) return;

    contentRoot.innerHTML = `<div id="step-active-view"></div>`;

    switch (stepIndex) {
      case 0:
        this.activeComponent = new TechStackSelector('step-active-view');
        break;
      case 1:
        this.activeComponent = new MegaMenuEditor('step-active-view');
        break;
      case 2:
        this.activeComponent = new PageTypeSelector('step-active-view');
        break;
      case 3:
        this.activeComponent = new FeatureMatrix('step-active-view');
        break;
      case 4:
        this.activeComponent = new Exporter('step-active-view');
        break;
      default:
        this.activeComponent = new TechStackSelector('step-active-view');
    }
  }
}

// Bootstrap Application Safely (Runs immediately if DOM is already parsed)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
  });
} else {
  window.app = new App();
}
