import{r as _,j as s}from"./index-B4gM6aAe.js";function re(){const P=_.useRef(!1);return _.useEffect(()=>{if(P.current)return;P.current=!0;const L={left:[{round:1,matches:[0,1,2,3]},{round:2,matches:[8,9]},{round:3,matches:[12]}],right:[{round:3,matches:[13]},{round:2,matches:[10,11]},{round:1,matches:[4,5,6,7]}],center:[{round:4,matches:[14]}]};let l=Array(15).fill(null),h=Array(15).fill(""),m=[];const z=[{index:0,title:"COL",image:"./teams/col.png"},{index:1,title:"LAK",image:"./teams/lak.png"},{index:2,title:"DAL",image:"./teams/dal.png"},{index:3,title:"MIN",image:"./teams/min.png"},{index:4,title:"VGK",image:"./teams/vgk.png"},{index:5,title:"UTA",image:"./teams/uta.jpg"},{index:6,title:"EDM",image:"./teams/edm.png"},{index:7,title:"ANA",image:"./teams/ana.svg"},{index:8,title:"BUF",image:"./teams/buf.png"},{index:9,title:"BOS",image:"./teams/bos.png"},{index:10,title:"TBL",image:"./teams/tbl.png"},{index:11,title:"MTL",image:"./teams/mtl.png"},{index:12,title:"CAR",image:"./teams/car.png"},{index:13,title:"OTT",image:"./teams/ott.png"},{index:14,title:"PIT",image:"./teams/pit.png"},{index:15,title:"PHI",image:"./teams/phi.png"}];function H(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const E="nhlBracketSeeds_v2";function V(){try{const e=localStorage.getItem(E);if(!e)return null;const t=JSON.parse(e);return Array.isArray(t)?t:null}catch{return null}}function T(){localStorage.setItem(E,JSON.stringify(m))}function $(e){const t='<svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4-4 4 4"></path></svg>';return e.map(a=>`
        <div class="bc-matchup" data-match="${a}">
          <div class="bc-slot bc-slot-1" data-slot="1">
            <div class="bc-logo-slot"><span class="bc-ph-icon">${t}</span><img class="bc-team-img bc-hidden" src="" alt="" /></div>
            <span class="bc-team-name">TBD</span>
          </div>
          <div class="bc-slot bc-slot-2" data-slot="2">
            <div class="bc-logo-slot"><span class="bc-ph-icon">${t}</span><img class="bc-team-img bc-hidden" src="" alt="" /></div>
            <span class="bc-team-name">TBD</span>
          </div>
          <div class="bc-match-extras">
            <select class="bc-games-select" data-match="${a}">
              <option value="">Series length?</option>
              <option value="4">4 Games</option>
              <option value="5">5 Games</option>
              <option value="6">6 Games</option>
              <option value="7">7 Games</option>
            </select>
          </div>
        </div>
      `).join("")}function D(e){return e.map(t=>`<div class="bc-round bc-round-${t.round}">${$(t.matches)}</div>`).join("")}function X(){const e=document.querySelector(".bc-left-half"),t=document.querySelector(".bc-right-half"),a=document.querySelector(".bc-bracket-center");if(!e||!t||!a)return;e.innerHTML=D(L.left),t.innerHTML=D(L.right);const i='<svg class="bc-ph-icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4-4 4 4"></path></svg>';a.innerHTML=`
        <div class="bc-round bc-round-4">
          <div class="bc-final-title">Stanley Cup Final</div>
          ${$(L.center[0].matches)}
          <div id="bc-champion-box" class="bc-champion-box bc-hidden">
            <h4>Champion</h4>
            <div class="bc-champ-logo-slot" id="bc-champ-logo">
              <span class="bc-ph-icon-lg-wrap">${i}</span>
              <img id="bc-champ-img" class="bc-team-img-lg bc-hidden" src="" alt="" />
            </div>
            <div id="bc-champ-name" class="bc-team-name-lg"></div>
          </div>
        </div>
      `}function y(e){const t=[[0,1],[2,3],[4,5],[6,7],[8,9],[10,11],[12,13],[14,15]];return e<8?t[e]:e===8?[l[0],l[1]]:e===9?[l[2],l[3]]:e===10?[l[4],l[5]]:e===11?[l[6],l[7]]:e===12?[l[8],l[9]]:e===13?[l[10],l[11]]:e===14?[l[12],l[13]]:[null,null]}function q(e,t,a){const i=e.querySelector(".bc-logo-slot"),r=e.querySelector(".bc-team-img"),o=e.querySelector(".bc-team-name"),c=e.querySelector(".bc-ph-icon");if(e.classList.toggle("bc-selected",a),t!==null){const p=m.find(g=>g.index===t);p&&o&&(o.textContent=p.title,p.image&&r?(r.src=p.image,r.alt=p.title,r.classList.remove("bc-hidden"),c?.classList.add("bc-hidden"),i?.classList.add("bc-filled")):r&&(r.classList.add("bc-hidden"),c?.classList.remove("bc-hidden"),i?.classList.remove("bc-filled")))}else o&&(o.textContent="TBD"),r?.classList.add("bc-hidden"),c?.classList.remove("bc-hidden"),i?.classList.remove("bc-filled"),e.classList.remove("bc-selected")}function f(){for(let a=0;a<15;a++){const[i,r]=y(a),o=document.querySelector(`.bc-matchup[data-match="${a}"]`);if(!o)continue;q(o.querySelector(".bc-slot-1"),i,l[a]===i&&i!==null),q(o.querySelector(".bc-slot-2"),r,l[a]===r&&r!==null);const c=o.querySelector(".bc-games-select");c&&h[a]&&(c.value=h[a])}const e=document.getElementById("bc-champion-box"),t=l[14];if(e)if(t!==null){e.classList.remove("bc-hidden");const a=m.find(p=>p.index===t),i=document.getElementById("bc-champ-name"),r=document.getElementById("bc-champ-img"),o=document.getElementById("bc-champ-logo"),c=o?.querySelector(".bc-ph-icon-lg-wrap");a&&i&&(i.textContent=a.title,a.image&&r&&(r.src=a.image,r.alt=a.title,r.classList.remove("bc-hidden"),c?.classList.add("bc-hidden"),o?.classList.add("bc-filled")))}else e.classList.add("bc-hidden")}function G(){const e=l.every(a=>a!==null),t=document.getElementById("bc-submit-btn");t&&(t.disabled=!e,t.classList.toggle("bc-ready",e),t.textContent=e?"Submit Picks":"Complete all picks")}function Q(e,t){const[a,i]=y(e),r=t===1?a:i;if(r!==null){l[e]=r;for(let o=0;o<15;o++){const[c,p]=y(o);l[o]!==null&&l[o]!==c&&l[o]!==p&&(l[o]=null)}f(),G()}}function w(){const e=document.getElementById("bc-settings-list");e&&(e.innerHTML=m.map(t=>`
        <div class="bc-settings-row">
          <div class="bc-settings-preview">
            ${t.image?`<img src="${t.image}" alt="${H(t.title)}" style="width:100%;height:100%;object-fit:contain;">`:'<span style="font-size:12px;color:#cbd5e1;">No logo</span>'}
          </div>
          <div style="flex:1;">
            <label style="display:block;margin-bottom:8px;font-weight:700;color:#cbd5e1;">Team ${t.index+1}</label>
            <input data-seed-name="${t.index}" type="text" value="${H(t.title)}" class="bc-settings-input" />
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:10px;">
              <input data-seed-file="${t.index}" type="file" accept="image/*" style="color:#cbd5e1;max-width:100%;">
              <button type="button" class="bc-btn bc-secondary-btn" data-remove-logo="${t.index}" style="width:auto;padding:10px 16px;">Remove Logo</button>
            </div>
          </div>
        </div>
      `).join(""),e.querySelectorAll("[data-seed-name]").forEach(t=>{t.addEventListener("input",a=>{const i=a.target,r=Number(i.getAttribute("data-seed-name")),o=m.find(c=>c.index===r);o&&(o.title=i.value||`Team ${r+1}`,T(),f())})}),e.querySelectorAll("[data-seed-file]").forEach(t=>{t.addEventListener("change",a=>{const i=a.target,r=i.files?.[0],o=Number(i.getAttribute("data-seed-file")),c=m.find(g=>g.index===o);if(!c||!r)return;const p=new FileReader;p.onload=()=>{c.image=p.result,T(),w(),f()},p.readAsDataURL(r)})}),e.querySelectorAll("[data-remove-logo]").forEach(t=>{t.addEventListener("click",a=>{const i=a.target,r=Number(i.getAttribute("data-remove-logo")),o=m.find(c=>c.index===r);o&&(o.image="",T(),w(),f())})}))}const R=V();m=R?.length?R:JSON.parse(JSON.stringify(z)),X(),f(),w(),G();const B=document.querySelector(".bc-bracket");B&&(B.addEventListener("click",e=>{const t=e.target.closest(".bc-slot");if(!t)return;const a=t.closest(".bc-matchup");if(!a)return;const i=parseInt(a.getAttribute("data-match")||"0"),r=parseInt(t.getAttribute("data-slot")||"0");Q(i,r)}),B.addEventListener("change",e=>{const t=e.target;if(t.classList.contains("bc-games-select")){const a=parseInt(t.getAttribute("data-match")||"0");h[a]=t.value}})),document.getElementById("bc-toggle-settings-btn")?.addEventListener("click",()=>{const e=document.getElementById("bc-settings-list"),t=document.getElementById("bc-toggle-settings-btn");if(!e||!t)return;const a=e.classList.toggle("bc-hidden");t.textContent=a?"Show Settings":"Hide Settings"}),document.getElementById("bc-reset-settings-btn")?.addEventListener("click",()=>{m=JSON.parse(JSON.stringify(z)),localStorage.removeItem(E),w(),f()}),document.getElementById("bc-submit-btn")?.addEventListener("click",()=>{if(l.includes(null))return;document.getElementById("bc-form-section")?.classList.add("bc-hidden");const e=document.getElementById("bc-email-section");e?.classList.remove("bc-hidden"),e?.scrollIntoView({behavior:"smooth",block:"center"})});async function Z(e){return new Promise(t=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>t(a),a.onerror=()=>t(null),a.src=e})}async function ee(e){const t=new Map(m.map(b=>[b.index,b])),a=new Map;await Promise.all(m.map(async b=>{b.image?a.set(b.index,await Z(b.image)):a.set(b.index,null)}));const i=900,r=40,o=180,c=70,p=30,g=44,v=220,te=60,F=[{label:"Round 1",matches:[0,1,2,3,4,5,6,7]},{label:"Round 2",matches:[8,9,10,11]},{label:"Conference Finals",matches:[12,13]},{label:"Stanley Cup Final",matches:[14]}];let x=o;for(const b of F)x+=g+b.matches.length*c+p;x+=v+te;const k=document.createElement("canvas");k.width=i,k.height=x;const n=k.getContext("2d"),S=n.createLinearGradient(0,0,0,x);S.addColorStop(0,"#0f172a"),S.addColorStop(.5,"#1e293b"),S.addColorStop(1,"#0f172a"),n.fillStyle=S,n.fillRect(0,0,i,x),n.fillStyle="#f59e0b",n.font="900 44px Montserrat, system-ui, sans-serif",n.textAlign="center",n.fillText("NHL 2025-26 PLAYOFFS",i/2,70),n.fillStyle="#60a5fa",n.font="700 26px Montserrat, system-ui, sans-serif",n.fillText("My Bracket Predictions",i/2,110),n.fillStyle="#cbd5e1",n.font='600 20px "Open Sans", system-ui, sans-serif';const ne=new Date().toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});n.fillText(`${e||"My Picks"}  •  ${ne}`,i/2,148);let d=o;const ae=b=>{const[u,U]=y(b),j=l[b],J=h[b];n.fillStyle="rgba(255,255,255,0.05)",C(n,r,d+6,i-r*2,c-12,10),n.fill(),n.strokeStyle="rgba(255,255,255,0.12)",n.lineWidth=1,C(n,r,d+6,i-r*2,c-12,10),n.stroke();const W=(N,O,Y)=>{if(N===null){n.fillStyle="#64748b",n.font='600 18px "Open Sans", system-ui, sans-serif',n.textAlign="left",n.fillText("TBD",O+50,d+c/2+6);return}const ie=t.get(N),K=a.get(N)||null;K&&n.drawImage(K,O+8,d+15,40,40),n.fillStyle=Y?"#10b981":"#e2e8f0",n.font=Y?"800 22px Montserrat, system-ui, sans-serif":'600 20px "Open Sans", system-ui, sans-serif',n.textAlign="left",n.fillText(ie?.title||"",O+58,d+c/2+7)};W(u,r+10,j!==null&&j===u),n.fillStyle="#94a3b8",n.font="700 14px Montserrat, system-ui, sans-serif",n.textAlign="center",n.fillText("vs",i/2,d+c/2+5),W(U,i/2+30,j!==null&&j===U),J&&(n.fillStyle="#f59e0b",n.font="800 16px Montserrat, system-ui, sans-serif",n.textAlign="right",n.fillText(`in ${J}`,i-r-14,d+c/2+6)),d+=c};for(const b of F){n.fillStyle="#f59e0b",n.font="800 22px Montserrat, system-ui, sans-serif",n.textAlign="left",n.fillText(b.label.toUpperCase(),r,d+30),n.strokeStyle="rgba(245,158,11,0.4)",n.lineWidth=2,n.beginPath(),n.moveTo(r,d+40),n.lineTo(i-r,d+40),n.stroke(),d+=g;for(const u of b.matches)ae(u);d+=p}const I=l[14],A=n.createLinearGradient(0,d,0,d+v);if(A.addColorStop(0,"#f59e0b"),A.addColorStop(1,"#d97706"),n.fillStyle=A,C(n,r,d,i-r*2,v-20,16),n.fill(),n.fillStyle="rgba(255,255,255,0.9)",n.font="800 16px Montserrat, system-ui, sans-serif",n.textAlign="center",n.fillText("MY CHAMPION",i/2,d+34),I!==null){const b=t.get(I),u=a.get(I)||null;u&&n.drawImage(u,i/2-45,d+50,90,90),n.fillStyle="#ffffff",n.font="900 36px Montserrat, system-ui, sans-serif",n.fillText(b?.title||"",i/2,d+178)}else n.fillStyle="#ffffff",n.font="900 36px Montserrat, system-ui, sans-serif",n.fillText("TBD",i/2,d+120);return d+=v,n.fillStyle="#64748b",n.font='600 14px "Open Sans", system-ui, sans-serif',n.textAlign="center",n.fillText("Generated on this site",i/2,d+32),await new Promise(b=>{k.toBlob(u=>b(u),"image/jpeg",.92)})}function C(e,t,a,i,r,o){e.beginPath(),e.moveTo(t+o,a),e.arcTo(t+i,a,t+i,a+r,o),e.arcTo(t+i,a+r,t,a+r,o),e.arcTo(t,a+r,t,a,o),e.arcTo(t,a,t+i,a,o),e.closePath()}let M="";document.getElementById("bc-entry-form")?.addEventListener("submit",e=>{e.preventDefault(),M=document.getElementById("bc-name")?.value.trim()||"",document.getElementById("bc-form-section")?.classList.add("bc-hidden"),document.getElementById("bc-email-section")?.classList.add("bc-hidden");const a=document.getElementById("bc-status-message");a&&(a.innerHTML=`
          <div class="bc-success-banner">
            <h2>Bracket Submitted!</h2>
            <p>Thank you for your predictions. Good luck!</p>
            <p style="color:#cbd5e1;margin-top:10px;">Save your picks as a shareable image:</p>
            <button type="button" id="bc-download-btn" class="bc-btn bc-primary-btn bc-ready" style="max-width:360px;margin:18px auto 0;">Download Predictions JPG</button>
            <div id="bc-download-status" style="margin-top:14px;color:#cbd5e1;font-size:0.9rem;"></div>
          </div>
        `,a.classList.remove("bc-hidden"),document.getElementById("bc-download-btn")?.addEventListener("click",async()=>{const i=document.getElementById("bc-download-btn"),r=document.getElementById("bc-download-status");if(i){i.disabled=!0,i.textContent="Generating image...";try{const o=await ee(M);if(!o)throw new Error("Failed to generate image");const c=URL.createObjectURL(o),p=(M||"my").replace(/[^a-z0-9]+/gi,"-").toLowerCase(),g=document.createElement("a");g.href=c,g.download=`nhl-bracket-${p}.jpg`,document.body.appendChild(g),g.click(),document.body.removeChild(g),setTimeout(()=>URL.revokeObjectURL(c),5e3),r&&(r.textContent="Downloaded! Check your device.")}catch{r&&(r.textContent="Could not generate image. Please try again.")}finally{i.disabled=!1,i.textContent="Download Predictions JPG"}}})),window.scrollTo({top:0,behavior:"smooth"})})},[]),s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
        .bc-body {
          font-family: 'Open Sans', sans-serif;
          background-color: #0f172a;
          color: #f8fafc;
          min-height: 100vh;
          background-image: linear-gradient(to bottom, rgba(15,23,42,0.85), #0f172a), url('https://offertabs.s3.amazonaws.com/offer/87gcje/site/media/69e10a7fe775c7.76032584.jpg');
          background-size: cover;
          background-position: center top;
          background-attachment: fixed;
        }
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&family=Open+Sans:wght@400;600&display=swap');
        .bc-hero { text-align:center; padding:60px 20px 30px; }
        .bc-hero h1 {
          font-family:'Montserrat',sans-serif; font-size:3rem; font-weight:900; text-transform:uppercase; letter-spacing:2px;
          background:linear-gradient(135deg,#60a5fa 0%,#c084fc 100%);
          -webkit-background-clip:text; background-clip:text; color:transparent;
          margin-bottom:15px; line-height:1.1;
        }
        .bc-hero p { font-size:1.15rem; color:#cbd5e1; max-width:600px; margin:0 auto; line-height:1.6; }
        .bc-container { flex:1; max-width:1400px; margin:0 auto; padding:0 20px 60px; width:100%; box-sizing:border-box; }
        .bc-scroll-wrapper { overflow-x:auto; padding-bottom:20px; scrollbar-width:thin; scrollbar-color:#3b82f6 rgba(0,0,0,0.2); }
        .bc-scroll-wrapper::-webkit-scrollbar { height:10px; }
        .bc-scroll-wrapper::-webkit-scrollbar-track { background:rgba(0,0,0,0.2); border-radius:5px; }
        .bc-scroll-wrapper::-webkit-scrollbar-thumb { background-color:rgba(59,130,246,0.6); border-radius:5px; }
        .bc-bracket {
          display:flex; justify-content:space-between; align-items:stretch; min-width:1150px;
          background:rgba(15,23,42,0.75); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,0.15); border-radius:16px; padding:40px;
          box-shadow:0 25px 50px -12px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.05) inset;
        }
        .bc-bracket-half { display:flex; flex:1; align-items:stretch; }
        .bc-left-half,.bc-right-half { flex-direction:row; }
        .bc-bracket-center { display:flex; flex-direction:column; justify-content:center; padding:0 30px; min-width:240px; }
        .bc-round { display:flex; flex-direction:column; justify-content:space-around; padding:0 15px; flex:1; }
        .bc-matchup {
          background:rgba(15,23,42,0.9); border:1px solid rgba(255,255,255,0.15); border-radius:10px;
          width:220px; margin:12px 0; display:flex; flex-direction:column; overflow:hidden;
          box-shadow:0 4px 10px rgba(0,0,0,0.4); transition:transform 0.2s,border-color 0.2s;
        }
        .bc-matchup:hover { transform:translateY(-2px); border-color:rgba(255,255,255,0.4); }
        .bc-slot {
          display:flex; align-items:center; padding:10px 14px; cursor:pointer; transition:background 0.2s;
          height:56px; box-sizing:border-box; overflow:hidden;
        }
        .bc-slot-1 { border-bottom:1px solid rgba(255,255,255,0.15); }
        .bc-slot:hover { background:rgba(255,255,255,0.08); }
        .bc-slot.bc-selected { background:rgba(59,130,246,0.35); }
        .bc-logo-slot {
          width:36px; height:36px; border-radius:6px; background:rgba(255,255,255,0.05);
          border:1px dashed rgba(255,255,255,0.3); margin-right:12px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative;
        }
        .bc-logo-slot.bc-filled { border:none; background:rgba(255,255,255,0.03); }
        .bc-ph-icon svg { width:18px; height:18px; color:rgba(255,255,255,0.3); }
        .bc-ph-icon-lg svg,.bc-ph-icon-lg-wrap svg { width:32px; height:32px; color:rgba(255,255,255,0.5); }
        .bc-team-img { width:100%; height:100%; object-fit:contain; background:transparent; border-radius:4px; }
        .bc-team-name { font-size:0.95rem; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; }
        .bc-match-extras { background:rgba(0,0,0,0.5); padding:8px; border-top:1px solid rgba(255,255,255,0.15); display:flex; justify-content:center; }
        .bc-games-select {
          appearance:none; background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.2);
          border-radius:6px; font-size:0.8rem; padding:6px 24px 6px 12px; outline:none; cursor:pointer;
          font-family:inherit; width:100%; text-align:center;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23fff' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 8px center; transition:all 0.2s;
        }
        .bc-games-select:hover { background-color:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.3); }
        .bc-games-select option { color:#000; }
        .bc-final-title {
          text-align:center; color:#f59e0b; letter-spacing:2px; font-size:1rem; font-weight:800;
          text-transform:uppercase; margin-bottom:25px; font-family:'Montserrat',sans-serif;
        }
        .bc-champion-box {
          background:linear-gradient(135deg,#f59e0b,#d97706); border-radius:14px; padding:25px 20px;
          text-align:center; margin-top:30px; box-shadow:0 10px 25px rgba(245,158,11,0.4);
          animation:bc-popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275);
        }
        @keyframes bc-popIn { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
        .bc-champion-box h4 { margin:0 0 15px 0; text-transform:uppercase; font-size:0.85rem; letter-spacing:1.5px; color:rgba(255,255,255,0.9); font-family:'Montserrat',sans-serif; }
        .bc-champ-logo-slot {
          width:76px; height:76px; border-radius:12px; background:rgba(255,255,255,0.15);
          border:2px dashed rgba(255,255,255,0.4); margin:0 auto 12px; display:flex; align-items:center;
          justify-content:center; overflow:hidden; position:relative;
        }
        .bc-champ-logo-slot.bc-filled { border:none; background:rgba(255,255,255,0.1); box-shadow:inset 0 0 10px rgba(255,255,255,0.1); }
        .bc-team-img-lg { width:100%; height:100%; object-fit:contain; background:transparent; border-radius:8px; padding:4px; box-sizing:border-box; }
        .bc-team-name-lg { font-size:1.4rem; font-weight:900; color:white; line-height:1.2; font-family:'Montserrat',sans-serif; }
        .bc-panel {
          background:rgba(15,23,42,0.75); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,0.15); border-radius:16px; padding:40px; max-width:900px;
          margin:40px auto; text-align:center; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);
        }
        .bc-panel h3 { font-family:'Montserrat',sans-serif; margin-top:0; }
        .bc-form-group { margin-bottom:24px; text-align:left; }
        .bc-form-group label { display:block; margin-bottom:8px; font-weight:600; font-size:0.95rem; color:#cbd5e1; }
        .bc-form-group input {
          width:100%; padding:14px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.2);
          background:rgba(0,0,0,0.4); color:white; font-size:1rem; font-family:inherit; box-sizing:border-box; transition:all 0.2s;
        }
        .bc-form-group input:focus { outline:none; border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.3); background:rgba(0,0,0,0.6); }
        .bc-btn {
          padding:15px 30px; border-radius:8px; font-family:'Montserrat',sans-serif; font-size:1rem;
          font-weight:800; cursor:pointer; transition:all 0.3s; border:none; text-transform:uppercase; letter-spacing:1px;
        }
        .bc-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .bc-primary-btn { background:linear-gradient(135deg,#3b82f6,#2563eb); color:white; width:100%; box-shadow:0 8px 20px rgba(37,99,235,0.3); }
        .bc-primary-btn:not(:disabled):hover { transform:translateY(-2px); box-shadow:0 12px 25px rgba(37,99,235,0.4); }
        .bc-primary-btn.bc-ready { background:linear-gradient(135deg,#10b981,#059669); box-shadow:0 8px 20px rgba(16,185,129,0.3); }
        .bc-secondary-btn { background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2); padding:12px 24px; }
        .bc-secondary-btn:hover { background:rgba(255,255,255,0.2); }
        .bc-success-banner { background:rgba(15,23,42,0.75); border:1px solid rgba(255,255,255,0.15); border-radius:16px; padding:40px; max-width:900px; margin:40px auto; text-align:center; }
        .bc-success-banner h2 { font-family:'Montserrat',sans-serif; color:#10b981; }
        .bc-hidden { display:none !important; }
        .bc-settings-row { background:rgba(0,0,0,0.28); border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:16px; text-align:left; display:grid; grid-template-columns:70px 1fr; gap:14px; align-items:center; }
        .bc-settings-preview { width:56px; height:56px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.06); overflow:hidden; border:1px solid rgba(255,255,255,0.12); }
        .bc-settings-input { width:100%; padding:12px 14px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.4); color:white; font-size:1rem; box-sizing:border-box; margin-bottom:10px; }
        @media (max-width:1250px) {
          .bc-scroll-wrapper { overflow-x:visible; }
          .bc-bracket { flex-direction:column; min-width:100%; align-items:stretch; padding:30px 20px; gap:40px; }
          .bc-bracket-half { flex-direction:column !important; gap:30px; }
          .bc-right-half { flex-direction:column-reverse !important; }
          .bc-round { flex-direction:row; flex-wrap:wrap; justify-content:center; gap:15px; padding:0; }
          .bc-matchup { margin:0; width:calc(50% - 15px); max-width:280px; }
          .bc-bracket-center { order:3; padding:0; margin-top:10px; }
          .bc-left-half { order:1; }
          .bc-right-half { order:2; }
        }
        @media (max-width:600px) {
          .bc-hero h1 { font-size:2.2rem; }
          .bc-hero p { font-size:1rem; }
          .bc-hero { padding:40px 15px 20px; }
          .bc-bracket { padding:20px 15px; gap:30px; }
          .bc-matchup { width:100%; max-width:320px; }
          .bc-panel { padding:30px 20px; margin:20px auto; }
          .bc-settings-row { grid-template-columns:1fr; }
        }
      `}),s.jsxs("div",{className:"bc-body",children:[s.jsxs("div",{className:"bc-hero",children:[s.jsx("h1",{children:"NHL 2025-26 Playoffs"}),s.jsx("p",{children:"Predict the 2025-26 NHL Playoffs. Pick your winners and series lengths to claim glory."})]}),s.jsxs("div",{className:"bc-container",children:[s.jsx("div",{id:"bc-status-message",className:"bc-hidden"}),s.jsxs("div",{id:"bc-bracket-section",children:[s.jsx("div",{className:"bc-scroll-wrapper",children:s.jsxs("div",{className:"bc-bracket",children:[s.jsx("div",{className:"bc-bracket-half bc-left-half"}),s.jsx("div",{className:"bc-bracket-center"}),s.jsx("div",{className:"bc-bracket-half bc-right-half"})]})}),s.jsxs("div",{id:"bc-form-section",className:"bc-panel",children:[s.jsx("h3",{children:"Submit Your Bracket"}),s.jsx("p",{style:{marginBottom:"25px",color:"#cbd5e1"},children:"Complete all 15 matchup picks to submit your prediction."}),s.jsx("button",{id:"bc-submit-btn",className:"bc-btn bc-primary-btn",disabled:!0,children:"Complete all picks"})]})]}),s.jsxs("div",{id:"bc-email-section",className:"bc-panel bc-hidden",children:[s.jsx("h3",{children:"Enter Details to Finalize"}),s.jsx("p",{style:{marginBottom:"25px",color:"#cbd5e1"},children:"Almost done! Where should we notify you if you win?"}),s.jsxs("form",{id:"bc-entry-form",children:[s.jsxs("div",{className:"bc-form-group",children:[s.jsx("label",{htmlFor:"bc-name",children:"Full Name"}),s.jsx("input",{type:"text",id:"bc-name",required:!0,placeholder:"Jane Doe"})]}),s.jsxs("div",{className:"bc-form-group",children:[s.jsx("label",{htmlFor:"bc-email",children:"Email Address"}),s.jsx("input",{type:"email",id:"bc-email",required:!0,placeholder:"jane@example.com"})]}),s.jsx("button",{type:"submit",className:"bc-btn bc-primary-btn",children:"Complete Entry"})]})]}),s.jsxs("div",{className:"bc-panel",style:{marginTop:"40px"},children:[s.jsx("h3",{children:"Team Settings"}),s.jsx("p",{style:{marginBottom:"25px",color:"#cbd5e1"},children:"Edit team names and upload logo files from your computer. Changes save in this browser automatically."}),s.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},children:[s.jsx("button",{id:"bc-toggle-settings-btn",className:"bc-btn bc-secondary-btn",type:"button",children:"Hide Settings"}),s.jsx("button",{id:"bc-reset-settings-btn",className:"bc-btn bc-secondary-btn",type:"button",children:"Reset Teams"})]}),s.jsx("div",{id:"bc-settings-list",style:{display:"grid",gap:"14px"}})]})]})]})]})}function se(){return s.jsx(re,{})}export{se as component};
