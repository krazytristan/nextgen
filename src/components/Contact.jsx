'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

/* CONFIG */
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  /* GLOW */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(500px at ${x}px ${y}px, rgba(255,165,0,0.1), transparent 80%)`
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* MAGNET BUTTON */
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const handleMagnet = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    btnY.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const resetMagnet = () => {
    animate(btnX, 0);
    animate(btnY, 0);
  };

  /* VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email required";
    if (form.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* CHANGE */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      onMouseMove={handleMove}
      className="relative py-28 bg-gradient-to-b from-white via-orange-50 to-white overflow-hidden"
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glow }} />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">
            Let’s Build <span className="text-horizon-orange">Something Great</span>
          </h2>
          <p className="text-gray-600">Start your project today.</p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h4 className="font-bold text-xl mb-6 text-horizon-orange">Contact Info</h4>

            <div className="space-y-4">
              <Info icon="📍" text="Lipa City, Batangas" />
              <Info icon="📧" text="infohorizonitsolutions@gmail.com" />
              <Info icon="📞" text="+63 993 220 5328" />
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg space-y-5">

            <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
            <Field label="Email Address" name="email" value={form.email} onChange={handleChange} error={errors.email} />
            <Field textarea label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} />

            <motion.button
              type="submit"
              disabled={loading}
              style={{ x: btnX, y: btnY }}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              className={`w-full py-3 rounded-full text-white font-semibold transition ${
                loading ? "bg-gray-400" :
                "bg-gradient-to-r from-horizon-orange to-horizon-green"
              }`}
            >
              {loading ? "Sending..." : "Send Message →"}
            </motion.button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-600 text-center"
              >
                ✅ Message sent successfully!
              </motion.p>
            )}

            {status === "error" && (
              <p className="text-red-600 text-center">
                ❌ Failed to send message
              </p>
            )}

          </form>

        </div>
      </div>
    </section>
  );
}

/* COMPONENTS */

function Info({ icon, text }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
        {icon}
      </div>
      <p>{text}</p>
    </div>
  );
}

function Field({ label, name, value, onChange, error, textarea }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      {textarea ? (
        <textarea
          rows={4}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full mt-1 px-3 py-2 border rounded-lg ${
            error ? "border-red-500" : ""
          }`}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full mt-1 px-3 py-2 border rounded-lg ${
            error ? "border-red-500" : ""
          }`}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}