/**
 * AVAJAZ — app.js
 * Handles: SPA navigation, chess board, confidence sliders,
 * upload zone, task selection, toast notifications, tier checks
 */

/* ── STATE ───────────────────────────────────────────────────── */
const state = {
  currentPage: 'dashboard',
  selectedTask: null,
  selectedGroup: 'nursery',
  chessSelected: null,
  chessBoard: null,
  uploadedFile: null,
  verifiedToday: 0,
};

/* ── IMAGE BASE PATH ─────────────────────────────────────────── */
// Path from guide/ folder to the images folder
const IMG = 'images/';

/* ── TASK GROUPS DATA ────────────────────────────────────────── */
// 4 groups, each with real images from the /images folder.
// All static metadata (farmer, GPS, reward, species) is fixed.
const TASK_GROUPS = {
  nursery: [
    { img: 'nursery_work.jpg',      id: 'NS-001', label: 'Nursery Bed A',       farmer: 'Mary Wambua',     species: 'Grevillea robusta',           reward: '0.02', xp: 40,  lat: '-1.2931', lng: '36.8201', days: 12, dist: '0.8' },
    { img: 'seedling_nursery.jpg',  id: 'NS-002', label: 'Seedling Nursery',    farmer: 'Peter Kamau',     species: 'Casuarina equisetifolia',     reward: '0.02', xp: 40,  lat: '-1.2945', lng: '36.8188', days: 8,  dist: '1.1' },
    { img: 'seedling_growth.jpg',   id: 'NS-003', label: 'Seedling Growth Bed', farmer: 'Grace Njeri',     species: 'Leucaena leucocephala',       reward: '0.02', xp: 45,  lat: '-1.2960', lng: '36.8215', days: 21, dist: '1.4' },
    { img: 'inclusive_planting.jpg',id: 'NS-004', label: 'Community Planting',  farmer: 'Samuel Otieno',   species: 'Moringa oleifera',            reward: '0.03', xp: 60,  lat: '-1.3010', lng: '36.8140', days: 30, dist: '2.2' },
    { img: 'planting_event.jpg',    id: 'NS-005', label: 'Planting Day Event',  farmer: 'Faith Akinyi',    species: 'Eucalyptus globulus',         reward: '0.02', xp: 40,  lat: '-1.2888', lng: '36.8310', days: 5,  dist: '3.0' },
    { img: 'planting_group.jpg',    id: 'NS-006', label: 'Group Planting A',    farmer: 'James Mwenda',    species: 'Calliandra calothyrsus',      reward: '0.03', xp: 55,  lat: '-1.2820', lng: '36.8420', days: 14, dist: '3.5' },
    { img: 'ranger_planting.jpg',   id: 'NS-007', label: 'Ranger Nursery',      farmer: 'David Njoroge',   species: 'Prunus africana',             reward: '0.04', xp: 80,  lat: '-1.3100', lng: '36.8050', days: 45, dist: '4.1' },
    { img: 'Avaolo1.jpeg',          id: 'NS-008', label: 'Avaolo Plot 1',       farmer: 'Esther Wanjiku',  species: 'Coffea arabica',              reward: '0.02', xp: 40,  lat: '-1.2970', lng: '36.8175', days: 60, dist: '1.8' },
    { img: 'avaolo2.jpeg',          id: 'NS-009', label: 'Avaolo Plot 2',       farmer: 'John Karanja',    species: 'Macadamia integrifolia',      reward: '0.02', xp: 40,  lat: '-1.2995', lng: '36.8200', days: 33, dist: '2.0' },
    { img: 'avaolo3.jpeg',          id: 'NS-010', label: 'Avaolo Plot 3',       farmer: 'Ann Mumbi',       species: 'Vangueria madagascariensis',  reward: '0.02', xp: 40,  lat: '-1.3020', lng: '36.8165', days: 19, dist: '2.3' },
  ],
  agroforest: [
    { img: 'agroforestry.jpg',  id: 'AG-001', label: 'Agro Plot Alpha',   farmer: 'Wycliffe Odhiambo', species: 'Faidherbia albida',        reward: '0.05', xp: 100, lat: '-1.3050', lng: '36.8070', days: 90,  dist: '1.5' },
    { img: 'oloava13.jpeg',     id: 'AG-002', label: 'Oloava Block 13',   farmer: 'Catherine Njoki',   species: 'Senna spectabilis',        reward: '0.04', xp: 80,  lat: '-1.3070', lng: '36.8090', days: 75,  dist: '2.1' },
    { img: 'oloava14.jpeg',     id: 'AG-003', label: 'Oloava Block 14',   farmer: 'Bernard Ochieng',   species: 'Albizia lebbeck',          reward: '0.04', xp: 80,  lat: '-1.3090', lng: '36.8110', days: 55,  dist: '2.4' },
    { img: 'oloava15.jpeg',     id: 'AG-004', label: 'Oloava Block 15',   farmer: 'Rose Adhiambo',     species: 'Terminalia brownii',       reward: '0.04', xp: 80,  lat: '-1.3110', lng: '36.8130', days: 40,  dist: '2.7' },
    { img: 'oloava16.jpeg',     id: 'AG-005', label: 'Oloava Block 16',   farmer: 'Philip Owino',      species: 'Milicia excelsa',          reward: '0.05', xp: 100, lat: '-1.3130', lng: '36.8150', days: 120, dist: '3.0' },
    { img: 'oloava17.jpeg',     id: 'AG-006', label: 'Oloava Block 17',   farmer: 'Agnes Wangari',     species: 'Khaya anthotheca',         reward: '0.05', xp: 100, lat: '-1.3150', lng: '36.8170', days: 180, dist: '3.3' },
    { img: 'oloava18.jpeg',     id: 'AG-007', label: 'Oloava Block 18',   farmer: 'Moses Kiprotich',   species: 'Trichodesma zeylanicum',   reward: '0.04', xp: 80,  lat: '-1.3170', lng: '36.8190', days: 60,  dist: '3.6' },
    { img: 'oloava19.jpeg',     id: 'AG-008', label: 'Oloava Block 19',   farmer: 'Lilian Cherono',    species: 'Ziziphus mauritiana',      reward: '0.04', xp: 80,  lat: '-1.3190', lng: '36.8210', days: 45,  dist: '3.9' },
    { img: 'oloava20.jpeg',     id: 'AG-009', label: 'Oloava Block 20',   farmer: 'George Kiplagat',   species: 'Balanites aegyptiaca',     reward: '0.05', xp: 100, lat: '-1.3210', lng: '36.8230', days: 90,  dist: '4.2' },
    { img: 'oloava21.jpeg',     id: 'AG-010', label: 'Oloava Block 21',   farmer: 'Vivian Auma',       species: 'Acacia xanthophloea',      reward: '0.04', xp: 80,  lat: '-1.3230', lng: '36.8250', days: 30,  dist: '4.5' },
    { img: 'oloava22.jpeg',     id: 'AG-011', label: 'Oloava Block 22',   farmer: 'Isaac Maina',       species: 'Markhamia lutea',          reward: '0.04', xp: 80,  lat: '-1.3250', lng: '36.8270', days: 22,  dist: '4.8' },
    { img: 'oloava23.jpeg',     id: 'AG-012', label: 'Oloava Block 23',   farmer: 'Naomi Chebet',      species: 'Bridelia micrantha',       reward: '0.05', xp: 100, lat: '-1.3270', lng: '36.8290', days: 15,  dist: '5.1' },
  ],
  beekeeping: [
    { img: 'avaolo4.jpeg',  id: 'BK-001', label: 'Hive Site 4',  farmer: 'Paul Kimani',     species: '🍯 Log Hive Inspection', reward: '0.03', xp: 60,  lat: '-1.2850', lng: '36.8350', days: 30, dist: '1.0' },
    { img: 'avaolo5.jpeg',  id: 'BK-002', label: 'Hive Site 5',  farmer: 'Lydia Wairimu',   species: '🍯 Kenya Top Bar Hive',  reward: '0.03', xp: 60,  lat: '-1.2860', lng: '36.8360', days: 45, dist: '1.3' },
    { img: 'avaolo6.jpeg',  id: 'BK-003', label: 'Hive Site 6',  farmer: 'Robert Mutua',    species: '🍯 Langstroth Hive',     reward: '0.03', xp: 60,  lat: '-1.2870', lng: '36.8370', days: 60, dist: '1.6' },
    { img: 'avaolo7.jpeg',  id: 'BK-004', label: 'Hive Site 7',  farmer: 'Joyce Moraa',     species: '🍯 Transition Hive',     reward: '0.04', xp: 75,  lat: '-1.2880', lng: '36.8380', days: 10, dist: '1.9' },
    { img: 'avaolo8.jpeg',  id: 'BK-005', label: 'Hive Site 8',  farmer: 'Charles Omondi',  species: '🍯 Swarm Colony',        reward: '0.04', xp: 75,  lat: '-1.2890', lng: '36.8390', days: 7,  dist: '2.2' },
    { img: 'avaolo9.jpeg',  id: 'BK-006', label: 'Hive Site 9',  farmer: 'Tabitha Njeri',   species: '🍯 Queen Check',         reward: '0.03', xp: 60,  lat: '-1.2900', lng: '36.8400', days: 14, dist: '2.5' },
    { img: 'avaolo10.jpeg', id: 'BK-007', label: 'Hive Site 10', farmer: 'Henry Waweru',    species: '🍯 Honey Harvest',       reward: '0.05', xp: 100, lat: '-1.2910', lng: '36.8410', days: 21, dist: '2.8' },
    { img: 'avaolo11.jpeg', id: 'BK-008', label: 'Hive Site 11', farmer: 'Dorothy Achieng', species: '🍯 Wax Moth Control',    reward: '0.03', xp: 60,  lat: '-1.2920', lng: '36.8420', days: 5,  dist: '3.1' },
    { img: 'avaolo12.jpeg', id: 'BK-009', label: 'Hive Site 12', farmer: 'Francis Mugo',    species: '🍯 Varroa Check',        reward: '0.03', xp: 60,  lat: '-1.2930', lng: '36.8430', days: 28, dist: '3.4' },
    { img: 'avaolo13.jpeg', id: 'BK-010', label: 'Hive Site 13', farmer: 'Irene Cherotich', species: '🍯 Forager Activity',   reward: '0.04', xp: 75,  lat: '-1.2940', lng: '36.8440', days: 35, dist: '3.7' },
    { img: 'avaolo17.jpeg', id: 'BK-011', label: 'Hive Site 17', farmer: 'Stephen Barasa',  species: '🍯 New Colony Setup',    reward: '0.04', xp: 75,  lat: '-1.2950', lng: '36.8450', days: 3,  dist: '4.0' },
  ],
  ecotourism: [
    { img: 'ecotourism.jpg',            id: 'ET-001', label: 'Trail Point A',    farmer: 'Mercy Achieng',   species: '🦋 Butterfly Transect',  reward: '0.04', xp: 80,  lat: '-1.2750', lng: '36.8500', days: 7,  dist: '0.5' },
    { img: 'community_partnership.jpg', id: 'ET-002', label: 'Community Hub',    farmer: 'Victor Kibet',    species: '🦋 Bird Count Station',  reward: '0.04', xp: 80,  lat: '-1.2760', lng: '36.8510', days: 14, dist: '0.8' },
    { img: 'avaolo5.jpeg',              id: 'ET-003', label: 'Canopy Walk Zone', farmer: 'Christine Wanja', species: '🦋 Canopy Survey',       reward: '0.05', xp: 100, lat: '-1.2770', lng: '36.8520', days: 21, dist: '1.2' },
    { img: 'avaolo6.jpeg',              id: 'ET-004', label: 'Waterfall Trail',  farmer: 'Collins Otieno',  species: '🦋 Waterfall Ecosystem', reward: '0.05', xp: 100, lat: '-1.2780', lng: '36.8530', days: 30, dist: '1.6' },
    { img: 'avaolo17.jpeg',             id: 'ET-005', label: 'Forest Edge',      farmer: 'Laura Muthoni',   species: '🦋 Forest Edge Habitat', reward: '0.04', xp: 80,  lat: '-1.2790', lng: '36.8540', days: 5,  dist: '2.0' },
  ],
};

/* ── CHESS INITIAL POSITION (FEN-style array) ────────────────── */
const INITIAL_BOARD = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖'],
];

// Partially played game state (matches move history shown)
const GAME_BOARD = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['','♟','♟','♟','','♟','♟','♟'],
  ['♟','','','','','','',''],
  ['','','','','♟','','',''],
  ['','','','','♙','','',''],
  ['','','','','','♘','',''],
  ['♙','♙','♙','♙','','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','','♖'],
];

/* ── WALLET SYNC (For React Integration) ────────────────── */
function syncWalletFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const address = params.get('address');
  const balance = params.get('balance');

  if (address) {
    // Format address short for display
    const shortAddress = address.slice(0, 6) + '...' + address.slice(-4);
    // Update all user name displays to the address
    document.querySelectorAll('.user-name, .page-title').forEach(el => {
      el.textContent = shortAddress;
    });
    // Hide the "beginner" badge as it's for the demo user
    document.querySelectorAll('.tier-badge').forEach(el => el.style.display = 'none');
  }

  if (balance) {
    // Update all balance displays
    document.querySelectorAll('.user-avax, .topbar-avax, .stat-card.accent-gold .stat-card-value').forEach(el => {
      el.textContent = `${parseFloat(balance).toFixed(4)} AVAX`;
    });
    // Update the stat label too
    document.querySelectorAll('.stat-card.accent-gold .stat-card-change').forEach(el => {
      el.textContent = `≈ KES ${(parseFloat(balance) * 1700).toLocaleString()}`; // Estimated 1 AVAX = 1700 KES
    });
  }
}

/* ── DOM READY ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  syncWalletFromUrl(); // Sync first
  initNavigation();
  initChessBoard();
  initUploadZone();
  initVerificationPage();      // replaces old initTaskCards + initFilterButtons
  initMarketOptions();
  initConfidenceSliders();
  initTypeButtons();
  initMobileNav();
  initWithdrawMax();
  initTierUpgrade();
  startChessTimer();
  animateStatsOnLoad();
});

/* ── NAVIGATION ──────────────────────────────────────────────── */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetPage = item.dataset.page;
      // Allow the chess link to open the standalone chess HTML file
      if (targetPage === 'chess-external') {
        return; // let the browser follow the href normally
      }
      e.preventDefault();
      navigateTo(targetPage);

      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}

function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Deactivate all nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show target page
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
    state.currentPage = pageId;
  }

  // Activate nav item
  const targetNav = document.querySelector(`[data-page="${pageId}"]`);
  if (targetNav) targetNav.classList.add('active');

  // Page-specific init
  if (pageId === 'chess') renderChessBoard();
  if (pageId === 'wallet') animateBarChart();
  if (pageId === 'profile') animateRepCircle();

  // Scroll to top
  document.querySelector('.main-content').scrollTop = 0;
}

/* ── MOBILE NAV ──────────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ── CHESS BOARD ─────────────────────────────────────────────── */
function initChessBoard() {
  state.chessBoard = GAME_BOARD.map(row => [...row]);
}

function renderChessBoard() {
  const boardEl = document.getElementById('chessBoard');
  if (!boardEl) return;
  boardEl.innerHTML = '';

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = document.createElement('div');
      const isLight = (row + col) % 2 === 0;
      sq.className = `chess-square ${isLight ? 'light' : 'dark'}`;
      sq.dataset.row = row;
      sq.dataset.col = col;

      const piece = state.chessBoard[row][col];
      if (piece) {
        sq.textContent = piece;
        sq.style.cursor = 'pointer';
      }

      sq.addEventListener('click', () => handleSquareClick(row, col, sq));
      boardEl.appendChild(sq);
    }
  }
}

function handleSquareClick(row, col, sqEl) {
  const squares = document.querySelectorAll('.chess-square');

  if (state.chessSelected) {
    // Move piece
    const [fromRow, fromCol] = state.chessSelected;
    const piece = state.chessBoard[fromRow][fromCol];
    const targetPiece = state.chessBoard[row][col];

    // Simple move (no full chess rules for demo)
    if (fromRow !== row || fromCol !== col) {
      state.chessBoard[row][col] = piece;
      state.chessBoard[fromRow][fromCol] = '';

      // Clear highlights
      squares.forEach(s => s.classList.remove('highlight'));
      state.chessSelected = null;
      renderChessBoard();

      if (targetPiece) {
        showToast(`Captured ${targetPiece}!`);
      }
    } else {
      squares.forEach(s => s.classList.remove('highlight'));
      state.chessSelected = null;
    }
  } else if (state.chessBoard[row][col]) {
    // Select piece — only white pieces (♙♖♘♗♕♔)
    const whitePieces = ['♙','♖','♘','♗','♕','♔'];
    if (whitePieces.includes(state.chessBoard[row][col])) {
      state.chessSelected = [row, col];
      squares.forEach(s => s.classList.remove('highlight'));
      sqEl.classList.add('highlight');
      highlightMoves(row, col);
    }
  }
}

function highlightMoves(row, col) {
  const piece = state.chessBoard[row][col];
  const squares = document.querySelectorAll('.chess-square');

  // Simple highlight of adjacent squares for demo
  const moves = getSimpleMoves(piece, row, col);
  moves.forEach(([r, c]) => {
    const idx = r * 8 + c;
    if (squares[idx]) squares[idx].classList.add('highlight');
  });
}

function getSimpleMoves(piece, row, col) {
  const moves = [];
  if (piece === '♙') {
    if (row > 0 && !state.chessBoard[row-1][col]) moves.push([row-1, col]);
    if (row === 6 && !state.chessBoard[row-2][col]) moves.push([row-2, col]);
    if (row > 0 && col > 0 && state.chessBoard[row-1][col-1]) moves.push([row-1, col-1]);
    if (row > 0 && col < 7 && state.chessBoard[row-1][col+1]) moves.push([row-1, col+1]);
  } else if (piece === '♘') {
    const kMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
    kMoves.forEach(([dr,dc]) => {
      const nr = row+dr, nc = col+dc;
      if (nr>=0 && nr<8 && nc>=0 && nc<8) moves.push([nr, nc]);
    });
  } else if (piece === '♔') {
    for (let dr=-1; dr<=1; dr++) for (let dc=-1; dc<=1; dc++) {
      if (dr===0 && dc===0) continue;
      const nr=row+dr, nc=col+dc;
      if (nr>=0 && nr<8 && nc>=0 && nc<8) moves.push([nr,nc]);
    }
  } else {
    // Generic: show a few squares
    const dirs = piece === '♗' ? [[-1,-1],[-1,1],[1,-1],[1,1]] :
                 piece === '♖' ? [[-1,0],[1,0],[0,-1],[0,1]] :
                                  [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    dirs.forEach(([dr,dc]) => {
      const nr=row+dr*2, nc=col+dc*2;
      if (nr>=0 && nr<8 && nc>=0 && nc<8) moves.push([nr,nc]);
    });
  }
  return moves;
}

/* ── CHESS TIMER ─────────────────────────────────────────────── */
function startChessTimer() {
  let opponentTime = 138; // 2:18 in seconds
  setInterval(() => {
    if (document.getElementById('page-chess').classList.contains('active')) {
      opponentTime = Math.max(0, opponentTime - 1);
      const mins = Math.floor(opponentTime / 60);
      const secs = opponentTime % 60;
      const timerEl = document.querySelector('.player-timer.thinking');
      if (timerEl) {
        timerEl.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
        if (opponentTime <= 30) timerEl.style.background = '#C0392B';
      }
    }
  }, 1000);
}

/* ── UPLOAD ZONE ─────────────────────────────────────────────── */
function initUploadZone() {
  const zone  = document.getElementById('uploadZone');
  const input = document.getElementById('fileInput');
  if (!zone || !input) return;

  zone.addEventListener('click', () => input.click());

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.style.borderColor = 'var(--orange)';
    zone.style.background  = 'var(--orange-pale)';
  });

  zone.addEventListener('dragleave', () => {
    zone.style.borderColor = '';
    zone.style.background  = '';
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.style.borderColor = '';
    zone.style.background  = '';
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  });

  input.addEventListener('change', (e) => {
    if (e.target.files[0]) handleFileUpload(e.target.files[0]);
  });
}

function handleFileUpload(file) {
  state.uploadedFile = file;
  const zone = document.getElementById('uploadZone');
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');

  if (isImage || isVideo) {
    const reader = new FileReader();
    reader.onload = (e) => {
      zone.innerHTML = isImage
        ? `<img src="${e.target.result}" style="max-height:120px;border-radius:8px;object-fit:cover;" alt="Preview" />
           <div class="upload-text" style="margin-top:8px;">✓ ${file.name}</div>
           <div class="upload-sub">${(file.size/1024).toFixed(0)} KB</div>`
        : `<div class="upload-icon" style="color:var(--green)">✓</div>
           <div class="upload-text">${file.name}</div>
           <div class="upload-sub">${(file.size/1024/1024).toFixed(1)} MB</div>`;

      // Animate AI score
      const aiBar = document.querySelector('.ai-bar');
      const aiPct = document.querySelector('.ai-pct');
      if (aiBar && aiPct) {
        const score = Math.floor(Math.random() * 20) + 78; // 78–97
        aiBar.style.width = score + '%';
        aiBar.style.background = score >= 85 ? 'var(--green)' : 'var(--orange)';
        aiPct.textContent = `${score}% — ${score >= 85 ? 'Auto-approve likely ✓' : 'Admin review required'}`;
        aiPct.style.color = score >= 85 ? 'var(--green)' : 'var(--orange)';
      }
    };
    reader.readAsDataURL(file);
    showToast('📷 Evidence uploaded. AI check running…');
  } else {
    showToast('⚠️ Please upload an image or video file.');
  }
}

/* ── GAMIFICATION STATE ────────────────────────────────────────── */
const GAM = {
  xp:            340,
  level:         3,
  streak:        5,
  combo:         1,
  comboTimer:    null,
  comboTimerAnim:null,
  avaxToday:     0,
  verifiedToday: 0,
  achievedIds:   new Set(),
  challengeDone: new Set(),
  lastVerifyTime: 0,

  // XP thresholds per level (cumulative)
  XP_LEVELS: [0, 100, 250, 500, 800, 1200, 1800, 2600, 3600, 5000],

  // Daily challenges
  CHALLENGES: [
    { id:'c1', text:'Verify 3 images today',           goal:3,  metric:'verifiedToday', reward:'+0.05 AVAX + 100 XP' },
    { id:'c2', text:'Verify from all 4 groups',         goal:4,  metric:'groupsDone',    reward:'+0.10 AVAX + 200 XP' },
    { id:'c3', text:'Reach a 3× combo',                 goal:3,  metric:'maxCombo',      reward:'+50 XP' },
    { id:'c4', text:'Submit within 10s of selecting',   goal:1,  metric:'speedRun',      reward:'+0.02 AVAX + 30 XP' },
    { id:'c5', text:'Verify 2 Bee Keeping hives',       goal:2,  metric:'beekeepingDone',reward:'+0.04 AVAX + 80 XP' },
  ],

  // Achievements
  ACHIEVEMENTS: [
    { id:'a1', icon:'🌱', name:'First Sprout',   desc:'Submit your first verification',              trigger: (g) => g.verifiedToday >= 1 },
    { id:'a2', icon:'⚡', name:'Speed Dash',     desc:'Submit within 10 seconds of selecting',        trigger: (g) => g.speedRun >= 1 },
    { id:'a3', icon:'🔥', name:'On Fire',        desc:'Reach a 3× combo',                            trigger: (g) => g.maxCombo >= 3 },
    { id:'a4', icon:'🏆', name:'Daily Champion', desc:'Complete all 3 daily verifications',           trigger: (g) => g.verifiedToday >= 3 },
    { id:'a5', icon:'🌍', name:'Explorer',       desc:'Verify from all 4 groups',                    trigger: (g) => g.groupsDone >= 4 },
    { id:'a6', icon:'🍯', name:'Bee Friend',     desc:'Verify 2 bee keeping hives',                  trigger: (g) => g.beekeepingDone >= 2 },
    { id:'a7', icon:'💎', name:'XP Hunter',      desc:'Reach Level 5',                               trigger: (g) => g.level >= 5 },
    { id:'a8', icon:'🦁', name:'Streak King',    desc:'Reach a 7-day streak',                        trigger: (g) => g.streak >= 7 },
    { id:'a9', icon:'🚀', name:'Launcher',       desc:'Earn 0.20 AVAX in one session',               trigger: (g) => g.avaxToday >= 0.20 },
    { id:'a10',icon:'🎯', name:'Sharpshooter',   desc:'Get an AI score above 95%',                   trigger: (g) => g.bestAiScore >= 95 },
  ],

  // Track various metrics
  groupsDone:    new Set(),
  maxCombo:      1,
  speedRun:      0,
  beekeepingDone:0,
  bestAiScore:   0,
};

/* ── GAMIFICATION INIT ─────────────────────────────────────────── */
function initVerificationPage() {
  renderGroupTasks('nursery');
  initChallenges();
  updateHUD();

  // Group tab switching
  document.querySelectorAll('.group-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.group-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const group = tab.dataset.group;
      state.selectedGroup = group;
      state.selectedTask  = null;
      renderGroupTasks(group);
      const formContent = document.getElementById('verifyFormContent');
      const imgPreview  = document.getElementById('verifyImgPreview');
      if (formContent) formContent.style.display = 'none';
      if (imgPreview)  imgPreview.innerHTML = '<div class="verify-img-placeholder"><div class="vip-icon">🎯</div><div class="vip-text">Pick an image to start earning XP &amp; AVAX</div></div>';
    });
  });

  // Submit listener (event delegation)
  document.addEventListener('click', e => {
    const btn = e.target.closest('#submitVerifyBtn');
    if (!btn) return;
    if (!state.selectedTask) { showToast('⚠️ Select an image task first.'); return; }
    if (btn.disabled) return;

    btn.disabled = true;
    btn.classList.add('submitting');
    btn.querySelector('.sbg-text').textContent = 'Verifying…';

    setTimeout(() => onVerifySuccess(btn), 1800);
  });
}

function onVerifySuccess(btn) {
  const task  = state.selectedTask;
  const multi = GAM.combo;
  const baseAvax = parseFloat(task.reward);
  const baseXp   = task.xp || 50;
  const aiScore  = task.aiScore || 0;
  
  // AI Precision Bonus
  let aiBonusXp = 0;
  if (aiScore >= 95) aiBonusXp = 25;
  else if (aiScore >= 85) aiBonusXp = 15;
  else if (aiScore >= 70) aiBonusXp = 5;

  const earnAvax = parseFloat((baseAvax * multi).toFixed(4));
  const earnXp   = Math.round((baseXp + aiBonusXp) * multi);

  // Speed bonus check
  const elapsed = (Date.now() - GAM.lastVerifyTime) / 1000;
  if (elapsed > 0 && elapsed <= 10) { GAM.speedRun++; }

  // Update state
  GAM.verifiedToday++;
  GAM.avaxToday = parseFloat((GAM.avaxToday + earnAvax).toFixed(4));
  if (task.group === 'beekeeping') GAM.beekeepingDone++;
  GAM.groupsDone.add(task.group);
  state.verifiedToday = GAM.verifiedToday;

  // Award XP + level check
  addXP(earnXp);

  // Combo update
  bumCombo();

  // Reset submit button
  btn.disabled = false;
  btn.classList.remove('submitting');
  btn.querySelector('.sbg-text').textContent = 'Submit & Earn';

  // Mark card done
  const sel = document.querySelector('.img-task-card.selected');
  if (sel) sel.classList.add('done');

  // Clear annotations
  if (annotator) {
    annotator.annotations = [];
    annotator.render();
  }

  // Floating reward pop
  fireFloatingReward(`+${earnAvax} AVAX  ⚡ +${earnXp} XP`);
  if (aiBonusXp > 0) setTimeout(() => fireFloatingReward(`AI Precision: +${aiBonusXp * multi} XP`), 600);
  
  spawnConfetti();
  updateHUD();
  updateChallenges();
  checkAchievements();

  showToast(`✓ Verified! +${earnAvax} AVAX · +${earnXp} XP (${multi}× combo)`);

  // --- REACT INTEGRATION: NOTIFY PARENT APP ---
  // If embedded in the React Dashboard, alert it to process the blockchain reward
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'VERIFICATION_SUCCESS',
      payload: { earnAvax, earnXp, group: task.group }
    }, '*'); // Dispatch to any target origin (React dev server usually runs on a different port)
  }
}

/* ── XP & LEVELS ───────────────────────────────────────────────── */
function addXP(amount) {
  GAM.xp += amount;
  const nextLevel = GAM.XP_LEVELS[GAM.level] || GAM.XP_LEVELS[GAM.XP_LEVELS.length - 1];
  if (GAM.xp >= nextLevel && GAM.level < GAM.XP_LEVELS.length - 1) {
    GAM.level++;
    triggerLevelUp();
  }
  updateHUD();
}

function triggerLevelUp() {
  const overlay = document.getElementById('levelupOverlay');
  const luLevel = document.getElementById('luLevel');
  if (overlay && luLevel) {
    luLevel.textContent = GAM.level;
    overlay.style.display = 'flex';
    spawnLuBurst();
    showAchievementPop({ icon:'🎉', name:`Level ${GAM.level} Reached!`, desc:'Keep verifying to level up further' });
  }
}

function spawnLuBurst() {
  const burst = document.getElementById('luBurst');
  if (!burst) return;
  burst.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'lu-particle';
    p.style.cssText = `
      --angle:${Math.random()*360}deg;
      --dist:${60 + Math.random()*80}px;
      --delay:${Math.random()*0.3}s;
      background:hsl(${Math.random()*60+20},80%,55%);
    `;
    burst.appendChild(p);
  }
}

/* ── COMBO SYSTEM ──────────────────────────────────────────────── */
function bumCombo() {
  clearTimeout(GAM.comboTimer);
  cancelAnimationFrame(GAM.comboTimerAnim);

  GAM.combo = Math.min(GAM.combo + 1, 5);
  GAM.maxCombo = Math.max(GAM.maxCombo, GAM.combo);

  updateComboHUD();

  // Decay timer (10 sec)
  const COMBO_DECAY = 10000;
  let start = null;
  const timerWrap = document.getElementById('gamComboTimerWrap');
  const timerBar  = document.getElementById('gamComboTimerBar');
  if (timerWrap) timerWrap.style.display = 'block';

  function animTimer(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const pct = Math.max(0, 1 - elapsed / COMBO_DECAY);
    if (timerBar) timerBar.style.width = (pct * 100) + '%';
    if (elapsed < COMBO_DECAY) {
      GAM.comboTimerAnim = requestAnimationFrame(animTimer);
    }
  }
  GAM.comboTimerAnim = requestAnimationFrame(animTimer);

  GAM.comboTimer = setTimeout(() => {
    GAM.combo = 1;
    if (timerWrap) timerWrap.style.display = 'none';
    updateComboHUD();
  }, COMBO_DECAY);
}

function updateComboHUD() {
  const badge = document.getElementById('gamComboBadge');
  const caVal = document.getElementById('caValue');
  const COMBO_LABELS = ['', '⚡ 1× — Standard', '⚡⚡ 2× — Hot!', '⚡⚡⚡ 3× — On Fire!', '🌟 4× — MVP!', '💎 5× — LEGEND!'];
  const COLORS = ['','var(--text-soft)','var(--orange)','var(--orange-light)','var(--gold)','#C084FC'];

  if (badge) {
    badge.textContent = `${'⚡'.repeat(Math.min(GAM.combo,5))} ${GAM.combo}×`;
    badge.style.color = COLORS[GAM.combo] || COLORS[5];
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
  }
  if (caVal) {
    caVal.textContent = COMBO_LABELS[GAM.combo] || COMBO_LABELS[1];
    caVal.style.color  = COLORS[GAM.combo] || COLORS[5];
  }
}

/* ── HUD UPDATE ────────────────────────────────────────────────── */
function updateHUD() {
  // Level pill
  const lp = document.getElementById('gamLevelPill');
  if (lp) lp.textContent = `LVL ${GAM.level}`;

  // XP bar
  const curFloor = GAM.XP_LEVELS[GAM.level - 1] || 0;
  const curCeil  = GAM.XP_LEVELS[GAM.level]     || GAM.XP_LEVELS[GAM.XP_LEVELS.length - 1];
  const pct = Math.min(100, ((GAM.xp - curFloor) / (curCeil - curFloor)) * 100);
  const xpBar  = document.getElementById('gamXpBar');
  const xpText = document.getElementById('gamXpText');
  if (xpBar)  xpBar.style.width = pct + '%';
  if (xpText) xpText.textContent = `${GAM.xp} / ${curCeil} XP`;

  // Streak
  const sn = document.getElementById('gamStreakNum');
  if (sn) sn.textContent = GAM.streak;
  const sf = document.getElementById('gamStreakFlame');
  if (sf) sf.style.filter = GAM.streak >= 7 ? 'hue-rotate(270deg) brightness(1.4)' : '';

  // Today
  const tn = document.getElementById('gamTodayNum');
  if (tn) tn.textContent = GAM.verifiedToday;
  const ts = document.getElementById('gamTodayStars');
  const STARS = ['☆☆☆','★☆☆','★★☆','★★★'];
  if (ts) ts.textContent = STARS[Math.min(GAM.verifiedToday, 3)];

  // AVAX
  const av = document.getElementById('gamAvaxNum');
  if (av) av.textContent = GAM.avaxToday.toFixed(4);

  // Count badge
  const cb = document.getElementById('verifyCountBadge');
  if (cb) cb.textContent = `${GAM.verifiedToday} / 3 Today`;
}

/* ── DAILY CHALLENGES ──────────────────────────────────────────── */
function initChallenges() {
  const list = document.getElementById('challengeList');
  if (!list) return;
  list.innerHTML = GAM.CHALLENGES.map(c => `
    <div class="challenge-item" id="chi-${c.id}">
      <div class="chi-bar-wrap"><div class="chi-bar" id="chib-${c.id}" style="width:0%"></div></div>
      <div class="chi-text">${c.text}</div>
      <div class="chi-reward">${c.reward}</div>
    </div>
  `).join('');
}

function updateChallenges() {
  const metrics = {
    verifiedToday: GAM.verifiedToday,
    groupsDone:    GAM.groupsDone.size,
    maxCombo:      GAM.maxCombo,
    speedRun:      GAM.speedRun,
    beekeepingDone:GAM.beekeepingDone,
  };
  GAM.CHALLENGES.forEach(c => {
    const val = metrics[c.metric] || 0;
    const pct = Math.min(100, (val / c.goal) * 100);
    const bar = document.getElementById(`chib-${c.id}`);
    const item = document.getElementById(`chi-${c.id}`);
    if (bar) bar.style.width = pct + '%';
    if (pct >= 100 && !GAM.challengeDone.has(c.id)) {
      GAM.challengeDone.add(c.id);
      if (item) item.classList.add('done');
      showAchievementPop({ icon:'⚔️', name:'Challenge Complete!', desc:`${c.text} — ${c.reward}` });
    }
  });
}

/* ── ACHIEVEMENTS ──────────────────────────────────────────────── */
function checkAchievements() {
  GAM.ACHIEVEMENTS.forEach(a => {
    if (GAM.achievedIds.has(a.id)) return;
    if (a.trigger(GAM)) {
      GAM.achievedIds.add(a.id);
      showAchievementPop(a);
    }
  });
}

function showAchievementPop(a) {
  const zone = document.getElementById('achievementPopZone');
  if (!zone) return;
  const pop = document.createElement('div');
  pop.className = 'achievement-pop';
  pop.innerHTML = `
    <div class="ap-icon">${a.icon}</div>
    <div class="ap-body">
      <div class="ap-name">${a.name}</div>
      <div class="ap-desc">${a.desc}</div>
    </div>
  `;
  zone.appendChild(pop);
  requestAnimationFrame(() => pop.classList.add('visible'));
  setTimeout(() => {
    pop.classList.remove('visible');
    setTimeout(() => pop.remove(), 500);
  }, 3500);
}

/* ── CONFETTI BURST ────────────────────────────────────────────── */
function spawnConfetti() {
  const colors = ['#D4620A','#C89A2E','#2E6B3E','#C05030','#F0C040','#4A9B5E'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.cssText = `
      left:${40 + Math.random()*20}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${6 + Math.random()*6}px;
      height:${6 + Math.random()*6}px;
      animation-delay:${Math.random()*0.3}s;
      animation-duration:${0.8 + Math.random()*0.8}s;
      --fall-x:${(Math.random()-0.5)*300}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

/* ── FLOATING REWARD ───────────────────────────────────────────── */
function fireFloatingReward(text) {
  const panel = document.getElementById('submitPanel');
  if (!panel) return;
  const pop = document.createElement('div');
  pop.className = 'float-reward';
  pop.textContent = text;
  panel.appendChild(pop);
  requestAnimationFrame(() => pop.classList.add('fly'));
  setTimeout(() => pop.remove(), 1200);
}

/* ── TASK CARD RENDERING ───────────────────────────────────────── */
function renderGroupTasks(group) {
  const list = document.getElementById('verifyTaskList');
  if (!list) return;
  const tasks = TASK_GROUPS[group] || [];
  list.innerHTML = tasks.map((t, i) => `
    <div class="img-task-card" data-group="${group}" data-idx="${i}">
      <div class="img-task-thumb">
        <img src="${IMG}${t.img}" alt="${t.label}" loading="lazy" />
        <div class="img-task-badge">${groupBadge(group)}</div>
        <div class="img-task-xp-badge">+${t.xp || 50} XP</div>
      </div>
      <div class="img-task-body">
        <div class="img-task-id">${t.id}</div>
        <div class="img-task-label">${t.label}</div>
        <div class="img-task-farmer">${t.farmer}</div>
        <div class="img-task-meta">
          <span>📍 ${t.dist} km</span>
          <span>${t.days}d old</span>
          <span class="img-task-reward">+${t.reward} AVAX</span>
        </div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.img-task-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('done')) return;
      list.querySelectorAll('.img-task-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const idx  = parseInt(card.dataset.idx);
      const grp  = card.dataset.group;
      const task = { ...TASK_GROUPS[grp][idx], group: grp };
      state.selectedTask  = task;
      GAM.lastVerifyTime  = Date.now();
      loadTaskIntoPanel(task);
    });
  });
}

function loadTaskIntoPanel(task) {
  const imgPreview  = document.getElementById('verifyImgPreview');
  const formContent = document.getElementById('verifyFormContent');
  if (!imgPreview || !formContent) return;

  // Full image
  imgPreview.innerHTML = `
    <img src="${IMG}${task.img}" alt="${task.label}"
         style="width:100%;max-height:260px;object-fit:cover;border-radius:12px 12px 0 0;display:block;" />
    <div class="img-preview-caption">${task.label} &mdash; ${task.species}</div>
  `;

  // IDs / meta
  document.getElementById('staskId').textContent    = `${task.id} · ${task.label}`;
  document.getElementById('staskMeta').innerHTML    = `<span>${task.farmer}</span> &nbsp;·&nbsp; <span>${task.species}</span>`;
  document.getElementById('gpsLat').value           = task.lat;
  document.getElementById('gpsLng').value           = task.lng;

  // Reward with current combo
  const multi    = GAM.combo;
  const earnAvax = parseFloat((parseFloat(task.reward) * multi).toFixed(4));
  const earnXp   = Math.round((task.xp || 50) * multi);
  document.getElementById('staskReward').textContent = `+${earnAvax} AVAX`;
  document.getElementById('staskXp').textContent     = `+${earnXp} XP`;
  const sbgEarn = document.getElementById('sbgEarn');
  if (sbgEarn) sbgEarn.textContent = `+${earnAvax} AVAX · +${earnXp} XP`;
  updateComboHUD();

  // AI score
  const score = Math.floor(Math.random() * 18) + 80;
  GAM.bestAiScore = Math.max(GAM.bestAiScore, score);
  const aiBar = document.getElementById('aiBar');
  const aiPct = document.getElementById('aiPct');
  if (aiBar) { aiBar.style.width = score + '%'; aiBar.style.background = score >= 85 ? 'var(--green)' : 'var(--orange)'; }
  if (aiPct) { aiPct.textContent = `${score}% — ${score >= 85 ? 'Auto-approve likely ✓' : 'Admin review required'}`; aiPct.style.color = score >= 85 ? 'var(--green)' : 'var(--orange)'; }

  // Reset submit
  const submitBtn = document.getElementById('submitVerifyBtn');
  if (submitBtn) {
    submitBtn.disabled = false;
    const txt = submitBtn.querySelector('.sbg-text');
    if (txt) txt.textContent = 'Submit & Earn';
  }

  formContent.style.display = 'block';
  showToast(`📷 ${task.id} selected — submit to earn ${multi > 1 ? multi + '× rewards!' : 'rewards'}`);
}

/* ── ANNOTATION CANVAS CLASS ────────────────────────────────── */
class AnnotationCanvas {
  constructor(canvasId, imgId) {
    this.canvas = document.getElementById(canvasId);
    this.img = document.getElementById(imgId);
    this.ctx = this.canvas.getContext('2d');
    this.tool = 'box'; // box, point, label
    this.annotations = [];
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.initEvents();
  }

  resize() {
    this.canvas.width = this.img.clientWidth;
    this.canvas.height = this.img.clientHeight;
    this.render();
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => this.startDraw(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.endDraw());
    this.canvas.addEventListener('mouseleave', () => this.endDraw());

    window.addEventListener('resize', () => this.resize());
    
    // Tools
    document.querySelectorAll('.annot-tool[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.annot-tool').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.tool = btn.dataset.tool;
      });
    });

    document.getElementById('clearAnnot')?.addEventListener('click', () => {
      this.annotations = [];
      this.render();
    });
  }

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  startDraw(e) {
    this.isDrawing = true;
    const pos = this.getPos(e);
    this.startX = pos.x;
    this.startY = pos.y;
    this.currentX = pos.x;
    this.currentY = pos.y;

    if (this.tool === 'point') {
      this.annotations.push({ type: 'point', x: pos.x, y: pos.y });
      this.render();
    } else if (this.tool === 'label') {
      const text = prompt('Enter label text:', 'Seedling');
      if (text) {
        this.annotations.push({ type: 'label', x: pos.x, y: pos.y, text });
        this.render();
      }
      this.isDrawing = false;
    }
  }

  draw(e) {
    if (!this.isDrawing || this.tool !== 'box') return;
    const pos = this.getPos(e);
    this.currentX = pos.x;
    this.currentY = pos.y;
    this.render();
  }

  endDraw() {
    if (this.isDrawing && this.tool === 'box') {
      const w = this.currentX - this.startX;
      const h = this.currentY - this.startY;
      if (Math.abs(w) > 5 && Math.abs(h) > 5) {
        this.annotations.push({
          type: 'box',
          x: w > 0 ? this.startX : this.currentX,
          y: h > 0 ? this.startY : this.currentY,
          w: Math.abs(w),
          h: Math.abs(h)
        });
      }
    }
    this.isDrawing = false;
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw existing
    this.annotations.forEach(ann => {
      this.ctx.strokeStyle = '#F0C040';
      this.ctx.lineWidth = 2;
      this.ctx.fillStyle = 'rgba(240, 192, 64, 0.2)';

      if (ann.type === 'box') {
        this.ctx.strokeRect(ann.x, ann.y, ann.w, ann.h);
        this.ctx.fillRect(ann.x, ann.y, ann.w, ann.h);
      } else if (ann.type === 'point') {
        this.ctx.beginPath();
        this.ctx.arc(ann.x, ann.y, 5, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fillStyle = '#F0C040';
        this.ctx.fill();
      } else if (ann.type === 'label') {
        this.ctx.font = '700 12px Space Mono';
        this.ctx.fillStyle = '#F0C040';
        this.ctx.fillText(`🏷️ ${ann.text}`, ann.x + 8, ann.y + 4);
        this.ctx.beginPath();
        this.ctx.arc(ann.x, ann.y, 4, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });

    // Draw active
    if (this.isDrawing && this.tool === 'box') {
      this.ctx.strokeStyle = '#F5ECD8';
      this.ctx.setLineDash([5, 5]);
      this.ctx.strokeRect(this.startX, this.startY, this.currentX - this.startX, this.currentY - this.startY);
      this.ctx.setLineDash([]);
    }
  }
}

let annotator = null;

/* ── WIZARD CONTROLLER ────────────────────────────────────────── */
function goToStep(step) {
  document.getElementById('step1Content').style.display = step === 1 ? 'block' : 'none';
  document.getElementById('step2Content').style.display = step === 2 ? 'block' : 'none';
  document.getElementById('step3Content').style.display = step === 3 ? 'block' : 'none';

  // Dots
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`dot${i}`);
    dot.classList.remove('active', 'done');
    if (i < step) dot.classList.add('done');
    if (i === step) dot.classList.add('active');
  }

  const labels = ['Step 1: Annotate Image', 'Step 2: AI Verification', 'Step 3: Submit Evidence'];
  document.getElementById('stepLabel').textContent = labels[step - 1];
  
  if (step === 1 && annotator) {
    setTimeout(() => annotator.resize(), 50);
  }
}

/* ── AI SIMULATION ────────────────────────────────────────────── */
async function runAiCheck() {
  goToStep(2);
  const bar = document.getElementById('aiProgressBar');
  const text = document.getElementById('aiStatusText');
  const resultCard = document.getElementById('aiResultCard');
  
  resultCard.style.display = 'none';
  bar.style.width = '0%';
  
  const phases = ['Scanning pixels...', 'Analyzing textures...', 'Localizing features...', 'Matching labels...'];
  
  for (let i = 0; i <= 100; i += 2) {
    bar.style.width = i + '%';
    if (i % 25 === 0) text.textContent = phases[Math.floor(i / 25)] || 'Finalizing...';
    await new Promise(r => setTimeout(r, 30));
  }
  
  text.textContent = 'Analysis Complete ✓';
  
  // Calculate Score
  const count = annotator.annotations.length;
  const labels = annotator.annotations.filter(a => a.type === 'label').map(a => a.text.toLowerCase());
  const boxes = annotator.annotations.filter(a => a.type === 'box').length;
  
  let score = 50 + (count * 10);
  if (boxes > 0) score += 10;
  
  // Contextual check
  const group = GAM.selectedTask?.group || 'nursery';
  const keywords = {
    nursery: ['tree', 'seedling', 'pot', 'bed', 'green'],
    agroforest: ['canopy', 'shade', 'row', 'tree', 'farm'],
    beekeeping: ['hive', 'bee', 'honey', 'frame', 'box'],
    ecotourism: ['trail', 'bird', 'butterfly', 'forest', 'path']
  };
  
  const match = labels.some(l => keywords[group].some(kw => l.includes(kw)));
  if (match) score += 15;
  
  score = Math.min(score, 98);
  
  // Update state with score
  state.selectedTask.aiScore = score;
  GAM.bestAiScore = Math.max(GAM.bestAiScore, score);
  
  // Update result
  document.getElementById('aiScoreVal').textContent = score;
  const feedback = document.getElementById('aiFeedbackText');
  const sub = document.getElementById('aiVerdictSub');
  
  if (score >= 85) {
    sub.textContent = 'High confidence match';
    feedback.textContent = `Excellent work! The AI detected ${count} annotated features consistent with ${groupBadge(group)} activity. The accuracy score is ${score}%.`;
  } else if (score >= 60) {
    sub.textContent = 'Partial match detected';
    feedback.textContent = `The AI found some features, but the annotation density is low. Adding more specific labels like "${keywords[group][0]}" could improve the score.`;
  } else {
    sub.textContent = 'Low confidence / Manual review';
    feedback.textContent = `Minimal annotations found. Please ensure you mark the key features (trees, hives, etc) clearly before submitting.`;
  }
  
  resultCard.style.display = 'block';
}

function initWizardEvents() {
  document.getElementById('toAiCheckBtn')?.addEventListener('click', () => {
    if (annotator.annotations.length === 0) {
      if (!confirm('No annotations found. Proceed anyway?')) return;
    }
    runAiCheck();
  });
  
  document.getElementById('backToAnnotBtn')?.addEventListener('click', () => goToStep(1));
  document.getElementById('toSubmitBtn')?.addEventListener('click', () => goToStep(3));
}

// Update loadTaskIntoPanel to init annotator
function patchLoadTaskIntoPanel() {
  const original = loadTaskIntoPanel;
  loadTaskIntoPanel = (task) => {
    original(task);
    
    // Setup annotator
    const annotImg = document.getElementById('annotImage');
    annotImg.src = `images/${task.img}`;
    
    if (!annotator) {
      annotator = new AnnotationCanvas('annotCanvas', 'annotImage');
      initWizardEvents();
    } else {
      annotator.annotations = [];
      annotator.render();
    }
    
    goToStep(1);
    
    // Update Reward Multiplier label in Step 3
    const multi = GAM.combo > 1 ? GAM.combo : 1;
    // We modified index.html, so make sure IDs match
    const ravax = document.getElementById('staskReward');
    const rxp = document.getElementById('staskXp');
    const earn = document.getElementById('sbgEarn');
    
    if (ravax) ravax.textContent = `+${(parseFloat(task.reward) * multi).toFixed(3)} AVAX`;
    if (rxp) rxp.textContent = `+${Math.round(task.xp * multi)} XP`;
    if (earn) earn.textContent = `+${(parseFloat(task.reward) * multi).toFixed(3)} AVAX · +${Math.round(task.xp * multi)} XP`;
  };
}

updateVerifyCounter();
patchLoadTaskIntoPanel();


/* ── MARKET OPTIONS ──────────────────────────────────────────── */
function initMarketOptions() {
  document.querySelectorAll('.market-options').forEach(group => {
    const opts = group.querySelectorAll('.market-opt');
    opts.forEach(opt => {
      opt.addEventListener('click', () => {
        opts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const label = opt.querySelector('.opt-label').textContent;
        showToast(`Position set to: ${label}`);
      });
    });
  });

  // Stake button
  document.querySelectorAll('.market-card .btn-primary.full').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.market-card')?.querySelector('.form-input.small');
      const amount = input?.value || '0.05';
      showToast(`Staked ${amount} AVAX on prediction ✓`);
    });
  });
}

/* ── CONFIDENCE SLIDERS ──────────────────────────────────────── */
function initConfidenceSliders() {
  document.querySelectorAll('.confidence-slider').forEach(slider => {
    const display = slider.closest('.confidence-wrap')?.querySelector('.conf-val');
    if (!display) return;

    slider.addEventListener('input', () => {
      display.textContent = slider.value + '%';
      const mult = getConfidenceMultiplier(parseInt(slider.value));
      display.title = `Reward multiplier: ${mult}x`;
    });
  });
}

function getConfidenceMultiplier(confidence) {
  if (confidence >= 90) return '3.0';
  if (confidence >= 80) return '2.5';
  if (confidence >= 70) return '2.0';
  if (confidence >= 60) return '1.5';
  return '1.0';
}

/* ── TYPE BUTTONS ────────────────────────────────────────────── */
function initTypeButtons() {
  document.querySelectorAll('.type-select-row').forEach(row => {
    const btns = row.querySelectorAll('.type-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

/* ── WITHDRAW MAX ────────────────────────────────────────────── */
function initWithdrawMax() {
  const maxBtn = document.querySelector('.withdraw-card .btn-ghost.small');
  const amtInput = document.querySelector('.withdraw-card .form-input[type="number"]');
  if (maxBtn && amtInput) {
    maxBtn.addEventListener('click', () => {
      amtInput.value = '2.43';
    });
  }

  const confirmBtn = document.querySelector('.withdraw-card .btn-primary');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const addr = document.querySelector('.withdraw-card input[type="text"]')?.value;
      const amt  = document.querySelector('.withdraw-card input[type="number"]')?.value;
      if (!addr || addr.length < 10) { showToast('⚠️ Please enter a valid wallet address.'); return; }
      if (!amt || parseFloat(amt) <= 0) { showToast('⚠️ Please enter an amount to withdraw.'); return; }
      showToast(`Withdrawal of ${amt} AVAX initiated ✓`);
    });
  }
}

/* ── TIER UPGRADE ────────────────────────────────────────────── */
function initTierUpgrade() {
  document.querySelectorAll('.tier-unlock-msg .btn-primary, .criterion-row.ready .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('🎉 Congratulations! Upgrading to Intermediate tier…');
      setTimeout(() => {
        document.querySelectorAll('.tier-badge.beginner').forEach(badge => {
          badge.textContent = 'INTERMEDIATE';
          badge.classList.remove('beginner');
          badge.classList.add('intermediate');
        });
        showToast('✓ You are now an Intermediate verifier! Stake limits increased.');
      }, 2000);
    });
  });
}

/* ── BAR CHART ANIMATION ─────────────────────────────────────── */
function animateBarChart() {
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => {
    const targetH = bar.style.height;
    bar.style.height = '0%';
    setTimeout(() => {
      bar.style.transition = 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      bar.style.height = targetH;
    }, 100);
  });
}

/* ── REPUTATION CIRCLE ANIMATION ─────────────────────────────── */
function animateRepCircle() {
  const circle = document.querySelector('.rep-circle circle:last-child');
  if (!circle) return;
  circle.style.strokeDasharray = '0 277';
  setTimeout(() => {
    circle.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    circle.style.strokeDasharray = '185 92';
  }, 200);
}

/* ── STATS ANIMATION ON LOAD ─────────────────────────────────── */
function animateStatsOnLoad() {
  document.querySelectorAll('.stat-card-value').forEach(el => {
    const target = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
    if (isNaN(target) || target === 0) return;
    const isDecimal = el.textContent.includes('.');
    const suffix = el.textContent.replace(/[0-9.]/g, '').trim();
    let current = 0;
    const duration = 800;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = isDecimal
        ? current.toFixed(2) + (suffix ? ' ' + suffix : '')
        : Math.round(current) + (suffix ? suffix : '');
      if (current >= target) clearInterval(timer);
    }, interval);
  });
}

/* ── TOAST ───────────────────────────────────────────────────── */
let toastTimer;
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* ── KEYBOARD SHORTCUTS ──────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    state.chessSelected = null;
    document.querySelectorAll('.chess-square').forEach(s => s.classList.remove('highlight'));
    document.getElementById('sidebar').classList.remove('open');
  }
});

/* ── COPY WALLET ADDRESS ─────────────────────────────────────── */
document.querySelectorAll('.btn-ghost.tiny').forEach(btn => {
  btn.addEventListener('click', () => {
    const addr = btn.previousElementSibling?.textContent || '0x4f2a8b…8d3c';
    navigator.clipboard?.writeText(addr).catch(() => {});
    showToast('Wallet address copied ✓');
  });
});

/* ── MARKET PROPOSE BUTTON ───────────────────────────────────── */
document.addEventListener('click', (e) => {
  if (e.target.textContent === '+ Propose Market') {
    showToast('Market proposal form coming soon!');
  }
  if (e.target.textContent === '+ Submit Evidence') {
    navigateTo('verification');
  }
});

/* ── CHESS FIND MATCH ────────────────────────────────────────── */
document.addEventListener('click', (e) => {
  if (e.target.textContent === 'Find Opponent →') {
    e.target.textContent = 'Searching…';
    e.target.disabled = true;
    setTimeout(() => {
      e.target.textContent = 'Opponent found!';
      e.target.style.background = 'var(--green)';
      showToast('Opponent found: David N. (ELO 1,502) · Match starting!');
    }, 2200);
  }
});
