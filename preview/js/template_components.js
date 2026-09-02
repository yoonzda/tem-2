/**
 * Shared Template Components for Main & Sub Pages
 * 서울마음치과 원본 1:1 표준 컴포넌트 통합 모듈
 * (메인과 서브페이지가 100% 동일한 컴포넌트 마크업을 공유/재사용)
 */

window.TemplateComponents = {
  /**
   * 1. 진료안내 / 오시는길 (#location) 컴포넌트
   */
  location: function() {
    return `
      <section id="location">
        <div class="leftContent">
          <div class="titleBox align-left">
            <mark>SEOUL MAEUM DENTAL CLINIC</mark>
            <h2>
              서울마음치과 <b>진료안내/오시는길</b>
            </h2>
          </div>
          <p>
            강원도 홍천군 홍천읍 홍천로 376, 방주빌딩 3층
            <small>/ 약초시장길2문 맞은편 방주빌딩 3층</small>
          </p>
          <ul class="badgeInfo">
            <li>
              <span>대중교통</span>
              <p>신장다리 정류장 하차 가능 버스</p>
            </li>
            <li>
              <span>농어촌</span>
              <p>201, 220-1, 31, 601</p>
            </li>
            <li>
              <span>주차안내</span>
              <p>치과 건물 앞쪽 주차장 이용 가능</p>
            </li>
          </ul>
          <ol class="iconInfo">
            <li><a href="https://map.naver.com" target="_blank">네이버 지도</a></li>
            <li><a href="https://map.kakao.com" target="_blank">카카오지도</a></li>
          </ol>
          <ul class="textInfo">
            <li>
              <h3>진료안내</h3>
              <ol>
                <li class="color-black">
                  <span>평일</span>
                  <p>오전 09:00 - 오후 06:00</p>
                </li>
                <li class="color-yellow">
                  <span>화요일(야간진료)</span>
                  <p>오전 09:00 - 오후 07:30</p>
                </li>
                <li class="color-black">
                  <span>토요일</span>
                  <p>오전 09:00 - 오후 02:00</p>
                </li>
                <li class="color-black">
                  <span>점심시간</span>
                  <p>오후 01:00 - 오후 02:00</p>
                </li>
              </ol>
              <small>* 토요일 점심시간 없이 진료 / 일요일, 공휴일 휴관입니다.</small>
            </li>
            <li>
              <h3>대표번호</h3>
              <a href="tel:0334342875">033.434.2875</a>
            </li>
          </ul>
        </div>
        <div class="rightContent"></div>
      </section>
    `;
  },

  /**
   * 2. 소개형 (진료 약속 + 배너 + 의료진 소개) 컴포넌트
   */
  about: function() {
    return `
      <section class="" style="padding-top: 80px; padding-bottom: 160px;">
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>
            서울마음치과가 드리는 <b>진료 약속</b>
          </h2>
          <p>정직한 진단부터 책임 있는 사후관리까지 언제나 환자를 먼저 생각하는 진료를 실천합니다.</p>
        </div>
        <ol class="gridBox-mix layout-padding layout-max">
          <li>
            <h3>정직한 진료</h3>
            <p>
              과잉진료 없이 꼭 필요한 진료만 제안하며,
              <span>환자를 먼저 생각하는 진료를 약속드립니다.</span>
            </p>
          </li>
          <li>
            <h3>철저한 멸균 시스템</h3>
            <p>
              1인 1기구를 원칙으로 철저한 멸균과
              <span>감염 관리 시스템으로 운영합니다.</span>
            </p>
          </li>
          <li>
            <h3>디지털 기반 정밀진료</h3>
            <p>
              첨단 디지털 장비를 활용하여 더 정확하고
              <span>편안한 진료를 제공합니다.</span>
            </p>
          </li>
          <li>
            <h3>책임 보증 진료</h3>
            <p>
              진료가 끝난 이후에도 보증제도를 통해 끝까지
              <span>책임지는 진료를 실천합니다.</span>
            </p>
          </li>
          <li>
            <h3>평생 주치의 시스템</h3>
            <p>
              나뿐 아니라 우리 가족 모두가 함께 관리 받을
              <span>수 있는 평생 구강관리 시스템을 제공합니다.</span>
            </p>
          </li>
        </ol>
      </section>
      <section class="bannerContainer layout-padding">
        <div>
          <div class="topBox">
            <small>"다시, 자신있게 웃는 하루"</small>
            <h2>
              함께하는 치과
              <b>서울마음치과</b>
            </h2>
          </div>
          <div class="bottomBox">
            <p>풍부한 임상경험과 정밀한 기술로</p>
            <small>오래도록 믿을 수 있는 결과를 약속드립니다.</small>
          </div>
        </div>
      </section>
      <section id="doctors" class="layout-padding">
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>
            밝은미소를 책임지는 <b>의료진 소개</b>
          </h2>
          <p>풍부한 임상경험과 끊임없는 연구를 바탕으로 환자에게 가장 적합한 진료를 고민합니다.</p>
        </div>
        <div class="contentBox layout-max">
          <div class="contentWrap">
            <div>
              <mark>통합치의학과 전문의</mark>
              <p>
                송문호
                <span>대표원장</span>
              </p>
            </div>
            <ul class="listDep1">
              <li>
                <h3>약력</h3>
                <ol class="listDep2">
                  <li>
                    <ul class="listDep3">
                      <li><p>보건복지부인증 통합치의학 전문의</p></li>
                      <li><p>경북대학교 치의학전문대학원 치의학석사</p></li>
                      <li><p>서울대학교 치의학대학원 'Peri-irrplantite' 과정 수료</p></li>
                      <li><p>미국 Upenn 치과병원 EXTERNSHIP 수료</p></li>
                    </ul>
                  </li>
                  <li>
                    <ul class="listDep3">
                      <li><p>前&#41; 강남 대치동 오리엔탈치과 진료과장</p></li>
                      <li><p>前&#41; 서울감동치과 장호원점 수석원장</p></li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li>
                <h3>학회 및 활동</h3>
                <ol class="listDep2">
                  <li>
                    <ul class="listDep3">
                      <li><p>미국치과임플란트학회(AAID) 정회원</p></li>
                      <li><p>대한구강악언연임플란트학회 정회원</p></li>
                      <li><p>대한심미치과학회 정회원</p></li>
                      <li><p>대한보존치과학회 정회원</p></li>
                      <li><p>대한장애인치과학회 정회원</p></li>
                      <li><p>대한소아치과학회 정회원</p></li>
                    </ul>
                  </li>
                  <li>
                    <ul class="listDep3">
                      <li><p>대한치과대학, 치의학전문대학원(KDSA) 총대표 회원</p></li>
                      <li><p>대한치과의사협회 표창패 수상</p></li>
                      <li><p>대한턱관절장애교육 연수회 수료</p></li>
                      <li><p>OSSTEM 신경치료 세미나 수료</p></li>
                      <li><p>Docors ENDO 과정 수료</p></li>
                      <li><p>KAYA 치과병원 고정성 보철과정 수료</p></li>
                    </ul>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 3-1. 진료과목 / 사업분야 (#departments) 컴포넌트
   */
  departments: function(subName) {
    return `
      <section id="departments" style="padding-top:40px;">
        <div class="backWrap">
          <div class="titleBox align-center color-white">
            <mark>SEOUL MAEUM DENTAL CLINIC</mark>
            <h2>
              서울마음치과 <b>${subName || '진료과목'}</b>
            </h2>
            <p>환자의 건강한 미소를 위해, 언제나 진심을 담아 최선의 진료를 이어갑니다.</p>
          </div>
        </div>
        <ul class="gridBox-4 layout-padding">
          <li>
            <h3>임플란트</h3>
            <p>정밀한 진단과 맟춤 식립으로<span>자연치아의 기능을 회복합니다.</span></p>
          </li>
          <li>
            <h3>치아교정</h3>
            <p>기능과 심미를 고려한 맞춤형<span>교정 치료를 설계합니다.</span></p>
          </li>
          <li>
            <h3>심미보철</h3>
            <p>기능과 심미를 모두 만족시키는<span>맞춤형 보철 치료를 시험합니다.</span></p>
          </li>
          <li>
            <h3>충치치료</h3>
            <p>충치의 진행 정도를 정확히 진단하여<span>필요한 치료를 진행합니다.</span></p>
          </li>
        </ul>
      </section>
    `;
  },

  /**
   * 3-2. 갤러리 / 둘러보기 (#gallery) 컴포넌트
   */
  gallery: function(subName) {
    return `
      <section id="gallery" class="layout-padding" style="padding-top:80px; padding-bottom:120px;">
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>
            안심이 되는 치과, <b>${subName || '서울마음치과 둘러보기'}</b>
          </h2>
          <p>환자의 안전과 편안함을 최우선으로 생각하는 진료환경을 제공합니다.</p>
        </div>
        <div class="slideWrap">
          <div class="slideContent">
            <div><img src="https://placehold.co/1280x700" alt="둘러보기 1"></div>
            <div><img src="https://placehold.co/1280x700" alt="둘러보기 2"></div>
            <div><img src="https://placehold.co/1280x700" alt="둘러보기 3"></div>
          </div>
          <div class="sliderButtons">
            <button type="button" class="prevButton material-symbols-outlined">chevron_left</button>
            <button type="button" class="nextButton material-symbols-outlined">chevron_right</button>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 4. 연혁 / 히스토리 (#history) 컴포넌트 (메인 템플릿 1:1 조화 표준형: 순수 연도 타이포 & 개별 연도 블록)
   */
  history: function() {
    return `
      <section class="sub-history-section">
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>
            서울마음치과 <b>연혁</b>
          </h2>
          <p>정직과 신뢰를 바탕으로 환자와 함께 성장해온 서울마음치과의 발자취입니다.</p>
        </div>

        <div class="history-main-container layout-max layout-padding">
          
          <!-- 2026년 -->
          <div class="history-year-block scroll-reveal">
            <div class="history-year-side">
              <div class="history-year-num">2026</div>
            </div>
            <div class="history-year-content">
              
              <div class="history-month-row">
                <div class="history-month-num">10</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>디지털 3D 구강 스캐너 및 원데이 CAD/CAM 보철 전용 가공실 확장 오픈</li>
                    <li>차세대 구강 내 미생물 유전자 정밀 검사 시스템 도입</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">08</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>첨단 3D AI 가이드 임플란트 및 고난도 수술 전용 센터 구축</li>
                    <li>환자 안심 케어를 위한 실시간 바이탈 모니터링 무통 마취 시스템 가동</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">05</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>대학병원급 중앙 멸균 소독실 및 1인 1기구 무균 감염 관리 클린존 리뉴얼</li>
                    <li>네이버 예약 및 카카오 알림톡 실시간 통합 스마트 접수 시스템 도입</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">03</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>서울마음치과 제2진료실 증설 및 프라이빗 1:1 상담실 리모델링</li>
                    <li>지역 사회 의료 취약계층 대상 무료 구강검진 및 보건 나눔 캠페인 전개</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">01</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>2026년도 신년 환자 만족도 평가 최우수 의료기관 선정</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!-- 2025년 -->
          <div class="history-year-block scroll-reveal">
            <div class="history-year-side">
              <div class="history-year-num">2025</div>
            </div>
            <div class="history-year-content">
              
              <div class="history-month-row">
                <div class="history-month-num">12</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>임플란트 및 고난도 치주 구강 수술 누적 10,000례 달성</li>
                    <li>대한치과의사협회 학술대회 최우수 임상 연구 사례 발표</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">10</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>보건복지부 인증 통합치의학 우수 의료기관 표창 수상</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">07</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>초정밀 저선량 3D Green CT 및 턱관절 물리치료 전용 레이저 장비 도입</li>
                    <li>비보험 수가 사전 안내제 및 책임 진료 보증서 발급 제도 본격 시행</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">04</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>환자 프라이버시 보호를 위한 전자 차트 및 디지털 동의서 클라우드 시스템 전면 개편</li>
                    <li>구강외과 및 교정과 분과별 협진 시스템 가동</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">02</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>대한민국 소비자 선호도 1위 의료브랜드(치과 부문) 대상 수상</li>
                    <li>감염 예방 우수 안심 병원 클린 클리닉 인증 획득</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!-- 2024년 -->
          <div class="history-year-block scroll-reveal">
            <div class="history-year-side">
              <div class="history-year-num">2024</div>
            </div>
            <div class="history-year-content">
              
              <div class="history-month-row">
                <div class="history-month-num">11</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>통합치의학과 및 보존과 전문의 추가 영입 (분과별 원장 협진 체계 구축)</li>
                    <li>컴퓨터 제어 미세 무통 마취기 전 체어 도입</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">09</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>미국치과임플란트학회(AAID) 정회원 위촉 및 글로벌 임상 연구 협력 협약 체결</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">06</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>임플란트 수술실 에어샤워 및 양압 공조 무균 수술 시스템 완비</li>
                    <li>사랑니 당일 발치 및 급성 치통 원스톱 응급 진료 프로토콜 수립</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">03</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>개원 4주년 기념 진료 품질 향상 및 고객 서비스 헌장 선포</li>
                    <li>디지털 덴탈 엑스레이 및 파노라마 영상 AI 판독 보조 소프트웨어 도입</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">01</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>지역 유관기관 및 학교 주치의 결연 협약 체결</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!-- 2022년 -->
          <div class="history-year-block scroll-reveal">
            <div class="history-year-side">
              <div class="history-year-num">2022</div>
            </div>
            <div class="history-year-content">
              
              <div class="history-month-row">
                <div class="history-month-num">09</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>환자 맞춤형 평생 구강 관리 주치의 프로그램 '마음 케어' 런칭</li>
                    <li>대한치주과학회 정기 학술대회 우수 구연 발표상 수상</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">03</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>원내 전 체어 멸균 정수 살균수 배관 시스템 전면 교체</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!-- 2021년 -->
          <div class="history-year-block scroll-reveal">
            <div class="history-year-side">
              <div class="history-year-num">2021</div>
            </div>
            <div class="history-year-content">
              
              <div class="history-month-row">
                <div class="history-month-num">11</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>오스템 및 덴티움 우수 임상 연구 지정 병원 협약</li>
                    <li>미세 현미경 신경치료 및 자연치아 보존 특화 클리닉 개설</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">05</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>의료 질 향상 및 환자 안전 관리 전담팀 신설</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!-- 2020년 -->
          <div class="history-year-block scroll-reveal">
            <div class="history-year-side">
              <div class="history-year-num">2020</div>
            </div>
            <div class="history-year-content">
              
              <div class="history-month-row">
                <div class="history-month-num">08</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>대한심미치과학회 및 구강악안면임플란트학회 정회원 등록</li>
                  </ul>
                </div>
              </div>

              <div class="history-month-row">
                <div class="history-month-num">03</div>
                <div class="history-month-items">
                  <ul class="history-list">
                    <li>서울마음치과 설립 및 정식 진료 개시 (대표원장 송문호)</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    `;
  },

  /**
   * 5. 조직도 / 구성원 소개 (#organization) 컴포넌트
   */
  organization: function(siteTitle, subName) {
    return `
      <section class="sub-org-section">
        <div class="titleBox align-center color-black">
          <mark>SEOUL MAEUM DENTAL CLINIC</mark>
          <h2>
            ${siteTitle || '서울마음치과'} <b>${subName || '조직도'}</b>
          </h2>
          <p>분야별 최고의 전문성과 신뢰를 바탕으로 환자 중심의 의료 서비스를 제공합니다.</p>
        </div>

        <div class="org-main-container layout-max layout-padding">
          <ul class="org-department-list">
            <li class="org-department-item">
              <div class="org-dept-header">
                <span class="org-dept-sub-label">DEPARTMENT 01</span>
                <h3 class="org-dept-title">임원진 및 대표원장</h3>
              </div>
              <ol class="org-member-list">
                <li class="org-member-card">
                  <div class="org-avatar-wrap">
                    <img class="org-avatar-img" src="https://placehold.co/200x240?text=200x240" alt="송문호 대표원장">
                  </div>
                  <div class="org-info-wrap">
                    <h4 class="org-member-name">송문호</h4>
                    <div class="org-info-row">
                      <span class="org-info-label">직책</span>
                      <span class="org-info-val org-member-pos">대표원장 (통합치의학 전문의)</span>
                    </div>
                    <div class="org-info-row">
                      <span class="org-info-label">연락처</span>
                      <span class="org-info-val org-member-phone">02-1234-5678</span>
                    </div>
                    <div class="org-info-row">
                      <span class="org-info-label">이메일</span>
                      <span class="org-info-val org-member-email">director@company.com</span>
                    </div>
                  </div>
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </section>
    `;
  }
};
