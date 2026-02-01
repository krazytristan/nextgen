import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-gradient-to-b from-white via-horizon-yellow/15 to-white overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-horizon-orange/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-200px] left-[-180px] w-[520px] h-[520px] bg-horizon-green/20 rounded-full blur-[160px]" />

      <div className="container relative">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex mb-4 px-5 py-2 rounded-full bg-horizon-orange/10 text-horizon-orange text-sm font-semibold">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
            Let’s <span className="text-horizon-orange">Build Something</span>{" "}
            Together
          </h2>
          <p className="text-lg text-gray-600">
            Have a project in mind or need reliable IT support? We’d love to hear
            from you.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="h-full bg-white/70 backdrop-blur-xl rounded-3xl p-9 shadow-xl border border-white/40 flex flex-col">
              <h4 className="font-bold text-2xl mb-8 text-horizon-orange">
                Contact Information
              </h4>

              <div className="space-y-7 text-gray-700">
                <InfoItem
                  icon="📍"
                  title="Office Location"
                  text="Lipa City, Batangas, Philippines"
                  color="orange"
                />
                <InfoItem
                  icon="📧"
                  title="Email Address"
                  text="infohorizonitsolutions@gmail.com"
                  color="green"
                />
                <InfoItem
                  icon="📞"
                  title="Phone Number"
                  text="+63 993 220 5328"
                  color="amber"
                />
              </div>

              <p className="mt-auto pt-10 text-sm text-gray-500">
                ⏱️ We usually reply within 24 business hours.
              </p>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/40"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingInput
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <div className="md:col-span-2">
                  <FloatingTextarea
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full text-white text-lg font-semibold
                               bg-gradient-to-r from-horizon-orange to-horizon-green
                               shadow-xl hover:opacity-90 transition disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>

                  {status === "success" && (
                    <p className="mt-4 text-green-600 text-center">
                      ✅ Message sent successfully!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="mt-4 text-red-600 text-center">
                      ❌ Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= HELPERS ================= */

function InfoItem({ icon, title, text, color }) {
  const colors = {
    orange: "bg-horizon-orange/10 text-horizon-orange",
    green: "bg-horizon-green/10 text-horizon-green",
    amber: "bg-horizon-amber/10 text-horizon-amber",
  };

  return (
    <div className="flex gap-5">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${colors[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
}

function FloatingInput({ label, type = "text", name, value, onChange }) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:border-horizon-orange focus:ring-0 outline-none bg-transparent"
      />
      <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-horizon-orange
                        peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, rows, name, value, onChange }) {
  return (
    <div className="relative">
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:border-horizon-orange focus:ring-0 outline-none
                   bg-transparent resize-none"
      />
      <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-horizon-orange
                        peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
        {label}
      </label>
    </div>
  );
}
