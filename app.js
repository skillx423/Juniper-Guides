async function loadLayout() {
  const layout = await fetch("layout.html").then(r => r.text());
  document.getElementById("app").innerHTML = layout;
  navigate("skills");
}

// Load sound
const clickSound = new Audio("https://runescape.wiki/images/Click.ogg");

// XP drop generator
function spawnXPDrop(element) {
  const xp = document.createElement("div");
  xp.className = "xp-drop";
  xp.innerText = "+10 xp";

  const rect = element.getBoundingClientRect();
  xp.style.left = rect.left + rect.width / 2 + "px";
  xp.style.top = rect.top + "px";

  document.body.appendChild(xp);

  setTimeout(() => xp.remove(), 1200);
}

async function navigate(page) {
  const content = document.getElementById("content-area");

  if (page === "skills") {
    content.innerHTML = await fetch("skills.html").then(r => r.text());
    return;
  }

  const file = `guides/${page}.html`;
  const html = await fetch(file).then(r => r.text());
  content.innerHTML = html;
  content.scrollTop = 0;
}

// Click FX for skills
document.addEventListener("click", e => {
  const skill = e.target.closest(".skill");
  if (skill) {
    clickSound.currentTime = 0;
    clickSound.play();
    spawnXPDrop(skill);
  }
});
