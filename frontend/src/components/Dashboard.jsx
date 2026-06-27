function Dashboard({
  file,
  setFile,
  role,
  setRole,
  jobDescription,
  setJobDescription,
  analyzeResume,
  result,
  resumeScore,
  ats,
  jobs,
}) {
  return (
    <>

      {/* Hero Section */}

      <div className="hero-section">

        <h1>🚀 AI Career Assistant</h1>

        <p>
          Upload your resume and let CareerForge AI analyze,
          improve, and prepare you for your dream job.
        </p>

      </div>

      {/* Welcome Banner */}

      <div className="welcome-card">

        <div className="welcome-content">

          <div>

            <h1>🚀 Welcome to CareerForge AI</h1>

            <p>
              Upload your resume and receive AI-powered resume analysis,
              ATS scoring, skill gap detection, project recommendations,
              mock interview preparation, and personalized career guidance.
            </p>

            <button
              className="start-btn"
              onClick={analyzeResume}
            >
              🚀 Get Started
            </button>

          </div>

          <div className="hero-icon">
            🤖
          </div>

        </div>

      </div>

      {/* Upload Card */}

      <div className="upload-card">

        <label>Upload Resume</label>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label>Target Role</label>

        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="AI Engineer"
        />

        <label>Job Description (Optional)</label>

        <textarea
          rows="5"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste Job Description"
        />

        <button
          className="analyze-btn"
          onClick={analyzeResume}
        >
          Analyze Resume
        </button>

      </div>

      {/* Dashboard Metrics */}

      <div className="dashboard-grid">

        <div className="metric-card">

          <h3>🎯 Readiness</h3>

          <h1>{result?.readiness_score || 0}%</h1>

        </div>

        <div className="metric-card">

          <h3>📊 Resume Score</h3>

          <h1>{resumeScore?.overall_score || 0}%</h1>

        </div>

        <div className="metric-card">

          <h3>📄 ATS Score</h3>

          <h1>{ats?.ats_score || 0}%</h1>

        </div>

        <div className="metric-card">

          <h3>💼 Job Matches</h3>

          <h1>{jobs?.jobs?.length || 0}</h1>

        </div>

      </div>

    </>
  );
}

export default Dashboard;