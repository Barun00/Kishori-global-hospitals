const departments = [
  {name:"Cardiology", img:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500", desc:"Comprehensive cardiovascular assessment, preventive heart care, and diagnostic cardiac screening.", services:["ECG & Echocardiography","Cardiac Consultation","Preventive Heart Checkups"]},
  {name:"Neurology", img:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500", desc:"Specialized evaluation and management of neurological conditions and brain & nerve health.", services:["Neurological Assessment","Headache & Migraine Clinic","Stroke Care Support"]},
  {name:"General Medicine", img:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500", desc:"Primary care, fever management, chronic disease care, and holistic adult health evaluation.", services:["OPD Consultations","Diabetes & Thyroid Management","Infectious Diseases"]},
  {name:"General Surgery", img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500", desc:"Advanced surgical suites with modern surgical equipment and sterile recovery facilities.", services:["Minor & Major Surgery","Laparoscopic Care","Wound Management"]},
  {name:"Orthopaedics", img:"https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500", desc:"Bone, joint, trauma care, arthritis management, and musculoskeletal rehabilitation.", services:["Fracture Management","Joint Pain Clinic","Spine Assessment"]},
  {name:"Paediatrics", img:"https://images.unsplash.com/photo-1485541953902-2afb8b9b47f6?w=500", desc:"Dedicated child healthcare, infant wellness monitoring, immunization, and paediatric care.", services:["Child OPD Consultations","Immunization & Vaccination","Growth & Nutrition Tracking"]},
  {name:"Obstetrics & Gynaecology", img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500", desc:"Comprehensive women\'s healthcare, antenatal care, maternal wellness, and gynaecological services.", services:["Antenatal Care (ANC)","Women\'s Wellness Screenings","Maternity Care"]},
  {name:"Dermatology", img:"https://images.unsplash.com/photo-1570172619644-dfd03edfa798?w=500", desc:"Clinical skin, hair, and nail health care with personalized dermatological evaluations.", services:["Skin Allergy Treatment","Acne Management","Hair & Scalp Care"]},
  {name:"ENT (Ear, Nose, Throat)", img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500", desc:"Diagnosis and treatment for disorders of the ear, nose, throat, head, and neck.", services:["ENT Consultation","Hearing Assessment","Sinus Care"]},
  {name:"Ophthalmology", img:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500", desc:"Vision care, eye examinations, refractive error correction, and ocular health screenings.", services:["Eye Checkup","Cataract Screening","Vision Correction"]},
  {name:"Radiology & Imaging", img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500", desc:"Modern diagnostic radiology supporting fast, accurate clinical decision-making.", services:["Digital X-Ray","Ultrasound","CT Scan"]},
  {name:"Pathology & Laboratory", img:"https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500", desc:"Fully automated diagnostic lab offering clinical biochemistry, haematology, and microbiology.", services:["Blood Tests","Biochemistry","Microbiology"]},
  {name:"Emergency Medicine", img:"https://images.unsplash.com/photo-1587745416684-0024d3b38a18?w=500", desc:"Rapid response trauma and acute critical assessment protocols.", services:["Acute Triage","Trauma Resuscitation","Stabilization Unit"]},
  {name:"Critical Care (ICU)", img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500", desc:"Intensive monitoring systems, high-dependency units, and round-the-clock intensive medical care.", services:["Intensive Care Unit (ICU)","High Dependency Unit (HDU)","Mechanical Ventilation"]}
];

function renderDepts(){
  const grid = document.getElementById(\'deptGrid\');
  if(!grid) return;
  const saved = JSON.parse(localStorage.getItem(\'departments\')) || departments;
  grid.innerHTML = saved.map(d => `
    <div class="dept-card">
      <div class="dept-img-wrap"><img src="${d.img}"><h3 class="dept-name">${d.name}</h3></div>
      <div class="dept-body">
        <p>${d.desc}</p>
        <div class="key-title">KEY SERVICES:</div>
        <div class="pills">${d.services.map(s=>`<span>${s}</span>`).join(\'\')} <span class="more">+1 more</span></div>
        <div class="card-foot"><a href="#">View Details <i class="fa-solid fa-chevron-right" style="font-size:10px"></i></a><a href="#">Book OPD <i class="fa-solid fa-arrow-right"></i></a></div>
      </div>
    </div>
  `).join(\'\');
}
const services = [
  ["Emergency Care","CRITICAL","Rapid emergency response team, trauma beds, and round-the-clock acute medical stabilization."],
  ["OPD Services","CLINICAL","Outpatient consultation across multiple specialities with comfortable waiting lounges."],
  ["Inpatient Care","HOSPITALIZATION","Well-appointed general wards, semi-private rooms, and deluxe single rooms with dedicated nursing."],
  ["Diagnostic Services","DIAGNOSTICS","Advanced diagnostic infrastructure for fast and accurate clinical reports."],
  ["Laboratory Services","DIAGNOSTICS","Fully automated biochemistry, haematology, pathology, and microbiology testing."],
  ["Radiology & Imaging","DIAGNOSTICS","High-definition digital X-Ray, high-resolution ultrasound, and imaging facilities."],
  ["In-House Pharmacy","SUPPORT","Stocked with genuine prescription medications, surgical supplies, and healthcare essentials."],
  ["Preventive Healthcare","WELLNESS","Comprehensive health checkup packages tailored for individuals, executives, and senior citizens."],
  ["Health Checkups","WELLNESS","Structured routine health screening tests to detect risk factors and maintain wellness."],
  ["Ambulance Services","EMERGENCY","Emergency transport with life-support equipment and trained emergency medical technicians."]
];
function renderServices(){
  const grid = document.getElementById(\'serviceGrid\');
  if(!grid) return;
  grid.innerHTML = services.map(s=>`
    <div class="service-box">
      <i class="fa-solid fa-heart-pulse"></i>
      <div class="label">${s[1]}</div>
      <h3>${s[0]}</h3>
      <p>${s[2]}</p>
      <div class="service-foot">Kishori Global <span style="color:#cde8e8; margin-left:10px">Planned Launch</span></div>
    </div>
  `).join(\'\');
}
document.addEventListener(\'DOMContentLoaded\', ()=>{ renderDepts(); renderServices(); });