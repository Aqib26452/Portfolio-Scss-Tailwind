import React, { useEffect, useRef, useState } from "react";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import HtmlPic from "../asserts/html.png";
import CssPic from "../asserts/CSS-picc.png";
import PHPPic from "../asserts/PHP-logo.png";
import JsPic from "../asserts/js-pic.png";

/*
  Palette (baqi sections jaisi):
    Midnight teal #06151A | Deep lagoon #0C2B33 | Saffron #FFB547 | Aqua #4FD1C5 | Mist #E8F1F2
*/

const headingFont = {
  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
};
const bodyFont = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// ---- Projects (yahan se edit karo) ------------------------------------------
// Har project ke liye ya to `logo` (image) do, ya `Icon` (react-icons wala logo).
// Naya project add karna ho to ek object copy karke neeche paste kar do.

const PROJECTS = [
  {
    id: 1,
    name: "React JS",
    description:
      "Fast, reusable component based apps with hooks and clean state handling.",
    Icon: FaReact,
    color: "#4FD1C5",
    tags: ["React", "Hooks", "Tailwind"],
  },
  {
    id: 2,
    name: "Next JS",
    description:
      "Server rendered pages with routing and SEO friendly structure.",
    Icon: SiNextdotjs,
    color: "#E8F1F2",
    tags: ["Next.js", "SSR", "Routing"],
  },
  {
    id: 3,
    name: "HTML",
    description:
      "Clean and semantic page structure that works well on every screen.",
    logo: HtmlPic,
    color: "#FFB547",
    tags: ["Semantic", "Responsive"],
  },
  {
    id: 4,
    name: "CSS",
    description:
      "Modern layouts with Flexbox and Grid, plus smooth animations.",
    logo: CssPic,
    color: "#4FD1C5",
    tags: ["Flexbox", "Grid", "Animation"],
  },
  {
    id: 5,
    name: "JavaScript",
    description:
      "Interactive features, DOM handling and API calls written in plain JS.",
    logo: JsPic,
    color: "#FFB547",
    tags: ["ES6", "DOM", "Fetch API"],
  },
  {
    id: 6,
    name: "PHP",
    description: "Simple server side logic and forms connected to a database.",
    logo: PHPPic,
    color: "#4FD1C5",
    tags: ["PHP", "MySQL", "Forms"],
  },
];

// ---- Hook --------------------------------------------------------------------

// Element screen par aaye to ek dafa true ho jata hai
const useInView = (threshold = 0.15) => {
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

// ---- Small components --------------------------------------------------------

// Scroll par fade + slide up. Animation ke baad transform hata deta hai (text sharp rahe)
const Reveal = ({ children, delay = 0 }) => {
  const [ref, shown] = useInView();
  const [settled, setSettled] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: settled ? "none" : undefined,
      }}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && shown) setSettled(true);
      }}
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

// Logo: image ya icon, uske gird gradient ring (hover par ghoomti hai)
const ProjectLogo = ({ logo, Icon, color, name }) => (
  <div className="relative mx-auto h-24 w-24">
    <div
      className="absolute -inset-[3px] rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite]"
      style={{
        background: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color})`,
      }}
    />
    <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-[#06151A]">
      {logo ? (
        <img src={logo} alt={name} className="h-full w-full object-cover" />
      ) : (
        <Icon style={{ color }} className="text-5xl" />
      )}
    </div>
  </div>
);

// Ek project ka card
const ProjectCard = ({ project, number }) => {
  const { name, description, logo, Icon, color, tags } = project;
  const ref = useRef(null);

  // Mouse ki position save karte hain taake light uske saath chale
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0C2B33]/80 p-6 transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:border-[#4FD1C5]/40 md:p-7"
    >
      {/* Mouse follow light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--sx, 50%) var(--sy, 50%), rgba(255,181,71,0.14), rgba(79,209,197,0.06) 55%, transparent 75%)",
        }}
      />

      {/* Content light ke upar rakha hai */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Card number (01, 02...) */}
        <span
          style={headingFont}
          className="absolute right-0 top-0 text-3xl font-extrabold text-white/10 transition-colors duration-300 group-hover:text-[#FFB547]/40"
        >
          {String(number).padStart(2, "0")}
        </span>

        <ProjectLogo logo={logo} Icon={Icon} color={color} name={name} />

        <div className="mt-6 text-center">
          <h3 style={headingFont} className="text-2xl font-bold">
            {name}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#E8F1F2]/70">
            {description}
          </p>
        </div>

        {/* Tags */}
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#E8F1F2]/80"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Buttons (mt-auto se hamesha card ke neeche rehte hain)
        <div className="mt-auto flex justify-center gap-3 pt-6">
          <a
            href={videoLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#4FD1C5]/50 px-4 py-2 text-sm font-semibold text-[#4FD1C5] transition hover:-translate-y-0.5 hover:bg-[#4FD1C5] hover:text-[#06151A]"
          >
            <FaPlay className="text-xs" />
            Video
          </a>
          <a
            href={codeLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#FFB547] px-4 py-2 text-sm font-semibold text-[#06151A] shadow-lg shadow-[#FFB547]/20 transition hover:-translate-y-0.5 hover:bg-[#ffc46b]"
          >
            <FaGithub />
            Source Code
          </a>
        </div> */}
      </div>
    </div>
  );
};

// ---- Page --------------------------------------------------------------------

const Portfolio = () => {
  const [titleRef, titleShown] = useInView(0.4);

  return (
    <section
      name="Portfolio"
      style={bodyFont}
      className="relative isolate overflow-hidden bg-[#06151A] py-10 text-[#E8F1F2] antialiased md:py-28"
    >
      {/* Animations yahan hain */}
      <style>{`
        @keyframes portfolio-float { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-14px,0) } }
        @media (prefers-reduced-motion: reduce) { .portfolio-anim { animation: none !important } }
      `}</style>

      {/* Background: dot grid + do floating lights */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="portfolio-anim pointer-events-none absolute -left-40 top-20 -z-10 h-[28rem] w-[28rem] animate-[portfolio-float_9s_ease-in-out_infinite] rounded-full bg-[#4FD1C5]/10 blur-3xl will-change-transform" />
      <div className="portfolio-anim pointer-events-none absolute -right-40 bottom-10 -z-10 h-[28rem] w-[28rem] animate-[portfolio-float_11s_ease-in-out_infinite] rounded-full bg-[#FFB547]/10 blur-3xl will-change-transform" />

      {/* Width About aur Home ke barabar: mobile 92%, desktop 80% */}
      <div className="mx-auto w-[92%] md:w-[80%]">
        {/* Heading */}
        <div ref={titleRef} className=" text-center md:mb-16">
          <h2
            style={headingFont}
            className={`text-4xl font-extrabold tracking-tight transition duration-700 sm:text-5xl lg:text-6xl ${
              titleShown
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Expertise
          </h2>
          <span
            className={`mx-auto mt-4 block h-1 rounded-full bg-gradient-to-r from-[#FFB547] to-[#4FD1C5] transition-all duration-1000 ${
              titleShown ? "w-24" : "w-0"
            }`}
          />
          <p className="mt-4 text-[#E8F1F2]/65">Featured Projects</p>
        </div>

        {/* Cards grid: mobile 1, tablet 2, desktop 3 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 120}>
              <ProjectCard project={project} number={index + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
