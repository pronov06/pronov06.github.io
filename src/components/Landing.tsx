import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
        <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <div className="landing-name">
              <h1 className="landing-name-line1">PRONOV</h1>
              <h1 className="landing-name-line2">MAZUMDAR</h1>
            </div>
          </div>
          <div className="landing-info">
            <h3>An AI/ML</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Engineer</div>
              <div className="landing-h2-2">Developer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
