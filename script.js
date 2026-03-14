const config = {
  roles: [
    "Full Stack Developer",
    "React + Node.js Builder",
    "API & Performance Enthusiast"
  ]
};

// Typing animation with rotating text
const typingTarget = document.querySelector(".typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentRole = config.roles[roleIndex];

  if (!deleting) {
    charIndex += 1;
    typingTarget.textContent = currentRole.slice(0, charIndex);

    if (charIndex === currentRole.length) {
      deleting = true;
      return setTimeout(typeLoop, 1200);
    }
  } else {
    charIndex -= 1;
    typingTarget.textContent = currentRole.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % config.roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}

typeLoop();

// Visitor counter using localStorage
const visitorElement = document.getElementById("visitor");
const storedCount = Number(localStorage.getItem("visits") || 0) + 1;
localStorage.setItem("visits", String(storedCount));
visitorElement.textContent = storedCount.toLocaleString();

// Terminal command widget
const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

const commands = {
  help: ["help", "about", "skills", "work", "contact", "clear"],
  about: [
    "Naitik Singh Negi",
    "Full Stack Developer",
    "Focused on React, Node.js, and Python"
  ],
  skills: [
    "Frontend: HTML, CSS, JavaScript, React, Next.js",
    "Backend: Node.js, Express, Python",
    "Data: MongoDB, MySQL, PostgreSQL"
  ],
  work: ["Scroll to the Work section to explore highlighted builds."],
  contact: [
    "Email: naitiksinghnegi.dev@gmail.com",
    "GitHub: github.com/naitiksinghnegi",
    "Discord: discordapp.com/users/1309473430055293040"
  ]
};

function printToTerminal(lines) {
  lines.forEach((line) => {
    const row = document.createElement("div");
    row.textContent = line;
    output.appendChild(row);
  });
  output.scrollTop = output.scrollHeight;
}

printToTerminal([
  "Portfolio Terminal Ready.",
  "Type 'help' and press Enter to list commands."
]);

input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const cmd = input.value.trim().toLowerCase();
  printToTerminal([`$ ${cmd}`]);

  if (cmd === "clear") {
    output.innerHTML = "";
  } else if (commands[cmd]) {
    printToTerminal(commands[cmd]);
  } else if (cmd.length > 0) {
    printToTerminal(["Command not found. Type 'help' for available commands."]);
  }

  input.value = "";
});

// Matrix rain background
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01";
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }, () => 1);

function resetDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => 1);
}

window.addEventListener("resize", resetDrops);

function drawMatrix() {
  ctx.fillStyle = "rgba(5, 8, 15, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#3fb950";
  ctx.font = `${fontSize}px JetBrains Mono`;

  for (let i = 0; i < drops.length; i += 1) {
    const char = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += 1;
  }
}

setInterval(drawMatrix, 33);
