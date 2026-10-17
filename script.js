document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById(\'menuToggle\');
  const nav = document.getElementById(\'navMenu\');
  if(toggle){ toggle.onclick = () => nav.classList.toggle(\'show\'); }

  // Sahi wala Reveal Animation
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add(\'active\');
    });
  },{threshold:0.15});
  
  document.querySelectorAll(\'.reveal\').forEach(el=> observer.observe(el));

  // Fallback - agar observer fail ho to 500ms me sab dikha do
  setTimeout(()=>{
    document.querySelectorAll(\'.reveal\').forEach(el=> el.classList.add(\'active\'));
  },500);
});