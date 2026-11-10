import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { ReactTyped } from "react-typed";
import { FaFacebookSquare, FaLinkedin, FaTelegram } from "react-icons/fa";
import AqiPic from "../asserts/AqibPIC.jpg";

import "../sass/home.scss";

// 1) Put your video in the `public` folder as:  public/hero-bg.mp4
// 2) Or paste a direct .mp4 link here, e.g. "https://example.com/video.mp4"
const VIDEO_SRC = "/hero-bg.mp4";

const SOCIALS = [
  { id: 1, Icon: FaFacebookSquare, href: "#", label: "Facebook" },
  { id: 2, Icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { id: 3, Icon: FaTelegram, href: "#", label: "Telegram" },
];

const Home = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [cursorOn, setCursorOn] = useState(false);

  // Move the gradient glow to follow the mouse
  const handleMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Some browsers need a nudge to start autoplay
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <section
      name="Home"
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setCursorOn(true)}
      onMouseLeave={() => setCursorOn(false)}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Soft gradient overlay: keeps text readable and adds a little color */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-950/85 via-slate-950/65 to-fuchsia-950/50 backdrop-blur-md" />

      {/* Gradient glow that follows the cursor */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 ${
          cursorOn ? "opacity-50" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(100px circle at var(--mx, 50%) var(--my, 40%), rgba(99,102,241,0.35), rgba(217,70,239,0.18) 45%, transparent 90%)",
        }}
      />

      {/* Content */}
      <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-5 pb-16 pt-32 md:grid-cols-2 md:px-12 lg:px-20">
        {/* Text */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Open to work
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Hello, I&rsquo;m{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
              Aqib
            </span>
          </h1>

          <div className="mt-3 flex items-center justify-center gap-2 text-xl font-semibold sm:text-2xl md:justify-start md:text-3xl">
            <span>I&rsquo;m a</span>
            <ReactTyped
              className="text-sky-300"
              strings={["Frontend Developer", "React Developer", "UI Builder"]}
              typeSpeed={45}
              backSpeed={30}
              backDelay={1400}
              loop
            />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 md:mx-0 md:text-lg">
            I am a frontend developer and a recent graduate of the International
            Islamic University, Islamabad (IIUI), with a BS in Software
            Engineering. I completed my FSc and SSC at APSACS Rawat.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              to="Portfolio"
              smooth={true}
              offset={-80}
              duration={500}
              className="cursor-pointer rounded-full bg-white px-7 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              View my work
            </Link>
            <Link
              to="Contact"
              smooth={true}
              offset={-80}
              duration={500}
              className="cursor-pointer rounded-full border border-white/40 bg-white/5 px-7 py-3 text-sm font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              Contact me
            </Link>
          </div>

          <div className="mt-8 flex justify-center gap-3 md:justify-start">
            {SOCIALS.map(({ id, Icon, href, label }) => (
              <a
                key={id}
                href={href}
                aria-label={label}
                className="grid md:h-5 md:w-5 place-items-center rounded-full border border-white/25 bg-white/10 text-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-indigo-700"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="order-1 flex justify-center md:order-2">
          <div className="relative h-60 w-60 sm:h-72 sm:w-72 md:h-96 md:w-96">
            {/* Glow (shadow) that moves clockwise around the photo */}
            <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#6366f1,#d946ef,#38bdf8,#6366f1)] opacity-50 blur-2xl" />
            {/* Gradient ring that moves clockwise */}
            <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#6366f1,#d946ef,#38bdf8,#6366f1)]" />
            {/* Photo stays still */}
            <img
              src={AqiPic}
              alt="Aqib"
              className="absolute inset-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full border-4 border-slate-950/40 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
