import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("AI Engineer");
  const [result, setResult] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [learningPlan, setLearningPlan] = useState(null);
  const [projects, setProjects] = useState(null);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload Resume
      const uploadResponse = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      const filename = uploadResponse.data.filename;

      // Skill Gap
      const gapResponse = await axios.get(
        "http://127.0.0.1:8000/skill-gap",
        {
          params: {
            filename,
            role,
          },
        }
      );

      setResult(gapResponse.data);

      // Roadmap
      const roadmapResponse = await axios.get(
        "http://127.0.0.1:8000/roadmap",
        {
          params: {
            filename,
            role,
          },
        }
      );

      setRoadmap(roadmapResponse.data);

      // Learning Plan
      const learningResponse = await axios.get(
        "http://127.0.0.1:8000/learning-plan",
        {
          params: {
            filename,
            role,
          },
        }
      );

      setLearningPlan(learningResponse.data);

      // Project Recommendations
      const projectResponse = await axios.get(
        "http://127.0.0.1:8000/project-recommendations",
        {
          params: {
            filename,
            role,
          },
        }
      );

      setProjects(projectResponse.data);

    } catch (error) {
      console.log(error);
      alert("Error analyzing resume");
    }
  };

  return (
    <div className="container">

      <h1 className="title">CareerForge AI</h1>

      <div className="card upload-section">

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>AI Engineer</option>
          <option>Data Scientist</option>
          <option>Full Stack Developer</option>
        </select>

        <button onClick={analyzeResume}>
          Analyze Resume
        </button>

      </div>

      {result && (
        <div className="card">

          <h2>Readiness Score</h2>

          <p className="score">
            {result.readiness_score}%
          </p>

          <h2>Missing Skills</h2>

          <ul className="skills-list">
            {result.missing_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h2>Learning Roadmap</h2>

          {roadmap &&
            Object.entries(roadmap.roadmap).map(
              ([week, skill]) => (
                <div
                  key={week}
                  className="roadmap-item"
                >
                  <b>{week}</b> → {skill}
                </div>
              )
            )
          }

          <h2>Learning Resources</h2>

          {learningPlan &&
            Object.entries(learningPlan).map(
              ([week, details]) => (
                <div
                  key={week}
                  className="roadmap-item"
                >
                  <h4>
                    {week} - {details.skill}
                  </h4>

                  <ul className="skills-list">
                    {details.resources.map(
                      (resource, index) => (
                        <li key={index}>
                          {resource}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )
          }

          <h2>Recommended Projects</h2>

          {projects &&
            projects.recommended_projects.map(
              (project, index) => (
                <div
                  key={index}
                  className="roadmap-item"
                >
                  {project}
                </div>
              )
            )
          }

        </div>
      )}

    </div>
  );
}

export default App;