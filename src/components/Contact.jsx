import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-36 overflow-hidden bg-gradient-to-b from-white via-horizon-yellow/20 to-white"
    >
      {/* Ambient background */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-horizon-orange/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-220px] left-[-180px] w-[560px] h-[560px] bg-horizon-green/20 rounded-full blur-[160px]" />

      <div className="relative container">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-horizon-orange/10 text-horizon-orange text-sm font-medium">
            Get in Touch
          </span>

          <h2 className="text-5xl fw-bold mb-5 leading-tight">
            Let’s <span className="text-horizon-orange">Build Something</span>{" "}
            Together
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you’re starting a new project or need reliable IT support,
            our team is ready to help you move forward with confidence.
          </p>
        </motion.div>

        {/* ================= CONTENT ================= */}
        <div className="row g-5 align-items-stretch">
          {/* LEFT — CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-lg-5"
          >
            <div className="h-full bg-white/70 backdrop-blur-xl rounded-3xl p-9 shadow-xl border border-white/40 flex flex-col">
              <h4 className="fw-bold text-2xl mb-8 text-horizon-orange">
                Contact Information
              </h4>

              <div className="space-y-7 text-gray-700">
                {/* Address */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-horizon-orange/10 text-horizon-orange flex items-center justify-center text-xl">
                    📍
                  </div>
                  <div>
                    <p className="fw-semibold">Office Location</p>
                    <p className="text-gray-600">
                      Lipa City, Batangas, Philippines
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-horizon-green/10 text-horizon-green flex items-center justify-center text-xl">
                    📧
                  </div>
                  <div>
                    <p className="fw-semibold">Email Address</p>
                    <p className="text-gray-600">
                      infohorizonitsolutions@gmail.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-horizon-amber/10 text-horizon-amber flex items-center justify-center text-xl">
                    📞
                  </div>
                  <div>
                    <p className="fw-semibold">Phone Number</p>
                    <p className="text-gray-600">
                      +63 993 220 5328
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust note */}
              <div className="mt-auto pt-10 text-sm text-gray-500">
                ⏱️ We typically respond within 24 hours on business days.
              </div>
            </div>
          </motion.div>

          {/* RIGHT — CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-lg-7"
          >
            <form className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/40">
              <div className="row g-5">
                {/* Name */}
                <div className="col-md-6">
                  <FloatingInput label="Full Name" type="text" />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <FloatingInput label="Email Address" type="email" />
                </div>

                {/* Message */}
                <div className="col-12">
                  <FloatingTextarea label="Message" rows={5} />
                </div>

                {/* Button */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-white text-lg fw-semibold bg-gradient-to-r from-horizon-orange to-horizon-green shadow-xl hover:shadow-[0_20px_60px_rgba(236,143,94,0.45)] transition"
                  >
                    Send Message →
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= REUSABLE INPUTS ================= */
function FloatingInput({ label, type }) {
  return (
    <div className="relative">
      <input
        type={type}
        required
        className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-horizon-orange focus:ring-0 outline-none bg-transparent"
      />
      <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-horizon-orange peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, rows }) {
  return (
    <div className="relative">
      <textarea
        rows={rows}
        required
        className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-horizon-orange focus:ring-0 outline-none bg-transparent resize-none"
      />
      <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-horizon-orange peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
        {label}
      </label>
    </div>
  );
}
