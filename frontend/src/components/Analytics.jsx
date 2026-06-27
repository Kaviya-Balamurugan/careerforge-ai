function Analytics({ resumeScore }) {
  return (
    <div className="analytics-section">

      <div className="page-header">

        <h1>📊 Resume Analytics</h1>

        <p>
          AI-powered analysis of your resume performance and strengths.
        </p>

      </div>

      <div className="analytics-grid">

        <div className="analytics-item">
          <h4>Overall Score</h4>
          <p>{resumeScore?.overall_score || 0}%</p>
        </div>

        <div className="analytics-item">
          <h4>Technical Skills</h4>
          <p>{resumeScore?.technical_skills || 0}%</p>
        </div>

        <div className="analytics-item">
          <h4>Projects</h4>
          <p>{resumeScore?.projects || 0}%</p>
        </div>

        <div className="analytics-item">
          <h4>Experience</h4>
          <p>{resumeScore?.experience || 0}%</p>
        </div>

        <div className="analytics-item">
          <h4>ATS Score</h4>
          <p>{resumeScore?.ats || 0}%</p>
        </div>

        <div className="analytics-item">
          <h4>Resume Quality</h4>
          <p>{resumeScore?.resume_quality || 0}%</p>
        </div>

      </div>

      <br />

      <div className="roadmap-item">

        <h3>🤖 AI Resume Summary</h3>

        <br />

        <p>
          {resumeScore?.summary || "No summary available."}
        </p>

      </div>

    </div>
  );
}

export default Analytics;