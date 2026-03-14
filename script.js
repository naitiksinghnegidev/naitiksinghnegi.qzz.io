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