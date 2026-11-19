import React, { useEffect, useRef, useState } from "react";
import { FaTelegram, FaNodeJs, FaReact, FaArrowUp } from "react-icons/fa";
import { BsFillBootstrapFill } from "react-icons/bs";

/*
  Palette (Contact section jaisi):
    Midnight teal #06151A | Deep lagoon #0C2B33 | Saffron #FFB547 | Aqua #4FD1C5 | Mist #E8F1F2
*/

const headingFont = {
  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
};
const bodyFont = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// ---- Content (yahan se edit karo) ---------------------------------------------

const NAME = "Aqib Shahzad"; // apna naam likho
const TAGLINE = "Web developer building fast, clean websites.";

// Icons ke neeche naam tooltip ki tarah aata hai
const STACK = [
  { Icon: FaReact, label: "React", color: "#4FD1C5" },
  { Icon: FaNodeJs, label: "Node.js", color: "#4FD1C5" },
  { Icon: BsFillBootstrapFill, label: "Bootstrap", color: "#FFB547" },
  { Icon: FaTelegram, label: "Telegram", color: "#FFB547" },
];

// ---- Hook ----------------------------------------------------------------------

// Footer screen par aaye to ek dafa true ho jata hai
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
};

// ---- Page ----------------------------------------------------------------------

const Footer = () => {
  const [ref, shown] = useInView();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={ref}
      style={bodyFont}
      className="relative isolate overflow-hidden bg-[#06151A] pb-8 pt-16 text-[#E8F1F2] antialiased md:pt-20"
    >
      {/* Animations */}
      <style>{`
      @keyframes footer-run { from { transform: translateX(-100%) } to { transform: translateX(300%) } }
        @keyframes footer-glow { 0%,100% { opacity: .5 } 50% { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) {
          .footer-anim { animation: none !important }
        }
      `}</style>

      {/* Upar ki line: screen par aate hi ek dafa left se right khulti hai */}
      <span
        className={`absolute left-0 top-0 h-px bg-gradient-to-r from-[#FFB547] via-[#4FD1C5] to-transparent transition-all duration-[1400ms] ease-out motion-reduce:transition-none ${
          shown ? "w-full" : "w-0"
        }`}
      />

      {/* Peeche halki roshni, dheere dheere saans leti hai */}
      <div className="footer-anim pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-72 w-[40rem] max-w-full -translate-x-1/2 animate-[footer-glow_8s_ease-in-out_infinite] rounded-full bg-[#4FD1C5]/10 blur-3xl" />
      {/* Top line: a bar runs from left to right in a loop */}
      <div className="absolute left-0 top-0 h-[2px] w-full overflow-hidden bg-white/10">
        <span className="footer-anim absolute inset-y-0 left-0 w-1/3 animate-[footer-run_4s_linear_infinite] bg-gradient-to-r from-transparent via-[#FFB547] to-[#4FD1C5]" />
      </div>

      {/* Width baqi sections ke barabar: mobile 92%, desktop 80% */}
      <div className="mx-auto w-[92%] md:w-[80%]">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Naam + tagline */}
          <div className="max-w-sm">
            <h3
              style={headingFont}
              className="flex items-center justify-center gap-3 text-2xl font-bold md:justify-start"
            >
              <span className="h-5 w-1.5 rounded-full bg-[#FFB547]" />
              {NAME}
            </h3>
            <p className="mt-3 leading-relaxed text-[#E8F1F2]/65">{TAGLINE}</p>
          </div>

          {/* Tech icons: hover par sirf rang aur glow badalta hai, hilta nahi */}
          <div>
            <p className="mb-4 text-sm text-[#E8F1F2]/55">Built with</p>
            <ul className="flex justify-center gap-3">
              {STACK.map(({ Icon, label, color }) => (
                <li key={label}>
                  <span
                    title={label}
                    aria-label={label}
                    style={{ "--c": color }}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-xl text-[#E8F1F2]/80 transition-[border-color,color,box-shadow] duration-300 hover:border-[var(--c)] hover:text-[var(--c)] hover:shadow-[0_0_20px_var(--c)]"
                  >
                    <Icon />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Wapas upar */}
          <button
            type="button"
            onClick={scrollTop}
            className="group flex items-center gap-3 rounded-full border border-[#E8F1F2]/30 px-5 py-2.5 text-sm font-semibold transition-[border-color,color,box-shadow] duration-300 hover:border-[#FFB547] hover:text-[#FFB547] hover:shadow-[0_0_20px_rgba(255,181,71,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB547]"
          >
            Back to top
            <FaArrowUp className="text-xs" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-[#E8F1F2]/50 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {NAME}. All rights reserved.
          </p>
          <p>Supported Partner Rajpoots</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
