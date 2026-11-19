import React, { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaNodeJs,
  FaGitAlt,
  FaServer,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";
import "../sass/about.scss";

/*
  Palette:
    Midnight teal #06151A | Deep lagoon #0C2B33 | Saffron #FFB547 | Aqua #4FD1C5 | Mist #E8F1F2
*/

const headingFont = {
  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
};
const bodyFont = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// ---- Content (yahan se edit karo) ------------------------------------------

const EXPERIENCE = [
  {
    title: "Frontend Developer",
    place: "Octaloop Technologies Pvt Ltd",
    period: "1 year",
    current: true,
    points: [
      "Built responsive interfaces with React and Tailwind CSS.",
      "Worked with a software house team on client projects.",
      "Connected frontends to APIs and fixed UI bugs.",
    ],
  },
];

const EDUCATION = [
  {
    title: "BS Software Engineering",
    place: "International Islamic University, Islamabad (IIUI)",
    period: "Recent graduate",
  },
  { title: "FSc", place: "APSACS Rawat" },
  { title: "SSC", place: "APSACS Rawat" },
];

const SKILL_GROUPS = [
  {
    group: "Frontend",
    color: "#FFB547",
    items: [
      { name: "React", Icon: FaReact },
      { name: "JavaScript", Icon: FaJs },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "SCSS", Icon: FaSass },
      { name: "HTML", Icon: FaHtml5 },
      { name: "CSS", Icon: FaCss3Alt },
    ],
  },
  {
    group: "Backend (MERN)",
    color: "#4FD1C5",
    items: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express", Icon: SiExpress },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "REST APIs", Icon: FaServer },
    ],
  },
  {
    group: "Tools",
    color: "#E8F1F2",
    items: [{ name: "Git & GitHub", Icon: FaGitAlt }],
  },
];

// ---- Hooks -------------------------------------------------------------------

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

// Number 0 se target tak ginta hai (jab visible ho)
const useCountUp = (target, start, duration = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3)))); // ease-out
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
};

// ---- Background animation (canvas particles) ---------------------------------

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const COLORS = ["#4FD1C5", "#FFB547", "#E8F1F2"];
    const LINK_DISTANCE = 130; // itni door tak lines judti hain
    let particles = [];
    let width = 0;
    let height = 0;
    let raf = null;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    // Canvas ka size section ke barabar rakho (retina screens ke liye dpr)
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Screen ke size ke hisaab se particles (mobile par kam)
      const count = Math.min(70, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse ke paas aaye to particle door hat jaye
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          p.x += (dx / dist) * 1.2;
          p.y += (dy / dist) * 1.2;
        }

        // Move + screen ke kinare se wapis
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();

        // Qareeb wale particles se line
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#4FD1C5";
            ctx.globalAlpha = (1 - d / LINK_DISTANCE) * 0.25;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    if (reduceMotion) {
      draw(); // sirf ek static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    // Section screen se bahar ho to animation pause (performance)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
};

// ---- Small components ----------------------------------------------------------

// Scroll par fade + slide up. Animation ke baad transform hata deta hai (text blur fix)
const Reveal = ({ children, delay = 0, className = "" }) => {
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
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Card: mouse ke saath light + hover par gradient border
// NOTE: backdrop-blur hata diya, wohi text blur karta tha
const SpotCard = ({ children, className = "" }) => {
  const ref = useRef(null);

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
      className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0C2B33]/80 p-6 transition-colors duration-300 hover:border-[#4FD1C5]/40 md:p-8 ${className}`}
    >
      {/* Mouse follow light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--sx, 50%) var(--sy, 50%), rgba(255,181,71,0.14), rgba(79,209,197,0.06) 55%, transparent 75%)",
        }}
      />
      {/* Content (isse upar rakha taake light text ke upar na aaye) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const CardTitle = ({ children }) => (
  <h3
    style={headingFont}
    className="mb-6 flex items-center gap-3 text-xl font-bold sm:text-2xl"
  >
    <span className="h-5 w-1.5 rounded-full bg-[#FFB547]" />
    {children}
  </h3>
);

const Timeline = ({ items }) => (
  <ol className="border-l border-white/15">
    {items.map(({ title, place, period, points, current }) => (
      <li key={title + place} className="relative pb-7 pl-7 last:pb-0">
        {/* Dot (current job ka dot ping karta hai) */}
        <span className="absolute -left-[7px] top-1.5 flex h-3.5 w-3.5">
          {current && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FD1C5] opacity-60 motion-safe:animate-ping" />
          )}
          <span
            className={`relative h-3.5 w-3.5 rounded-full border-2 bg-[#06151A] ${
              current ? "border-[#4FD1C5]" : "border-[#FFB547]"
            }`}
          />
        </span>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h4 style={headingFont} className="text-lg font-semibold">
            {title}
          </h4>
          {period && <span className="text-sm text-[#4FD1C5]">{period}</span>}
        </div>
        <p className="text-sm text-[#E8F1F2]/65">{place}</p>
        {points && (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#E8F1F2]/75 marker:text-[#FFB547]">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ol>
);

// Skills: pills ek ek karke pop hoti hain jab section visible ho
const SkillsGrid = () => {
  const [ref, shown] = useInView(0.2);

  return (
    <div ref={ref} className="grid gap-8 md:grid-cols-3">
      {SKILL_GROUPS.map(({ group, color, items }) => (
        <div key={group}>
          <h4
            style={{ ...headingFont, color }}
            className="mb-3 text-base font-semibold"
          >
            {group}
          </h4>
          <ul className="flex flex-wrap gap-2">
            {items.map(({ name, Icon }, i) => (
              <li
                key={name}
                style={{ animationDelay: `${i * 90}ms` }}
                className={`about-anim flex cursor-default items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 ${
                  shown ? "animate-[about-pop_0.5s_ease-out_both]" : "opacity-0"
                }`}
              >
                <Icon style={{ color }} className="text-base" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// ---- Page ----------------------------------------------------------------------

const About = () => {
  const [titleRef, titleShown] = useInView(0.4);
  const [factRef, factShown] = useInView(0.4);
  const years = useCountUp(1, factShown);

  return (
    <section
      name="About"
      style={bodyFont}
      className="relative isolate overflow-hidden bg-[#06151A] py-20 text-[#E8F1F2] antialiased md:py-28"
    >
      {/* Saari custom animations yahan hain */}
      <style>{`
        @keyframes about-float { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-14px,0) } }
        @keyframes about-shine { to { background-position: 200% center } }
        @keyframes about-pop   { from { opacity: 0; transform: translateY(12px) scale(.9) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { .about-anim { animation: none !important; opacity: 1 !important } }
      `}</style>

      {/* Background layers */}
      <ParticleBackground />
      <div className="about-anim pointer-events-none absolute -left-40 top-16 -z-10 h-[28rem] w-[28rem] animate-[about-float_9s_ease-in-out_infinite] rounded-full bg-[#4FD1C5]/10 blur-3xl will-change-transform" />
      <div className="about-anim pointer-events-none absolute -right-40 bottom-10 -z-10 h-[28rem] w-[28rem] animate-[about-float_11s_ease-in-out_infinite] rounded-full bg-[#FFB547]/10 blur-3xl will-change-transform" />

      <div className="mx-auto w-[92%] md:w-[80%]">
        {/* Heading */}
        <div ref={titleRef} className="mb-12 text-center md:mb-16">
          <h2
            style={headingFont}
            className={`text-4xl font-extrabold tracking-tight transition duration-700 sm:text-5xl lg:text-6xl ${
              titleShown
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            About me
          </h2>
          <span
            className={`mx-auto mt-4 block h-1 rounded-full bg-gradient-to-r from-[#FFB547] to-[#4FD1C5] transition-all duration-1000 ${
              titleShown ? "w-24" : "w-0"
            }`}
          />
          <p className="mt-4 text-[#E8F1F2]/65">
            Frontend developer working with the MERN stack
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-5 lg:grid-cols-12">
          {/* Intro */}
          <Reveal className="lg:col-span-7">
            <SpotCard>
              <CardTitle>Who I am</CardTitle>
              <p className="text-lg leading-relaxed text-[#E8F1F2]/85 md:text-xl">
                Hello, I&rsquo;m Aqib, a passionate web developer who works with
                the MERN stack. I have a software engineering degree and one
                year of experience at a software house, and I like building
                interfaces that look good and work well on every screen.
              </p>
            </SpotCard>
          </Reveal>

          {/* Quick facts */}
          <Reveal delay={120} className="lg:col-span-5">
            <SpotCard>
              <div ref={factRef}>
                <div className="flex items-center gap-2 text-sm text-[#4FD1C5]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FD1C5] opacity-60 motion-safe:animate-ping" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-[#4FD1C5]" />
                  </span>
                  Software house experience
                </div>
                <p
                  style={headingFont}
                  className="mt-3 text-5xl font-extrabold text-[#FFB547] md:text-6xl"
                >
                  {years} year
                </p>
                <p className="mt-1 text-[#E8F1F2]/75">
                  at Octaloop Technologies Pvt Ltd
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#FFB547]/50">
                    <p style={headingFont} className="text-lg font-bold">
                      MERN
                    </p>
                    <p className="text-xs text-[#E8F1F2]/55">Main stack</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#4FD1C5]/50">
                    <p style={headingFont} className="text-lg font-bold">
                      BSSE
                    </p>
                    <p className="text-xs text-[#E8F1F2]/55">IIUI, Islamabad</p>
                  </div>
                </div>
              </div>
            </SpotCard>
          </Reveal>

          {/* Experience */}
          <Reveal className="lg:col-span-7">
            <SpotCard>
              <CardTitle>Experience</CardTitle>
              <Timeline items={EXPERIENCE} />
            </SpotCard>
          </Reveal>

          {/* Education */}
          <Reveal delay={120} className="lg:col-span-5">
            <SpotCard>
              <CardTitle>Education</CardTitle>
              <Timeline items={EDUCATION} />
            </SpotCard>
          </Reveal>

          {/* Skills */}
          <Reveal className="lg:col-span-12">
            <SpotCard>
              <CardTitle>Skills</CardTitle>
              <SkillsGrid />
            </SpotCard>
          </Reveal>

          {/* Mission */}
          <Reveal className="lg:col-span-12">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#FFB547]/15 via-[#0C2B33]/80 to-[#4FD1C5]/15 p-8 text-center md:p-12">
              <p
                style={{ ...headingFont, backgroundSize: "200% auto" }}
                className="about-anim mx-auto max-w-3xl animate-[about-shine_6s_linear_infinite] bg-gradient-to-r from-[#E8F1F2] via-[#FFB547] to-[#E8F1F2] bg-clip-text text-2xl font-bold leading-snug text-transparent md:text-3xl"
              >
                I want to build clean, fast and useful web products, and keep
                learning with every project.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
