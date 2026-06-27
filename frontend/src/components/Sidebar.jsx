import {
  FaHome,
  FaChartBar,
  FaBrain,
  FaProjectDiagram,
  FaFileAlt,
  FaRobot,
  FaUserTie,
} from "react-icons/fa";

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      <div className="logo-section">
        <h2 className="logo">CareerForge AI</h2>
        <p>AI Career Assistant</p>
      </div>

      <nav className="sidebar-menu">

        <div
          className={`menu-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div
          className={`menu-item ${activePage === "analytics" ? "active" : ""}`}
          onClick={() => setActivePage("analytics")}
        >
          <FaChartBar />
          <span>Resume Analytics</span>
        </div>

        <div
          className={`menu-item ${activePage === "skills" ? "active" : ""}`}
          onClick={() => setActivePage("skills")}
        >
          <FaBrain />
          <span>Skill Gap</span>
        </div>

        <div
          className={`menu-item ${activePage === "projects" ? "active" : ""}`}
          onClick={() => setActivePage("projects")}
        >
          <FaProjectDiagram />
          <span>Projects</span>
        </div>

        <div
          className={`menu-item ${activePage === "ats" ? "active" : ""}`}
          onClick={() => setActivePage("ats")}
        >
          <FaFileAlt />
          <span>ATS Report</span>
        </div>

        <div
          className={`menu-item ${activePage === "assistant" ? "active" : ""}`}
          onClick={() => setActivePage("assistant")}
        >
          <FaRobot />
          <span>AI Assistant</span>
        </div>

        <div
          className={`menu-item ${activePage === "interview" ? "active" : ""}`}
          onClick={() => setActivePage("interview")}
        >
          <FaUserTie />
          <span>Mock Interview</span>
        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;