import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { jsPDF } from "jspdf";

function App() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("AI Engineer");
  const chatEndRef = useRef(null);

  const [result, setResult] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [learningPlan, setLearningPlan] = useState(null);
  const [projects, setProjects] = useState(null);
  const [summary, setSummary] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [ats, setAts] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jdMatch, setJdMatch] = useState(null);
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [rewrittenResume, setRewrittenResume] = useState("");
  const [resumeScore, setResumeScore] = useState(null);

  useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });

}, [chatHistory]);

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
    setUploadedFilename(filename);

    // -----------------------------
    // Run AI Agent
    // -----------------------------

    const response = await axios.post(
      "http://127.0.0.1:8000/agent",
      null,
      {
        params: {
          filename,
          role,
          goal: `Help me become a ${role}`,
        },
      }
    );

    console.log("Agent Response");
console.log(response.data);

console.log("Results");
console.log(response.data.results);

    const data = response.data.results;

    // -----------------------------
    // Skill Gap
    // -----------------------------

    if (data.skill_gap) {
      setResult(data.skill_gap);
    }

    // -----------------------------
    // Resume Score
    // -----------------------------

    if (data.resume_score) {
      setResumeScore(data.resume_score);
    }

    // -----------------------------
    // Roadmap
    // -----------------------------

    if (data.roadmap) {
      setRoadmap({
        roadmap: data.roadmap,
      });
    }

    // -----------------------------
    // Learning Plan
    // -----------------------------

    if (data.learning_plan) {
      setLearningPlan(data.learning_plan);
    }

    // -----------------------------
    // ATS
    // -----------------------------

    if (data.ats) {
      setAts(data.ats);
    }

    // -----------------------------
    // Projects
    // -----------------------------

    if (data.projects) {
      setProjects({
        recommended_projects: data.projects,
      });
    }

    // -----------------------------
    // Career Summary
    // -----------------------------

    if (data.career_summary) {
      setSummary({
        summary: data.career_summary,
      });
    }

    // -----------------------------
    // Resume Suggestions
    // -----------------------------

    if (data.resume_suggestions) {
      setSuggestions({
        suggestions: data.resume_suggestions,
      });
    }

    // -----------------------------
    // Interview Questions
    // -----------------------------

    if (data.interview_questions) {

      setInterviewQuestions(
        data.interview_questions
      );

      if (data.interview_questions.length > 0) {
        setSelectedQuestion(
          data.interview_questions[0]
        );
      }
    }

    // -----------------------------
    // Jobs
    // -----------------------------

    if (data.jobs) {
      setJobs({
        jobs: data.jobs,
      });
    }

    // -----------------------------
    // AI Resume Rewrite
    // -----------------------------

    if (data.rewritten_resume) {
      setRewrittenResume(
        data.rewritten_resume
      );
    }

    // -----------------------------
    // JD Match
    // -----------------------------

    if (jobDescription.trim() !== "") {

      const jdResponse = await axios.post(
        "http://127.0.0.1:8000/jd-match",
        null,
        {
          params: {
            filename,
            job_description: jobDescription,
          },
        }
      );

      setJdMatch(jdResponse.data);
    }

  } catch (error) {

    console.log(error);

    alert("Error analyzing resume");

  }

};

  const generateInterviewQuestions = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/interview-questions",
      {
        params: {
          role,
        },
      }
    );

    setInterviewQuestions(response.data.questions);

    if (response.data.questions.length > 0) {
      setSelectedQuestion(
        response.data.questions[0]
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const evaluateAnswer = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/evaluate-answer",
      null,
      {
        params: {
          question: selectedQuestion,
          answer: answer,
        },
      }
    );

    setEvaluation(response.data);

  } catch (error) {
    console.log(error);
    alert("Failed to evaluate answer");
  }
};

const askResumeAI = async () => {
  setLoading(true);
  setIsTyping(true);
  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/resume-chat",
      null,
      {
        params: {
          filename: uploadedFilename,
          question: chatQuestion,
        },
      }
    );

    const aiAnswer = response.data.answer;

setChatResponse(aiAnswer);

setChatHistory((prev) => [
  ...prev,
  {
    question: chatQuestion,
    answer: aiAnswer,
  },
]);

setChatQuestion("");
setLoading(false);
setIsTyping(false);

  } catch (error) {
    console.log(error);
    alert("AI Assistant Error");
  }
};

const quickPrompt = async (prompt) => {

  setLoading(true);

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/resume-chat",
      null,
      {
        params: {
          filename: uploadedFilename,
          question: prompt,
        },
      }
    );

    setChatHistory((prev) => [
      ...prev,
      {
        question: prompt,
        answer: response.data.answer,
      },
    ]);

  } catch (error) {

    console.log(error);

  }

  setLoading(false);
};

const rewriteResume = async () => {

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/rewrite-resume",
      null,
      {
        params: {
          filename: uploadedFilename,
          role,
        },
      }
    );

    setRewrittenResume(
      response.data.resume
    );

  } catch (error) {

    console.log(error);

  }

};

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("CareerForge AI Report", 20, y);

    y += 15;

    doc.setFontSize(12);
    doc.text(`Target Role: ${role}`, 20, y);

    y += 10;

    doc.text(
      `Readiness Score: ${result.readiness_score}%`,
      20,
      y
    );

    y += 15;

    doc.text("Missing Skills:", 20, y);

    y += 10;

    result.missing_skills.forEach((skill) => {
      doc.text(`• ${skill}`, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("Learning Roadmap:", 20, y);

    y += 10;

    if (roadmap) {
      Object.entries(roadmap.roadmap).forEach(
        ([week, skill]) => {
          doc.text(`${week} -> ${skill}`, 25, y);
          y += 8;
        }
      );
    }

    y += 10;

    doc.text("Recommended Projects:", 20, y);

    y += 10;

    if (projects) {
      projects.recommended_projects.forEach(
        (project) => {
          doc.text(`• ${project}`, 25, y);
          y += 8;
        }
      );
    }

    y += 10;

    doc.text(
      "Resume Improvement Suggestions:",
      20,
      y
    );

    y += 10;

    if (suggestions) {
      suggestions.suggestions.forEach(
        (suggestion) => {
          doc.text(`• ${suggestion}`, 25, y);
          y += 8;
        }
      );
      
    }

    y += 10;

doc.text(
  "Interview Questions:",
  20,
  y
);

y += 10;

if (interviewQuestions) {

  interviewQuestions.forEach(
    (question) => {

      doc.text(
        `• ${question}`,
        25,
        y
      );

      y += 8;
    }
  );
}

y += 10;

doc.text(
  "Resume vs Job Description Match",
  20,
  y
);

y += 10;

if (jdMatch) {

  doc.text(
    `Match Score: ${jdMatch.match_score}%`,
    25,
    y
  );

  y += 10;

  jdMatch.missing_skills.forEach(
    (skill) => {
      doc.text(
        `Missing: ${skill}`,
        25,
        y
      );

      y += 8;
    }
  );
}
    doc.save("CareerForge_Report.pdf");
  };

  return (
    <div className="container">
      <h1 className="title">CareerForge AI</h1>

      <div className="card upload-section">
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <input
          type="text"
          placeholder="Enter Target Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        />

        <textarea
  rows="6"
  placeholder="Paste Job Description Here"
  value={jobDescription}
  onChange={(e) =>
    setJobDescription(e.target.value)
  }
/>

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

          {resumeScore && (

<div className="card">

<h2>📊 AI Resume Analytics</h2>

<div className="analytics-grid">

<div className="analytics-item">
<h4>Overall Score</h4>

<div className="progress-container">
<div
className="progress-bar"
style={{
width: `${resumeScore.overall_score}%`
}}
></div>
</div>

<p>{resumeScore.overall_score}%</p>

</div>

<div className="analytics-item">
<h4>Technical Skills</h4>

<div className="progress-container">
<div
className="progress-bar"
style={{
width: `${resumeScore.technical_skills}%`
}}
></div>
</div>

<p>{resumeScore.technical_skills}%</p>

</div>

<div className="analytics-item">
<h4>Projects</h4>

<div className="progress-container">
<div
className="progress-bar"
style={{
width: `${resumeScore.projects}%`
}}
></div>
</div>

<p>{resumeScore.projects}%</p>

</div>

<div className="analytics-item">
<h4>Experience</h4>

<div className="progress-container">
<div
className="progress-bar"
style={{
width: `${resumeScore.experience}%`
}}
></div>
</div>

<p>{resumeScore.experience}%</p>

</div>

<div className="analytics-item">
<h4>ATS Quality</h4>

<div className="progress-container">
<div
className="progress-bar"
style={{
width: `${resumeScore.ats}%`
}}
></div>
</div>

<p>{resumeScore.ats}%</p>

</div>

<div className="analytics-item">
<h4>Resume Quality</h4>

<div className="progress-container">
<div
className="progress-bar"
style={{
width: `${resumeScore.resume_quality}%`
}}
></div>
</div>

<p>{resumeScore.resume_quality}%</p>

</div>

</div>

<div className="roadmap-item">

<b>🤖 AI Summary</b>

<br /><br />

{resumeScore.summary}

</div>

</div>

)}

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${result.readiness_score}%`,
              }}
            ></div>
          </div>

          <h2>Missing Skills</h2>

          <ul className="skills-list">
            {result.missing_skills.map(
              (skill, index) => (
                <li key={index}>{skill}</li>
              )
            )}
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
            )}

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
            )}

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
            )}

            <h2>ATS Score</h2>

{ats && (
  <>
    <p className="score">
      {ats.ats_score}%
    </p>

    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          width: `${ats.ats_score}%`,
        }}
      ></div>
    </div>

    <h3>ATS Suggestions</h3>

    {ats.suggestions.length === 0 ? (
      <div className="roadmap-item">
        Excellent Resume! ATS Friendly.
      </div>
    ) : (
      ats.suggestions.map(
        (suggestion, index) => (
          <div
            key={index}
            className="roadmap-item"
          >
            {suggestion}
          </div>
        )
      )
    )}
  </>
)}

<h2>Resume vs Job Description Match</h2>

{jdMatch && (
  <>
    <p className="score">
      {jdMatch.match_score}%
    </p>

    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          width: `${jdMatch.match_score}%`,
        }}
      ></div>
    </div>

    <h3>Matched Skills</h3>

    {jdMatch.matched_skills.map(
      (skill, index) => (
        <div
          key={index}
          className="roadmap-item"
        >
          ✅ {skill}
        </div>
      )
    )}

    <h3>Missing Skills</h3>

    {jdMatch.missing_skills.map(
      (skill, index) => (
        <div
          key={index}
          className="roadmap-item"
        >
          ❌ {skill}
        </div>
      )
    )}
  </>
)}

          <h2>Career Summary</h2>

          {summary && (
            <div className="roadmap-item">
              {summary.summary}
            </div>
          )}

          <h2>Resume Improvement Suggestions</h2>

          {suggestions &&
            suggestions.suggestions.map(
              (suggestion, index) => (
                <div
                  key={index}
                  className="roadmap-item"
                >
                  {suggestion}
                </div>
              )
            )}
            <br />

<button onClick={rewriteResume}>
  ✨ Rewrite Resume with AI
</button>

<br />
<br />

{rewrittenResume && (
  <div className="roadmap-item">
    <h3>AI Improved Resume</h3>

    <pre
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}
    >
      {rewrittenResume}
    </pre>
  </div>
)}

          <h2>Recommended Jobs</h2>

          {jobs &&
            jobs.jobs.map((job, index) => (
              <div
                key={index}
                className="roadmap-item"
              >
                <b>{job.role}</b> - Match Score:{" "}
                {job.match}
              </div>
            ))}

          <br />

          <h2>Interview Questions</h2>

{interviewQuestions &&
  interviewQuestions.map(
    (question, index) => (
      <div
        key={index}
        className="roadmap-item"
      >
        <b>Q{index + 1}.</b> {question}
      </div>
    )
  )
}

<h2>Mock Interview</h2>

<button
  onClick={generateInterviewQuestions}
>
  Generate Questions
</button>

<br />
<br />

{selectedQuestion && (
  <div className="roadmap-item">

    <h3>Question</h3>

    <p>{selectedQuestion}</p>

    <textarea
      rows="5"
      cols="60"
      placeholder="Enter your answer"
      value={answer}
      onChange={(e) =>
        setAnswer(e.target.value)
      }
    />

    <br />
    <br />

    <button
      onClick={evaluateAnswer}
    >
      Submit Answer
    </button>

  </div>
)}

{evaluation && (
  <div className="roadmap-item">

    <h3>
      Score: {evaluation.score}/10
    </h3>

    {evaluation.feedback.map(
      (item, index) => (
        <div key={index}>
          • {item}
        </div>
      )
    )}

  </div>
)}

<div className="chat-container">

  <div className="chat-box">
    <div className="quick-actions">

  <button
    onClick={() =>
      quickPrompt(
        "How can I improve my resume?"
      )
    }
  >
    🚀 Improve Resume
  </button>

  <button
    onClick={() =>
      quickPrompt(
        "Generate a professional cover letter based on my profile."
      )
    }
  >
    💼 Cover Letter
  </button>

  <button
    onClick={() =>
      quickPrompt(
        "Generate a strong LinkedIn headline for me."
      )
    }
  >
    🔗 LinkedIn Headline
  </button>

  <button
    onClick={() =>
      quickPrompt(
        "Rewrite my project descriptions professionally."
      )
    }
  >
    📄 Rewrite Projects
  </button>

  <button
    onClick={() =>
      quickPrompt(
        "Give me career advice based on my resume."
      )
    }
  >
    🎯 Career Advice
  </button>

</div>

    <div className="chat-title">
      🤖 CareerForge AI Assistant
    </div>

    <textarea
  className="chat-input"
  placeholder="Ask anything about your resume..."
  value={chatQuestion}
  onChange={(e) =>
    setChatQuestion(e.target.value)
  }
  onKeyDown={(e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      askResumeAI();
    }

  }}
/>

    <button
  onClick={askResumeAI}
  disabled={loading}
>
  {loading ? "Thinking..." : "Ask AI"}
</button>

    <div className="chat-history">

  {chatHistory.map((chat, index) => (

    <div key={index}>

      <div className="user-bubble">
        {chat.question}
      </div>

      <div className="ai-message">

  <div className="ai-avatar">
    🤖
  </div>

  <div className="ai-bubble">
    {chat.answer}
  </div>

</div>

    </div>

  ))}

  {isTyping && (

  <div className="typing-indicator">

    <span></span>
    <span></span>
    <span></span>

  </div>

)}

<div ref={chatEndRef}></div>

</div>

  </div>

</div>
          <button onClick={downloadReport}>
            Download Career Report
          </button>
        </div>
      )}
    </div>
  );
}

export default App;