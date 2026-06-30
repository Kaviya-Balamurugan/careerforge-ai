import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { jsPDF } from "jspdf";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ATS from "./components/ATS";
import Assistant from "./components/Assistant";
import Interview from "./components/Interview";


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
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [rewrittenResume, setRewrittenResume] = useState("");
  const [resumeScore, setResumeScore] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

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

    const response = await axios.post(
      "http://127.0.0.1:8000/agent",
      null,
      {
        params: {
    filename: filename,
    role: role,
    goal: `Help me become a ${role}`,
}
      }
    );

    console.log("Agent Response");
console.log(response.data);

console.log("Results");
console.log(response.data.results);

    const data = response.data.results;

    if (data.skill_gap) {
      setResult(data.skill_gap);
    }

    if (data.resume_score) {
      setResumeScore(data.resume_score);
    }

    if (data.roadmap) {
      setRoadmap({
        roadmap: data.roadmap,
      });
    }

    if (data.learning_plan) {
      setLearningPlan(data.learning_plan);
    }

    if (data.ats) {
      setAts(data.ats);
    }

    if (data.projects) {
      setProjects({
        recommended_projects: data.projects,
      });
    }

    if (data.career_summary) {
      setSummary({
        summary: data.career_summary,
      });
    }

    if (data.resume_suggestions) {
      setSuggestions({
        suggestions: data.resume_suggestions,
      });
    }

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

    if (data.jobs) {
      setJobs({
        jobs: data.jobs,
      });
    }

    if (data.rewritten_resume) {
      setRewrittenResume(
        data.rewritten_resume
      );
    }
    // ================= ATS =================
const atsResponse = await axios.get(
  "http://127.0.0.1:8000/ats-score",
  {
    params: {
      filename: filename,
    },
  }
);

setAts(atsResponse.data);

// ================= Career Summary =================
const summaryResponse = await axios.get(
  "http://127.0.0.1:8000/career-summary",
  {
    params: {
      filename: filename,
      role: role,
    },
  }
);

setSummary(summaryResponse.data);

// ================= Jobs =================
const jobsResponse = await axios.get(
  "http://127.0.0.1:8000/job-recommendations",
  {
    params: {
      filename: filename,
      role: role,
    },
  }
);

setJobs(jobsResponse.data);

// ================= Interview Questions =================
const interviewResponse = await axios.get(
  "http://127.0.0.1:8000/interview-questions",
  {
    params: {
      filename: filename,
      role: role,
    },
  }
);

const questions = interviewResponse.data.questions || [];

setInterviewQuestions(questions);

if (questions.length > 0) {
    setSelectedQuestion(questions[0]);
}
// ================= Rewrite Resume =================
const rewriteResponse = await axios.post(
  "http://127.0.0.1:8000/rewrite-resume",
  null,
  {
    params: {
      filename: filename,
      role: role,
    },
  }
);

setRewrittenResume(rewriteResponse.data.resume);

    if (jobDescription.trim() !== "") {

      const jdResponse = await axios.post(
    "http://127.0.0.1:8000/jd-match",
    null,
    {
        params: {
            filename: filename,
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
            filename: uploadedFilename,
            role: role,
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

  if (!chatQuestion.trim()) return;

  setLoading(true);
  setIsTyping(true);
  console.log("Filename:", uploadedFilename);
console.log("Role:", role);
console.log("Question:", chatQuestion);
console.log("Sending request...");

  try {

    const response = await axios.post(
  "http://127.0.0.1:8000/resume-chat",
  null,
  {
    params: {
      filename: uploadedFilename,
      role: role,
      question: chatQuestion,
    },
  }
);
    const aiAnswer = response.data.answer;

    setChatHistory((prev) => [
      ...prev,
      {
        question: chatQuestion,
        answer: aiAnswer,
      },
    ]);

    setChatQuestion("");

  } catch (error) {

    console.error(error);

    setChatHistory((prev) => [
      ...prev,
      {
        question: chatQuestion,
        answer:
          "⚠️ AI service is temporarily unavailable. Please try again in a few minutes.",
      },
    ]);

  } finally {

    // This ALWAYS executes
    setLoading(false);
    setIsTyping(false);

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
    role: role,
    question: prompt,
}
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

    if (
  projects &&
  projects.recommended_projects &&
  projects.recommended_projects.length > 0
) {
  projects.recommended_projects.forEach((project) => {
    doc.text(`• ${project}`, 25, y);
    y += 8;
  });
}

    y += 10;

    doc.text(
      "Resume Improvement Suggestions:",
      20,
      y
    );

    y += 10;

    if (
  suggestions &&
  suggestions.suggestions
) {
    suggestions.suggestions.forEach((suggestion) => {
        doc.text(`• ${suggestion}`, 25, y);
        y += 8;
    });
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

if (jdMatch && jdMatch.missing_skills) {

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
  <div className="app-layout">

    <Sidebar
      activePage={activePage}
      setActivePage={setActivePage}
    />

    <main className="main-content">

      <div className="container">

        {activePage === "dashboard" && (
          <Dashboard
            file={file}
            setFile={setFile}
            role={role}
            setRole={setRole}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            analyzeResume={analyzeResume}
            result={result}
            resumeScore={resumeScore}
            ats={ats}
            jobs={jobs}
          />
        )}

        {result && (
          <div className="card">
            <h2>Readiness Score</h2>

            <p className="score">
              {result.readiness_score}%
            </p>

            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${result.readiness_score}%`,
                }}
              />
            </div>
          </div>
        )}

        {activePage === "analytics" && (
          <Analytics resumeScore={resumeScore} />
        )}

        {activePage === "skills" && (
          <Skills
            result={result}
            roadmap={roadmap}
            learningPlan={learningPlan}
          />
        )}

        {activePage === "projects" && (
          <Projects projects={projects} />
        )}

        {activePage === "ats" && (
          <ATS
            ats={ats}
            jdMatch={jdMatch}
            summary={summary}
            suggestions={suggestions}
            rewrittenResume={rewrittenResume}
            rewriteResume={rewriteResume}
            jobs={jobs}
            interviewQuestions={interviewQuestions}
          />
        )}

        {activePage === "assistant" && (
          <Assistant
            chatQuestion={chatQuestion}
            setChatQuestion={setChatQuestion}
            askResumeAI={askResumeAI}
            quickPrompt={quickPrompt}
            loading={loading}
            chatHistory={chatHistory}
            isTyping={isTyping}
            chatEndRef={chatEndRef}
            downloadReport={downloadReport}
          />
        )}

        {activePage === "interview" && (
          <Interview
            generateInterviewQuestions={generateInterviewQuestions}
            selectedQuestion={selectedQuestion}
            answer={answer}
            setAnswer={setAnswer}
            evaluateAnswer={evaluateAnswer}
            evaluation={evaluation}
          />
        )}

      </div>

    </main>

  </div>
);
}
export default App;