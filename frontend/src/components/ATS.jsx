function ATS({
  ats,
  jdMatch,
  summary,
  suggestions,
  rewrittenResume,
  rewriteResume,
  jobs,
  interviewQuestions,
}) {

    if (!ats) {
  return (
    <div className="ats-section">

      <div className="page-header">
        <h1>📄 ATS Resume Report</h1>

        <p>
          Upload and analyze your resume to generate an ATS report.
        </p>
      </div>

      <div className="dashboard-card">

        <h2>📤 No Resume Analysis Yet</h2>

        <p>
          Please upload your resume and click <b>Analyze Resume</b> from the
          Dashboard to generate:
        </p>

        <ul className="skills-list">
          <li>✅ ATS Score</li>
          <li>✅ ATS Suggestions</li>
          <li>✅ Resume vs Job Description Match</li>
          <li>✅ AI Career Summary</li>
          <li>✅ Resume Rewrite</li>
          <li>✅ Recommended Jobs</li>
          <li>✅ Interview Questions</li>
        </ul>

      </div>

    </div>
  );
}
  return (
    <div className="ats-section">

      <div className="page-header">
        <h1>📄 ATS Resume Report</h1>

        <p>
          Improve your resume's ATS score, compare it with the job description,
          and receive AI-powered career recommendations.
        </p>
      </div>

      {/* ATS Score */}

      <div className="ats-score-card">

        <h2>ATS Score</h2>

        <h1>{ats?.ats_score || 0}%</h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${ats?.ats_score || 0}%`,
            }}
          ></div>
        </div>

      </div>

      <br />

      {/* ATS Suggestions */}

      <div className="dashboard-card">

        <h2>💡 ATS Suggestions</h2>

        {ats?.suggestions?.length > 0 ? (

          ats.suggestions.map((item, index) => (

            <div
              key={index}
              className="roadmap-item"
            >
              ✅ {item}
            </div>

          ))

        ) : (

          <div className="roadmap-item">
            🎉 Excellent! Your resume is ATS friendly.
          </div>

        )}

      </div>

      <br />

      {/* JD Match */}

      {jdMatch && (

        <div className="dashboard-card">

          <h2>📋 Resume vs Job Description</h2>

          <h1>{jdMatch.match_score}%</h1>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${jdMatch.match_score}%`,
              }}
            ></div>
          </div>

          <br />

          <h3>✅ Matched Skills</h3>

          {jdMatch.matched_skills.map((skill, index) => (

            <div
              key={index}
              className="roadmap-item"
            >
              {skill}
            </div>

          ))}

          <br />

          <h3>❌ Missing Skills</h3>

          {jdMatch.missing_skills.map((skill, index) => (

            <div
              key={index}
              className="roadmap-item"
            >
              {skill}
            </div>

          ))}

        </div>

      )}

      <br />

      {/* Career Summary */}

      <div className="dashboard-card">

        <h2>🤖 AI Career Summary</h2>

        <div className="roadmap-item">
          {summary?.summary || "No summary available."}
        </div>

      </div>

      <br />

      {/* Resume Suggestions */}

      <div className="dashboard-card">

        <h2>📈 Resume Improvement Suggestions</h2>

        {suggestions?.suggestions?.map((item, index) => (

          <div
            key={index}
            className="roadmap-item"
          >
            {item}
          </div>

        ))}

      </div>

      <br />

      {/* Rewrite */}

      <button
        className="analyze-btn"
        onClick={rewriteResume}
      >
        ✨ Rewrite Resume with AI
      </button>

      <br />
      <br />

      {rewrittenResume && (

        <div className="dashboard-card">

          <h2>📄 AI Improved Resume</h2>

          <pre className="resume-preview">
            {rewrittenResume}
          </pre>

        </div>

      )}

      <br />

      {/* Jobs */}

      <div className="dashboard-card">

        <h2>💼 Recommended Jobs</h2>

        {jobs?.jobs?.map((job, index) => (

          <div
            key={index}
            className="job-card"
          >

            <h3>{job.role}</h3>

            <p>
              Match Score : {job.match}
            </p>

          </div>

        ))}

      </div>

      <br />

      {/* Interview */}

      <div className="dashboard-card">

        <h2>🎤 Interview Questions</h2>

        {interviewQuestions?.map((q, index) => (

          <div
            key={index}
            className="roadmap-item"
          >
            <b>Q{index + 1}</b> {q}
          </div>

        ))}

      </div>

    </div>
  );
}

export default ATS;