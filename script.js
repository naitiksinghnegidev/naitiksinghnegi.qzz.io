// typing animation

const text = "Full Stack Developer";
let i = 0;

function typing(){

if(i < text.length){

document.querySelector(".typing").textContent += text.charAt(i);

i++;

setTimeout(typing,80);

}

}

typing();


// visitor counter

let count = localStorage.getItem("visits");

if(!count){
count = 1;
}else{
count++;
}

localStorage.setItem("visits",count);

document.getElementById("visitor").innerText = count;


// fetch github projects

const username = "YOUR_GITHUB_USERNAME";

fetch(`https://api.github.com/users/${username}/repos`)
.then(res => res.json())
.then(data => {

const container = document.getElementById("project-container");

data.slice(0,6).forEach(repo => {

const card = document.createElement("div");

card.className = "project";

card.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description || "No description available"}</p>
<a href="${repo.html_url}" target="_blank">View Repo</a>
`;

container.appendChild(card);

});

});


// matrix background

const canvas = document.getElementById("matrix");

const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;

const columns = canvas.width / fontSize;

const drops = [];

for(let x = 0; x < columns; x++)
drops[x] = 1;

function draw(){

ctx.fillStyle = "rgba(0,0,0,0.05)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "#0f0";
ctx.font = fontSize + "px monospace";

for(let i = 0; i < drops.length; i++){

const text = letters[Math.floor(Math.random()*letters.length)];

ctx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
drops[i] = 0;

drops[i]++;

}

}

setInterval(draw,33);