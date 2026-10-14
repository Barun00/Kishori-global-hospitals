const departments = [
  {name:"Cardiology", img:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500", desc:"Comprehensive cardiovascular assessment and preventive heart care.", services:["ECG & Echo","Cardiac Consultation"]},
  {name:"Neurology", img:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500", desc:"Specialized evaluation of neurological conditions.", services:["Neuro Assessment","Stroke Care"]},
  {name:"General Medicine", img:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500", desc:"Primary care, fever management and holistic adult health.", services:["OPD","Diabetes Care"]},
  {name:"General Surgery", img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500", desc:"Advanced surgical suites with modern equipment.", services:["Minor Surgery","Laparoscopic"]},
  {name:"Orthopaedics", img:"https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500", desc:"Bone, joint, trauma care and rehabilitation.", services:["Fracture","Joint Pain"]},
  {name:"Paediatrics", img:"https://images.unsplash.com/photo-1485541393902-2afb8b9a47f6?w=500", desc:"Dedicated child healthcare and immunization.", services:["Child OPD","Vaccination"]},
  {name:"Obstetrics & Gynaecology", img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500", desc:"Women\'s healthcare, antenatal and maternity care.", services:["ANC","Maternity"]},
  {name:"Dermatology", img:"https://images.unsplash.com/photo-1570177261964-dfd03edfa798?w=500", desc:"Clinical skin, hair, and nail health care.", services:["Skin Allergy","Acne"]}
];

const services = [
  {icon:"fa-wave-square", cat:"CRITICAL", title:"Emergency Care", desc:"Rapid response team, 24/7 stabilization.", tel:"tel:+917077772236"},
  {icon:"fa-stethoscope", cat:"CLINICAL", title:"OPD Services", desc:"Outpatient consultation across specialities.", tel:"tel:+917077772231"},
  {icon:"fa-bed", cat:"HOSPITALIZATION", title:"Inpatient Care", desc:"Deluxe rooms with dedicated nursing.", tel:"tel:+917077772231"},
  {icon:"fa-flask", cat:"DIAGNOSTICS", title:"Laboratory Services", desc:"Automated biochemistry testing.", tel:"tel:+917077772237"},
  {icon:"fa-truck-medical", cat:"EMERGENCY", title:"Ambulance Services", desc:"Life-support emergency transport.", tel:"tel:+917077772236"}
];

function renderDepts(){
  const grid = document.getElementById(\'deptGrid\');
  if(!grid) return;
  grid.innerHTML = departments.map(d => `
    <div class="dept-card">
      <div class="dept-img-wrap"><img src="${d.img}"><h3 class="dept-name">${d.name}</h3></div>
      <div class="dept-body">
        <p style="font-size:13px;color:#6aa3b5;min-height:40px">${d.desc}</p>
        <div class="pills">${d.services.map(s=>`<span>${s}</span>`).join(\'\')} <span class="more">+1 more</span></div>
        <div class="card-foot">
          <a href="#">View Details ></a>
          <a href="tel:+917077772231">Book OPD →</a>
        </div>
      </div>
    </div>
  `).join(\'\');
}

function renderServices(){
  const grid = document.getElementById(\'serviceGrid\');
  if(!grid) return;
  grid.innerHTML = services.map(s => `
    <div onclick="window.location.href=\'${s.tel}\'" style="cursor:pointer;background:#fff;padding:20px;border-radius:12px">
      <i class="fa-solid ${s.icon}" style="color:#00e5cc"></i>
      <div style="color:#00e5cc;font-size:11px;margin-top:10px">${s.cat}</div>
      <b>${s.title}</b>
      <p style="font-size:12px;color:#a0c4d0">${s.desc}</p>
    </div>
  `).join(\'\');
}

document.addEventListener(\'DOMContentLoaded\', ()=>{ renderDepts(); renderServices(); });