var swiper = new Swiper(".mySwiper", {
  loop:true, autoplay:{delay:3000},
  pagination:{el:".swiper-pagination",clickable:true},
  navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
});

function toggleMenu(){
  const nav=document.getElementById("navLinks");
  nav.style.display = nav.style.display==="flex" ? "none" : "flex";
}
function toggleMegaMenu(e){
  e.stopPropagation();
  document.getElementById("coeDropdown").classList.toggle("active");
}
document.addEventListener("click",(e)=>{
  if(!e.target.closest("#coeDropdown")){
    document.getElementById("coeDropdown")?.classList.remove("active");
  }
});

// --- BRANCH WISE DOCTOR LOAD ---
const branchIcons = {
  "Cardiology": "fa-heart-pulse", "Neurology": "fa-brain",
  "Gastroenterology": "fa-staff-snake", "Orthopedics": "fa-bone",
  "Pulmonology": "fa-lungs", "Nephrology": "fa-kidneys",
  "Gynecology": "fa-baby", "Oncology": "fa-ribbon"
};
const branches = Object.keys(branchIcons);

function renderMegaMenu(){
  const menu = document.getElementById("megaMenu");
  if(!menu) return;
  const doctors = JSON.parse(localStorage.getItem("kishori_doctors") || "[]");
  menu.innerHTML = "";
  branches.forEach(branch => {
    const docs = doctors.filter(d => d.branch === branch);
    let html = `<div class="branch-box"><h4><i class="fa-solid ${branchIcons[branch]}"></i> ${branch}</h4>`;
    if(docs.length === 0){
      html += `<p style="font-size:12px;color:#999;padding:5px 0;">No doctor yet</p>`;
    } else {
      docs.forEach(doc => {
        html += `<a href="tel:${doc.phone}" class="doc-link">${doc.name} <span style="font-size:11px;color:#666;">${doc.qual}</span> <i class="fa-solid fa-phone"></i></a>`;
      });
    }
    html += `</div>`;
    menu.innerHTML += html;
  });
}
document.addEventListener("DOMContentLoaded", renderMegaMenu);