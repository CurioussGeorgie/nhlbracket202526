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
  center: [{ round: 4, matches: [14] }]
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
document.addEventListener("DOMContentLoaded", () => {});


document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-jpg-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadBracketJpg);
  }
});


async function downloadBracketJpg() {
  const target = document.querySelector(".container");
  if (!target || typeof html2canvas === "undefined") {
    showError("Could not create JPG.");
    return;
  }

  const downloadBtn = document.getElementById("download-jpg-btn");
  const originalText = downloadBtn ? downloadBtn.textContent : "";

  try {
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.textContent = "Creating JPG...";
    }

    const canvas = await html2canvas(target, {
      backgroundColor: "#0f172a",
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight
    });

    const link = document.createElement("a");
    link.download = "my-nhl-bracket.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  } catch (err) {
    console.error(err);
    if (typeof showError === "function") {
      showError("Could not create JPG.");
    }
  } finally {
    if (downloadBtn) {
      downloadBtn.disabled = typeof isComplete !== "undefined" ? !isComplete : false;
      downloadBtn.textContent = originalText || "Download JPG";
    }
  }
}
