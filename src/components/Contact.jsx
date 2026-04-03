'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";
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

  /* 🎯 CURSOR SPOTLIGHT */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(700px at ${x}px ${y}px, rgba(255,165,0,0.12), transparent 80%)`
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* 🧲 MAGNETIC BUTTON */
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const handleMagnet = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    btnY.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const resetMagnet = () => {
    animate(btnX, 0, { type: "spring", stiffness: 200 });
    animate(btnY, 0, { type: "spring", stiffness: 200 });
  };

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
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      onMouseMove={handleMove}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-horizon-yellow/10 to-white overflow-hidden"
    >

      {/* CURSOR GLOW */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: glow }}
      />

      <div className="container relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Let’s Build Something{" "}
            <span className="text-horizon-orange">Great</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Start your project with us today.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">

          {/* LEFT CARD */}
          <div className="lg:col-span-5">
            <div className="h-full bg-white/70 backdrop-blur-xl rounded-2xl p-6 md:p-7
                            border border-white/40
                            shadow-[0_15px_40px_rgba(0,0,0,0.08)]">

              <h4 className="font-bold text-xl md:text-2xl mb-6 text-horizon-orange">
                Contact Info
              </h4>

              <div className="space-y-5 text-gray-700 text-sm md:text-base">
                <Info icon="📍" text="Lipa City, Batangas" />
                <Info icon="📧" text="infohorizonitsolutions@gmail.com" />
                <Info icon="📞" text="+63 993 220 5328" />
              </div>

              <p className="mt-8 text-xs text-gray-500">
                ⏱️ We reply within 24 hours
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-7">

            <div className="relative rounded-2xl p-[1px]">

              {/* GRADIENT BORDER */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-40 blur-xl"
                animate={{
                  background: [
                    "linear-gradient(90deg,#ff7a18,#32d2aa,#ffc107)",
                    "linear-gradient(180deg,#32d2aa,#ffc107,#ff7a18)",
                    "linear-gradient(270deg,#ffc107,#ff7a18,#32d2aa)"
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <form
                onSubmit={handleSubmit}
                className="relative bg-white/80 backdrop-blur-xl rounded-2xl
                           p-6 md:p-8
                           border border-white/40
                           shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
              >

                <div className="grid md:grid-cols-2 gap-5">

                  <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
                  <Input label="Email Address" name="email" value={form.email} onChange={handleChange} />

                  <div className="md:col-span-2">
                    <Textarea label="Message" name="message" value={form.message} onChange={handleChange} />
                  </div>

                  <div className="md:col-span-2">
                    <motion.button
                      style={{ x: btnX, y: btnY }}
                      onMouseMove={handleMagnet}
                      onMouseLeave={resetMagnet}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-full text-sm md:text-base
                                 text-white font-semibold
                                 bg-gradient-to-r from-horizon-orange to-horizon-green
                                 shadow-lg hover:shadow-horizon-orange/40 transition"
                    >
                      {loading ? "Sending..." : "Send Message →"}
                    </motion.button>

                    {status === "success" && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 text-green-600 text-center text-sm"
                      >
                        ✅ Message sent!
                      </motion.p>
                    )}

                    {status === "error" && (
                      <p className="mt-3 text-red-600 text-center text-sm">
                        ❌ Something went wrong
                      </p>
                    )}
                  </div>

                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* HELPERS */
function Info({ icon, text }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center
                      bg-horizon-orange/10 rounded-lg text-sm">
        {icon}
      </div>
      <p className="text-sm md:text-base">{text}</p>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full px-3 py-2.5 rounded-lg border border-gray-300
                   focus:border-horizon-orange focus:ring-1 focus:ring-horizon-orange/20
                   outline-none bg-transparent text-sm"
      />
      <label className="absolute left-3 top-2.5 text-gray-500 text-xs transition
                        peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-horizon-orange
                        peer-valid:-top-2 peer-valid:text-[10px] bg-white px-1">
        {label}
      </label>
    </div>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div className="relative">
      <textarea
        rows={4}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full px-3 py-2.5 rounded-lg border border-gray-300
                   focus:border-horizon-orange focus:ring-1 focus:ring-horizon-orange/20
                   outline-none bg-transparent resize-none text-sm"
      />
      <label className="absolute left-3 top-2.5 text-gray-500 text-xs transition
                        peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-horizon-orange
                        peer-valid:-top-2 peer-valid:text-[10px] bg-white px-1">
        {label}
      </label>
    </div>
  );
}