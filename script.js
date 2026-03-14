const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
link.addEventListener("click", function(){
console.log("Navigating to section");
});
});