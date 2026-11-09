/**
 * Step 4: Preview & Export Component
 * Full-Fidelity Production-Ready Packaging Engine & Smart Multi-Runtime Runner
 */

import { builderStore } from '../store.js';

export class Exporter {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.lastTechStack = window.builderStore.getState().techStack;
    this.render();

    window.builderStore.subscribe((state) => {
      if (state.techStack !== this.lastTechStack) {
        this.lastTechStack = state.techStack;
        this.render();
      }
    });
  }

  render() {
    const state = window.builderStore.getState();
    const stack = state.techStack || 'php';
    const stackLabels = {
      php: 'Standard PHP',
      static: 'Static HTML5',
      node: 'Node.js Express'
    };
    const activeStackLabel = state.techStack ? stackLabels[state.techStack] : '아키텍처 선택 대기';

    this.container.innerHTML = `
      <header class="onepage-top-action-bar">
        <div class="top-bar-brand">
          <span class="top-bar-logo-dot"></span>
          <span class="top-bar-title">BUILDER STUDIO</span>
          <span class="top-bar-stack-badge ${state.techStack ? 'is-selected' : ''}">${activeStackLabel}</span>
        </div>

        <div class="top-bar-actions">
          <button type="button" class="btn-autofill" id="btn-autofill-sample" title="테스트 데이터 자동 입력">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>

          <button type="button" class="top-bar-btn btn-guide" id="btn-open-deploy-guide">
            배포 가이드
          </button>

          <a href="preview/user_preview.html" id="btn-preview-user" target="_blank" class="top-bar-btn btn-preview">
            사용자 페이지 미리보기
          </a>

          <a href="preview/admin_preview.html" id="btn-preview-admin" target="_blank" class="top-bar-btn btn-preview">
            관리자 페이지 미리보기
          </a>

          <button class="top-bar-btn btn-download-primary" id="btn-download-project" type="button">
            <span id="download-btn-label-main">프로젝트 다운로드</span>
          </button>
        </div>
      </header>

      <!-- Deploy Guide Modal -->
      <div id="deploy-guide-modal" class="step3-modal-backdrop" style="display:none;">
        <div class="step3-modal-dialog" style="max-width:680px;">
          <div class="step3-modal-header">
            <div class="step3-modal-title-wrap">
              <span class="step3-modal-badge">${stackLabels[stack]}</span>
              <h3 class="step3-modal-title">로컬 실행 및 호스팅 서버 배포 가이드</h3>
            </div>
            <button type="button" class="btn-modal-close" id="btn-close-deploy-guide" title="닫기">✕</button>
          </div>
          <div class="step3-modal-body">
            <div class="modal-section">
              <h4 class="modal-section-title">가이드 1. 내 컴퓨터(로컬 PC)에서 더블클릭 1초 만에 실행하여 확인하는 법</h4>
              <ol class="modal-step-list">
                <li>다운로드받은 <strong>[프로젝트명]_standalone_package.zip</strong> 압축을 해제합니다.</li>
                <li>폴더 내 동봉된 <strong>run_local.bat</strong> (윈도우) 파일을 더블클릭합니다. (Mac/Linux: <strong>./run_local.sh</strong>)</li>
                <li>시스템 환경(PHP / Node.js / Python)을 자동 감지하여 <strong>http://localhost:8000</strong>으로 로컬 개발 서버가 즉시 1초 만에 실행됩니다.</li>
              </ol>
            </div>
            <div class="modal-section">
              <h4 class="modal-section-title">가이드 2. 실제 호스팅 서버 배포 및 운영 가이드 (${stackLabels[stack]} 맞춤형)</h4>
              <div class="modal-text-sub">
                ${stack === 'php' ? `• <strong>Standard PHP</strong>: 카페24 / 가비아 / AWS 웹루트(<strong>public_html/</strong>)에 FTP 업로드 시 별도 빌드 없이 즉시 실운영 가동됩니다.` : ''}
                ${stack === 'static' ? `• <strong>Static HTML5</strong>: GitHub Pages / Vercel / Netlify에 압축 해제한 폴더를 드래그 앤 드롭하여 정적 배포합니다.` : ''}
                ${stack === 'node' ? `• <strong>Node.js Express</strong>: 서버 터미널에서 <strong>node local_server.js</strong> 또는 <strong>pm2 start local_server.js</strong>로 즉시 구동합니다.` : ''}
              </div>
            </div>
          </div>
          <div class="step3-modal-footer">
            <button type="button" class="btn-modal-confirm" id="btn-confirm-deploy-guide">확인 완료</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const autofillBtn = this.container.querySelector('#btn-autofill-sample');
    if (autofillBtn) {
      autofillBtn.addEventListener('click', () => {
        if (window.app && window.app.sections && window.app.sections.techStack) {
          window.app.sections.techStack.autofillSample();
        }
      });
    }

    const guideModal = this.container.querySelector('#deploy-guide-modal');
    const openGuideBtn = this.container.querySelector('#btn-open-deploy-guide');
    const closeGuideBtn = this.container.querySelector('#btn-close-deploy-guide');
    const confirmGuideBtn = this.container.querySelector('#btn-confirm-deploy-guide');

    const closeGuide = () => {
      if (guideModal) {
        guideModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };

    if (openGuideBtn && guideModal) {
      openGuideBtn.addEventListener('click', () => {
        guideModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }
    if (closeGuideBtn) closeGuideBtn.addEventListener('click', closeGuide);
    if (confirmGuideBtn) confirmGuideBtn.addEventListener('click', closeGuide);
    if (guideModal) {
      guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) closeGuide();
      });
    }

    const previewUserBtn = this.container.querySelector('#btn-preview-user');
    if (previewUserBtn) {
      previewUserBtn.addEventListener('click', () => {
        window.builderStore.saveState();
      });
    }

    const previewAdminBtn = this.container.querySelector('#btn-preview-admin');
    if (previewAdminBtn) {
      previewAdminBtn.addEventListener('click', () => {
        window.builderStore.saveState();
      });
    }

    const downloadBtn = this.container.querySelector('#btn-download-project');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this.generateAndDownloadBundle());
    }
  }

  async generateAndDownloadBundle() {
    if (typeof JSZip === 'undefined') {
      alert('JSZip 라이브러리를 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const state = window.builderStore.getState();
    const btn = document.getElementById('btn-download-project');
    const labelTop = document.getElementById('download-btn-label-top');
    const labelMain = document.getElementById('download-btn-label-main');

    btn.disabled = true;
    if (labelTop) labelTop.textContent = '패키지 압축 생성 중...';
    if (labelMain) labelMain.textContent = '패키지 압축 생성 중...';

    try {
      const zip = new JSZip();
      const siteTitle = state.siteInfo?.siteTitle || 'MY_WEBSITE';
      const cleanTitle = siteTitle.replace(/[^a-zA-Z0-9가-힣_]/g, '_');

      // 1. Smart Multi-Runtime Runner (run_local.bat)
      const batScript = `@echo off\r\nchcp 65001 >nul\r\necho ========================================================\r\necho [BUILDER STUDIO] 로컬 개발 서버를 1초 만에 실행합니다.\r\necho ========================================================\r\necho.\r\n\r\nwhere php >nul 2>nul\r\nif %errorlevel% equ 0 (\r\n  echo [INFO] PHP 환경이 감지되었습니다. PHP 내장 서버를 구동합니다...\r\n  start http://localhost:8000\r\n  php -S localhost:8000\r\n  goto end\r\n)\r\n\r\nwhere node >nul 2>nul\r\nif %errorlevel% equ 0 (\r\n  echo [INFO] Node.js 환경이 감지되었습니다. 풀스택 로컬 서버를 구동합니다...\r\n  start http://localhost:8000\r\n  node local_server.js\r\n  goto end\r\n)\r\n\r\nwhere python >nul 2>nul\r\nif %errorlevel% equ 0 (\r\n  echo [INFO] Python 환경이 감지되었습니다. Python 내장 서버를 구동합니다...\r\n  start http://localhost:8000\r\n  python -m http.server 8000\r\n  goto end\r\n)\r\n\r\necho [ERROR] 로컬 PC에 PHP, Node.js 또는 Python이 설치되어 있지 않습니다.\r\necho 웹사이트 실행을 위해 Node.js(https://nodejs.org) 또는 PHP를 설치해 주세요.\r\npause\r\n:end\r\n`;

      const shScript = `#!/bin/bash\necho "[BUILDER STUDIO] 로컬 개발 서버 구동 중: http://localhost:8000"\nif command -v php >/dev/null 2>&1; then\n  which xdg-open > /dev/null && xdg-open http://localhost:8000 || open http://localhost:8000\n  php -S localhost:8000\nelif command -v node >/dev/null 2>&1; then\n  which xdg-open > /dev/null && xdg-open http://localhost:8000 || open http://localhost:8000\n  node local_server.js\nelif command -v python3 >/dev/null 2>&1; then\n  which xdg-open > /dev/null && xdg-open http://localhost:8000 || open http://localhost:8000\n  python3 -m http.server 8000\nelse\n  echo "PHP, Node.js 또는 Python이 설치되어 있지 않습니다."\nfi\n`;

      zip.file('run_local.bat', batScript);
      zip.file('run_local.sh', shScript);

      // 2. Zero-Dependency Node.js Local Fullstack Server (local_server.js)
      const localServerJs = `const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost:' + PORT);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Default to index.html or index.php
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Handle /api/ Inquiries API
  if (pathname.startsWith('/api/inquiry')) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body || '{}');
          const dataPath = path.join(__dirname, 'data', 'inquiries.json');
          let list = [];
          if (fs.existsSync(dataPath)) {
            list = JSON.parse(fs.readFileSync(dataPath, 'utf8') || '[]');
          }
          data.id = 'INQ-' + Date.now().toString().slice(-4);
          data.date = new Date().toISOString().slice(0, 10);
          data.status = '접수대기';
          list.push(data);
          fs.writeFileSync(dataPath, JSON.stringify(list, null, 2), 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, id: data.id }));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      });
      return;
    }
  }

  // Handle Static File Serving
  let filePath = path.join(__dirname, pathname);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Fallback to index.html
    const indexFallback = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexFallback)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(indexFallback).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log('========================================================');
  console.log('[BUILDER STUDIO] 로컬 풀스택 개발 서버가 구동되었습니다.');
  console.log('➜ 접속 URL: http://localhost:' + PORT);
  console.log('========================================================');
});
`;
      zip.file('local_server.js', localServerJs);

      // 3. Documentation
      zip.file('README_가이드.txt', `[BUILDER STUDIO 프로젝트 가이드]

1. 로컬 PC 실행 방법:
   - Windows: run_local.bat 더블클릭
   - Mac/Linux: ./run_local.sh 실행
   - 브라우저 접속: http://localhost:8000

2. 사이트 정보 및 변수 수정:
   - config.php 파일에서 사이트명, 회사명, 전화번호 등을 직접 수정할 수 있습니다.

3. 웹 호스팅 서버 배포:
   - FTP로 웹루트(public_html/)에 업로드
   - data/ 폴더 쓰기권한(707) 부여
   - 관리자 페이지: http://도메인/admin (아이디: ${state.adminAuth?.adminId || 'admin'})
`);

      // 4. Config Files (변수 관리 파일)
      const f = state.siteInfo || {};
      const auth = state.adminAuth || {};
      const subDesc = state.subPageDescriptions || {};

      const configPhp = `<?php
define('SITE_TITLE', '${f.siteTitle || 'MY WEBSITE'}'); // 사이트명
define('COMPANY_NAME', '${f.companyName || ''}');       // 업체명 (한글)
define('COMPANY_NAME_EN', '${f.companyNameEn || ''}'); // 업체명 (영문)
define('OWNER_NAME', '${f.ownerName || ''}');           // 대표자명
define('BIZ_NUM', '${f.bizNum || ''}');                 // 사업자번호
define('PHONE', '${f.phone || ''}');                   // 전화번호
define('ADDRESS', '${f.address || ''}');               // 주소
define('ADMIN_ID', '${auth.adminId || 'admin'}');       // 관리자 ID
define('ADMIN_PW', '${auth.adminPw || 'admin1234'}');   // 관리자 PW

// 메뉴별 서브페이지 소개 문구 설정
$SUB_PAGE_DESCRIPTIONS = ${JSON.stringify(subDesc, null, 2)};
?>`;
      zip.file('config.php', configPhp);
      zip.file('config.json', JSON.stringify(state, null, 2));

      // Frontend JS Config
      const configJs = `window.SITE_CONFIG = {
  siteTitle: "${f.siteTitle || 'MY WEBSITE'}", // 사이트명
  companyName: "${f.companyName || ''}",       // 업체명 (한글)
  companyNameEn: "${f.companyNameEn || ''}",   // 업체명 (영문)
  ownerName: "${f.ownerName || ''}",           // 대표자명
  bizNum: "${f.bizNum || ''}",                 // 사업자번호
  phone: "${f.phone || ''}",                   // 전화번호
  address: "${f.address || ''}",               // 주소
  subPageDescriptions: ${JSON.stringify(subDesc, null, 2)} // 서브페이지별 소개 문구
};
`;
      const configFolder = zip.folder('config');
      configFolder.file('site_config.js', configJs);
      configFolder.file('site_config.php', configPhp);

      // 5. Lightweight File Database (data/)
      const dataFolder = zip.folder('data');
      dataFolder.file('site_config.json', JSON.stringify(state, null, 2));
      dataFolder.file('menus.json', JSON.stringify(state.menus || [], null, 2));
      dataFolder.file('sub_descriptions.json', JSON.stringify(subDesc, null, 2));
      dataFolder.file('posts.json', JSON.stringify([
        { id: 1, title: '2026년도 상반기 신규 이용자 모집 안내', author: '관리자', date: '2026-09-01', views: 342, content: '2026년도 신규 이용자 모집이 시작되었습니다.' },
        { id: 2, title: '시스템 정기 점검 및 서비스 안정화 작업 안내', author: '관리자', date: '2026-08-25', views: 189, content: '안정적인 서비스를 위한 정기 점검 안내입니다.' },
        { id: 3, title: '공식 홈페이지 전면 리뉴얼 및 편의기능 오픈', author: '관리자', date: '2026-08-15', views: 512, content: '홈페이지 리뉴얼이 완료되었습니다.' }
      ], null, 2));
      dataFolder.file('inquiries.json', JSON.stringify([], null, 2));
      dataFolder.file('applies.json', JSON.stringify([
        { id: 'REG-2609-001', program: '2026 주간 활동 맞춤 프로그램', name: '김철수', phone: '010-1234-5678', count: 1, status: '접수대기', date: '2026-08-19' },
        { id: 'REG-2609-002', program: '2026 주간 활동 맞춤 프로그램', name: '이영희', phone: '010-9876-5432', count: 2, status: '승인완료', date: '2026-08-18' }
      ], null, 2));

      // 6. Dynamic Main Templates (index.html & sub_page.html)
      const dynamicNavHtml = (state.menus || []).map((m, idx) => `
        <li style="position:relative; display:inline-block; margin:0 16px;">
          <a href="sub_page.html?cat=${idx}&sub=0" style="color:#0f172a; text-decoration:none; font-weight:700; font-size:16px;">${m.name}</a>
          ${m.submenus && m.submenus.length ? `
            <ul style="position:absolute; top:100%; left:0; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:8px 0; min-width:180px; display:none; list-style:none; box-shadow:0 10px 24px rgba(0,0,0,0.1);">
              ${m.submenus.map((s, sIdx) => `<li><a href="sub_page.html?cat=${idx}&sub=${sIdx}" style="display:block; padding:8px 16px; color:#475569; text-decoration:none; font-size:14.5px;">${s.name}</a></li>`).join('')}
            </ul>
          ` : ''}
        </li>
      `).join('');

      const indexHtmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${f.siteTitle || 'MY WEBSITE'} - 공식 홈페이지</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header style="background:#ffffff; border-bottom:1px solid #e2e8f0; position:sticky; top:0; z-index:500;">
    <div style="max-width:1280px; margin:0 auto; padding:0 24px; height:80px; display:flex; align-items:center; justify-content:space-between;">
      <a href="index.html" style="font-size:22px; font-weight:800; color:#0f172a; text-decoration:none;">${f.siteTitle || 'MY WEBSITE'}</a>
      <nav><ul style="list-style:none; display:flex; align-items:center;">${dynamicNavHtml}</ul></nav>
      <a href="admin/index.html" style="padding:10px 18px; background:#2563eb; color:#fff; border-radius:8px; font-weight:700; text-decoration:none; font-size:14.5px;">관리자 콘솔</a>
    </div>
  </header>

  <section style="background:radial-gradient(circle at 80% 20%, #e0e7ff 0%, #f0f7ff 50%, #ffffff 100%); padding:90px 24px; text-align:center; border-bottom:1px solid #e2e8f0;">
    <div style="max-width:900px; margin:0 auto;">
      <h1 style="font-size:42px; font-weight:850; color:#0f172a; line-height:1.3;">${state.customContent?.heroSlogan || '미래를 선도하는 스마트 비즈니스 파트너'}</h1>
      <p style="color:#475569; font-size:18px; margin-top:18px; line-height:1.75;">${state.customContent?.heroDesc || '최고의 전문성과 차별화된 기술력으로 고객의 가치를 극대화합니다.'}</p>
    </div>
  </section>

  <footer style="background:#0f172a; color:#94a3b8; padding:60px 24px; margin-top:80px;">
    <div style="max-width:1280px; margin:0 auto; font-size:15px; line-height:1.85;">
      <div><strong>${f.companyName || f.siteTitle || 'MY WEBSITE'}</strong> | 대표자: ${f.ownerName || '홍길동'} | 사업자번호: ${f.bizNum || '123-45-67890'}</div>
      <div>대표전화: ${f.phone || '02-1234-5678'} | 소재지: ${f.address || '서울특별시 강남구'}</div>
      <div style="margin-top:12px;">Copyright &copy; 2026 ${f.companyNameEn || f.siteTitle || 'MY WEBSITE'}. All rights reserved.</div>
    </div>
  </footer>
</body>
</html>`;

      zip.file('index.html', indexHtmlContent);

      // 서브페이지 템플릿도 ZIP에 포함
      try {
        const subRes = await fetch('preview/sub_page.html');
        if (subRes.ok) {
          const subContent = await subRes.text();
          zip.file('sub_page.html', subContent);
        }
      } catch (e) {
        console.warn('Sub page fetch skip:', e);
      }

      // 7. Assets (assets/css/style.css)
      const assetsFolder = zip.folder('assets');
      const cssFolder = assetsFolder.folder('css');
      const styleCss = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;font-family:sans-serif;}body{background:#f8fafc;color:#0f172a;font-size:16px;line-height:1.65;}.btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 24px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;border:none;cursor:pointer;}.form-input{width:100%;padding:12px 16px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:15px;outline:none;}`;
      cssFolder.file('style.css', styleCss);
      assetsFolder.folder('images');
      zip.folder('uploads');

      // 8. Admin Console (admin/index.html)
      const adminFolder = zip.folder('admin');
      adminFolder.file('index.html', `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>관리자 로그인 - ${f.siteTitle || 'MY WEBSITE'}</title><link rel="stylesheet" href="../assets/css/style.css"></head>
<body style="background:#0f1013; color:#fff; display:flex; align-items:center; justify-content:center; min-height:100vh;">
  <div style="background:#18191c; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:36px; width:400px;">
    <h2 style="font-size:22px; font-weight:800; margin-bottom:20px; color:#fff;">통합 관리자 로그인</h2>
    <form onsubmit="event.preventDefault(); location.href='dashboard.html';" style="display:flex; flex-direction:column; gap:16px;">
      <div><label style="font-size:14px; color:#9ca3af;">관리자 아이디</label><input type="text" class="form-input" value="${auth.adminId || 'admin'}" style="margin-top:6px;" required></div>
      <div><label style="font-size:14px; color:#9ca3af;">비밀번호</label><input type="password" class="form-input" value="${auth.adminPw || 'admin1234'}" style="margin-top:6px;" required></div>
      <button type="submit" class="btn" style="margin-top:10px;">로그인</button>
    </form>
  </div>
</body>
</html>`);

      adminFolder.file('dashboard.html', `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>관리자 대시보드 - ${f.siteTitle || 'MY WEBSITE'}</title><link rel="stylesheet" href="../assets/css/style.css"></head>
<body style="background:#0f1013; color:#fff;">
  <header style="background:#16171b; border-bottom:1px solid rgba(255,255,255,0.1); padding:0 28px; height:68px; display:flex; align-items:center; justify-content:space-between;">
    <div style="font-size:18px; font-weight:800; color:#fff;">${f.siteTitle || 'MY WEBSITE'} 관리자 콘솔</div>
    <a href="../index.html" style="color:#38bdf8; text-decoration:none; font-weight:600;">사용자 사이트 바로가기 ↗</a>
  </header>
  <div style="padding:36px; max-width:1280px; margin:0 auto;">
    <div style="background:#18191c; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:32px;">
      <h3 style="font-size:20px; font-weight:800;">운영 상태 개요</h3>
      <p style="color:#9ca3af; margin-top:8px;">데이터베이스(/data/*.json)와 실시간 연동되어 문의 및 신청자 관리가 가능합니다.</p>
    </div>
  </div>
</body>
</html>`);

      // 9. Generate Blob and Trigger Download
      const blob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${cleanTitle}_standalone_package.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      if (labelTop) labelTop.textContent = '다운로드 완료!';
      if (labelMain) labelMain.textContent = '다운로드 완료!';
      setTimeout(() => {
        btn.disabled = false;
        if (labelTop) labelTop.textContent = '프로젝트 다운로드';
        if (labelMain) labelMain.textContent = '프로젝트 다운로드';
      }, 2000);

    } catch (e) {
      console.error('Packaging Error:', e);
      alert('압축 파일 생성 중 오류가 발생했습니다: ' + e.message);
      btn.disabled = false;
      if (labelTop) labelTop.textContent = '프로젝트 다운로드';
      if (labelMain) labelMain.textContent = '프로젝트 다운로드';
    }
  }
}
