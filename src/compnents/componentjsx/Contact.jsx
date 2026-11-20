import React, { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaFacebookSquare,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";

/*
  Palette:
    Midnight teal #06151A | Deep lagoon #0C2B33 | Saffron #FFB547 | Aqua #4FD1C5 | Mist #E8F1F2
*/

const headingFont = {
  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
};
const bodyFont = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// ---- Content (yahan se edit karo) ---------------------------------------------

// getform.io par form banao aur uska link yahan lagao.
// Messages seedha tumhari email par aayenge.
const FORM_URL = "https://api.web3forms.com/submit";
const ACCESS_KEY = "801f5748-55d3-4e11-be29-ad7ab7d34df8";

const EMAIL = "aqibshahzaddigi2@gmail.com";
const SUBJECT = "Job opportunity";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

// Device ke hisaab se Gmail kholta hai, aur "To" me email pehle se bhari hoti hai
const openGmail = (e) => {
  const ua = navigator.userAgent;

  // Android: normal mailto chalne do (Gmail default ho to seedha Gmail khulta hai)
  if (/Android/i.test(ua)) return;

  e.preventDefault();

  // iPhone: Gmail app kholo, na ho to Apple Mail
  if (/iPhone|iPad|iPod/i.test(ua)) {
    window.location.href = `googlegmail:///co?to=${EMAIL}&subject=${encodeURIComponent(SUBJECT)}`;
    setTimeout(() => {
      if (!document.hidden) window.location.href = MAILTO;
    }, 1000);
    return;
  }

  // Laptop/PC: browser me Gmail compose page naye tab me
  window.open(
    `https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`,
    "_blank",
    "noopener",
  );
};

// href wali row click hoti hai: mailto: mail app kholta hai, tel: dialer kholta hai.
// Location me href nahi hai, isliye wo sirf text rehti hai.
const INFO = [
  {
    Icon: FaEnvelope,
    label: "Email",
    value: EMAIL,
    href: MAILTO,
    onClick: openGmail,
  },
  {
    Icon: FaPhoneAlt,
    label: "Phone",
    value: "+92 300 1234567", // apna number likho
    href: "tel:+923001234567", // spaces aur dashes ke baghair, country code ke sath
  },
  { Icon: FaMapMarkerAlt, label: "Location", value: "Islamabad, Pakistan" },
];

const SOCIALS = [
  { Icon: FaFacebookSquare, href: "#", label: "Facebook" },
  { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { Icon: FaTelegram, href: "#", label: "Telegram" },
];

// Form ki fields. Nai field chahiye to yahan ek object add kar do.
const FIELDS = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
  {
    name: "email",
    label: "Your Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell me about the job or project...",
  },
];

const EMPTY = { name: "", email: "", message: "" };

// Input ki styling (saari fields ki same). Sirf border aur glow badalti hai, text hilta nahi.
const inputClass =
  "mt-2 w-full rounded-xl border border-white/15 bg-[#06151A]/60 px-4 py-3 text-[15px] text-[#E8F1F2] placeholder-[#E8F1F2]/40 outline-none transition-[border-color,box-shadow] duration-300 hover:border-white/30 focus:border-[#FFB547] focus:shadow-[0_0_0_4px_rgba(255,181,71,0.15)]";

// ---- Hooks ----------------------------------------------------------------------

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

// ---- Small components ----------------------------------------------------------

// Scroll par fade + slide up.
// Animation khatam hote hi transform poori tarah hata dete hain (text sharp rehta hai)
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, shown] = useInView();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setSettled(true), 700 + delay + 50);
    return () => clearTimeout(t);
  }, [shown, delay]);

  return (
    <div
      ref={ref}
      style={
        settled
          ? { transform: "none", transition: "none" }
          : { transitionDelay: `${delay}ms` }
      }
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Card ke gird gradient ring. Hover ya typing par roshan ho kar ghoomti hai.
// Ring peeche ek alag layer hai, text us par nahi hilta.
const GlowCard = ({ children, className = "" }) => (
  <div
    className={`group relative h-full overflow-hidden rounded-3xl p-[2px] ${className}`}
  >
    <div className="contact-anim absolute left-1/2 top-1/2 h-[200%] w-[200%] animate-[contact-spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#FFB547,transparent_30%,#4FD1C5,transparent_65%,#FFB547)] opacity-25 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100" />
    <div className="relative h-full rounded-[22px] bg-[#0C2B33] p-6 md:p-8">
      {children}
    </div>
  </div>
);

// Card ka title
const CardTitle = ({ children }) => (
  <h3
    style={headingFont}
    className="mb-6 flex items-center gap-3 text-xl font-bold sm:text-2xl"
  >
    <span className="h-5 w-1.5 rounded-full bg-[#FFB547]" />
    {children}
  </h3>
);

// Left side: email, phone, location aur socials
const InfoCard = () => (
  <GlowCard>
    <div className="flex h-full flex-col">
      <CardTitle>Let&rsquo;s talk</CardTitle>
      <p className="leading-relaxed text-[#E8F1F2]/75">
        Have a job opportunity or a project? Send me a message and I will reply
        as soon as I can.
      </p>

      <ul className="mt-6 space-y-4">
        {INFO.map(({ Icon, label, value, href, onClick }, i) => {
          const content = (
            <>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#4FD1C5]/40 bg-[#4FD1C5]/10 text-[#4FD1C5]">
                <Icon />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[#E8F1F2]/55">{label}</p>
                <p className="break-all text-sm font-medium md:text-xl">
                  {value}
                </p>
              </div>
            </>
          );

          return (
            <li
              key={label}
              style={{ animationDelay: `${300 + i * 150}ms` }}
              className="contact-anim animate-[contact-slide_0.6s_ease-out_both]"
            >
              {href ? (
                <a
                  href={href}
                  onClick={onClick}
                  className="flex items-center gap-4 transition-colors duration-300 hover:text-[#FFB547]"
                >
                  {content}
                </a>
              ) : (
                <div className="flex items-center gap-4">{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Socials: hover par sirf rang badalta hai, hilta nahi */}
      <div className="mt-auto flex gap-3 pt-8">
        {SOCIALS.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-xl transition-[background-color,border-color,color,box-shadow] duration-300 hover:border-[#FFB547] hover:bg-[#FFB547] hover:text-[#06151A] hover:shadow-[0_0_20px_rgba(255,181,71,0.5)]"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  </GlowCard>
);

// Message jane ke baad ye card dikhta hai
const SuccessCard = ({ onReset }) => (
  <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
    <span className="contact-anim grid h-16 w-16 animate-[contact-pop_0.5s_ease-out_both] place-items-center rounded-full bg-[#4FD1C5] text-2xl text-[#06151A]">
      <FaCheck />
    </span>
    <h3 style={headingFont} className="mt-6 text-2xl font-bold">
      Thank you!
    </h3>
    <p className="mt-2 text-[#E8F1F2]/70">
      Your message has been sent. I will reply soon.
    </p>
    <button
      type="button"
      onClick={onReset}
      className="mt-6 rounded-full border border-[#E8F1F2]/40 px-6 py-2.5 text-sm font-semibold transition-[border-color,color] duration-300 hover:border-[#4FD1C5] hover:text-[#4FD1C5]"
    >
      Send another message
    </button>
  </div>
);

// ---- Page ----------------------------------------------------------------------

const Contact = () => {
  const [titleRef, titleShown] = useInView(0.4);
  const [values, setValues] = useState(EMPTY);
  const [trap, setTrap] = useState(""); // honeypot: sirf bots isay bharte hain
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  // Har field ki value update karta hai
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Form bhejta hai (page reload nahi hota)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot ne chhupi field bhari to message bheje baghair "success" dikha do
    if (trap) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...values, access_key: ACCESS_KEY }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Failed");
      setValues(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      name="Contact"
      style={bodyFont}
      className="relative isolate overflow-hidden bg-[#06151A] py-20 text-[#E8F1F2] antialiased md:py-28"
    >
      {/* Animations yahan hain */}
      <style>{`
        @keyframes contact-float   { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-14px,0) } }
        @keyframes contact-spin    { from { transform: translate(-50%,-50%) rotate(0deg) } to { transform: translate(-50%,-50%) rotate(360deg) } }
        @keyframes contact-shimmer { 0% { transform: translateX(-150%) skewX(-20deg) } 60%,100% { transform: translateX(450%) skewX(-20deg) } }
        @keyframes contact-pop     { from { opacity: 0; transform: scale(.5) } to { opacity: 1; transform: none } }
        @keyframes contact-slide   { from { opacity: 0; transform: translateX(-16px) } to { opacity: 1; transform: none } }
        @keyframes contact-fly     { 0% { transform: translate(0,0) } 45% { transform: translate(18px,-14px); opacity: 0 } 46% { transform: translate(-18px,14px); opacity: 0 } 100% { transform: translate(0,0); opacity: 1 } }
        .send-btn:hover .send-icon { animation: contact-fly .7s ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .contact-anim { animation: none !important }
          .send-btn:hover .send-icon { animation: none }
        }
      `}</style>

      {/* Background: dot grid + do floating lights */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="contact-anim pointer-events-none absolute -left-40 top-20 -z-10 h-[28rem] w-[28rem] animate-[contact-float_9s_ease-in-out_infinite] rounded-full bg-[#4FD1C5]/10 blur-3xl will-change-transform" />
      <div className="contact-anim pointer-events-none absolute -right-40 bottom-10 -z-10 h-[28rem] w-[28rem] animate-[contact-float_11s_ease-in-out_infinite] rounded-full bg-[#FFB547]/10 blur-3xl will-change-transform" />

      {/* Width baqi sections ke barabar: mobile 92%, desktop 80% */}
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
            Contact me
          </h2>
          <span
            className={`mx-auto mt-4 block h-1 rounded-full bg-gradient-to-r from-[#FFB547] to-[#4FD1C5] transition-all duration-1000 ${
              titleShown ? "w-24" : "w-0"
            }`}
          />
          <p className="mt-4 text-[#E8F1F2]/65">
            Applying for a job? Send me a message and I will get back to you.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Info */}
          <Reveal className="lg:col-span-5">
            <InfoCard />
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="lg:col-span-7">
            <GlowCard>
              {status === "success" ? (
                <SuccessCard onReset={() => setStatus("idle")} />
              ) : (
                <form onSubmit={handleSubmit}>
                  <CardTitle>Send your message</CardTitle>

                  <div className="space-y-4">
                    {FIELDS.map(({ name, label, type, placeholder }) => (
                      <div key={name}>
                        <label htmlFor={name} className="text-sm font-semibold">
                          {label}
                        </label>
                        {type === "textarea" ? (
                          <textarea
                            id={name}
                            name={name}
                            rows={5}
                            required
                            placeholder={placeholder}
                            value={values[name]}
                            onChange={handleChange}
                            className={`${inputClass} resize-none`}
                          />
                        ) : (
                          <input
                            id={name}
                            name={name}
                            type={type}
                            required
                            placeholder={placeholder}
                            value={values[name]}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        )}
                      </div>
                    ))}

                    {/* Honeypot: insaanon ko nazar nahi aati, bots bhar dete hain */}
                    <input
                      type="text"
                      name="_gotcha"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />
                  </div>

                  {/* Error message */}
                  {status === "error" && (
                    <p className="mt-4 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  {/* Button: hilta nahi, sirf chamak, glow aur jahaz udta hai */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="send-btn relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#FFB547] px-8 py-3.5 text-sm font-semibold text-[#06151A] shadow-lg shadow-[#FFB547]/20 transition-[background-color,box-shadow] duration-300 hover:bg-[#ffc46b] hover:shadow-[0_0_28px_rgba(255,181,71,0.55)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    <span className="contact-anim pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-[contact-shimmer_3.5s_ease-in-out_infinite] bg-white/40" />
                    <span className="relative flex items-center gap-2">
                      <FaPaperPlane className="send-icon" />
                      {status === "sending" ? "Sending..." : "Send"}
                    </span>
                  </button>
                </form>
              )}
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
