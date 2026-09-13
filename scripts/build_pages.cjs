const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const W = 1200;
const H = 1700;

// Shared SVGs & Assets
const DIKON_LOGO = `
  <g transform="translate(0, 0)">
    <text x="0" y="44" font-family="'Manrope', 'Arial Black', sans-serif" font-weight="900" font-size="52" font-style="italic" fill="#1b2a3a" letter-spacing="-1">Дик</text>
    <g transform="translate(108, 2)">
      <circle cx="28" cy="28" r="24" fill="none" stroke="#29abe2" stroke-width="8"/>
      <circle cx="28" cy="28" r="9" fill="#29abe2"/>
      <path d="M 46 16 L 82 16 C 88 16 92 20 92 26 L 92 48" fill="none" stroke="#29abe2" stroke-width="8" stroke-linecap="round"/>
      <text x="56" y="42" font-family="'Manrope', 'Arial Black', sans-serif" font-weight="900" font-size="46" font-style="italic" fill="#1b2a3a">н</text>
    </g>
  </g>
`;

const SUSPA_LOGO = `
  <g transform="translate(0, 0)">
    <text x="0" y="42" font-family="'Arial Black', sans-serif" font-weight="900" font-size="44" fill="#1b2a3a" letter-spacing="4">SUSPA</text>
    <line x1="28" y1="-8" x2="28" y2="52" stroke="#1b2a3a" stroke-width="5"/>
  </g>
`;

function getQrCodeSvg(size = 220) {
  // Crisp vector styled QR code
  return `
    <rect width="${size}" height="${size}" rx="12" fill="#ffffff" stroke="#29abe2" stroke-width="3"/>
    <g transform="scale(${size/200}) translate(10, 10)">
      <!-- Finder top left -->
      <rect x="10" y="10" width="48" height="48" rx="6" fill="#1b2a3a"/>
      <rect x="20" y="20" width="28" height="28" fill="#ffffff"/>
      <rect x="26" y="26" width="16" height="16" fill="#29abe2"/>
      <!-- Finder top right -->
      <rect x="122" y="10" width="48" height="48" rx="6" fill="#1b2a3a"/>
      <rect x="132" y="20" width="28" height="28" fill="#ffffff"/>
      <rect x="138" y="26" width="16" height="16" fill="#29abe2"/>
      <!-- Finder bottom left -->
      <rect x="10" y="122" width="48" height="48" rx="6" fill="#1b2a3a"/>
      <rect x="20" y="132" width="28" height="28" fill="#ffffff"/>
      <rect x="26" y="138" width="16" height="16" fill="#29abe2"/>
      <!-- Pattern blocks -->
      <rect x="68" y="16" width="12" height="12" fill="#1b2a3a"/>
      <rect x="92" y="16" width="16" height="12" fill="#29abe2"/>
      <rect x="74" y="38" width="28" height="14" fill="#1b2a3a"/>
      <rect x="68" y="62" width="44" height="12" fill="#29abe2"/>
      <rect x="18" y="68" width="36" height="12" fill="#1b2a3a"/>
      <rect x="126" y="68" width="42" height="12" fill="#1b2a3a"/>
      <rect x="18" y="92" width="20" height="18" fill="#29abe2"/>
      <rect x="50" y="92" width="28" height="14" fill="#1b2a3a"/>
      <rect x="90" y="86" width="22" height="22" fill="#29abe2"/>
      <rect x="122" y="92" width="18" height="14" fill="#1b2a3a"/>
      <rect x="150" y="92" width="20" height="18" fill="#29abe2"/>
      <rect x="68" y="122" width="16" height="48" fill="#1b2a3a"/>
      <rect x="94" y="122" width="16" height="20" fill="#29abe2"/>
      <rect x="120" y="122" width="48" height="16" fill="#1b2a3a"/>
      <rect x="120" y="148" width="22" height="22" fill="#29abe2"/>
      <rect x="152" y="148" width="18" height="22" fill="#1b2a3a"/>
    </g>
  `;
}

function pageBase(content, pageNum = null) {
  let footerBadge = '';
  if (pageNum) {
    const isOdd = pageNum % 2 !== 0;
    const x = isOdd ? 60 : 1080;
    footerBadge = `
      <rect x="${x}" y="1570" width="60" height="60" rx="8" fill="#88b7d5"/>
      <text x="${x + 30}" y="1613" font-family="'Arial', sans-serif" font-weight="900" font-size="34" fill="#ffffff" text-anchor="middle">${pageNum}</text>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs>
        <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#243447"/>
          <stop offset="30%" stop-color="#4e657e"/>
          <stop offset="70%" stop-color="#243447"/>
          <stop offset="100%" stop-color="#141c24"/>
        </linearGradient>
        <linearGradient id="rodGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c5d1dc"/>
          <stop offset="35%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="#9aaec0"/>
          <stop offset="100%" stop-color="#718292"/>
        </linearGradient>
        <linearGradient id="blueBanner" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#009fe3"/>
          <stop offset="100%" stop-color="#29abe2"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#ffffff"/>
      ${content}
      ${footerBadge}
    </svg>
  `;
}

// Generate Page 1 (Cover)
function renderPage1() {
  return pageBase(`
    <!-- QR Top Left -->
    <g transform="translate(140, 90)">
      ${getQrCodeSvg(200)}
    </g>

    <!-- Dikon Logo Top Right -->
    <g transform="translate(680, 140)">
      ${DIKON_LOGO}
    </g>

    <!-- Section 1: Gas Springs -->
    <g transform="translate(100, 390)">
      <text x="0" y="32" font-family="'Arial', sans-serif" font-weight="700" font-size="32" fill="#009fe3">Газовые пружины</text>
      <text x="0" y="76" font-family="'Arial', sans-serif" font-weight="700" font-size="32" fill="#009fe3">Газовые амортизаторы</text>
      <text x="0" y="120" font-family="'Arial', sans-serif" font-weight="700" font-size="32" fill="#009fe3">Мебельные газовые пружины</text>
      <text x="0" y="164" font-family="'Arial', sans-serif" font-weight="700" font-size="32" fill="#009fe3">Блокируемые газовые пружины</text>

      <!-- Suspa Logo -->
      <g transform="translate(540, 70) scale(0.9)">
        ${SUSPA_LOGO}
      </g>

      <!-- Realistic Gas Springs Fan Graphic -->
      <g transform="translate(860, 100)">
        <!-- Spring 1 -->
        <g transform="rotate(-30)">
          <rect x="-10" y="-120" width="20" height="150" rx="4" fill="url(#metalGrad)"/>
          <rect x="-5" y="30" width="10" height="130" fill="url(#rodGrad)"/>
          <circle cx="0" cy="165" r="10" fill="#1b2a3a"/>
        </g>
        <!-- Spring 2 -->
        <g transform="rotate(-10)">
          <rect x="-12" y="-140" width="24" height="170" rx="5" fill="url(#metalGrad)"/>
          <rect x="-6" y="30" width="12" height="140" fill="url(#rodGrad)"/>
          <circle cx="0" cy="175" r="11" fill="#1b2a3a"/>
        </g>
        <!-- Spring 3 -->
        <g transform="rotate(15)">
          <rect x="-13" y="-150" width="26" height="180" rx="6" fill="url(#metalGrad)"/>
          <rect x="-6.5" y="30" width="13" height="150" fill="url(#rodGrad)"/>
          <circle cx="0" cy="185" r="12" fill="#1b2a3a"/>
        </g>
        <!-- Spring 4 -->
        <g transform="rotate(35)">
          <rect x="-9" y="-110" width="18" height="140" rx="4" fill="url(#metalGrad)"/>
          <rect x="-4.5" y="30" width="9" height="120" fill="url(#rodGrad)"/>
          <circle cx="0" cy="155" r="9" fill="#1b2a3a"/>
        </g>
      </g>
    </g>

    <!-- Blue Divider Line -->
    <rect x="0" y="650" width="${W}" height="14" fill="#009fe3"/>

    <!-- Section 2: Height Adjustment Systems -->
    <g transform="translate(100, 720)">
      <text x="0" y="40" font-family="'Arial', sans-serif" font-weight="800" font-size="34" fill="#009fe3">СИСТЕМЫ РЕГУЛИРОВКИ</text>
      <text x="0" y="88" font-family="'Arial', sans-serif" font-weight="700" font-size="30" fill="#1b2a3a">- высоты стола</text>
      <text x="0" y="132" font-family="'Arial', sans-serif" font-weight="700" font-size="30" fill="#1b2a3a">- высоты рабочего места</text>

      <!-- Varistand & Movotec headers -->
      <g transform="translate(560, 20)">
        <text x="0" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="20" fill="#1b2a3a">Varistand / VariBase</text>
        <text x="40" y="24" font-family="'Arial', sans-serif" font-weight="800" font-size="20" fill="#1b2a3a">пневматика</text>

        <!-- Column sketch -->
        <g transform="translate(70, 45)">
          <ellipse cx="25" cy="150" rx="45" ry="12" fill="#bdc3c7"/>
          <rect x="18" y="20" width="14" height="130" fill="url(#rodGrad)"/>
          <rect x="12" y="50" width="26" height="100" rx="3" fill="url(#metalGrad)"/>
          <rect x="-10" y="10" width="70" height="12" rx="3" fill="#1b2a3a"/>
        </g>

        <!-- Height Arrows -->
        <g transform="translate(195, 80)">
          <polygon points="0,0 12,-16 24,0" fill="#009fe3"/>
          <rect x="7" y="5" width="10" height="70" fill="#009fe3"/>
          <polygon points="0,80 12,96 24,80" fill="#009fe3"/>
        </g>
      </g>

      <g transform="translate(860, 20)">
        <text x="20" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="20" fill="#1b2a3a">Movotec</text>
        <text x="10" y="24" font-family="'Arial', sans-serif" font-weight="800" font-size="20" fill="#1b2a3a">гидравлика</text>

        <!-- Table Sketch -->
        <g transform="translate(0, 45)">
          <rect x="0" y="30" width="190" height="16" rx="3" fill="#7f8c8d"/>
          <!-- Legs -->
          <rect x="15" y="46" width="18" height="95" fill="url(#metalGrad)"/>
          <rect x="157" y="46" width="18" height="95" fill="url(#metalGrad)"/>
          <rect x="33" y="60" width="14" height="70" fill="url(#rodGrad)"/>
          <rect x="143" y="60" width="14" height="70" fill="url(#rodGrad)"/>
          <!-- Lower crossbar -->
          <rect x="15" y="125" width="160" height="10" fill="#95a5a6"/>
        </g>
      </g>
    </g>

    <!-- Blue Divider Line -->
    <rect x="0" y="980" width="${W}" height="14" fill="#009fe3"/>

    <!-- Section 3: Hydraulic actuators for medical furniture -->
    <g transform="translate(100, 1050)">
      <text x="0" y="40" font-family="'Arial', sans-serif" font-weight="800" font-size="34" fill="#009fe3">ГИДРАВЛИЧЕСКИЕ ПРИВОДЫ</text>
      <text x="0" y="88" font-family="'Arial', sans-serif" font-weight="800" font-size="34" fill="#009fe3">для медицинской мебели</text>

      <!-- Hydraulic Actuator Illustration -->
      <g transform="translate(680, -20)">
        <polygon points="0,70 60,30 240,10 260,35 70,120" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="2"/>
        <circle cx="25" cy="65" r="16" fill="#ecf0f1" stroke="#7f8c8d" stroke-width="4"/>
        <rect x="65" y="30" width="170" height="65" rx="10" transform="rotate(-14 65 30)" fill="url(#rodGrad)"/>
        <path d="M 240 20 Q 270 50 250 80 Q 230 110 260 130" fill="none" stroke="#2c3e50" stroke-width="6"/>
      </g>
    </g>

    <!-- Blue Divider Line -->
    <rect x="0" y="1240" width="${W}" height="14" fill="#009fe3"/>

    <!-- Section 4: Wheels and Castors -->
    <g transform="translate(100, 1310)">
      <text x="0" y="40" font-family="'Arial', sans-serif" font-weight="800" font-size="34" fill="#009fe3">КОЛЕСА</text>
      <text x="0" y="88" font-family="'Arial', sans-serif" font-weight="800" font-size="34" fill="#009fe3">И КОЛЕСНЫЕ ОПОРЫ</text>

      <!-- Wheels illustration cluster -->
      <g transform="translate(620, -40)">
        <!-- Wheel 1 Blue -->
        <circle cx="100" cy="120" r="55" fill="#2980b9"/>
        <circle cx="100" cy="120" r="38" fill="#ecf0f1" stroke="#7f8c8d" stroke-width="4"/>
        <circle cx="100" cy="120" r="12" fill="#34495e"/>
        <!-- Steel bracket -->
        <path d="M 80 65 L 120 65 L 115 15 L 85 15 Z" fill="#95a5a6" stroke="#7f8c8d" stroke-width="2"/>
        <!-- Wheel 2 Red Pneumatic -->
        <circle cx="190" cy="100" r="50" fill="#c0392b"/>
        <circle cx="190" cy="100" r="32" fill="#ecf0f1"/>
        <circle cx="190" cy="100" r="10" fill="#2c3e50"/>
        <!-- Wheel 3 Twin Medical -->
        <circle cx="30" cy="110" r="40" fill="#7f8c8d"/>
        <circle cx="30" cy="110" r="25" fill="#bdc3c7"/>
      </g>
    </g>

    <!-- Bottom URL Footer -->
    <text x="100" y="1600" font-family="'Arial', sans-serif" font-weight="800" font-size="56" fill="#009fe3">www.dikon.ru</text>
  `, null);
}

// Generate Page 2 (Gas Springs)
function renderPage2() {
  return pageBase(`
    <!-- Dikon Logo Top Left -->
    <g transform="translate(140, 70)">
      ${DIKON_LOGO}
    </g>

    <!-- Gray Section Header -->
    <rect x="140" y="140" width="920" height="52" fill="#7b8a95"/>
    <text x="170" y="177" font-family="'Arial', sans-serif" font-weight="700" font-size="34" fill="#ffffff">Газовые пружины</text>

    <!-- Intro Text -->
    <g transform="translate(140, 230)">
      <rect x="0" y="10" width="10" height="36" fill="#bdc3c7"/>
      <text x="30" y="24" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">Стандартная программа включает в себя 5 серий.</text>
      <text x="30" y="48" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">Серии отличаются диаметрами трубки и штока, также диапазоном сил F1.</text>

      <text x="30" y="90" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">Газовые пружины Суспа не нуждаются в уходе и по стандарту рассчитаны</text>
      <text x="30" y="114" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">на срок использования не менее <tspan font-weight="bold">50 000</tspan> нагрузочных циклов.</text>

      <!-- Suspa Logo -->
      <g transform="translate(730, 15) scale(0.9)">
        ${SUSPA_LOGO}
      </g>
    </g>

    <!-- Section: Applications -->
    <g transform="translate(140, 390)">
      <rect x="0" y="0" width="8" height="28" fill="#bdc3c7"/>
      <text x="24" y="22" font-family="'Arial', sans-serif" font-weight="700" font-size="24" fill="#1b2a3a">Области применения</text>

      <!-- Application Icons/Sketches -->
      <g transform="translate(0, 45)">
        <!-- 1 Tanning Bed -->
        <rect x="0" y="0" width="130" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 15 55 Q 65 30 115 55" fill="none" stroke="#2c3e50" stroke-width="3"/>
        <path d="M 20 60 L 110 60" fill="none" stroke="#29abe2" stroke-width="2"/>
        <!-- 2 Chair/Workstation -->
        <rect x="150" y="0" width="130" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 180 65 L 180 30 L 220 30" fill="none" stroke="#2c3e50" stroke-width="3"/>
        <path d="M 200 45 L 210 65" fill="none" stroke="#29abe2" stroke-width="2"/>
        <!-- 3 Machine Hatch -->
        <rect x="300" y="0" width="130" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <polygon points="320,65 360,65 375,25 335,25" fill="none" stroke="#2c3e50" stroke-width="3"/>
        <line x1="330" y1="65" x2="355" y2="35" stroke="#29abe2" stroke-width="2"/>
        <!-- 4 Hood/Cover -->
        <rect x="450" y="0" width="130" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 470 65 L 560 65 M 470 65 L 545 35" stroke="#2c3e50" stroke-width="3"/>
        <!-- 5 Industrial Solarium -->
        <rect x="600" y="0" width="140" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 615 55 Q 670 20 725 55" stroke="#2c3e50" stroke-width="3" fill="none"/>
        <line x1="625" y1="65" x2="715" y2="65" stroke="#2c3e50" stroke-width="2"/>
        <!-- 6 Automotive rear hatch -->
        <rect x="760" y="0" width="160" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 775 65 L 895 65 L 880 30 L 810 30 Z" stroke="#2c3e50" stroke-width="3" fill="none"/>
        <line x1="840" y1="65" x2="865" y2="35" stroke="#29abe2" stroke-width="2"/>
      </g>
    </g>

    <!-- Gas Spring Technical Drawing on Left -->
    <g transform="translate(160, 560)">
      <text x="180" y="20" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a">Ø D</text>
      <!-- Spring Cylinder -->
      <rect x="175" y="40" width="30" height="340" rx="6" fill="url(#metalGrad)"/>
      <line x1="190" y1="25" x2="190" y2="40" stroke="#7f8c8d" stroke-width="1.5"/>
      <!-- Piston Rod -->
      <rect x="183" y="380" width="14" height="260" fill="url(#rodGrad)"/>
      <text x="225" y="520" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a">Ø d</text>
      <!-- Top and Bottom Eyelets -->
      <circle cx="190" cy="30" r="12" fill="none" stroke="#2c3e50" stroke-width="4"/>
      <circle cx="190" cy="30" r="5" fill="#2c3e50"/>
      <circle cx="190" cy="650" r="12" fill="none" stroke="#2c3e50" stroke-width="4"/>
      <circle cx="190" cy="650" r="5" fill="#2c3e50"/>

      <!-- Dimension: Stroke C -->
      <line x1="140" y1="380" x2="140" y2="640" stroke="#1b2a3a" stroke-width="1.5"/>
      <line x1="130" y1="380" x2="175" y2="380" stroke="#1b2a3a" stroke-width="1"/>
      <line x1="130" y1="640" x2="175" y2="640" stroke="#1b2a3a" stroke-width="1"/>
      <text x="130" y="520" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a" transform="rotate(-90 130 520)" text-anchor="middle">Ход штока, С</text>

      <!-- Dimension: Extended Length L -->
      <line x1="90" y1="30" x2="90" y2="650" stroke="#1b2a3a" stroke-width="1.5"/>
      <line x1="80" y1="30" x2="170" y2="30" stroke="#1b2a3a" stroke-width="1"/>
      <line x1="80" y1="650" x2="170" y2="650" stroke="#1b2a3a" stroke-width="1"/>
      <text x="80" y="340" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a" transform="rotate(-90 80 340)" text-anchor="middle">Установочная длина, L</text>
    </g>

    <!-- Table "Стандартная программа" -->
    <g transform="translate(480, 560)">
      <text x="0" y="24" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Стандартная программа</text>

      <!-- Table Header -->
      <rect x="0" y="40" width="580" height="50" fill="#b1d4e7"/>
      <line x1="95" y1="40" x2="95" y2="90" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="200" y1="40" x2="200" y2="90" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="300" y1="40" x2="300" y2="90" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="450" y1="40" x2="450" y2="90" stroke="#ffffff" stroke-width="1.5"/>

      <text x="47" y="70" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">Серия</text>
      <text x="147" y="62" font-family="'Arial', sans-serif" font-weight="700" font-size="15" fill="#1b2a3a" text-anchor="middle">D трубки,<tspan x="147" dy="16">mm</tspan></text>
      <text x="250" y="62" font-family="'Arial', sans-serif" font-weight="700" font-size="15" fill="#1b2a3a" text-anchor="middle">d штока,<tspan x="250" dy="16">mm</tspan></text>
      <text x="375" y="62" font-family="'Arial', sans-serif" font-weight="700" font-size="15" fill="#1b2a3a" text-anchor="middle">Min и max нагрузка<tspan x="375" dy="16">F1, (N)</tspan></text>
      <text x="515" y="62" font-family="'Arial', sans-serif" font-weight="700" font-size="15" fill="#1b2a3a" text-anchor="middle">Макс ход штока,<tspan x="515" dy="16">mm</tspan></text>

      <!-- Rows -->
      ${[
        ['16-12', '12', '4', '40-180', '150'],
        ['16-1', '15', '6', '50-400', '150'],
        ['16-2', '18', '8', '80-750', '250'],
        ['16-4', '22', '10', '100-1200', '400'],
        ['16-6', '28', '14', '200-2000', '500']
      ].map((r, i) => `
        <rect x="0" y="${90 + i*40}" width="580" height="40" fill="${i%2===0 ? '#f0f5f9' : '#ffffff'}" stroke="#d1e0ec" stroke-width="0.5"/>
        <text x="47" y="${116 + i*40}" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">${r[0]}</text>
        <text x="147" y="${116 + i*40}" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">${r[1]}</text>
        <text x="250" y="${116 + i*40}" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">${r[2]}</text>
        <text x="375" y="${116 + i*40}" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">${r[3]}</text>
        <text x="515" y="${116 + i*40}" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">${r[4]}</text>
      `).join('')}
    </g>

    <!-- Custom Orders Notice -->
    <g transform="translate(480, 890)">
      <text x="0" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Возможно изготовление по техническим параметрам</text>
      <text x="0" y="26" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">заказчика.</text>
      <text x="0" y="68" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Подсоединения</text>

      <!-- Grid of End Fittings Schematics -->
      <g transform="translate(0, 85)">
        <!-- A1 / Eyelet -->
        <rect x="0" y="0" width="130" height="95" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <circle cx="65" cy="40" r="18" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <circle cx="65" cy="40" r="7" fill="#2c3e50"/>
        <rect x="57" y="58" width="16" height="25" fill="url(#metalGrad)"/>

        <!-- A26 / Fork -->
        <rect x="145" y="0" width="130" height="95" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 195 20 L 225 20 L 225 65 L 195 65" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <line x1="210" y1="20" x2="210" y2="65" stroke="#29abe2" stroke-width="3"/>
        <rect x="202" y="65" width="16" height="20" fill="url(#metalGrad)"/>

        <!-- A20 / Ball Socket -->
        <rect x="290" y="0" width="130" height="95" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <circle cx="355" cy="38" r="18" fill="#ecf0f1" stroke="#2c3e50" stroke-width="4"/>
        <circle cx="355" cy="38" r="9" fill="#29abe2"/>
        <rect x="347" y="56" width="16" height="27" fill="url(#metalGrad)"/>

        <!-- A246 / Quick Snap -->
        <rect x="435" y="0" width="145" height="95" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <rect x="465" y="20" width="35" height="40" rx="6" fill="#34495e"/>
        <circle cx="482" cy="40" r="8" fill="#ffffff"/>
        <rect x="495" y="55" width="45" height="15" fill="url(#metalGrad)"/>
      </g>
    </g>

    <!-- Footer Notice -->
    <rect x="140" y="1460" width="920" height="60" fill="#f1f5f9"/>
    <text x="170" y="1496" font-family="'Arial', sans-serif" font-size="20" fill="#2c3e50">Каталог стандартной программы размещен на нашем сайте <tspan font-weight="bold">www.dikon.ru</tspan> также</text>
    <text x="170" y="1520" font-family="'Arial', sans-serif" font-size="20" fill="#2c3e50">по запросу в ваш адрес будет выслан каталог Suspa</text>
  `, 1);
}

// Generate Page 3 (Lockable Springs)
function renderPage3() {
  return pageBase(`
    <g transform="translate(680, 70)">
      ${DIKON_LOGO}
    </g>

    <rect x="140" y="140" width="920" height="52" fill="#7b8a95"/>
    <text x="170" y="177" font-family="'Arial', sans-serif" font-weight="700" font-size="34" fill="#ffffff">Блокируемые газовые пружины</text>

    <g transform="translate(140, 230)">
      <rect x="0" y="10" width="10" height="36" fill="#bdc3c7"/>
      <text x="30" y="24" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">Блокируемые газовые пружины предусматривают возможность блокировки</text>
      <text x="30" y="48" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">в любом из промежуточных положений штока.</text>

      <text x="30" y="90" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">Существуют два вида пружин: блокируемая с включением на штоке (Varilock),</text>
      <text x="30" y="114" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">и блокируемая с включением на трубке (VOB).</text>

      <g transform="translate(730, 20) scale(0.9)">
        ${SUSPA_LOGO}
      </g>
    </g>

    <!-- Applications -->
    <g transform="translate(140, 390)">
      <rect x="0" y="0" width="8" height="28" fill="#bdc3c7"/>
      <text x="24" y="22" font-family="'Arial', sans-serif" font-weight="700" font-size="24" fill="#1b2a3a">Области применения</text>

      <g transform="translate(0, 45)">
        <!-- 1 Table desk -->
        <rect x="0" y="0" width="170" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <line x1="20" y1="35" x2="150" y2="35" stroke="#2c3e50" stroke-width="4"/>
        <line x1="40" y1="35" x2="40" y2="75" stroke="#2c3e50" stroke-width="3"/>
        <line x1="130" y1="35" x2="130" y2="75" stroke="#2c3e50" stroke-width="3"/>

        <!-- 2 Hospital bed -->
        <rect x="190" y="0" width="170" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <line x1="210" y1="50" x2="270" y2="50" stroke="#2c3e50" stroke-width="3"/>
        <line x1="270" y1="50" x2="330" y2="25" stroke="#2c3e50" stroke-width="3"/>

        <!-- 3 Medical massage table -->
        <rect x="380" y="0" width="170" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 400 45 L 450 45 L 480 30 L 530 30" stroke="#2c3e50" stroke-width="3" fill="none"/>

        <!-- 4 Reclining armchair -->
        <rect x="570" y="0" width="170" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 600 65 L 660 65 L 690 25" stroke="#2c3e50" stroke-width="3" fill="none"/>

        <!-- 5 Office chair -->
        <rect x="760" y="0" width="160" height="85" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 800 65 L 850 65 L 870 25" stroke="#2c3e50" stroke-width="3" fill="none"/>
      </g>
    </g>

    <!-- Table "Размеры" -->
    <g transform="translate(260, 560)">
      <text x="0" y="24" font-family="'Arial', sans-serif" font-weight="700" font-size="24" fill="#1b2a3a">Размеры</text>

      <!-- Table Header -->
      <rect x="0" y="40" width="700" height="48" fill="#b1d4e7"/>
      <text x="90" y="70" font-family="'Arial', sans-serif" font-weight="700" font-size="16" fill="#1b2a3a" text-anchor="middle">Диаметр трубки D, мм</text>
      <text x="240" y="62" font-family="'Arial', sans-serif" font-weight="700" font-size="16" fill="#1b2a3a" text-anchor="middle">Диаметр штока<tspan x="240" dy="16">d, мм</tspan></text>
      <text x="375" y="62" font-family="'Arial', sans-serif" font-weight="700" font-size="16" fill="#1b2a3a" text-anchor="middle">Длина пружины<tspan x="375" dy="16">L, мм</tspan></text>
      <text x="510" y="62" font-family="'Arial', sans-serif" font-weight="700" font-size="16" fill="#1b2a3a" text-anchor="middle">Ход штока<tspan x="510" dy="16">C, мм</tspan></text>
      <text x="640" y="70" font-family="'Arial', sans-serif" font-weight="700" font-size="16" fill="#1b2a3a" text-anchor="middle">F1, N</text>

      <!-- Row 1 -->
      <rect x="0" y="88" width="700" height="50" fill="#f0f5f9" stroke="#d1e0ec" stroke-width="0.5"/>
      <text x="90" y="119" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">22 мм</text>
      <text x="240" y="132" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">10 мм</text>
      <text x="375" y="125" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a" text-anchor="middle">Зависит от хода<tspan x="375" dy="18">штока</tspan></text>
      <text x="510" y="125" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a" text-anchor="middle">от 10 мм до<tspan x="510" dy="18">400 мм</tspan></text>
      <text x="640" y="132" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">до 1000 N</text>

      <!-- Row 2 -->
      <rect x="0" y="138" width="700" height="40" fill="#ffffff" stroke="#d1e0ec" stroke-width="0.5"/>
      <text x="90" y="163" font-family="'Arial', sans-serif" font-size="17" fill="#1b2a3a" text-anchor="middle">28 мм</text>
    </g>

    <!-- Technical Drawing & Real Product Photos -->
    <g transform="translate(140, 560)">
      <!-- VOB / Varilock Springs -->
      <rect x="50" y="80" width="36" height="420" rx="8" fill="url(#metalGrad)"/>
      <rect x="62" y="500" width="12" height="320" fill="url(#rodGrad)"/>
      <circle cx="68" cy="830" r="14" fill="#1b2a3a"/>

      <!-- SUSPA Logo Printed on Cylinder -->
      <text x="68" y="320" font-family="'Arial Black', sans-serif" font-size="18" fill="#95a5a6" transform="rotate(-90 68 320)" text-anchor="middle" letter-spacing="2">SUSPA</text>

      <text x="50" y="880" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">VOB</text>
      <text x="180" y="880" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Varilock</text>
    </g>

    <!-- Right Column: Release Mechanisms & Bowden Cable -->
    <g transform="translate(520, 800)">
      <text x="0" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Возможно изготовление по техническим параметрам заказчика.</text>
      <text x="0" y="45" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Подсоединения</text>

      <text x="0" y="180" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a">Для отключения блокировки существуют различные</text>
      <text x="0" y="206" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a">виды прямого (рычажного) и дистанционного управления.</text>

      <text x="0" y="260" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Виды отключающих головок</text>

      <!-- Head Release Photos / Icons -->
      <g transform="translate(0, 280)">
        <rect x="0" y="0" width="90" height="90" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <rect x="110" y="0" width="90" height="90" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <rect x="220" y="0" width="90" height="90" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <rect x="330" y="0" width="90" height="90" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <rect x="440" y="0" width="90" height="90" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
      </g>

      <text x="0" y="420" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Трос Боудена</text>
      <g transform="translate(0, 440)">
        <rect x="0" y="0" width="530" height="80" fill="#f8fafc" stroke="#d1e0ec" rx="4"/>
        <path d="M 20 40 Q 260 20 500 40" stroke="#1b2a3a" stroke-width="4" fill="none"/>
        <rect x="400" y="25" width="80" height="30" rx="6" fill="#2c3e50"/>
        <text x="260" y="65" font-family="'Arial', sans-serif" font-size="15" fill="#5b6b7c">Трос Боудена с пластиковой ручкой (триггер)</text>
      </g>

      <g transform="translate(0, 560)">
        <text x="0" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Кнопки</text>
        <text x="240" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">Отключающий рычаг</text>
      </g>
    </g>
  `, 2);
}

// Generate Page 4 (Movotec)
function renderPage4() {
  return pageBase(`
    <g transform="translate(140, 70)">
      ${DIKON_LOGO}
    </g>

    <rect x="140" y="140" width="920" height="52" fill="#7b8a95"/>
    <text x="170" y="177" font-family="'Arial', sans-serif" font-weight="700" font-size="34" fill="#ffffff">Movotec - система гидравлической регулировки высоты</text>

    <g transform="translate(140, 220)">
      <text x="360" y="24" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a"><tspan font-weight="bold" fill="#009fe3">Movotec</tspan> - гидравлическая система</text>
      <text x="360" y="48" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a">для регулировки высоты различного</text>
      <text x="360" y="72" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a">оборудования - может использоваться в</text>
      <text x="360" y="96" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a">промышленных, офисных и медицинских</text>
      <text x="360" y="120" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a">областях.</text>

      <g transform="translate(730, 15) scale(0.9)">
        ${SUSPA_LOGO}
      </g>
    </g>

    <!-- Key highlights Blue Box -->
    <g transform="translate(500, 390)">
      <rect x="0" y="0" width="460" height="190" rx="8" fill="#b9d9eb"/>
      <text x="24" y="32" font-family="'Arial', sans-serif" font-weight="700" font-size="20" fill="#1b2a3a">Основные моменты:</text>
      ${[
        'элегантный дизайн',
        'бесшумная работа',
        'блокировка в любой позиции',
        'постоянная сила, независимо от позиции',
        'простота регулировки',
        'меньшая стоимость по сравнению с Moveline'
      ].map((t, idx) => `
        <polyline points="26,${60 + idx*22} 32,${65 + idx*22} 40,${57 + idx*22}" fill="none" stroke="#ffffff" stroke-width="3"/>
        <text x="50" y="${64 + idx*22}" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">${t}</text>
      `).join('')}
    </g>

    <!-- Table Assembly Drawing / Photo placeholder -->
    <g transform="translate(140, 390)">
      <rect x="0" y="0" width="330" height="420" rx="6" fill="#f8fafc" stroke="#d1e0ec"/>
      <!-- Movotec Workstation Desk -->
      <rect x="20" y="80" width="290" height="24" rx="3" fill="#95a5a6"/>
      <rect x="40" y="104" width="28" height="270" fill="url(#metalGrad)"/>
      <rect x="260" y="104" width="28" height="270" fill="url(#metalGrad)"/>
      <rect x="45" y="130" width="18" height="210" fill="url(#rodGrad)"/>
      <rect x="265" y="130" width="18" height="210" fill="url(#rodGrad)"/>
      <!-- Crossbars -->
      <line x1="40" y1="280" x2="288" y2="280" stroke="#7f8c8d" stroke-width="12"/>
      <line x1="40" y1="360" x2="288" y2="360" stroke="#7f8c8d" stroke-width="14"/>
    </g>

    <!-- Movotec Kit Picture (Pump + 4 cylinders + tubes) -->
    <g transform="translate(500, 610)">
      <rect x="0" y="0" width="460" height="220" rx="6" fill="#f8fafc" stroke="#d1e0ec"/>
      <!-- Pump with Crank handle -->
      <circle cx="230" cy="80" r="38" fill="url(#metalGrad)"/>
      <line x1="230" y1="80" x2="290" y2="40" stroke="#2c3e50" stroke-width="6"/>
      <circle cx="295" cy="35" r="10" fill="#e74c3c"/>
      <!-- 4 Cylinders -->
      <g transform="translate(60, 110)">
        <rect x="20" y="20" width="16" height="70" fill="url(#metalGrad)"/>
        <rect x="100" y="20" width="16" height="70" fill="url(#metalGrad)"/>
        <rect x="180" y="20" width="16" height="70" fill="url(#metalGrad)"/>
        <rect x="260" y="20" width="16" height="70" fill="url(#metalGrad)"/>
      </g>
    </g>

    <!-- Activation Section Bottom Left -->
    <g transform="translate(140, 840)">
      <rect x="0" y="0" width="330" height="170" rx="6" fill="#eef4f8"/>
      <text x="16" y="28" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">Система активируется с помощью рукоятки</text>
      <text x="16" y="50" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">или редукторного электродвигателя</text>
    </g>

    <!-- Kit Includes Blue Box -->
    <g transform="translate(500, 840)">
      <rect x="0" y="0" width="460" height="170" rx="6" fill="#b9d9eb"/>
      <text x="24" y="32" font-family="'Arial', sans-serif" font-weight="700" font-size="18" fill="#1b2a3a">Система включает:</text>
      <text x="24" y="60" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">• Ручной или электрический привод</text>
      <text x="24" y="84" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">• Четыре подъемных цилиндра</text>
      <text x="24" y="108" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">• Четыре угловых элемента (ножки)</text>
      <text x="24" y="132" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">• Две гибкие трубки (2.5 m)</text>
      <text x="24" y="156" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">• Две гибкие трубки (3.0 m)</text>
    </g>

    <!-- Technical Parameters Table -->
    <g transform="translate(140, 1050)">
      ${[
        ['Ход поршня', '155, 195, 300, 400 mm'],
        ['Длина в сжатом состоянии', '711 mm'],
        ['Длина в выдвинутом состоянии', 'L сжатия + ход поршня (max 1111 mm)'],
        ['Максимальная нагрузка', 'до 454 кг'],
        ['Длина цилиндра, A', 'от 258,5 мм до 463,5']
      ].map((r, i) => `
        <rect x="0" y="${i*46}" width="420" height="46" fill="${i%2===0 ? '#ffffff' : '#f0f5f9'}" stroke="#d1e0ec" stroke-width="0.5"/>
        <rect x="420" y="${i*46}" width="500" height="46" fill="${i%2===0 ? '#ffffff' : '#f0f5f9'}" stroke="#d1e0ec" stroke-width="0.5"/>
        <text x="20" y="${28 + i*46}" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a">${r[0]}</text>
        <text x="440" y="${28 + i*46}" font-family="'Arial', sans-serif" font-weight="700" font-size="18" fill="#1b2a3a">${r[1]}</text>
      `).join('')}
    </g>
  `, 3);
}

// Generate Page 5 (Varistand, Varibase)
function renderPage5() {
  return pageBase(`
    <g transform="translate(680, 70)">
      ${DIKON_LOGO}
    </g>

    <rect x="140" y="140" width="920" height="52" fill="#7b8a95"/>
    <text x="170" y="177" font-family="'Arial', sans-serif" font-weight="700" font-size="30" fill="#ffffff">Varistand, Varibase - система пневматической регулировки высоты стола</text>

    <g transform="translate(140, 220)">
      <text x="150" y="24" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a"><tspan font-weight="bold" fill="#009fe3">Varistand, Varibase</tspan> - пневматическая система разработанная</text>
      <text x="150" y="48" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a">немецкой фирмой Suspa, служит для регулировки высоты стола</text>
      <text x="150" y="72" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a">с помощью одной ножки.</text>

      <text x="150" y="110" font-family="'Arial', sans-serif" font-size="19" fill="#1b2a3a">Активация системы производится с помощью кнопки или рычага.</text>

      <g transform="translate(730, 20) scale(0.9)">
        ${SUSPA_LOGO}
      </g>
    </g>

    <!-- Highlights Blue Box -->
    <g transform="translate(300, 360)">
      <rect x="0" y="0" width="370" height="190" rx="8" fill="#b9d9eb"/>
      <text x="20" y="30" font-family="'Arial', sans-serif" font-weight="700" font-size="18" fill="#1b2a3a">Основные моменты:</text>
      ${[
        'элегантный дизайн',
        'бесшумная работа',
        'блокировка в любой позиции',
        'постоянная сила, независимо от позиции',
        'простота регулировки'
      ].map((t, idx) => `
        <polyline points="22,${58 + idx*26} 28,${64 + idx*26} 36,${55 + idx*26}" fill="none" stroke="#ffffff" stroke-width="3"/>
        <text x="44" y="${62 + idx*26}" font-family="'Arial', sans-serif" font-size="16" fill="#1b2a3a">${t}</text>
      `).join('')}
    </g>

    <!-- Varistand & Varibase Stand Visuals -->
    <g transform="translate(140, 360)">
      <text x="0" y="-10" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#009fe3">Varistand</text>
      <rect x="30" y="20" width="24" height="280" fill="url(#metalGrad)"/>
      <ellipse cx="42" cy="300" rx="50" ry="12" fill="#bdc3c7"/>
    </g>

    <g transform="translate(740, 360)">
      <text x="0" y="-10" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#009fe3">Varibase</text>
      <rect x="30" y="20" width="28" height="280" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="2"/>
    </g>

    <text x="300" y="585" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a"><tspan font-weight="bold" fill="#009fe3">Varistand</tspan> поставляется в двух цветовых</text>
    <text x="330" y="610" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a">решениях: хромированный и черный</text>

    <!-- Technical Specs Table -->
    <g transform="translate(140, 780)">
      <text x="0" y="-15" font-family="'Arial', sans-serif" font-weight="700" font-size="24" fill="#1b2a3a">Технические характеристики</text>

      <!-- Table Header -->
      <rect x="0" y="0" width="920" height="48" fill="#b9d9eb"/>
      <text x="30" y="30" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a">Параметры</text>
      <text x="400" y="30" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a">Диапазон значений: Varistand</text>
      <text x="700" y="30" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a">Диапазон значений: Varibase</text>

      ${[
        ['Ход штока max (мм)', '415 мм', '400 мм'],
        ['Длина в сжатом состоянии min (мм)', '435 мм', '440 мм'],
        ['Длина в выдвинутом состоянии max (мм)', '1040 мм', '1040 мм'],
        ['Усилие (N)', '120 N (другие варианты по запросу)', '120 N (другие варианты по запросу)'],
        ['Активация', 'Кнопка, рычаг, др. по запросу', 'Кнопка, рычаг, др. по запросу'],
        ['Крепление к столешнице', 'Фланцевый адаптер', 'Фланцевый адаптер'],
        ['Крепление к пятилучию', 'Фланец с 3-я отверстиями *M6', 'Фланец с 4-я отверстиями *M6']
      ].map((r, i) => `
        <rect x="0" y="${48 + i*44}" width="360" height="44" fill="${i%2===0 ? '#ffffff' : '#f0f5f9'}" stroke="#d1e0ec" stroke-width="0.5"/>
        <rect x="360" y="${48 + i*44}" width="280" height="44" fill="${i%2===0 ? '#ffffff' : '#f0f5f9'}" stroke="#d1e0ec" stroke-width="0.5"/>
        <rect x="640" y="${48 + i*44}" width="280" height="44" fill="${i%2===0 ? '#ffffff' : '#f0f5f9'}" stroke="#d1e0ec" stroke-width="0.5"/>
        <text x="20" y="${75 + i*44}" font-family="'Arial', sans-serif" font-size="15" fill="#1b2a3a">${r[0]}</text>
        <text x="380" y="${75 + i*44}" font-family="'Arial', sans-serif" font-size="15" fill="#1b2a3a">${r[1]}</text>
        <text x="660" y="${75 + i*44}" font-family="'Arial', sans-serif" font-size="15" fill="#1b2a3a">${r[2]}</text>
      `).join('')}

      <text x="0" y="400" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a"><tspan font-weight="bold">Функция OverRide</tspan> - эта опция позволяет поднимать верхнюю часть стола без специальной активации</text>
    </g>
  `, 4);
}

// Generate Page 6 (Medical Actuators)
function renderPage6() {
  return pageBase(`
    <g transform="translate(140, 70)">
      ${DIKON_LOGO}
    </g>

    <rect x="140" y="140" width="920" height="52" fill="#7b8a95"/>
    <text x="170" y="177" font-family="'Arial', sans-serif" font-weight="700" font-size="30" fill="#ffffff">Гидравлические приводы для медицинской мебели и оборудования</text>

    <g transform="translate(140, 230)">
      <text x="0" y="24" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a"><tspan font-weight="bold" fill="#009fe3">Гидравлические приводы</tspan> для производства больничных кроватей, массажных кушеток, носилок,</text>
      <text x="0" y="50" font-family="'Arial', sans-serif" font-size="18" fill="#1b2a3a">а также для косметического и медицинского оборудования.</text>
    </g>

    <!-- 5 Image Cards with Blue Borders -->
    <!-- Card 1 -->
    <g transform="translate(140, 340)">
      <text x="135" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">Для медицинских кроватей и различного</text>
      <text x="135" y="22" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">медицинского оборудования.</text>
      <rect x="0" y="40" width="270" height="240" fill="#f8fafc" stroke="#29abe2" stroke-width="3"/>
      <!-- Hydro Cylinder sketch -->
      <g transform="translate(30, 80) rotate(-20)">
        <rect x="0" y="0" width="160" height="40" rx="8" fill="url(#metalGrad)"/>
        <rect x="160" y="8" width="80" height="24" fill="url(#rodGrad)"/>
        <circle cx="20" cy="20" r="8" fill="#ecf0f1"/>
      </g>
    </g>

    <!-- Card 2 -->
    <g transform="translate(460, 340)">
      <text x="135" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">Гидропривод</text>
      <text x="135" y="22" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">для капельницы.</text>
      <rect x="0" y="40" width="270" height="240" fill="#f8fafc" stroke="#29abe2" stroke-width="3"/>
      <!-- Vertical drip stand actuator -->
      <rect x="125" y="60" width="20" height="190" fill="url(#rodGrad)"/>
    </g>

    <!-- Card 3 -->
    <g transform="translate(780, 340)">
      <text x="140" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">Гидропривод для</text>
      <text x="140" y="22" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">инструментальных столиков.</text>
      <rect x="0" y="40" width="280" height="240" fill="#f8fafc" stroke="#29abe2" stroke-width="3"/>
      <rect x="125" y="60" width="28" height="190" fill="url(#metalGrad)"/>
    </g>

    <!-- Card 4 (Bottom Left) -->
    <g transform="translate(280, 720)">
      <text x="135" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">Гидропривод для подъема</text>
      <text x="135" y="22" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">спального места медицинской кровати.</text>
      <rect x="0" y="40" width="270" height="240" fill="#f8fafc" stroke="#29abe2" stroke-width="3"/>
      <!-- Double Column Telescopic Actuator -->
      <rect x="80" y="70" width="50" height="180" fill="url(#metalGrad)"/>
      <rect x="140" y="70" width="50" height="180" fill="url(#metalGrad)"/>
    </g>

    <!-- Card 5 (Bottom Right) -->
    <g transform="translate(620, 720)">
      <text x="135" y="0" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">Гидравлический подъемник</text>
      <text x="135" y="22" font-family="'Arial', sans-serif" font-weight="700" font-size="17" fill="#1b2a3a" text-anchor="middle">для носилок и медицинских кроватей.</text>
      <rect x="0" y="40" width="270" height="240" fill="#f8fafc" stroke="#29abe2" stroke-width="3"/>
      <rect x="100" y="60" width="70" height="190" fill="url(#metalGrad)"/>
      <line x1="170" y1="180" x2="220" y2="230" stroke="#7f8c8d" stroke-width="8"/>
    </g>
  `, 5);
}

// Generate Page 7 (Wheels)
function renderPage7() {
  return pageBase(`
    <g transform="translate(680, 70)">
      ${DIKON_LOGO}
    </g>

    <g transform="translate(140, 160)">
      <text x="0" y="24" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">Предлагаем колеса и ролики для оборудования, медицинской</text>
      <text x="0" y="50" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">мебели и аппаратуры от ведущих мировых производителей</text>
      <text x="0" y="76" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">Италии, Германии, Турции и Китая.</text>
    </g>

    <!-- 6 Wheels Series Cards -->
    ${[
      { title: 'Мебельная серия', x: 140, y: 280, color: '#7f8c8d' },
      { title: 'Аппаратная и медицинская серии', x: 600, y: 280, color: '#95a5a6' },
      { title: 'Транспортная серия', x: 140, y: 640, color: '#2980b9' },
      { title: 'Термостойкая серия', x: 600, y: 640, color: '#d35400' },
      { title: 'Большегрузная серия', x: 140, y: 1000, color: '#f39c12' },
      { title: 'Пневматическая серия', x: 600, y: 1000, color: '#c0392b' }
    ].map(c => `
      <g transform="translate(${c.x}, ${c.y})">
        <rect x="0" y="0" width="460" height="280" fill="#f8fafc" stroke="#29abe2" stroke-width="3"/>
        <text x="230" y="320" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a" text-anchor="middle">${c.title}</text>
        
        <!-- Render detailed Wheel Cluster in each card -->
        <g transform="translate(150, 60)">
          <circle cx="80" cy="80" r="70" fill="${c.color}"/>
          <circle cx="80" cy="80" r="48" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="4"/>
          <circle cx="80" cy="80" r="16" fill="#2c3e50"/>
          <!-- Bracket -->
          <path d="M 50 15 L 110 15 L 105 -15 L 55 -15 Z" fill="#95a5a6" stroke="#7f8c8d" stroke-width="2"/>
        </g>
      </g>
    `).join('')}
  `, 6);
}

// Generate Page 8 (Contacts)
function renderPage8() {
  return pageBase(`
    <!-- Large Centered QR Code -->
    <g transform="translate(470, 90)">
      ${getQrCodeSvg(260)}
    </g>

    <!-- Two Columns: Moscow and Saint Petersburg -->
    <g transform="translate(100, 520)">
      <!-- Moscow Office -->
      <g transform="translate(0, 0)">
        <text x="50" y="0" font-family="'Arial', sans-serif" font-weight="800" font-size="26" fill="#009fe3">ОФИС В МОСКВЕ</text>
        <!-- Location Icon -->
        <circle cx="20" cy="-8" r="14" fill="#009fe3"/>
        <circle cx="20" cy="-8" r="5" fill="#ffffff"/>

        <text x="50" y="44" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">141044, г. Москва, Московская обл.,</text>
        <text x="50" y="74" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">городской округ Мытищи</text>
        <text x="50" y="104" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">д. Грибки, ул. Ангарская, стр. 40Б,</text>
        <text x="50" y="134" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">помещения № 8-12</text>

        <!-- Phone Icon & Numbers -->
        <circle cx="20" cy="200" r="14" fill="#009fe3"/>
        <text x="50" y="206" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">+7 800 707-15-24</text>
        <text x="50" y="238" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">+7 925 505-04-44</text>

        <!-- Email Icon -->
        <circle cx="20" cy="290" r="14" fill="#009fe3"/>
        <text x="50" y="296" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">e-mail: <tspan font-weight="bold">moscow@dikon.ru</tspan></text>
      </g>

      <!-- SPb Office -->
      <g transform="translate(560, 0)">
        <text x="50" y="0" font-family="'Arial', sans-serif" font-weight="800" font-size="26" fill="#009fe3">ОФИС В САНКТ-ПЕТЕРБУРГЕ</text>
        <circle cx="20" cy="-8" r="14" fill="#009fe3"/>
        <circle cx="20" cy="-8" r="5" fill="#ffffff"/>

        <text x="50" y="44" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">193318, г. Санкт-Петербург,</text>
        <text x="50" y="74" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">ул. Ворошилова, д. 2, лит. АБ,</text>
        <text x="50" y="104" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">пом. 5Н, офис 511 (БЦ «Охта»)</text>

        <circle cx="20" cy="200" r="14" fill="#009fe3"/>
        <text x="50" y="206" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">+7 812 315-06-35</text>
        <text x="50" y="238" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">+7 812 571-73-10</text>
        <text x="50" y="270" font-family="'Arial', sans-serif" font-weight="700" font-size="22" fill="#1b2a3a">+7 812 314-56-41</text>

        <circle cx="20" cy="320" r="14" fill="#009fe3"/>
        <text x="50" y="326" font-family="'Arial', sans-serif" font-size="20" fill="#1b2a3a">e-mail: <tspan font-weight="bold">info@dikon.ru</tspan></text>
      </g>
    </g>

    <!-- Bottom URL Link with Globe Icon -->
    <g transform="translate(420, 1050)">
      <circle cx="30" cy="30" r="22" fill="#009fe3"/>
      <text x="70" y="44" font-family="'Arial', sans-serif" font-weight="800" font-size="44" fill="#009fe3">www.dikon.ru</text>
    </g>
  `, null);
}

async function main() {
  const pages = [
    { num: 1, svg: renderPage1() },
    { num: 2, svg: renderPage2() },
    { num: 3, svg: renderPage3() },
    { num: 4, svg: renderPage4() },
    { num: 5, svg: renderPage5() },
    { num: 6, svg: renderPage6() },
    { num: 7, svg: renderPage7() },
    { num: 8, svg: renderPage8() }
  ];

  console.log('Rendering 8 catalog pages at 1200x1700 high resolution...');

  for (const p of pages) {
    const svgBuffer = Buffer.from(p.svg);
    const jpgBuffer = await sharp(svgBuffer)
      .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
      .toBuffer();

    // Save to all target paths
    const paths = [
      `public/img/pages/page-${p.num}.jpg`,
      `img/pages/page-${p.num}.jpg`,
      `dist/img/pages/page-${p.num}.jpg`
    ];

    for (const outPath of paths) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, jpgBuffer);
    }
    console.log(`Page ${p.num} rendered (${jpgBuffer.length} bytes)`);
  }

  console.log('All 8 pages successfully generated!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
