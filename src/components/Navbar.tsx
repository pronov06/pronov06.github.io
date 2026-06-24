import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export const smoother = {
  paused: (isPaused: boolean) => {
    if (isPaused) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.overflowX = "hidden";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowX = "hidden";
    }
  },
  scrollTo: (section: string, smooth: boolean) => {
    const targetElement = document.querySelector(section);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  },
  scrollTop: (top: number) => {
    window.scrollTo({ top: top, behavior: "auto" });
  }
};

const Navbar = () => {
  useEffect(() => {
    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (!section) return; // external links (e.g. Resume) open normally
          e.preventDefault();
          smoother.scrollTo(section, true);
        }
      });
    });
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
