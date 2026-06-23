import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern</h4>
                <h5>Enginow</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built preprocessing pipelines and conducted EDA on 10,000+ data points, improving data quality and model efficiency. (Jan 2025 – Feb 2025)
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Engineering <br /> Intern</h4>
                <h5>AWS Academy · EduSkills</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Designed ETL pipelines and scalable SQL data models on AWS for structured datasets. (Apr 2025 – Jun 2025)
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Machine <br /> Learning Intern</h4>
                <h5>IBM SkillsBuild · EDUNET</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Trained and evaluated ML classification models in Python, applying feature engineering and hyperparameter tuning. (Jan 2026 – Feb 2026)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
