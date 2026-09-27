'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo } from "react";

/* ================= AMBIENT PARTICLES DATA ================= */
const PARTICLES_COUNT = 18;

export default function InteractiveBackground() {
  const reduceMotion = useReducedMotion();

  /* CURSOR TRACKING (ACROSS ENTIRE PAGE) */
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 500
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 500
  );

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  /* SCROLL PARALLAX */
  const { scrollYProgress } = useScroll();

  // Parallax offsets for floating aurora orbs as you scroll up and down
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-80, 500]);
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 0.9]);
  const orb1Rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const orb2Y = useTransform(scrollYProgress, [0, 1], [80, -450]);
  const orb2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.85, 1.2]);
  const orb2Rotate = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const orb3Y = useTransform(scrollYProgress, [0, 1], [250, -350]);
  const orb3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.2, 1.05]);

  const orb4Y = useTransform(scrollYProgress, [0, 1], [-120, 380]);

  // Cursor spotlight gradient fill
  const cursorSpotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(750px circle at ${x}px ${y}px, rgba(236, 143, 94, 0.16), rgba(243, 182, 100, 0.06) 45%, transparent 80%)`
  );

  // Secondary cursor light ring
  const cursorRing = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(241, 235, 144, 0.08), transparent 70%)`
  );

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (reduceMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY, reduceMotion]);

  // Statically seeded particles for consistent render
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLES_COUNT }).map((_, i) => ({
      id: i,
      x: `${(i * 19) % 96 + 2}%`,
      y: `${(i * 23) % 94 + 3}%`,
      size: (i % 3) + 2,
      duration: 7 + (i % 6) * 1.8,
      delay: (i % 5) * 0.8,
      color:
        i % 4 === 0
          ? "rgba(236, 143, 94, 0.6)" // orange
          : i % 4 === 1
          ? "rgba(243, 182, 100, 0.6)" // amber
          : i % 4 === 2
          ? "rgba(241, 235, 144, 0.5)" // yellow
          : "rgba(159, 187, 115, 0.5)", // green
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black select-none"
    >
      {/* 1. DEEP OBSIDIAN BASE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      {/* 2. DYNAMIC CURSOR SPOTLIGHT (REACTS TO POINTER EVERYWHERE) */}
      {!reduceMotion && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ background: cursorSpotlight }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ background: cursorRing }}
          />
        </>
      )}

      {/* 3. PARALLAX FLOATING AURORA BLOBS (RESPONDS TO SCROLL UP & DOWN) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* ORB 1: HORIZON ORANGE (TOP-LEFT / CENTER) */}
        <motion.div
          style={!reduceMotion ? { y: orb1Y, scale: orb1Scale, rotate: orb1Rotate } : {}}
          animate={
            !reduceMotion
              ? {
                  x: [0, 40, -30, 0],
                  opacity: [0.18, 0.28, 0.18],
                }
              : {}
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-horizon-orange/30 via-horizon-amber/20 to-transparent blur-[160px] pointer-events-none"
        />

        {/* ORB 2: HORIZON AMBER (MID-RIGHT) */}
        <motion.div
          style={!reduceMotion ? { y: orb2Y, scale: orb2Scale, rotate: orb2Rotate } : {}}
          animate={
            !reduceMotion
              ? {
                  x: [0, -50, 30, 0],
                  opacity: [0.15, 0.25, 0.15],
                }
              : {}
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-horizon-amber/30 via-horizon-yellow/15 to-transparent blur-[180px] pointer-events-none"
        />

        {/* ORB 3: HORIZON GREEN / GOLD (BOTTOM-LEFT) */}
        <motion.div
          style={!reduceMotion ? { y: orb3Y, scale: orb3Scale } : {}}
          animate={
            !reduceMotion
              ? {
                  x: [0, 45, -25, 0],
                  opacity: [0.12, 0.22, 0.12],
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-20 -left-32 w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-horizon-green/25 via-horizon-amber/15 to-transparent blur-[170px] pointer-events-none"
        />

        {/* ORB 4: CORE AMBIENT HIGHLIGHT (CENTER DRIFT) */}
        <motion.div
          style={!reduceMotion ? { y: orb4Y } : {}}
          animate={
            !reduceMotion
              ? {
                  scale: [1, 1.15, 1],
                  opacity: [0.1, 0.2, 0.1],
                }
              : {}
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-horizon-orange/20 to-horizon-yellow/15 blur-[190px] pointer-events-none"
        />
      </div>

      {/* 4. CYBER MATRIX DOT-GRID PATTERN (HIGH-END TECH MESH) */}
      <div
        className="absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_70%,transparent_100%)]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.12) 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* 5. AMBIENT HORIZONTAL & VERTICAL ACCENT LIGHT BEAMS */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-horizon-amber/30 to-transparent" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-horizon-orange/15 to-transparent" />
        <div className="absolute top-2/3 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-horizon-yellow/15 to-transparent" />
      </div>

      {/* 6. FLOATING STARDUST / QUANTUM PARTICLES */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              style={{
                left: p.x,
                top: p.y,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, (p.id % 2 === 0 ? 15 : -15), 0],
                opacity: [0.2, 0.85, 0.2],
                scale: [0.8, 1.25, 0.8],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
              className="absolute rounded-full pointer-events-none"
            />
          ))}
        </div>
      )}

      {/* 7. VIGNETTE PERIMETER SHADOW (EDGES FOCUS TOWARDS CENTER) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
