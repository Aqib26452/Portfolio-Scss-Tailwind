import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-scroll";
import { ReactTyped } from "react-typed";
import "../sass/home.scss";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTelegram,
  FaReact,
  FaJs,
} from "react-icons/fa";
import AqiPic from "../asserts/AqibPIC.jpg";
import { Link } from "react-scroll";

/*
  Fonts (public/index.html <head> mein ek dafa):

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

  Palette
    Midnight teal  #06151A  (background)
    Deep lagoon    #0C2B33  (surfaces)
    Saffron        #FFB547  (main accent)
    Aqua           #4FD1C5  (secondary accent)
    Mist           #E8F1F2  (text)
*/

const VIDEO_SRC = "/hero-bg.mp4";

const SOCIALS = [
  { id: 1, Icon: FaFacebookSquare, href: "", label: "Facebook" },
  {
    id: 2,
    Icon: FaLinkedin,
    href: "https://www.linkedin.com/in/aqib-shahzad-5b2923399/",
    label: "LinkedIn",
  },
  { id: 3, Icon: FaTelegram, href: "#", label: "Telegram" },
];

// Apni real skills yahan likho
// const SKILLS = ["React", "JavaScript", "Tailwind CSS", "SCSS"];

const headingFont = {
  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
};
const bodyFont = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// Page load par ek ke baad ek aane wali animation
// step jitna bada, utni der se aayega (har step 120ms)
const RISE = "home-anim animate-[home-rise_0.8s_ease-out_both]";
const delay = (step) => ({ animationDelay: `${step * 120}ms` });

const Home = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [cursorOn] = useState(false);

  // Mouse ke saath chalne wali light ki position
  // const handleMove = (e) => {
  //   const el = sectionRef.current;
  //   if (!el) return;
  //   const r = el.getBoundingClientRect();
  //   el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  //   el.style.setProperty("--my", `${e.clientY - r.top}px`);
  // };

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
      // onMouseMove={handleMove}
      // onMouseEnter={() => setCursorOn(true)}
      // onMouseLeave={() => setCursorOn(false)}
      style={bodyFont}
      className="relative isolate flex md:min-h-screen items-center overflow-hidden bg-[#06151A] text-[#E8F1F2] antialiased"
    >
      {/* Saari custom animations (keyframes) yahan hain */}
      <style>{`
        @keyframes home-rise    { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
        @keyframes home-float   { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-14px,0) } }
        @keyframes home-spin    { from { transform: translate(-50%,-50%) rotate(0deg) } to { transform: translate(-50%,-50%) rotate(360deg) } }
        @keyframes home-shine   { to { background-position: 200% center } }
        @keyframes home-shimmer { 0% { transform: translateX(-150%) skewX(-20deg) } 60%,100% { transform: translateX(450%) skewX(-20deg) } }
        @keyframes home-bounce  { 0%,100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(8px); opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .home-anim { animation: none !important } }
      `}</style>

      {/* Background video (reduced motion walon ko nahi dikhti) */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-30 h-full w-full object-cover motion-reduce:hidden"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Tint: video nazar aaye magar text saaf padhe */}
      <div className="absolute inset-0 -z-20 bg-[#06151A]/80" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#06151A] via-[#06151A]/60 to-transparent" />

      {/* Do soft aurora lights jo aahista se tairti hain */}
      <div className="home-anim pointer-events-none absolute -left-32 top-20 -z-10 h-[26rem] w-[26rem] animate-[home-float_9s_ease-in-out_infinite] rounded-full bg-[#4FD1C5]/10 blur-3xl will-change-transform" />
      <div className="home-anim pointer-events-none absolute -right-32 bottom-16 -z-10 h-[26rem] w-[26rem] animate-[home-float_12s_ease-in-out_infinite] rounded-full bg-[#FFB547]/10 blur-3xl will-change-transform" />

      {/* Cursor ke saath chalne wali light */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ${
          cursorOn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 40%), rgba(255,181,71,0.14), rgba(79,209,197,0.07) 50%, transparent 75%)",
        }}
      />

      {/* Width About section ke barabar: mobile 92%, desktop 80% */}
      <div className="mx-auto grid w-[92%] items-center gap-14 md:pb-24 pb-4 pt-32 md:w-[80%] md:grid-cols-[1.2fr_1fr]">
        {/* ---------------- Text ---------------- */}
        <div className="order-2  md:order-1 ">
          <span
            style={delay(0)}
            className={`${RISE}  inline-flex items-center gap-2 rounded-full border border-[#4FD1C5]/40 bg-[#4FD1C5]/10 px-4 py-1.5 text-xs font-bold text-[#4FD1C5]`}
          >
            <span className="h-2 w-2 rounded-full bg-[#4FD1C5] motion-safe:animate-pulse" />
            Open to work
          </span>
          <h1
            style={{ ...headingFont, ...delay(2) }}
            className={`${RISE} md:mt-6 bg-transparent`}
          >
            <span className="block bg-transparent mt-2 md:mt-0 font-mono md:text-lg text-md text-gray-400 sm:text-xl">
              Hello, I&rsquo;m
            </span>
            <span className="md:mt-2 mt-1 text-center md:text-left block bg-transparent xl:text-6xl md:text-4xl text-3xl font-extrabold tracking-tight text-white t">
              Aqib Shahzad
            </span>
            <span className="mt-4  h-1 w-20 rounded-full bg-[#FFB547] md:block hidden" />
          </h1>

          <div
            style={{ ...headingFont, ...delay(2) }}
            className={`${RISE} mt-4 flex items-center justify-center gap-2 text-xl font-semibold sm:text-2xl md:justify-start md:text-3xl`}
          >
            <span>I'm a</span>
            <ReactTyped
              className="text-[#4FD1C5]"
              strings={[
                "Front-end Developer",
                "Web Developer",
                "Software Engineer",
              ]}
              typeSpeed={95}
              backSpeed={30}
              backDelay={1400}
              loop
            />
          </div>

          <p
            style={delay(3)}
            className={`${RISE} mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#E8F1F2]/75 md:mx-0 md:text-lg`}
          >
            I&rsquo;m a frontend developer and a recent graduate of the
            International Islamic University, Islamabad (IIUI), with a BS in
            Software Engineering. I turn designs into fast, clean, responsive
            interfaces.
          </p>

          {/* Skills: har pill thori der baad aati hai */}
          {/* <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {SKILLS.map((s, i) => (
              <li
                key={s}
                style={delay(4 + i * 0.5)}
                className={`${RISE} cursor-default rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-[#E8F1F2]/85 transition-[transform,border-color,color] duration-300 hover:-translate-y-1 hover:border-[#4FD1C5] hover:text-[#4FD1C5]`}
              >
                {s}
              </li>
            ))}
          </ul> */}

          {/* Buttons */}
          <div
            style={delay(7)}
            className={`${RISE} mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start`}
          >
            {/* <Link
              to="Portfolio"
              smooth={true}
              offset={-80}
              duration={500}
              className="relative cursor-pointer overflow-hidden rounded-full bg-[#FFB547] px-8 py-3.5 text-sm font-semibold text-[#06151A] shadow-lg shadow-[#FFB547]/20 transition hover:-translate-y-0.5 hover:bg-[#ffc46b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB547]"
            >
        
              <span className="home-anim pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-[home-shimmer_3.5s_ease-in-out_infinite] bg-white/40" />
              <span className="relative">View my work</span>
            </Link> */}
            {/* Alag Action Buttons Block */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary Button: Contact Me */}
              <a className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#FFB547] to-[#FF8A00] px-7 py-3.5 text-sm font-extrabold tracking-wide text-[#060D14] shadow-[0_0_25px_rgba(255,181,71,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,181,71,0.6)]">
                <Link to="Contact" smooth={true} offset={-80} duration={500}>
                  Contact Me
                </Link>
              </a>

              {/* Attractive Download CV Button */}
              <a
                href="/Aqib-CV.pdf"
                download="Aqib-CV.pdf"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-[#FFB547]/50 bg-[#0E1A26]/70 px-7 py-3.5 text-sm font-bold tracking-wide text-[#E8F1F2] shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFB547] hover:bg-[#FFB547]/15 hover:text-[#FFE4A0] hover:shadow-[0_0_25px_rgba(255,181,71,0.25)]"
              >
                {/* Hover Shine Effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FFB547]/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative z-10">Download CV</span>

                {/* Animated Download Icon */}
                <svg
                  xmlns="http://w3.org"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="relative z-10 h-4 w-4 text-[#FFB547] transition-transform duration-300 group-hover:translate-y-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="mt-8 flex justify-center gap-3 md:justify-start">
            {SOCIALS.map(({ id, Icon, href, label }, i) => (
              <a
                key={id}
                href={href}
                aria-label={label}
                style={delay(8 + i * 0.6)}
                className={`${RISE} grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-xl transition-[transform,background-color,border-color,color] duration-300 hover:-translate-y-1 hover:border-[#FFB547] hover:bg-[#FFB547] hover:text-[#06151A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB547]`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ---------------- Photo ---------------- */}
        <div
          style={delay(2)}
          className={`${RISE} order-1 flex justify-center md:order-2 md:justify-end`}
        >
          {/* Poora photo block aahista se upar neeche tairta hai */}
          <div className="home-anim relative h-80 w-64 animate-[home-float_7s_ease-in-out_infinite] will-change-transform sm:h-96 sm:w-72 md:h-[28rem] md:w-80">
            {/* Ghoomta hua gradient ring (arch shape ke andar clip hota hai) */}
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-3xl p-[3px]">
              <div className="home-anim absolute left-1/2 top-1/2 h-[200%] w-[200%] animate-[home-spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#FFB547,transparent_30%,#4FD1C5,transparent_65%,#FFB547)]" />
              <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[21px] bg-[#0C2B33]">
                <img
                  src={AqiPic}
                  alt="Aqib"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Floating tech icons */}
            <div className="home-anim absolute -right-4 top-10 grid h-12 w-12 animate-[home-float_5s_ease-in-out_infinite] place-items-center rounded-2xl border border-white/15 bg-[#0C2B33] text-2xl text-[#4FD1C5] shadow-lg sm:-right-8">
              <FaReact />
            </div>
            <div
              style={{ animationDelay: "1.2s" }}
              className="home-anim absolute -left-4 top-24 grid h-11 w-11 animate-[home-float_6s_ease-in-out_infinite] place-items-center rounded-2xl border border-white/15 bg-[#0C2B33] text-xl text-[#FFB547] shadow-lg sm:-left-8"
            >
              <FaJs />
            </div>

            {/* Education card (backdrop-blur hata diya taake text sharp rahe) */}
            <div
              style={{ animationDelay: "0.6s" }}
              className="home-anim absolute -bottom-5 -left-6 animate-[home-float_8s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-[#0C2B33] px-4 py-3 shadow-xl sm:-left-10"
            >
              <p style={headingFont} className="text-sm font-semibold">
                BS Software Engineering
              </p>
              <p className="text-xs text-[#E8F1F2]/65">IIUI, Islamabad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-[#E8F1F2]/50 md:flex">
        Scroll
        <span className="home-anim h-2 w-2 animate-[home-bounce_1.6s_ease-in-out_infinite] rounded-full bg-[#FFB547]" />
      </div>
    </section>
  );
};

export default Home;
