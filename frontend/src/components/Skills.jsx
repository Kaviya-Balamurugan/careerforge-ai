function Skills({ result, roadmap, learningPlan }) {
  return (
    <div className="skill-gap-section">

      <div className="page-header">

        <h1>🎯 Skill Gap Analysis</h1>

        <p>
          Discover your missing skills and follow your personalized learning roadmap.
        </p>

      </div>

      <h2>🎯 Missing Skills</h2>

      <div className="skill-container">
        {result?.missing_skills?.map((skill, index) => (
          <div key={index} className="skill-chip">
            {skill}
          </div>
        ))}
      </div>

      <br />

      <h2>🛣️ Learning Roadmap</h2>

      <div className="timeline">

        {roadmap?.roadmap &&
          Object.entries(roadmap.roadmap).map(([week, skill]) => (

            <div className="timeline-item" key={week}>

              <div className="timeline-circle"></div>

              <div className="timeline-content">

                <b>{week}</b>

                <p>{skill}</p>

              </div>

            </div>

          ))}

      </div>

      <br />

      <h2>📚 Learning Resources</h2>

      {learningPlan &&
        Object.entries(learningPlan).map(([week, details]) => (

          <div key={week} className="roadmap-item">

            <h4>
              {week} - {details.skill}
            </h4>

            <ul className="skills-list">

              {details.resources.map((resource, index) => (

                <li key={index}>
                  {resource}
                </li>

              ))}

            </ul>

          </div>

        ))}

    </div>
  );
}

export default Skills;