const RECEPTION_1 = "+919876543210"; // yahan Reception 1 ka number
const RECEPTION_2 = "+919876543211"; // yahan Reception 2 ka number

function openBooking(deptName){
  document.getElementById(\'modalTitle\').innerText = deptName ? "Book OPD - " + deptName : "Book Appointment";
  document.getElementById(\'rec1\').href = "tel:" + RECEPTION_1;
  document.getElementById(\'rec1\').innerText = "Call Reception 1";
  document.getElementById(\'rec2\').href = "tel:" + RECEPTION_2;
  document.getElementById(\'bookingModal\').style.display = "flex";
}
function closeBooking(){
  document.getElementById(\'bookingModal\').style.display = "none";
}