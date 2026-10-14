// 2nd ko 1st jaisa karne ke liye - Cards hata diye hai
export default function DepartmentsSection() {
  return (
    <>
      {/* CLINICAL SPECIALITIES - Sirf Heading rahegi jaise 1st screenshot me hai */}
      <section className="py-20 bg-white text-center">
        <p className="text-[#00E5E5] tracking-[0.2em] text-sm font-semibold">CLINICAL SPECIALITIES</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2a4d68] mt-2">
          Our Medical & Surgical Departments
        </h2>
      </section>

      {/* HOSPITAL SERVICES - Sirf Heading rahegi */}
      <section className="py-20 bg-white text-center">
        <p className="text-[#00E5E5] tracking-[0.2em] text-sm font-semibold">HOSPITAL SERVICES</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2a4d68] mt-2">
          Comprehensive Healthcare Services
        </h2>
      </section>

      {/* Need Consultation wala Banner - 1st screenshot jaisa */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#00E5E5] to-[#2a4d68] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h3 className="font-bold text-lg">Need Consultation?</h3>
            <p className="text-sm opacity-90">Submit online request - we will assist you.</p>
          </div>
          <a href="tel:+919876543211" className="bg-[#00E5E5] text-white font-bold px-6 py-3 rounded-full mt-3 md:mt-0 hover:bg-[#00caca]">
            Book Appointment Slot
          </a>
        </div>
      </div>
    </>
  );
}