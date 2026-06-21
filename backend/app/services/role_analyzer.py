ROLE_SKILLS = {
    "AI Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "FastAPI",
        "Docker",
        "LangGraph"
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "Machine Learning",
        "Statistics",
        "Pandas"
    ],

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js"
    ]
}

def get_required_skills(role):
    return ROLE_SKILLS.get(role, [])