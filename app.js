const DOM_CONFIG = {
  left: [
    { round: 1, matches: [0, 1, 2, 3] },
    { round: 2, matches: [8, 9] },
    { round: 3, matches: [12] }
  ],
  right: [
    { round: 3, matches: [13] },
    { round: 2, matches: [10, 11] },
    { round: 1, matches: [4, 5, 6, 7] }
  ],
  center: [
    { round: 4, matches: [14] }
  ]
};

const STORAGE_KEY = "nhl-bracket-standalone-v1";

let picks = Array(15).fill(null);
let games = Array(15).fill("");
let isComplete = false;

const seeds = [
  { index: 0, title: "COL", image: "teams/col.png" },
  { index: 1, title: "LAK", image: "teams/lak.png" },
  { index: 2, title: "DAL", image: "teams/dal.png" },
  { index: 3, title: "MIN", image: "teams/min.png" },
  { index: 4, title: "VGK", image: "teams/vgk.png" },
  { index: 5, title: "UTA", image: "teams/uta.jpg" },
  { index: 6, title: "EDM", image: "teams/edm.png" },
  { index: 7, title: "ANA", image: "teams/ana.svg" },
  { index: 8, title: "BUF", image: "teams/buf.png" },
  { index: 9, title: "BOS", image: "teams/bos.png" },
  { index: 10, title: "TBL", image: "teams/tbl.png" },
  { index: 11, title: "MTL", image: "teams/mtl.png" },
  { index: 12, title: "CAR", image: "teams/car.png" },
  { index: 13, title: "OTT", image: "teams/ott.png" },
  { index: 14, title: "PIT", image: "teams/pit.png" },
  { index: 15, title: "PHI", image: "teams/phi.png" }
];

document.addEventListener("DOMContentLoaded", () => {
  try {
    loadSavedState();
    buildBracketDOM();
    renderBracket();
    attachBracketListeners();
    attachUiListeners();
    updateSubmitButton();
    updateShareSummary();
  } catch (e) {
    console.error("Init Error:", e);
    showError("The page could not load correctly.");
  }
});

function buildBracketDOM() {
  const leftEl = document.querySelector(".left-half");
  const rightEl = document.querySelector(".right-half");
  const centerEl = document.querySelector(".bracket-center");

  if (leftEl) leftEl.innerHTML = buildHalf(DOM_CONFIG.left);
  if (rightEl) rightEl.innerHTML = buildHalf(DOM_CONFIG.right);
  if (centerEl) {
    centerEl.innerHTML = `
      <div class="round round-4">
        <div class="final-title">Stanley Cup Final</div>
        ${buildMatches(DOM_CONFIG.center[0].matches)}
        <div id="champion-box" class="champion-box hidden">
          <h4>Champion</h4>
          <div class="champ-content"></div>
        </div>
      </div>
    `;
  }
}

function buildHalf(rounds) {
  return rounds.map(r => `
    <div class="round round-${r.round}">
      ${buildMatches(r.matches)}
    </div>
  `).join("");
}

function buildMatches(matchIds) {
  return matchIds.map(m => `
    <div class="matchup" data-match="${m}">
      <div class="slot slot-1" data-slot="1">
        <div class="logo-slot">
          <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4-4 4 4"></path></svg>
          <img class="team-img hidden" src="" alt="">
        </div>
        <span class="team-name">TBD</span>
      </div>
      <div class="slot slot-2" data-slot="2">
        <div class="logo-slot">
          <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4-4 4 4"></path></svg>
          <img class="team-img hidden" src="" alt="">
        </div>
        <span class="team-name">TBD</span>
      </div>
      <div class="match-extras">
        <select class="games-select" data-match="${m}">
          <option value="">Series length?</option>
          <option value="4">4 Games</option>
          <option value="5">5 Games</option>
          <option value="6">6 Games</option>
          <option value="7">7 Games</option>
        </select>
      </div>
    </div>
  `).join("");
}

function attachBracketListeners() {
  const bracketEl = document.querySelector(".bracket");
  if (!bracketEl) return;

  bracketEl.addEventListener("click", (e) => {
    const slot = e.target.closest(".slot");
    if (!slot) return;

    const matchEl = slot.closest(".matchup");
    if (!matchEl) return;

    const matchId = parseInt(matchEl.getAttribute("data-match"), 10);
    const slotNum = parseInt(slot.getAttribute("data-slot"), 10);
    handleSlotClick(matchId, slotNum);
  });

  bracketEl.addEventListener("change", (e) => {
    if (!e.target.classList.contains("games-select")) return;
    const matchId = parseInt(e.target.getAttribute("data-match"), 10);
    games[matchId] = e.target.value;
    saveState();
    updateShareSummary();
  });
}

function attachUiListeners() {
  const submitBtn = document.getElementById("submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", finishBracket);
  }

  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const input = document.getElementById("share-input");
      if (!input) return;
      try {
        await navigator.clipboard.writeText(input.value);
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy", 2000);
      } catch {
        input.select();
      }
    });
  }

  const downloadBtn = document.getElementById("download-jpg-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadBracketJpg);
  }
}

function getMatchParticipants(m) {
  if (m === 0) return [0, 1];
  if (m === 1) return [2, 3];
  if (m === 2) return [4, 5];
  if (m === 3) return [6, 7];
  if (m === 4) return [8, 9];
  if (m === 5) return [10, 11];
  if (m === 6) return [12, 13];
  if (m === 7) return [14, 15];
  if (m === 8) return [picks[0], picks[1]];
  if (m === 9) return [picks[2], picks[3]];
  if (m === 10) return [picks[4], picks[5]];
  if (m === 11) return [picks[6], picks[7]];
  if (m === 12) return [picks[8], picks[9]];
  if (m === 13) return [picks[10], picks[11]];
  if (m === 14) return [picks[12], picks[13]];
  return [null, null];
}

function handleSlotClick(matchId, slotNum) {
  const [s1, s2] = getMatchParticipants(matchId);
  const selectedSeed = slotNum === 1 ? s1 : s2;
  if (selectedSeed === null) return;

  picks[matchId] = selectedSeed;

  for (let i = 0; i < 15; i++) {
    const [p1, p2] = getMatchParticipants(i);
    if (picks[i] !== null && picks[i] !== p1 && picks[i] !== p2) {
      picks[i] = null;
      games[i] = "";
    }
  }

  renderBracket();
  updateSubmitButton();
  updateShareSummary();
  saveState();
}

function renderBracket() {
  for (let m = 0; m < 15; m++) {
    const [s1, s2] = getMatchParticipants(m);
    const matchEl = document.querySelector(`.matchup[data-match="${m}"]`);
    if (!matchEl) continue;

    const slot1 = matchEl.querySelector(".slot-1");
    const slot2 = matchEl.querySelector(".slot-2");

    updateSlot(slot1, s1, picks[m] === s1 && s1 !== null);
    updateSlot(slot2, s2, picks[m] === s2 && s2 !== null);

    const select = matchEl.querySelector(".games-select");
    if (select) select.value = games[m] || "";
  }

  const champBox = document.getElementById("champion-box");
  if (!champBox) return;

  const champSeed = picks[14];
  const content = champBox.querySelector(".champ-content");

  if (champSeed !== null) {
    champBox.classList.remove("hidden");
    const seed = seeds.find(s => s.index === champSeed);
    if (seed && content) {
      content.innerHTML = `
        <div class="champ-logo-slot ${seed.image ? "filled" : ""}">
          ${seed.image ? `<img src="${seed.image}" class="team-img-large" alt="${seed.title}">` : `<svg class="placeholder-icon-large" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4-4 4 4"></path></svg>`}
        </div>
        <div class="team-name-large">${seed.title}</div>
      `;
    }
  } else {
    champBox.classList.add("hidden");
    if (content) content.innerHTML = "";
  }
}

function updateSlot(slotEl, seedIndex, isSelected) {
  if (!slotEl) return;

  const logoSlot = slotEl.querySelector(".logo-slot");
  const imgEl = slotEl.querySelector(".team-img");
  const nameEl = slotEl.querySelector(".team-name");
  const iconEl = slotEl.querySelector(".placeholder-icon");

  slotEl.classList.toggle("selected", !!isSelected);

  if (seedIndex !== null) {
    const seed = seeds.find(s => s.index === seedIndex);
    if (seed) {
      nameEl.textContent = seed.title;
      if (seed.image) {
        imgEl.src = seed.image;
        imgEl.alt = seed.title;
        imgEl.classList.remove("hidden");
        if (iconEl) iconEl.classList.add("hidden");
        if (logoSlot) logoSlot.classList.add("filled");
      } else {
        imgEl.classList.add("hidden");
        if (iconEl) iconEl.classList.remove("hidden");
        if (logoSlot) logoSlot.classList.remove("filled");
      }
      return;
    }
  }

  nameEl.textContent = "TBD";
  imgEl.classList.add("hidden");
  if (iconEl) iconEl.classList.remove("hidden");
  if (logoSlot) logoSlot.classList.remove("filled");
  slotEl.classList.remove("selected");
}

function updateSubmitButton() {
  isComplete = picks.every(p => p !== null);
  const btn = document.getElementById("submit-btn");
  if (btn) {
    btn.disabled = !isComplete;
    btn.classList.toggle("ready", isComplete);
    btn.textContent = isComplete ? "Finish Bracket" : "Complete all picks";
  }

  const downloadBtn = document.getElementById("download-jpg-btn");
  if (downloadBtn) {
    downloadBtn.disabled = !isComplete;
  }
}

function finishBracket() {
  if (!isComplete) return;
  const statusEl = document.getElementById("status-message");
  if (!statusEl) return;

  statusEl.innerHTML = `
    <div class="success-banner">
      <h2>Bracket Saved!</h2>
      <p>Your picks are saved in this browser.</p>
    </div>
  `;
  statusEl.classList.remove("hidden");
  saveState();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateShareSummary() {
  const input = document.getElementById("share-input");
  if (!input) return;

  if (!picks.every(p => p !== null)) {
    input.value = "Finish your bracket to generate a share summary.";
    return;
  }

  const summary = [];
  for (let i = 0; i < picks.length; i++) {
    const seed = seeds.find(s => s.index === picks[i]);
    summary.push(`M${i + 1}:${seed ? seed.title : "TBD"}${games[i] ? ` in ${games[i]}` : ""}`);
  }
  input.value = summary.join(" | ");
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ picks, games }));
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.picks) && saved.picks.length === 15) picks = saved.picks;
    if (Array.isArray(saved.games) && saved.games.length === 15) games = saved.games;
  } catch (e) {
    console.warn("Could not restore saved state", e);
  }
}

async function downloadBracketJpg() {
  const wrapper = document.querySelector(".bracket-scroll-wrapper");
  const target = document.getElementById("capture-area");
  if (!wrapper || !target || typeof html2canvas === "undefined") {
    showError("Could not create JPG.");
    return;
  }

  const downloadBtn = document.getElementById("download-jpg-btn");
  const originalText = downloadBtn ? downloadBtn.textContent : "";
  let sandbox = null;

  try {
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.textContent = "Creating JPG...";
    }

    const fullWidth = Math.max(target.scrollWidth, target.offsetWidth, target.getBoundingClientRect().width);
    const fullHeight = Math.max(target.scrollHeight, target.offsetHeight, target.getBoundingClientRect().height);

    sandbox = document.createElement("div");
    sandbox.style.position = "fixed";
    sandbox.style.left = "-100000px";
    sandbox.style.top = "0";
    sandbox.style.padding = "24px";
    sandbox.style.background = "#0f172a";
    sandbox.style.zIndex = "-1";

    const clone = target.cloneNode(true);
    clone.style.width = fullWidth + "px";
    clone.style.minWidth = fullWidth + "px";
    clone.style.maxWidth = "none";
    clone.style.height = "auto";
    clone.style.overflow = "visible";

    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    const canvas = await html2canvas(clone, {
      backgroundColor: "#0f172a",
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      width: fullWidth,
      height: fullHeight,
      windowWidth: fullWidth + 48,
      windowHeight: fullHeight + 48
    });

    const link = document.createElement("a");
    link.download = "my-nhl-bracket.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  } catch (err) {
    console.error(err);
    showError("Could not create JPG.");
  } finally {
    if (sandbox && sandbox.parentNode) {
      sandbox.parentNode.removeChild(sandbox);
    }
    if (downloadBtn) {
      downloadBtn.disabled = !isComplete;
      downloadBtn.textContent = originalText || "Download JPG";
    }
  }
}

function showError(msg) {
  const errEl = document.getElementById("global-error");
  if (!errEl) return;
  errEl.textContent = msg;
  errEl.classList.remove("hidden");
}
