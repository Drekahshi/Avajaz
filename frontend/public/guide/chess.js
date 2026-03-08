/* ══════════════════════════════════════════════════════
   AVAJAZ CHESS — script.js
   Full engine: Chess.js wrapper, AI (minimax + alpha-beta),
   timers, scoring, hints, PvP/PvB modes, UI rendering
   ══════════════════════════════════════════════════════ */

"use strict";

/* ─── PIECE GLYPHS ─── */
const GLYPHS = {
  K:'♔', Q:'♕', R:'♖', B:'♗', N:'♘', P:'♙',
  k:'♚', q:'♛', r:'♜', b:'♝', n:'♞', p:'♟'
};

/* ─── PIECE VALUES ─── */
const PIECE_VAL = { p:100, n:320, b:330, r:500, q:900, k:20000 };

/* ─── PIECE-SQUARE TABLES (white's perspective; black is mirrored) ─── */
const PST = {
  p:[ 0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10, 5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5, 5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0 ],
  n:[ -50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30, -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30, -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50 ],
  b:[ -20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,10,10,5,0,-10, -10,5,5,10,10,5,5,-10, -10,0,10,10,10,10,0,-10, -10,10,10,10,10,10,10,-10, -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20 ],
  r:[ 0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0 ],
  q:[ -20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10, -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10, -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20 ],
  k:[ -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10, 20,20,0,0,0,0,20,20, 20,30,10,0,0,10,30,20 ]
};

/* ════════════════════════════════════
   GAME STATE
   ════════════════════════════════════ */
let engine        = null;   // Chess.js instance
let gameActive    = false;
let gameMode      = 'pvb';  // 'pvb' or 'pvp'
let aiDepth       = 2;
let playerColor   = 'w';    // human plays white in pvb
let botThinking   = false;
let hintMove      = null;
let hintActive    = false;
let lastMove      = null;

let selected      = null;
let legalTargets  = [];

// Promotion
let pendingPromoFrom = null;
let pendingPromoTo   = null;

// Timers
let whiteSeconds  = 600;
let blackSeconds  = 600;
let timerInterval = null;
let useTimer      = true;

// Session scoring
let wins = 0, draws = 0, losses = 0, points = 0;

// Per-game stats
let moveCount     = 0;
let captureCount  = 0;
let checkCount    = 0;
let capturedByWhite = [];
let capturedByBlack = [];
let moveHistory   = [];

// Staking (AVAX)
const STAKE_MIN = 0.1;
const STAKE_MAX = 0.1001;
let currentStake = 0.1;

/* ════════════════════════════════════
   EVALUATION ENGINE
   ════════════════════════════════════ */
function pstVal(type, row, col, color) {
  const t = PST[type]; if (!t) return 0;
  return color === 'w' ? t[row * 8 + col] : t[(7 - row) * 8 + col];
}

function evaluate() {
  if (engine.in_checkmate()) return engine.turn() === 'w' ? -999999 : 999999;
  if (engine.in_draw() || engine.in_stalemate()) return 0;

  let score = 0;
  const board = engine.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]; if (!p) continue;
      const v = PIECE_VAL[p.type] + pstVal(p.type, r, c, p.color);
      score += p.color === 'w' ? v : -v;
    }
  }
  // Mobility bonus
  const mob = engine.moves().length;
  score += engine.turn() === 'w' ? mob * 2 : -mob * 2;
  return score;
}

function orderMoves(moves) {
  return moves.sort((a, b) => {
    const cv = m => m.captured ? PIECE_VAL[m.captured] : 0;
    const pv = m => m.promotion ? PIECE_VAL[m.promotion] : 0;
    return (cv(b) + pv(b)) - (cv(a) + pv(a));
  });
}

function minimax(depth, alpha, beta, isMax) {
  if (depth === 0 || engine.game_over()) return evaluate();
  const moves = orderMoves(engine.moves({ verbose: true }));

  if (isMax) {
    let best = -Infinity;
    for (const m of moves) {
      engine.move(m);
      best = Math.max(best, minimax(depth - 1, alpha, beta, false));
      engine.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) {
      engine.move(m);
      best = Math.min(best, minimax(depth - 1, alpha, beta, true));
      engine.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function getBestMove(depth) {
  const moves = orderMoves(engine.moves({ verbose: true }));
  if (!moves.length) return null;

  const isMax = engine.turn() === 'b'; // bot plays black
  let best = null, bestVal = isMax ? -Infinity : Infinity;

  for (const m of moves) {
    engine.move(m);
    const val = minimax(depth - 1, -Infinity, Infinity, !isMax);
    engine.undo();
    if (isMax ? val > bestVal : val < bestVal) { bestVal = val; best = m; }
  }
  return best;
}

function calcMaterial() {
  let w = 0, b = 0;
  const board = engine.board();
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]; if (!p) continue;
      if (p.color === 'w') w += PIECE_VAL[p.type];
      else b += PIECE_VAL[p.type];
    }
  return { w: w / 100, b: b / 100, diff: (w - b) / 100 };
}

/* ════════════════════════════════════
   BOARD RENDERING
   ════════════════════════════════════ */
function renderBoard() {
  const el = document.getElementById('board');
  el.innerHTML = '';

  const pos   = engine.board();
  const inChk = engine.in_check();
  const turn  = engine.turn();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sqName = String.fromCharCode(97 + c) + (8 - r);
      const sq   = document.createElement('div');
      const light = (r + c) % 2 === 0;
      sq.className = `sq ${light ? 'sq-light' : 'sq-dark'}`;
      sq.dataset.sq = sqName;

      // Highlights
      if (selected === sqName)                           sq.classList.add('sq-selected');
      if (legalTargets.includes(sqName))                sq.classList.add('sq-legal');
      if (lastMove && (sqName === lastMove.from || sqName === lastMove.to)) sq.classList.add('sq-last');
      if (hintActive && hintMove) {
        if (sqName === hintMove.from) sq.classList.add('sq-hint-from');
        if (sqName === hintMove.to)   sq.classList.add('sq-hint-to');
      }
      if (inChk) {
        const cell = engine.get(sqName);
        if (cell && cell.type === 'k' && cell.color === turn) sq.classList.add('sq-check-king');
      }

      const cell = pos[r][c];
      if (legalTargets.includes(sqName) && cell) sq.classList.add('sq-capture');

      // Piece
      if (cell) {
        const span = document.createElement('span');
        const key  = cell.color === 'w' ? cell.type.toUpperCase() : cell.type.toLowerCase();
        span.className = `piece piece-${cell.color}`;
        span.textContent = GLYPHS[key] || '';
        sq.appendChild(span);
      }

      // Coordinates
      if (c === 0) { const s = document.createElement('span'); s.className = 'coord coord-rank'; s.textContent = 8 - r; sq.appendChild(s); }
      if (r === 7) { const s = document.createElement('span'); s.className = 'coord coord-file'; s.textContent = String.fromCharCode(97 + c); sq.appendChild(s); }

      sq.addEventListener('click', () => handleClick(sqName));
      el.appendChild(sq);
    }
  }

  // Board check flash
  const frame = document.querySelector('.board-frame');
  if (inChk) frame.classList.add('in-check');
  else frame.classList.remove('in-check');

  updateSideInfo();
}

/* ════════════════════════════════════
   CLICK HANDLING
   ════════════════════════════════════ */
function handleClick(sqName) {
  if (!gameActive || botThinking) return;

  // In pvb, block moves when it's not player's turn
  if (gameMode === 'pvb' && engine.turn() !== playerColor) return;

  if (selected) {
    if (legalTargets.includes(sqName)) {
      attemptMove(selected, sqName);
    } else {
      const piece = engine.get(sqName);
      if (piece && piece.color === engine.turn()) selectSquare(sqName);
      else deselect();
    }
  } else {
    const piece = engine.get(sqName);
    if (piece && piece.color === engine.turn()) selectSquare(sqName);
  }
}

function selectSquare(sqName) {
  selected = sqName;
  legalTargets = engine.moves({ square: sqName, verbose: true }).map(m => m.to);
  hintActive = false;
  renderBoard();
}

function deselect() {
  selected = null;
  legalTargets = [];
  renderBoard();
}

function attemptMove(from, to) {
  const piece = engine.get(from);
  const toRank = parseInt(to[1]);
  const isPromo = piece?.type === 'p' &&
    ((piece.color === 'w' && toRank === 8) || (piece.color === 'b' && toRank === 1));

  if (isPromo) {
    pendingPromoFrom = from;
    pendingPromoTo   = to;
    document.getElementById('modal-promo').classList.remove('hidden');
  } else {
    executeMove(from, to, 'q');
  }
}

/* ════════════════════════════════════
   MOVE EXECUTION
   ════════════════════════════════════ */
function executeMove(from, to, promo = 'q') {
  const moveObj = engine.move({ from, to, promotion: promo });
  if (!moveObj) return false;

  // Capture tracking
  if (moveObj.captured) {
    const glyph = GLYPHS[moveObj.captured.toUpperCase()] || '?';
    if (moveObj.color === 'w') { capturedByWhite.push(glyph); captureCount++; }
    else                        { capturedByBlack.push(glyph); captureCount++; }
  }

  lastMove = { from, to };
  selected = null;
  legalTargets = [];
  hintActive = false;
  hintMove   = null;
  moveCount++;

  // Move history
  const num = Math.ceil(moveCount / 2);
  moveHistory.push({ san: moveObj.san, color: moveObj.color, num });
  renderMoveHistory();

  // Captured piece UI
  document.getElementById('cap-by-white').textContent = capturedByWhite.join(' ');
  document.getElementById('cap-by-black').textContent = capturedByBlack.join(' ');

  renderBoard();

  if (engine.in_check()) {
    checkCount++;
    toast('⚠️ Check!');
  }

  if (checkGameOver()) return true;

  // Update turn UI
  const nextColor = engine.turn() === 'w' ? 'White' : 'Black';
  setStatus(`${nextColor}'s move`, engine.turn() === 'w' ? '' : 'status-muted');
  setTurnPill(engine.turn() === 'w' ? 'white' : 'black');

  // Schedule bot
  if (gameMode === 'pvb' && engine.turn() !== playerColor && !engine.game_over()) {
    scheduleBotMove();
  }

  return true;
}

/* ════════════════════════════════════
   BOT
   ════════════════════════════════════ */
function scheduleBotMove() {
  botThinking = true;
  setStatus('🤖 AI thinking…', 'status-muted');
  setTurnPill('bot');
  setTimeout(doBotMove, 300 + Math.random() * 200);
}

function doBotMove() {
  if (!gameActive || engine.turn() === playerColor) { botThinking = false; return; }

  const best = getBestMove(aiDepth);
  if (!best) { botThinking = false; checkGameOver(); return; }

  const moveObj = engine.move(best);
  if (moveObj?.captured) {
    capturedByBlack.push(GLYPHS[moveObj.captured.toUpperCase()] || '?');
    captureCount++;
  }

  lastMove = { from: best.from, to: best.to };
  moveCount++;
  if (engine.in_check()) checkCount++;

  const num = Math.ceil(moveCount / 2);
  moveHistory.push({ san: moveObj.san, color: moveObj.color, num });
  renderMoveHistory();

  document.getElementById('cap-by-white').textContent = capturedByWhite.join(' ');
  document.getElementById('cap-by-black').textContent = capturedByBlack.join(' ');

  botThinking = false;
  renderBoard();

  if (checkGameOver()) return;

  setStatus('Your move ♔', '');
  setTurnPill('white');
}

/* ════════════════════════════════════
   GAME OVER
   ════════════════════════════════════ */
function checkGameOver() {
  if (!engine.game_over()) return false;

  clearTimers();
  gameActive = false;

  let icon = '♟', title = 'Game Over', sub = '', pts = 0;

  if (engine.in_checkmate()) {
    const winner = engine.turn() === 'b' ? 'White' : 'Black';
    icon = '♛'; title = 'Checkmate!';
    if (gameMode === 'pvb') {
      if (engine.turn() === 'b') {
        // White wins = human wins
        sub = '🏆 You win! Brilliant play.';
        wins++; pts = 15; points += pts;
        setStatus('♔ Checkmate! You win! +15 pts', 'status-green');
      } else {
        sub = '🤖 AI wins. Better luck next time!';
        losses++; pts = -5; points += pts;
        setStatus('♟ AI wins. −5 pts', 'status-red');
      }
    } else {
      sub = `${winner} wins by checkmate!`;
      setStatus(`${winner} wins by checkmate!`, 'status-green');
    }
  } else if (engine.in_stalemate()) {
    icon = '⚖️'; title = 'Stalemate'; sub = 'No legal moves — draw.';
    if (gameMode === 'pvb') { draws++; pts = 3; points += pts; }
    setStatus('⚖️ Stalemate — Draw +3 pts', '');
  } else if (engine.in_threefold_repetition()) {
    icon = '🔄'; title = 'Draw'; sub = 'Threefold repetition.';
    if (gameMode === 'pvb') { draws++; pts = 2; points += pts; }
    setStatus('🔄 Draw by repetition', '');
  } else if (engine.insufficient_material()) {
    icon = '🔮'; title = 'Draw'; sub = 'Insufficient material.';
    if (gameMode === 'pvb') { draws++; pts = 2; points += pts; }
    setStatus('🔮 Draw — Insufficient material', '');
  } else {
    icon = '🤝'; title = 'Draw'; sub = 'Game ended in a draw.';
    if (gameMode === 'pvb') { draws++; pts = 2; points += pts; }
    setStatus('🤝 Draw', '');
  }

  updateSessionUI();
  renderBoard();
  openGameOver(icon, title, sub);
  return true;
}

function openGameOver(icon, title, sub) {
  document.getElementById('go-icon').textContent  = icon;
  document.getElementById('go-title').textContent = title;
  document.getElementById('go-sub').textContent   = sub;
  document.getElementById('go-moves').textContent = moveHistory.length;
  document.getElementById('go-wins').textContent  = wins;
  document.getElementById('modal-over').classList.remove('hidden');
}

/* ════════════════════════════════════
   GAME LIFECYCLE
   ════════════════════════════════════ */
function startGame(mode, timeCtrl, depth) {
  // Teardown
  clearTimers();
  document.getElementById('modal-new').classList.add('hidden');

  // Config
  gameMode   = mode;
  aiDepth    = depth;
  useTimer   = timeCtrl > 0;
  whiteSeconds = timeCtrl || 9999;
  blackSeconds = timeCtrl || 9999;

  // New game
  engine     = new Chess();
  gameActive = true;
  botThinking = false;
  hintMove   = null;
  hintActive = false;
  lastMove   = null;
  selected   = null;
  legalTargets = [];
  moveCount  = 0; captureCount = 0; checkCount = 0;
  capturedByWhite = []; capturedByBlack = [];
  moveHistory = [];

  document.getElementById('cap-by-white').textContent = '';
  document.getElementById('cap-by-black').textContent = '';
  document.getElementById('move-list').innerHTML = '';
  document.getElementById('modal-over').classList.add('hidden');

  // Player labels
  if (mode === 'pvp') {
    document.getElementById('name-white').textContent = 'Player 1 (White)';
    document.getElementById('name-black').textContent = 'Player 2 (Black)';
    document.getElementById('av-black').textContent   = 'P2';
    document.getElementById('mode-badge').textContent = 'vs Player';
  } else {
    document.getElementById('name-white').textContent = 'You (White)';
    document.getElementById('name-black').textContent = 'AI Opponent';
    document.getElementById('av-black').textContent   = 'AI';
    document.getElementById('mode-badge').textContent = 'vs AI';
  }

  // AI diff buttons sync
  document.querySelectorAll('.diff-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.d) === depth);
  });

  setStatus(mode === 'pvb' ? 'Your move! You play ♔ White.' : 'White to move — Two Player', '');
  setTurnPill('white');
  updateSessionUI();
  updateTimerUI();

  if (useTimer) {
    timerInterval = setInterval(tickTimer, 1000);
  }

  renderBoard();
  toast(`Stake ${currentStake.toFixed(4)} AVAX · Game started! Good luck ♔`);
}

/* ════════════════════════════════════
   HINT
   ════════════════════════════════════ */
function showHint() {
  if (!gameActive || botThinking) return;
  if (gameMode === 'pvp') { toast('Hints are disabled in two-player mode.'); return; }
  if (engine.turn() !== playerColor) { toast('Not your turn.'); return; }

  hintMove = getBestMove(2);
  if (hintMove) {
    hintActive = true;
    points = Math.max(0, points - 1);
    updateSessionUI();
    renderBoard();
    document.getElementById('best-move-box').textContent = `Best: ${hintMove.san}`;
    toast(`💡 Hint: ${hintMove.san} (−1 pt)`);
  }
}

/* ════════════════════════════════════
   DRAW OFFER
   ════════════════════════════════════ */
function offerDraw() {
  if (!gameActive) return;
  if (gameMode === 'pvp') { toast('Draw offer not implemented in two-player mode.'); return; }

  const mat = calcMaterial();
  if (Math.abs(mat.diff) < 2) {
    clearTimers();
    gameActive = false;
    draws++; points += 3;
    updateSessionUI();
    setStatus('🤝 Draw agreed. +3 pts', '');
    openGameOver('🤝', 'Draw', 'Both sides agreed to a draw.');
  } else {
    toast('🤖 AI declines the draw offer.');
  }
}

/* ════════════════════════════════════
   RESIGN
   ════════════════════════════════════ */
function triggerResign() {
  if (!gameActive) return;
  if (gameMode === 'pvp') {
    document.getElementById('modal-resign').classList.remove('hidden');
    return;
  }
  // PvB: human resigns
  clearTimers();
  gameActive = false;
  losses++; points = Math.max(0, points - 5);
  updateSessionUI();
  setStatus('🏳 You resigned. −5 pts', 'status-red');
  openGameOver('🏳', 'Resigned', 'You gave up. Better luck next time!');
}

function handleResignColor(color) {
  document.getElementById('modal-resign').classList.add('hidden');
  if (!gameActive) return;
  clearTimers();
  gameActive = false;
  const winner = color === 'w' ? 'Black' : 'White';
  setStatus(`${color === 'w' ? 'White' : 'Black'} resigned. ${winner} wins.`, color === 'w' ? 'status-red' : 'status-green');
  openGameOver('🏳', 'Resignation', `${color === 'w' ? 'White' : 'Black'} resigned. ${winner} wins!`);
}

/* ════════════════════════════════════
   TIMERS
   ════════════════════════════════════ */
function tickTimer() {
  if (!gameActive || !useTimer) return;
  const turn = engine.turn();
  if (turn === 'w') {
    whiteSeconds = Math.max(0, whiteSeconds - 1);
    if (whiteSeconds === 0) handleTimeout('w');
  } else {
    blackSeconds = Math.max(0, blackSeconds - 1);
    if (blackSeconds === 0) handleTimeout('b');
  }
  updateTimerUI();
}

function handleTimeout(color) {
  clearTimers();
  gameActive = false;
  if (gameMode === 'pvb') {
    if (color === playerColor) {
      losses++; points = Math.max(0, points - 5);
      setStatus('⏰ Time out! You lose.', 'status-red');
      openGameOver('⏰', 'Time Out', 'You ran out of time. AI wins!');
    } else {
      wins++; points += 10;
      setStatus('⏰ AI timed out! You win! +10 pts', 'status-green');
      openGameOver('⏱', 'Time Win!', 'AI ran out of time. You win!');
    }
    updateSessionUI();
  } else {
    const loser  = color === 'w' ? 'White' : 'Black';
    const winner = color === 'w' ? 'Black' : 'White';
    setStatus(`${loser} timed out. ${winner} wins!`, color === 'w' ? 'status-red' : 'status-green');
    openGameOver('⏰', 'Time Out', `${loser} ran out of time. ${winner} wins!`);
  }
}

function clearTimers() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function fmtTime(s) {
  return `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
}

function updateTimerUI() {
  const wEl = document.getElementById('clock-white');
  const bEl = document.getElementById('clock-black');
  wEl.textContent = useTimer ? fmtTime(whiteSeconds) : '∞';
  bEl.textContent = useTimer ? fmtTime(blackSeconds) : '∞';
  if (useTimer) {
    wEl.classList.toggle('urgent', whiteSeconds <= 30);
    bEl.classList.toggle('urgent', blackSeconds <= 30);
  }
}

/* ════════════════════════════════════
   SIDE INFO UPDATES
   ════════════════════════════════════ */
function updateSideInfo() {
  // Material + advantage bar
  if (!engine) return;
  const mat = calcMaterial();
  const bar  = document.getElementById('adv-bar');
  const lbl  = document.getElementById('adv-text');
  const clamped = Math.max(-12, Math.min(12, mat.diff));
  const pct = ((clamped + 12) / 24) * 100;
  bar.style.width = pct + '%';

  if (mat.diff > 0.5) {
    bar.style.background = 'linear-gradient(90deg,#1e9a52,#40c87a)';
    lbl.textContent = `♔ +${mat.diff.toFixed(1)}`;
  } else if (mat.diff < -0.5) {
    bar.style.background = 'linear-gradient(90deg,#b01030,#e83050)';
    lbl.textContent = `♟ ${mat.diff.toFixed(1)}`;
  } else {
    bar.style.background = 'linear-gradient(90deg,#c49422,#e8b830)';
    lbl.textContent = 'Even';
  }

  // Game stats
  document.getElementById('g-moves').textContent   = moveHistory.length;
  document.getElementById('g-caps').textContent    = captureCount;
  document.getElementById('g-checks').textContent  = checkCount;

  // Win probability bar
  const prob = Math.round(50 + Math.min(40, Math.max(-40, mat.diff * 6)));
  document.getElementById('prob-val').textContent = `${prob}% — ${100 - prob}%`;
  document.getElementById('prob-bar').style.width = prob + '%';
}

function updateSessionUI() {
  document.getElementById('s-wins').textContent   = wins;
  document.getElementById('s-draws').textContent  = draws;
  document.getElementById('s-losses').textContent = losses;
}

/* ════════════════════════════════════
   MOVE HISTORY RENDER
   ════════════════════════════════════ */
function renderMoveHistory() {
  const list = document.getElementById('move-list');
  list.innerHTML = '';
  let i = 0;
  while (i < moveHistory.length) {
    const wm = moveHistory[i];
    const bm = moveHistory[i + 1];
    const num = wm.num;

    const row = document.createElement('div');
    row.className = 'move-row' + (i >= moveHistory.length - 2 ? ' latest' : '');
    row.innerHTML = `
      <span class="move-num">${num}.</span>
      <span class="move-white">${wm?.san || ''}</span>
      <span class="move-black">${bm?.san || '…'}</span>
    `;
    list.appendChild(row);
    i += 2;
  }
  list.scrollTop = list.scrollHeight;
}

/* ════════════════════════════════════
   STATUS / PILL HELPERS
   ════════════════════════════════════ */
function setStatus(msg, cls) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'status-bar ' + (cls || '');
}

function setTurnPill(who) {
  const el = document.getElementById('turn-pill');
  const map = {
    white: { text:'♔ White to move', cls:'pill-white' },
    black: { text:'♟ Black to move', cls:'pill-black' },
    bot:   { text:'🤖 AI thinking…', cls:'pill-bot' }
  };
  const d = map[who] || map.white;
  el.textContent = d.text;
  el.className = 'turn-pill ' + d.cls;
}

/* ════════════════════════════════════
   TOAST
   ════════════════════════════════════ */
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  clearTimeout(toastTimer);
  el.textContent = msg;
  el.classList.add('show');
  toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
}

/* ════════════════════════════════════
   PGN EXPORT
   ════════════════════════════════════ */
function exportPGN() {
  if (!engine) { toast('No game to export.'); return; }
  const pgn = engine.pgn({ max_width: 5, newline_char: '\n' });
  navigator.clipboard?.writeText(pgn).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = pgn; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
  });
  toast('PGN copied to clipboard! 📋');
}

/* ════════════════════════════════════
   MODAL HELPERS — New Game
   ════════════════════════════════════ */
function openNewGameModal() {
  document.getElementById('modal-new').classList.remove('hidden');
}

/* ════════════════════════════════════
   BOOTSTRAP — DOM READY
   ════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // ── Verify chess.js loaded
  if (typeof Chess === 'undefined') {
    alert('chess.js library failed to load. Please check your internet connection.');
    return;
  }

  // ── New Game modal toggles
  const modeToggle = document.getElementById('mode-toggle');
  const diffGroup  = document.getElementById('diff-group');
  const diffToggle = document.getElementById('diff-toggle');
  const timeToggle = document.getElementById('time-toggle');

  // Mode toggle (pvb / pvp)
  modeToggle.querySelectorAll('.tgl').forEach(btn => {
    btn.addEventListener('click', () => {
      modeToggle.querySelectorAll('.tgl').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      diffGroup.style.display = btn.dataset.val === 'pvp' ? 'none' : 'block';
    });
  });

  // Difficulty toggle
  diffToggle.querySelectorAll('.tgl').forEach(btn => {
    btn.addEventListener('click', () => {
      diffToggle.querySelectorAll('.tgl').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Time control toggle
  timeToggle.querySelectorAll('.tgl').forEach(btn => {
    btn.addEventListener('click', () => {
      timeToggle.querySelectorAll('.tgl').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Start button
  document.getElementById('btn-start').addEventListener('click', () => {
    const mode  = modeToggle.querySelector('.tgl.active')?.dataset.val || 'pvb';
    const depth = parseInt(diffToggle.querySelector('.tgl.active')?.dataset.val || '2');
    const time  = parseInt(timeToggle.querySelector('.tgl.active')?.dataset.val || '600');
    const stakeInput = document.getElementById('stake-input');
    let stake = parseFloat(stakeInput?.value || '0');

    if (isNaN(stake)) stake = STAKE_MIN;
    if (stake < STAKE_MIN || stake > STAKE_MAX) {
      toast(`Stake must be between ${STAKE_MIN.toFixed(2)} and ${STAKE_MAX.toFixed(4)} AVAX.`);
      if (stakeInput) stakeInput.focus();
      return;
    }
    currentStake = stake;

    startGame(mode, time, depth);
  });

  document.getElementById('btn-cancel-new').addEventListener('click', () => {
    document.getElementById('modal-new').classList.add('hidden');
  });

  // ── Header buttons
  document.getElementById('btn-new').addEventListener('click', openNewGameModal);
  document.getElementById('btn-new2').addEventListener('click', openNewGameModal);

  document.getElementById('btn-flip').addEventListener('click', () => {
    document.getElementById('board').classList.toggle('flipped');
    toast('Board flipped ⇅');
  });

  // ── Controls
  document.getElementById('btn-hint').addEventListener('click', showHint);
  document.getElementById('btn-draw').addEventListener('click', offerDraw);
  document.getElementById('btn-pgn').addEventListener('click', exportPGN);
  document.getElementById('btn-resign').addEventListener('click', triggerResign);

  // ── Game over modal buttons
  document.getElementById('btn-go-new').addEventListener('click', () => {
    document.getElementById('modal-over').classList.add('hidden');
    openNewGameModal();
  });
  document.getElementById('btn-go-close').addEventListener('click', () => {
    document.getElementById('modal-over').classList.add('hidden');
  });

  // ── Promotion modal
  document.querySelectorAll('.promo-piece').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('modal-promo').classList.add('hidden');
      if (pendingPromoFrom && pendingPromoTo) {
        executeMove(pendingPromoFrom, pendingPromoTo, btn.dataset.p);
        pendingPromoFrom = pendingPromoTo = null;
      }
    });
  });

  // ── Resign dialog (PvP)
  document.getElementById('resign-white').addEventListener('click', () => handleResignColor('w'));
  document.getElementById('resign-black').addEventListener('click', () => handleResignColor('b'));
  document.getElementById('btn-cancel-resign').addEventListener('click', () => {
    document.getElementById('modal-resign').classList.add('hidden');
  });

  // ── AI difficulty buttons (right panel)
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      aiDepth = parseInt(btn.dataset.d);
      toast(`AI difficulty set to: ${btn.textContent}`);
    });
  });

  // ── Tabs (right panel)
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('panel-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // ── Initial board render (empty) + auto-open new game modal
  engine = new Chess();
  renderBoard();
  setTimeout(openNewGameModal, 400);
});