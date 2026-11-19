import React, { useEffect, useRef, useState } from "react";
import "../sass/Projects.scss"; // adjust the path to where you saved the SCSS file

// Local video: import ecomVideo from "../asserts/videos/ecommerce.mp4";
// Local thumbnail: import ecomThumb from "../asserts/images/ecommerce.jpg";

const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    url: "ecommerce.yoursite.com", // shown in the fake browser bar
    description:
      "MERN stack store with cart, authentication and an admin panel.",
    tech: ["React", "Node", "MongoDB", "Tailwind"],
    thumbnail: "", // optional image
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    videoType: "youtube", // "youtube" | "local"
    github: "https://github.com/your-username/ecommerce",
    live: "",
  },
  {
    id: 2,
    title: "Task Manager",
    url: "tasks.yoursite.com",
    description: "Task board with drag and drop and saved progress.",
    tech: ["React", "SCSS"],
    thumbnail: "",
    video: "", // e.g. ecomVideo  (local file) -> videoType: "local"
    videoType: "local",
    github: "https://github.com/your-username/task-manager",
    live: "",
  },
  {
    id: 3,
    title: "Skiller",
    url: "https://media.istockphoto.com/id/2282333539/video/creative-apparel-workshop-with-dress-form-and-fashion-collection-display.mp4?s=mp4-640x640-is&k=20&c=hc_-s4Lu_HC6jvmJcJg6i0Zv1o16TU_DKoxfecRLF8o=",
    description: "Select the goal for improve you techniques",
    tech: ["NextJS", "ReactJS", "SCSS"],
    thumbnail: "",
    video: "", // e.g. ecomVideo  (local file) -> videoType: "local"
    videoType: "local",
    github:
      "https://github.com/Octaloop-Technologies/1v1-Squats-game-dashboard",
    live: "",
  },
];

/* ---------- helpers ---------- */
const youtubeId = (url = "") => {
  const m = url.match(/embed\/([^?&/]+)/);
  return m ? m[1] : "";
};

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

/* reveal when scrolled into view */
const useInView = () => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
};

/* ---------- media area (the video lives inside the card) ---------- */
const Media = ({ project, playing, setPlaying }) => {
  const videoRef = useRef(null);
  const { video, videoType, thumbnail, title } = project;
  const ytThumb =
    videoType === "youtube" && video
      ? `https://img.youtube.com/vi/${youtubeId(video)}/hqdefault.jpg`
      : "";
  const poster = thumbnail || ytThumb;

  // local video: silent preview while hovering
  const hoverPlay = () => {
    const v = videoRef.current;
    if (v && !playing) v.play().catch(() => {});
  };
  const hoverStop = () => {
    const v = videoRef.current;
    if (v && !playing) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const startFull = () => {
    setPlaying(true);
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  // No video: show image or a placeholder
  if (!video) {
    return poster ? (
      <img className="pj-poster" src={poster} alt={title} loading="lazy" />
    ) : (
      <div className="pj-placeholder" aria-hidden="true">
        <span>{title.charAt(0)}</span>
      </div>
    );
  }

  // YouTube: poster -> iframe in the same spot
  if (videoType === "youtube") {
    return playing ? (
      <iframe
        className="pj-iframe"
        src={`${video}${video.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <button
        className="pj-playwrap"
        onClick={startFull}
        aria-label={`Play ${title} demo`}
      >
        {poster ? (
          <img className="pj-poster" src={poster} alt="" loading="lazy" />
        ) : (
          <div className="pj-placeholder" aria-hidden="true">
            <span>{title.charAt(0)}</span>
          </div>
        )}
        <span className="pj-play">
          <i />
        </span>
      </button>
    );
  }

  // Local video: hover preview, click for sound + controls
  return (
    <div
      className="pj-playwrap"
      onMouseEnter={hoverPlay}
      onMouseLeave={hoverStop}
    >
      <video
        ref={videoRef}
        className="pj-video"
        src={video}
        poster={poster || undefined}
        muted
        loop={!playing}
        playsInline
        preload="metadata"
        controls={playing}
      />
      {!playing && (
        <button
          className="pj-play"
          onClick={startFull}
          aria-label={`Play ${title} demo with sound`}
        >
          <i />
        </button>
      )}
    </div>
  );
};

/* ---------- card ---------- */
const ProjectCard = ({ project, index }) => {
  const [ref, seen] = useInView();
  const [playing, setPlaying] = useState(false);

  return (
    <article
      ref={ref}
      className={`pj-card ${seen ? "is-in" : ""}`}
      style={{ "--delay": `${index * 110}ms` }}
    >
      <div className="pj-card-inner">
        {/* browser-window frame */}
        <header className="pj-bar">
          <span className="pj-win">
            <b />
            <b />
            <b />
          </span>
          <span className="pj-url">{project.url || project.title}</span>
          {playing && (
            <button className="pj-close" onClick={() => setPlaying(false)}>
              Stop
            </button>
          )}
        </header>

        <div className="pj-media">
          <Media project={project} playing={playing} setPlaying={setPlaying} />
          {!playing && <span className="pj-glare" aria-hidden="true" />}
          {!playing && project.video && (
            <span className="pj-badge">
              <i /> Video demo
            </span>
          )}
        </div>

        <div className="pj-body">
          <h2 className="pj-title">{project.title}</h2>
          <p className="pj-desc">{project.description}</p>

          <ul className="pj-tech">
            {project.tech.map((t, n) => (
              <li key={t} style={{ "--i": n }}>
                {t}
              </li>
            ))}
          </ul>

          <div className="pj-actions">
            {project.github && (
              <a
                className="pj-btn pj-btn--main"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon /> Source code
              </a>
            )}
            {project.live && (
              <a
                className="pj-btn"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live site <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const [titleRef, titleShown] = useInView();

  return (
    <section name="Projects" id="Projects" className="pj-wrap">
      {/* background: dot grid, floating lights, light beam, rising particles */}
      <div className="pj-bg" aria-hidden="true">
        <span className="pj-dots" />
        <span className="pj-light pj-light--aqua" />
        <span className="pj-light pj-light--saffron" />
        <span className="pj-beam" />
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className={`pj-particle pj-particle--${i + 1}`} />
        ))}
      </div>

      <div className="pj-container">
        <div ref={titleRef} className={`pj-head ${titleShown ? "is-in" : ""}`}>
          <h2 className="pj-heading">My Projects</h2>
          <span className="pj-rule" />
          <p className="pj-sub">
            Watch each project run, then read the code on GitHub.
          </p>
        </div>

        <div className="pj-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
