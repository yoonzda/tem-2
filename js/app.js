/**
 * Main Application Orchestrator (Unified Single-Page Workspace)
 * Connects store, all builder sections on a single page, and standard beforeunload warning
 */

import { builderStore } from './store.js';
import { TechStackSelector } from './components/TechStackSelector.js';
import { PageTypeSelector } from './components/PageTypeSelector.js';
import { FeatureMatrix } from './components/FeatureMatrix.js';
import { Exporter } from './components/Exporter.js';

class App {
  constructor() {
    this.sections = {};
    this.init();
  }

  init() {
    this.renderSinglePage();

    // Standard Browser BeforeUnload Warning
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  }

  renderSinglePage() {
    const contentRoot = document.getElementById('step-content-root');
    if (!contentRoot) return;

    contentRoot.innerHTML = `
      <div id="section-exporter" class="onepage-sticky-bar-wrap"></div>
      <div class="onepage-setup-wrapper">
        <section id="section-tech-stack" class="onepage-section"></section>
        <section id="section-page-type" class="onepage-section"></section>
        <section id="section-features" class="onepage-section"></section>
      </div>
    `;

    this.sections.techStack = new TechStackSelector('section-tech-stack');
    this.sections.pageType = new PageTypeSelector('section-page-type');
    this.sections.features = new FeatureMatrix('section-features');
    this.sections.exporter = new Exporter('section-exporter');
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
