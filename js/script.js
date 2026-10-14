const RECEPTION_1 = "+919876543210"; // <-- Reception 1 number change here
const RECEPTION_2 = "+919876543211"; // <-- Reception 2 number change here

const hamburger = document.getElementById(\'hamburger\');
const navLinks = document.getElementById(\'navLinks\');
if(hamburger){
  hamburger.addEventListener(\'click\', ()=> navLinks.classList.toggle(\'open\'));
}
function openBooking(deptName){
  document.getElementById(\'modalTitle\').innerText = "Book OPD - " + deptName;
  document.getElementById(\'rec1\').href = "tel:" + RECEPTION_1;
  document.getElementById(\'rec2\').href = "tel:" + RECEPTION_2;
  document.getElementById(\'bookingModal\').style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeBooking(){
  document.getElementById(\'bookingModal\').style.display = "none";
  document.body.style.overflow = "auto";
}
window.addEventListener(\'click\', (e)=>{
  if(e.target.id === \'bookingModal\') closeBooking();
});
// Scroll Reveal Animation
const reveals = document.querySelectorAll(\'.reveal\');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add(\'active\');
  });
},{threshold:0.15});
reveals.forEach(r=> observer.observe(r));