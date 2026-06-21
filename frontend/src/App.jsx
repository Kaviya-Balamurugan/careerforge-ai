import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [role, setRole] = useState("AI Engineer");
  const [result, setResult] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

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

      // Skill Gap Analysis
      const gapResponse = await axios.get(
        "http://127.0.0.1:8000/skill-gap",
        {
          params: {
            filename: filename,
            role: role
          }
        }
      );

      setResult(gapResponse.data);

      // Roadmap
      const roadmapResponse = await axios.get(
        "http://127.0.0.1:8000/roadmap",
        {
          params: {
            filename: filename,
            role: role
          }
        }
      );

      setRoadmap(roadmapResponse.data);

      console.log(gapResponse.data);
      console.log(roadmapResponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CareerForge AI</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>AI Engineer</option>
        <option>Data Scientist</option>
        <option>Full Stack Developer</option>
      </select>

      <br /><br />

      <button onClick={analyzeResume}>
        Analyze
      </button>

      <br /><br />

      {result && (
        <div>

          <h2>Readiness Score</h2>
          <p>{result.readiness_score}%</p>

          <h2>Missing Skills</h2>

          <ul>
            {result.missing_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h2>Learning Roadmap</h2>

          {roadmap &&
            Object.entries(roadmap.roadmap).map(
              ([week, skill]) => (
                <p key={week}>
                  <b>{week}</b> → {skill}
                </p>
              )
            )
          }

        </div>
      )}
    </div>
  );
}

export default App;