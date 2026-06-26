import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Single Lenis instance driving smooth scrolling for the whole page. The rest
// of the app talks to it through the `smoother` facade below (kept so the
// existing call sites in initialFX / nav links don't need to change).
let lenis: Lenis | null = null;

export const smoother = {
  paused: (isPaused: boolean) => {
    if (!lenis) return;
    if (isPaused) lenis.stop();
    else lenis.start();
  },
  scrollTo: (section: string, smooth: boolean) => {
    if (lenis) lenis.scrollTo(section, { duration: smooth ? 1.2 : 0 });
  },
  scrollTop: (top: number) => {
    if (lenis) lenis.scrollTo(top, { immediate: true });
  },
};

const Navbar = () => {
  useEffect(() => {
    const l = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenis = l;
    l.stop(); // stay paused under the loading screen until initialFX resumes it

    // Keep ScrollTrigger in sync with Lenis, and drive Lenis from GSAP's ticker
    // so scrub animations and the pinned Work section stay perfectly aligned.
    l.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      l.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    l.scrollTo(0, { immediate: true });

    const links = document.querySelectorAll(".header ul a");
    const onClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        if (!section) return; // external links (e.g. Resume) open normally
        e.preventDefault();
        smoother.scrollTo(section, true);
      }
    };
    links.forEach((elem) => elem.addEventListener("click", onClick));

    return () => {
      links.forEach((elem) => elem.removeEventListener("click", onClick));
      gsap.ticker.remove(raf);
      l.destroy();
      lenis = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          pronov.dev
        </a>
        <a
          href="mailto:mazumdarpronov@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          mazumdarpronov@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/1KmXD5h0PJWdsFLDpuabVh_h2EXd7NhGc/view?usp=sharing"
              target="_blank"
              data-cursor="disable"
            >
              <HoverLinks text="RESUME" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
