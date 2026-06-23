import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    num: "01",
    name: "SpendWise",
    category: "Full-Stack Personal Finance Tracker",
    tools: "React.js, Node.js, Express, MongoDB, JWT — track expenses, split group costs, and get AI-powered insights.",
    image: "/images/shot-spendwise.png",
    link: "https://spend-wise-gmrs.vercel.app/",
  },
  {
    num: "02",
    name: "Lumen",
    category: "Mini CRM · Engagement Loop",
    tools: "Python 3.12, FastAPI, SQLAlchemy 2, React 18 + TypeScript — pick an audience, send a campaign, and learn from how people respond.",
    image: "/images/shot-lumen.png",
    link: "https://huggingface.co/spaces/pronov06/lumen-crm",
  },
  {
    num: "03",
    name: "Resume ATS Analyzer",
    category: "AI Resume Analysis Tool",
    tools: "Python, NLP (spaCy / NLTK), Regex, PDF Parsing — AI-powered ATS scoring with keyword analysis and improvement tips.",
    image: "/images/shot-resume.png",
    link: "https://analyzemyresume.streamlit.app/",
  },
];

const Work = () => {
  useGSAP(() => {
    // Horizontal distance the project row needs to travel so the last box's
    // right edge lines up with the container's right edge. Measured directly
    // from the boxes (not derived from a count) so it stays correct for any
    // number of projects, and clamped to >= 0 so a short list that already
    // fits the viewport never produces a negative value or scrolls the wrong
    // way. The pin length (end) and the slide distance (x) both use this, so
    // the pinned section always reserves exactly the space it scrolls through
    // — no dead zone and no overlap with the sections that follow (TechStack /
    // Contact).
    function getTranslateX() {
      const boxes = document.getElementsByClassName("work-box");
      const container = document.querySelector(".work-container");
      if (!boxes.length || !container) return 0;
      const lastBoxRight =
        boxes[boxes.length - 1].getBoundingClientRect().right;
      const containerRight = container.getBoundingClientRect().right;
      return Math.max(0, lastBoxRight - containerRight);
    }

    let resizeTimeout: number | null = null;
    function handleResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }

    // The project images and the heavy 3D model load after this trigger is
    // first measured, which shifts the layout. Re-measure once each image has
    // loaded (and on window load) so the pin reserves the correct height.
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>(".work-image img")
    );
    const onAssetLoad = () => ScrollTrigger.refresh();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onAssetLoad);
    });
    window.addEventListener("load", onAssetLoad);

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        // Pin length is tied to the actual horizontal scroll distance so the
        // pinned section reserves exactly the right amount of space — no dead
        // zone and no overlap with the sections that follow (TechStack /
        // Contact), regardless of how many projects are listed.
        end: () => "+=" + getTranslateX(),
        scrub: 0.5,
        pinSpacing: true,
        pin: true,
        pinType: ScrollTrigger.isTouch ? "fixed" : "transform",
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    window.addEventListener("resize", handleResize);

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", onAssetLoad);
      imgs.forEach((img) => img.removeEventListener("load", onAssetLoad));
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} link={project.link} alt={`Work image of ${project.name}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
