<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kishori Global Hospital - Sayan, Baragada</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
@import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap\');
:root{--cyan:#00E5E5;--dark:#0F3557;--red:#FF3B5C;--light:#f6fbfc;}
*{margin:0;padding:0;box-sizing:border-box;font-family:\'Inter\',sans-serif}html{scroll-behavior:smooth}body{background:var(--light);color:var(--dark);overflow-x:hidden}a{text-decoration:none}
#preloader{position:fixed;inset:0;background:#fff;display:flex;align-items:center;justify-content:center;z-index:9999;transition:.8s}
#preloader.hide{opacity:0;visibility:hidden}.preloader-box{text-align:center}
.preloader-box img{height:110px} .preloader-box p{font-style:italic;color:#5a7184;margin-top:6px}
.loader-line{display:block;width:100px;height:3px;background:#e6f0f9;margin:14px auto 0;border-radius:10px;overflow:hidden;position:relative}
.loader-line::after{content:"";position:absolute;left:0;top:0;height:100%;width:40%;background:var(--cyan);animation:loading 1.2s infinite}
@keyframes loading{0%{left:-40%}100%{left:100%}}
.top-strip{background:#2B5A6B;color:#5ffbfb;text-align:center;font-size:13px;padding:8px}
.main-header{background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);display:flex;justify-content:space-between;align-items:center;padding:0 32px;height:74px;position:sticky;top:0;z-index:1000;border-bottom:1px solid #eef3f7}
.logo{display:flex;gap:10px;align-items:center}
.logo-img{height:54px;width:auto}
.logo-k{width:42px;height:42px;background:var(--cyan);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;border-radius:9px 9px 15px 9px}
.logo-text b{display:block;font-size:15.5px;line-height:1} .logo-text span{font-weight:300;letter-spacing:3px;font-size:12px;opacity:.7}
.nav-links{display:flex;gap:28px;align-items:center} .nav-links a{color:var(--dark);font-size:14.5px;font-weight:500}
.nav-links a:hover{color:var(--cyan)} .emergency{color:var(--red)!important;font-weight:700!important}
.btn-book{background:var(--cyan);color:#fff;border:none;padding:11px 24px;border-radius:50px;font-weight:700;cursor:pointer;box-shadow:0 8px 18px rgba(0,229,229,0.25);transition:.3s}
.btn-book:hover{transform:translateY(-2px)} .hamburger{display:none;font-size:24px;cursor:pointer}
.hero{position:relative;height:85vh;min-height:500px;overflow:hidden;background:#0a2e3a}
.hero-slide{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;transform:scale(1.1);transition:opacity 1.2s, transform 6s;display:flex;align-items:center;padding:0 6%}
.hero-slide::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg, rgba(10,46,58,0.85) 30%, rgba(10,46,58,0.2) 100%)}
.hero-slide.active{opacity:1;transform:scale(1)}
.hero-content{position:relative;z-index:2;max-width:650px;color:#fff}
.hero-content h1{font-size:48px;font-weight:800;line-height:1.1} .hero-content h1 span{color:var(--cyan);display:block} .hero-content p{margin:14px 0 22px;opacity:.9}
.hero-dots{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);display:flex;gap:10px;z-index:3}
.dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer} .dot.active{background:var(--cyan);width:28px;border-radius:10px}
.dept-section{max-width:1240px;margin:auto;padding:50px 20px 20px} .dept-header{text-align:center;margin-bottom:40px} .dept-header span{color:var(--cyan);letter-spacing:4px;font-size:12px;font-weight:800} .dept-header h2{color:#16365a;font-size:38px;font-weight:800;margin:10px 0 8px} .dept-header p{color:#a9c6db}
.dept-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px} .dept-card{background:#fff;border-radius:20px;overflow:hidden;border:1px solid #eef3f7;box-shadow:0 8px 24px rgba(15,53,87,0.06);transition:.4s} .dept-card:hover{transform:translateY(-8px);box-shadow:0 20px 45px rgba(15,53,87,0.14)}
.dept-img{position:relative;height:215px;overflow:hidden;background:#eef3f7} .dept-img img{width:100%;height:100%;object-fit:cover;transition:.6s} .dept-card:hover .dept-img img{transform:scale(1.12)} .dept-img::after{content:"";position:absolute;inset:0;background:linear-gradient(to top, rgba(16,54,87,0.85) 15%, transparent 65%)} .dept-img span{position:absolute;bottom:14px;left:16px;color:#fff;font-weight:700;z-index:1}
.dept-body{padding:16px} .dept-body p{font-size:13.5px;color:#a9c6db;min-height:42px} .dept-tags{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px} .dept-tags span{background:#f1f8ff;font-size:11.5px;padding:5px 10px;border-radius:50px;border:1px solid #e6f0f9}
.dept-actions{display:flex!important;justify-content:space-between!important;align-items:center!important;margin-top:16px!important;padding-top:14px!important;border-top:1px solid #f0f4f8!important} .book-opd{background:none;border:none;color:var(--cyan);font-weight:800;cursor:pointer}
.reveal{opacity:0;transform:translateY(25px);transition:.7s} .reveal.active{opacity:1;transform:translateY(0)}
.services-header{text-align:center;padding:50px 20px 10px} .services-header span{color:var(--cyan);letter-spacing:4px;font-size:12px;font-weight:800} .services-header h2{color:#16365a;font-size:32px;font-weight:800;margin-top:8px}
.need-banner{max-width:1240px;margin:30px auto;padding:0 20px} .need-banner-inner{background:linear-gradient(90deg,#10b5b5 0%,#12344f 100%);border-radius:20px;padding:24px 28px;display:flex;justify-content:space-between;align-items:center;color:#fff;gap:20px}
.visit-section{text-align:center;padding:30px 20px} .visit-section h2{color:#16365a;font-size:30px;font-weight:800} .map{width:100%;height:400px;border:0;display:block}
.commit-bar{background:#0f3441;color:#fff;padding:20px 32px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.main-footer{background:#0a2e3a;color:#cfe6f0;padding:45px 32px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1.3fr;gap:35px}
.main-footer h4{color:#fff;font-size:13px;border-bottom:1px solid rgba(255,255,255,.12);padding-bottom:8px;margin-bottom:14px} .main-footer a{color:#cfe6f0;display:block;margin-top:9px;font-size:14px} .help-primary{color:var(--cyan);font-weight:700}
.btn-emergency{background:var(--red);color:#fff;width:100%;padding:13px;border-radius:50px;border:none;font-weight:700;margin-top:14px;display:block;text-align:center}
.btn-maps{background:rgba(255,255,255,.08);color:#fff;width:100%;padding:13px;border-radius:50px;border:1px solid rgba(255,255,255,.15);margin-top:10px;display:block;text-align:center}
.copyright{background:#082631;color:#8fb3c9;text-align:center;padding:14px;font-size:13px}
.floating-btn{position:fixed;bottom:22px;right:22px;background:var(--cyan);color:#fff;padding:14px 24px;border-radius:50px;font-weight:800;z-index:999;border:none;cursor:pointer}
.modal{position:fixed;inset:0;background:rgba(8,38,49,0.55);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;z-index:2000;padding:15px} .modal-box{background:#fff;padding:30px;border-radius:22px;max-width:380px;width:100%;text-align:center;position:relative} .close{position:absolute;right:18px;top:12px;font-size:26px;cursor:pointer}
@media(max-width:1100px){.dept-grid{grid-template-columns:repeat(2,1fr)} .main-footer{grid-template-columns:1fr 1fr}}
@media(max-width:720px){.dept-grid{grid-template-columns:1fr} .nav-links{display:none;flex-direction:column;position:absolute;top:74px;left:0;width:100%;background:#fff;padding:24px} .nav-links.open{display:flex} .hamburger{display:block} .hero-content h1{font-size:32px} .main-footer{grid-template-columns:1fr}}
</style>
</head>
<body>
<div id="preloader"><div class="preloader-box"><img src="logo.png" onerror="this.style.display=\'none\'" alt="KGH"><div class="loader-line"></div><p>Caring for Life</p></div></div>
<div class="top-strip">OPENING SOON | Kishori Global Hospital - Sayan, Baragada, Odisha 768038</div>
<header class="main-header">
  <a href="index.html" class="logo">
    <img src="logo.png" class="logo-img" onerror="this.style.display=\'none\';document.getElementById(\'fallbackLogo\').style.display=\'flex\'">
    <div id="fallbackLogo" style="display:none;gap:10px;align-items:center"><div class="logo-k">K</div><div class="logo-text"><b>KISHORI GLOBAL</b><span>HOSPITAL</span></div></div>
  </a>
  <nav class="nav-links" id="navLinks">
    <a href="index.html">Home</a><a href="#departments">Departments</a><a href="#services">Services</a>
    <a href="tel:+917077772236" class="emergency"><i class="fa-solid fa-heart-pulse"></i> Emergency Help</a>
    <button onclick="openBooking(\'Appointment\')" class="btn-book">Book Appointment</button>
  </nav>
  <div class="hamburger" id="hamburger"><i class="fa-solid fa-bars"></i></div>
</header>

<section class="hero">
  <div class="hero-slide active" style="background-image:url(\'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600\')"><div class="hero-content" style="position:relative;z-index:2"><h1>Caring for Life <span>with Modern Healthcare</span></h1><p>Upcoming premier multi-speciality hospital at Sayan, Baragada</p><button onclick="openBooking(\'Hero\')" class="btn-book">Book Appointment</button></div></div>
  <div class="hero-slide" style="background-image:url(\'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600\')"><div class="hero-content" style="position:relative;z-index:2"><h1>Advanced Medical & <span>Surgical Departments</span></h1><p>8 Specialities | Expert Doctors | 24x7 Emergency</p><button onclick="document.getElementById(\'departments\').scrollIntoView({behavior:\'smooth\'})" class="btn-book">Explore Departments</button></div></div>
  <div class="hero-slide" style="background-image:url(\'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600\')"><div class="hero-content" style="position:relative;z-index:2"><h1>Your Health, <span>Our Priority</span></h1><p>Reception 1: 7077772231 | Emergency: 7077772236</p><a href="tel:+917077772236" class="btn-book" style="background:#FF3B5C">Emergency Call</a></div></div>
  <div class="hero-dots"><span class="dot active" onclick="goSlide(0)"></span><span class="dot" onclick="goSlide(1)"></span><span class="dot" onclick="goSlide(2)"></span></div>
</section>

<section id="departments" class="dept-section">
  <div class="dept-header reveal"><span>CLINICAL SPECIALITIES</span><h2>Our Medical & Surgical Departments</h2><p>Har card clickable hai - click karke details dekho aur Book OPD karo.</p></div>
  <div class="dept-grid">
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600"><span>Cardiology</span></div><div class="dept-body"><p>Comprehensive cardiovascular assessment.</p><div class="dept-tags"><span>ECG & Echo</span><span>Cardiac Consultation</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'Cardiology\')" class="book-opd">Book OPD →</button></div></div></div>
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600"><span>Neurology</span></div><div class="dept-body"><p>Specialized evaluation of neurological conditions.</p><div class="dept-tags"><span>Neuro Assessment</span><span>Stroke Care</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'Neurology\')" class="book-opd">Book OPD →</button></div></div></div>
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600"><span>General Medicine</span></div><div class="dept-body"><p>Primary care, fever management and adult health.</p><div class="dept-tags"><span>OPD</span><span>Diabetes Care</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'General Medicine\')" class="book-opd">Book OPD →</button></div></div></div>
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600"><span>General Surgery</span></div><div class="dept-body"><p>Advanced surgical suites with modern equipment.</p><div class="dept-tags"><span>Minor Surgery</span><span>Laparoscopic</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'General Surgery\')" class="book-opd">Book OPD →</button></div></div></div>
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600"><span>Orthopaedics</span></div><div class="dept-body"><p>Bone, joint, trauma care and rehabilitation.</p><div class="dept-tags"><span>Fracture</span><span>Joint Pain</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'Orthopaedics\')" class="book-opd">Book OPD →</button></div></div></div>
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1629909613654-28e37737d97d?w=600"><span>Paediatrics</span></div><div class="dept-body"><p>Dedicated child healthcare and immunization.</p><div class="dept-tags"><span>Child OPD</span><span>Vaccination</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'Paediatrics\')" class="book-opd">Book OPD →</button></div></div></div>
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600"><span>Obstetrics & Gynaecology</span></div><div class="dept-body"><p>Women\'s healthcare, antenatal and maternity care.</p><div class="dept-tags"><span>ANC</span><span>Maternity</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'Obstetrics & Gynaecology\')" class="book-opd">Book OPD →</button></div></div></div>
    <div class="dept-card reveal"><div class="dept-img"><img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600"><span>Dermatology</span></div><div class="dept-body"><p>Clinical skin, hair, and nail health care.</p><div class="dept-tags"><span>Skin Allergy</span><span>Acne</span></div><div class="dept-actions"><a href="#">View Details ></a><button onclick="openBooking(\'Dermatology\')" class="book-opd">Book OPD →</button></div></div></div>
  </div>
</section>

<section id="services" class="services-header reveal"><span>HOSPITAL SERVICES</span><h2>Comprehensive Healthcare Services</h2></section>
<div class="need-banner reveal"><div class="need-banner-inner"><div><b>Need Consultation?</b><p>Submit online request - we will assist you.</p></div><button onclick="openBooking(\'Consultation\')" class="btn-book" style="background:#fff;color:#0F3557">Book Appointment Slot</button></div></div>
<section class="visit-section reveal"><h2>Visit Us - Kishori Global Hospital</h2><p>At- Sayan, P.O.- Deogaon, Dist.- Baragada, Odisha - 768038</p></section>
<iframe class="map" src="https://maps.google.com/maps?q=Sayan+Odisha+768038&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy"></iframe>
<div class="commit-bar"><div><h3>Committed to Modern Healthcare in Western Odisha</h3><p>Appointment & Careers Portal Open</p></div><div><button onclick="openBooking(\'Appointment\')" class="btn-book">Request Appointment</button> <a href="#" style="background:rgba(255,255,255,.15);color:#fff;padding:11px 22px;border-radius:50px;border:1px solid rgba(255,255,255,.2);margin-left:8px">Careers Portal</a></div></div>
<footer class="main-footer">
  <div><div style="display:flex;align-items:center;gap:8px"><img src="logo.png" style="height:40px;background:#fff;padding:4px;border-radius:8px" onerror="this.style.display=\'none\'"><b>KISHORI GLOBAL HOSPITAL</b></div><p style="margin-top:10px;font-size:13px;opacity:.8">Upcoming premier multi-speciality hospital at Sayan, Baragada.<br>kishoriglobalhospitals@gmail.com<br>www.kishoriglobalhospitals.com</p></div>
  <div><h4>EXPLORE HOSPITAL</h4><a href="#">Home</a><a href="#departments">Clinical Departments</a><a href="#services">Medical Services</a></div>
  <div><h4>PATIENTS & PUBLIC</h4><a href="#" onclick="openBooking(\'Appointment\')">Request Appointment</a><a href="#">Careers</a><a href="#">FAQ</a></div>
  <div><h4>HELPDESK & EMERGENCY</h4><p>Reception 1: <span class="help-primary">+91 7077772231</span><br>Reception 2: <span class="help-primary">+91 7077772232</span><br>Emergency: <span class="help-primary">+91 7077772236</span></p><a href="tel:+917077772236" class="btn-emergency">Emergency / Helpline</a><a href="https://maps.google.com/?q=Sayan+Odisha+768038" target="_blank" class="btn-maps">Google Maps Directions</a></div>
</footer>
<div class="copyright">© 2026 Kishori Global Hospital | <a href="admin.html" style="color:#00E5E5">Admin Portal</a></div>
<button onclick="openBooking(\'Appointment\')" class="floating-btn">Request Appointment</button>

<div id="bookingModal" class="modal"><div class="modal-box"><span onclick="closeBooking()" class="close">&times;</span><h3 id="modalTitle">Book OPD</h3><p>Kisi bhi reception par call karo</p><a id="rec1" href="tel:+917077772231" class="btn-book" style="display:block;margin-top:18px;text-align:center">Call Reception 1 - 7077772231</a><a id="rec2" href="tel:+917077772232" class="btn-book" style="display:block;margin-top:10px;text-align:center;background:#0F3557">Call Reception 2 - 7077772232</a><a href="tel:+917077772236" class="btn-book" style="display:block;margin-top:10px;text-align:center;background:#FF3B5C">Emergency - 7077772236</a></div></div>

<script>
const RECEPTION_1="+917077772231",RECEPTION_2="+917077772232";
document.getElementById(\'hamburger\').onclick=()=>document.getElementById(\'navLinks\').classList.toggle(\'open\');
function openBooking(d){document.getElementById(\'modalTitle\').innerText="Book OPD - "+d;document.getElementById(\'rec1\').href="tel:"+RECEPTION_1;document.getElementById(\'rec2\').href="tel:"+RECEPTION_2;document.getElementById(\'bookingModal\').style.display="flex"}
function closeBooking(){document.getElementById(\'bookingModal\').style.display="none"}
window.addEventListener(\'click\',e=>{if(e.target.id===\'bookingModal\')closeBooking()});
window.addEventListener(\'load\',()=>setTimeout(()=>document.getElementById(\'preloader\').classList.add(\'hide\'),1300));
let cur=0;const slides=document.querySelectorAll(\'.hero-slide\'),dots=document.querySelectorAll(\'.dot\');
function goSlide(n){slides[cur].classList.remove(\'active\');dots[cur].classList.remove(\'active\');cur=n;slides[cur].classList.add(\'active\');dots[cur].classList.add(\'active\')}
setInterval(()=>{goSlide((cur+1)%slides.length)},4500);
const reveals=document.querySelectorAll(\'.reveal\');
const ob=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add(\'active\')})},{threshold:.15});
reveals.forEach(r=>ob.observe(r));
</script>
</body>
</html>