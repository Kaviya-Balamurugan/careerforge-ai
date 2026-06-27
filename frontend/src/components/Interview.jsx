function Interview({
  generateInterviewQuestions,
  selectedQuestion,
  answer,
  setAnswer,
  evaluateAnswer,
  evaluation,
}) {
  return (
    <div className="interview-section">

      <div className="page-header">

        <h1>🧠 AI Mock Interview</h1>

        <p>
          Practice interview questions, submit your answers, and receive
          AI-powered feedback to improve your interview performance.
        </p>

      </div>

      <button
        className="analyze-btn"
        onClick={generateInterviewQuestions}
      >
        🎤 Generate Interview Question
      </button>

      <br />
      <br />

      {selectedQuestion && (

        <div className="question-card">

          <h2>Interview Question</h2>

          <p className="question-text">
            {selectedQuestion}
          </p>

          <textarea
            rows="6"
            className="chat-input"
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <br />
          <br />

          <button
            className="analyze-btn"
            onClick={evaluateAnswer}
          >
            ✅ Evaluate My Answer
          </button>

        </div>

      )}

      {evaluation && (

        <div className="score-card">

          <h2>⭐ Interview Evaluation</h2>

          <h1>{evaluation.score}/10</h1>

          <br />

          <h3>AI Feedback</h3>

          {evaluation.feedback.map((item, index) => (

            <div
              key={index}
              className="feedback-card"
            >
              ✔ {item}
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Interview;