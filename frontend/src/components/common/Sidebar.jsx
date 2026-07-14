import {
    FaHome,
    FaChartBar,
    FaBrain,
    FaProjectDiagram,
    FaFileAlt,
    FaRobot,
    FaUserTie,
    FaFileUpload,
    FaMagic,
    FaComments,
    FaUserGraduate,
    FaSignOutAlt
} from "react-icons/fa";
import { NavLink, useNavigate  } from "react-router-dom";

const menuItems = [

    {
        name: "Resume",
        path: "/resume",
        icon: <FaFileUpload />,
    },

    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FaHome />,
    },

    {
    name: "Career Summary",
    path: "/summary",
    icon: <FaUserGraduate />,
},

    {
        name: "Resume Rewrite",
        path: "/rewrite",
        icon: <FaMagic />,
    },
    {
    name: "Resume Chat",
    path: "/chat",
    icon: <FaComments />,
},


    {
        name: "Resume Analytics",
        path: "/analytics",
        icon: <FaChartBar />,
    },

    {
        name: "Skill Gap",
        path: "/skills",
        icon: <FaBrain />,
    },

    {
        name: "Projects",
        path: "/projects",
        icon: <FaProjectDiagram />,
    },

    {
        name: "ATS Report",
        path: "/ats",
        icon: <FaFileAlt />,
    },

    {
        name: "AI Assistant",
        path: "/assistant",
        icon: <FaRobot />,
    },

    {
        name: "Mock Interview",
        path: "/interview",
        icon: <FaUserTie />,
    }

    

];

export default function Sidebar() {

    const navigate = useNavigate();

    function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("resumeFilename");

    navigate("/login", { replace: true });

}

    return (

        <aside className="sidebar">

            <div className="logo-section">

                <h1 className="logo">CareerForge AI</h1>

                <p>AI Career Development Platform</p>

            </div>

            <nav className="sidebar-menu">

                {

                    menuItems.map((item) => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>
                                isActive
                                    ? "menu-item active"
                                    : "menu-item"
                            }

                        >

                            {item.icon}

                            <span>{item.name}</span>

                        </NavLink>

                    ))

                }

            </nav>

            <button
    className="logout-btn"
    onClick={handleLogout}
    type="button"
>
    <FaSignOutAlt />
    <span>Logout</span>
</button>   

        </aside>

    );

}