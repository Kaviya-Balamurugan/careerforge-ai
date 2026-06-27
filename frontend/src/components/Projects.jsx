function Projects({ projects }) {
  return (
    <div className="projects-section">

      <div className="page-header">

        <h1>🚀 Recommended Projects</h1>

        <p>
          Build these AI-powered projects to strengthen your portfolio and improve your chances of landing your dream job.
        </p>

      </div>

      {projects?.recommended_projects?.length > 0 ? (

        <div className="projects-grid">

          {projects.recommended_projects.map((project, index) => (

            <div
              key={index}
              className="project-card"
            >

              <div className="project-icon">
                🚀
              </div>

              <h3>Project {index + 1}</h3>

              <p>{project}</p>

            </div>

          ))}

        </div>

      ) : (

        <div className="roadmap-item">

          No project recommendations available.

        </div>

      )}

    </div>
  );
}

export default Projects;