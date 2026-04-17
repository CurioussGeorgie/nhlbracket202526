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

let picks = Array(15).fill(null);
let games = Array(15).fill("");
let seeds = [];
let isSubmitting = false;

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!checkCampaignStatus()) return;
    
    initBracket();
    attachBracketListeners();
    
    const isReturning = checkReturningUser();
    
    if (!isReturning) {
      const submitBtn = document.getElementById('submit-btn');
      if (submitBtn) submitBtn.addEventListener('click', submitPicks);
      
      const form = document.getElementById('entry-form');
      if (form) form.addEventListener('submit', handleFinalSubmit);
      
      updateSubmitButton();
    }
  } catch(e) {
    console.error("Init Error:", e);
    if (window.WooboxSDK && WooboxSDK.reportError) {
      WooboxSDK.reportError(e);
    }
  }
});

function checkCampaignStatus() {
  const site = window.__SITE__;
  if (!site) return true;
  
  const status = site.settings.status;
  const statusEl = document.getElementById('status-message');
  
  if (status === 'ended') {
    document.getElementById('bracket-section').classList.add('hidden');
    statusEl.innerHTML = `<div class="success-banner"><h2>Campaign Ended</h2><p>This promotion has concluded.</p></div>`;
    statusEl.classList.remove('hidden');
    return false;
  } else if (status === 'not_started') {
    document.getElementById('bracket-section').classList.add('hidden');
    statusEl.innerHTML = `<div class="success-banner"><h2>Coming Soon</h2><p>This promotion has not started yet.</p></div>`;
    statusEl.classList.remove('hidden');
    return false;
  }
  
  const end = site.settings.end_date;
  if (end && new Date(end) < new Date()) {
    document.getElementById('bracket-section').classList.add('hidden');
    statusEl.innerHTML = `<div class="success-banner"><h2>Campaign Ended</h2><p>This promotion has concluded.</p></div>`;
    statusEl.classList.remove('hidden');
    return false;
  }
  
  return true;
}

function checkReturningUser() {
  const result = window.__SITE__.result;
  if (result) {
    if (result.bracket_prediction && result.bracket_prediction.picks) {
      picks = result.bracket_prediction.picks;
      renderBracket();
      const bracketEl = document.querySelector('.bracket');
      if (bracketEl) bracketEl.classList.add('readonly');
    }
    
    showThankYou(result, true);
    return true;
  }
  return false;
}

function initBracket() {
  const site = window.__SITE__;
  if (!site || (!site.bracket_prediction && !site.bracket_vote)) {
    showError("Bracket configuration missing. Admin: Please configure a bracket.");
    return;
  }
  
  const bracketData = site.bracket_prediction || site.bracket_vote;
  seeds = bracketData.seeds || [];
  
  buildBracketDOM();
  renderBracket();
}

function buildBracketDOM() {
  const leftEl = document.querySelector('.left-half');
  const rightEl = document.querySelector('.right-half');
  const centerEl = document.querySelector('.bracket-center');

  if(leftEl) leftEl.innerHTML = buildHalf(DOM_CONFIG.left);
  if(rightEl) rightEl.innerHTML = buildHalf(DOM_CONFIG.right);
  if(centerEl) {
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
  `).join('');
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
  `).join('');
}

function attachBracketListeners() {
  const bracketEl = document.querySelector('.bracket');
  if (!bracketEl) return;
  
  bracketEl.addEventListener('click', (e) => {
    if (bracketEl.classList.contains('readonly')) return;
    
    const slot = e.target.closest('.slot');
    if (slot) {
      const matchEl = slot.closest('.matchup');
      if (matchEl) {
        const matchId = parseInt(matchEl.getAttribute('data-match'));
        const slotNum = parseInt(slot.getAttribute('data-slot'));
        handleSlotClick(matchId, slotNum);
      }
    }
  });
  
  bracketEl.addEventListener('change', (e) => {
    if (bracketEl.classList.contains('readonly')) return;
    
    if (e.target.classList.contains('games-select')) {
      const matchId = parseInt(e.target.getAttribute('data-match'));
      games[matchId] = e.target.value;
    }
  });
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
    }
  }
  
  renderBracket();
  updateSubmitButton();
}

function renderBracket() {
  for (let m = 0; m < 15; m++) {
    const [s1, s2] = getMatchParticipants(m);
    const matchEl = document.querySelector('.matchup[data-match="' + m + '"]');
    if (!matchEl) continue;
    
    const slot1 = matchEl.querySelector('.slot-1');
    const slot2 = matchEl.querySelector('.slot-2');
    
    updateSlot(slot1, s1, picks[m] === s1 && s1 !== null);
    updateSlot(slot2, s2, picks[m] === s2 && s2 !== null);
    
    const select = matchEl.querySelector('.games-select');
    if (select && games[m]) select.value = games[m];
  }
  
  const champBox = document.getElementById('champion-box');
  if (champBox) {
    const champSeed = picks[14];
    const content = champBox.querySelector('.champ-content');
    if (champSeed !== null) {
      champBox.classList.remove('hidden');
      const seed = seeds.find(s => s.index === champSeed);
      if(seed) {
        content.innerHTML = `
          <div class="champ-logo-slot ${seed.image ? 'filled' : ''}">
            ${seed.image ? '<img src="' + seed.image + '" class="team-img-large">' : '<svg class="placeholder-icon-large" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4-4 4 4"></path></svg>'}
          </div>
          <div class="team-name-large">${seed.title}</div>
        `;
      }
    } else {
      champBox.classList.add('hidden');
    }
  }
}

function updateSlot(slotEl, seedIndex, isSelected) {
  if (!slotEl) return;
  const logoSlot = slotEl.querySelector('.logo-slot');
  const imgEl = slotEl.querySelector('.team-img');
  const nameEl = slotEl.querySelector('.team-name');
  const iconEl = slotEl.querySelector('.placeholder-icon');
  
  if (isSelected) {
    slotEl.classList.add('selected');
  } else {
    slotEl.classList.remove('selected');
  }
  
  if (seedIndex !== null) {
    const seed = seeds.find(s => s.index === seedIndex);
    if (seed) {
      nameEl.textContent = seed.title;
      if (seed.image) {
        imgEl.src = seed.image;
        imgEl.classList.remove('hidden');
        if (iconEl) iconEl.classList.add('hidden');
        if (logoSlot) logoSlot.classList.add('filled');
      } else {
        imgEl.classList.add('hidden');
        if (iconEl) iconEl.classList.remove('hidden');
        if (logoSlot) logoSlot.classList.remove('filled');
      }
    }
  } else {
    nameEl.textContent = 'TBD';
    imgEl.classList.add('hidden');
    if (iconEl) iconEl.classList.remove('hidden');
    if (logoSlot) logoSlot.classList.remove('filled');
    slotEl.classList.remove('selected');
  }
}

function updateSubmitButton() {
  const isComplete = picks.every(p => p !== null);
  const btn = document.getElementById('submit-btn');
  if (btn) {
    btn.disabled = !isComplete;
    if (isComplete) {
      btn.classList.add('ready');
      btn.textContent = "Submit Picks";
    } else {
      btn.classList.remove('ready');
      btn.textContent = "Complete all picks";
    }
  }
}

async function submitPicks() {
  if (isSubmitting || picks.includes(null)) return;
  isSubmitting = true;
  
  const btn = document.getElementById('submit-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Saving...";
  }
  
  try {
    const result = await WooboxSDK.submit({
      bracket_prediction: { picks: picks },
      data: { series_lengths: games }
    });
    
    if (result.pending) {
      document.querySelector('.form-section').classList.add('hidden');
      document.getElementById('email-section').classList.remove('hidden');
      
      const bracketEl = document.querySelector('.bracket');
      if (bracketEl) bracketEl.classList.add('readonly');
      
      document.getElementById('email-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (result.success) {
      showThankYou(result, true);
    } else if (result.code === 'duplicate') {
      showError("You have already submitted a bracket.");
    } else {
      showError(result.error || "Submission failed");
    }
  } catch(e) {
    showError("An error occurred during submission.");
    if (window.WooboxSDK && WooboxSDK.reportError) WooboxSDK.reportError(e);
  } finally {
    isSubmitting = false;
    if (btn && btn.textContent === "Saving...") {
      btn.disabled = false;
      btn.textContent = "Submit Picks";
    }
  }
}

async function handleFinalSubmit(e) {
  e.preventDefault();
  if (isSubmitting) return;
  isSubmitting = true;
  
  const form = e.target;
  const btn = form.querySelector('button');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Submitting...";
  }
  
  try {
    const result = await WooboxSDK.submit({
      email: emailInput ? emailInput.value : '',
      name: nameInput ? nameInput.value : ''
    });
    
    if (result.success) {
      showThankYou(result, true);
    } else if (result.code === 'duplicate') {
      showError("You have already submitted a bracket.");
      showThankYou(null, true); 
    } else {
      showError(result.error || "Submission failed");
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Complete Entry";
      }
    }
  } catch(e) {
    showError("An error occurred.");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Complete Entry";
    }
    if (window.WooboxSDK && WooboxSDK.reportError) WooboxSDK.reportError(e);
  } finally {
    isSubmitting = false;
  }
}

function showThankYou(result, keepBracket = false) {
  if (!keepBracket) {
    const bs = document.getElementById('bracket-section');
    if (bs) bs.classList.add('hidden');
  } else {
    const fs = document.querySelector('.form-section');
    if (fs) fs.classList.add('hidden');
  }
  
  const es = document.getElementById('email-section');
  if (es) es.classList.add('hidden');
  
  const statusEl = document.getElementById('status-message');
  if (!statusEl) return;
  
  let shareHtml = '';
  const site = window.__SITE__;
  if (result && result.share_url && site && site.settings && site.settings.bonus_entries > 0) {
    const entries = site.settings.bonus_entries;
    shareHtml = `
      <div class="share-panel">
        <h3>Share & Earn Bonus Entries!</h3>
        <p>Earn ${entries} bonus entries for each friend who enters via your link.</p>
        <div class="share-actions">
          <input type="text" value="${result.share_url}" readonly id="share-input">
          <button id="copy-btn" class="btn secondary-btn">Copy</button>
        </div>
      </div>
    `;
  }
  
  statusEl.innerHTML = `
    <div class="success-banner">
      <h2>Bracket Submitted!</h2>
      <p>Thank you for your predictions. Good luck!</p>
      ${shareHtml}
    </div>
  `;
  statusEl.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const input = document.getElementById('share-input');
      if (input) {
        navigator.clipboard.writeText(input.value);
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy", 2000);
      }
    });
  }
}

function showError(msg) {
  const errEl = document.getElementById('global-error');
  if (errEl) {
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
    errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      errEl.classList.add('hidden');
    }, 5000);
  } else {
    console.error("Error:", msg);
  }
}
