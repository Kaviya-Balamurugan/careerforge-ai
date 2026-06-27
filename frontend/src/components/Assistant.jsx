function Assistant({
  chatQuestion,
  setChatQuestion,
  askResumeAI,
  quickPrompt,
  loading,
  chatHistory,
  isTyping,
  chatEndRef,
  downloadReport,
}) {
  return (
    <div className="assistant-section">

      <div className="page-header">

        <h1>🤖 CareerForge AI Assistant</h1>

        <p>
          Ask questions about your resume, career path, interview preparation,
          LinkedIn profile, or resume improvements.
        </p>

      </div>

      {/* Quick Actions */}

      <div className="quick-actions">

        <button onClick={() => quickPrompt("How can I improve my resume?")}>
          🚀 Improve Resume
        </button>

        <button onClick={() => quickPrompt("Generate a professional cover letter.")}>
          💼 Cover Letter
        </button>

        <button onClick={() => quickPrompt("Generate a LinkedIn headline.")}>
          🔗 LinkedIn Headline
        </button>

        <button onClick={() => quickPrompt("Rewrite my projects professionally.")}>
          📄 Rewrite Projects
        </button>

        <button onClick={() => quickPrompt("Give me career advice.")}>
          🎯 Career Advice
        </button>

      </div>

      {/* Chat Box */}

      <div className="chat-box">

        <div className="chat-title">
          💬 AI Conversation
        </div>

        <textarea
          className="chat-input"
          placeholder="Ask anything about your resume..."
          value={chatQuestion}
          onChange={(e) => setChatQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              askResumeAI();
            }
          }}
        />

        <button
          className="analyze-btn"
          onClick={askResumeAI}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <div className="chat-history">

          {chatHistory.map((chat, index) => (

            <div key={index}>

              <div className="user-bubble">

                👤 {chat.question}

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

      <br />

      <button
        className="download-btn"
        onClick={downloadReport}
      >
        📥 Download Career Report
      </button>

    </div>
  );
}

export default Assistant;