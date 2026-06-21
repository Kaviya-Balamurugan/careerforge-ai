PROJECTS = {

    "Deep Learning": [
        "Brain Tumor Classification using CNN",
        "Image Classification System"
    ],

    "TensorFlow": [
        "Handwritten Digit Recognition",
        "Object Detection System"
    ],

    "FastAPI": [
        "AI Resume Analyzer API",
        "Student Management API"
    ],

    "Docker": [
        "Containerized ML Application"
    ],

    "LangGraph": [
        "CareerForge AI",
        "Multi-Agent Career Coach"
    ]
}

def get_projects(skills):

    projects = []

    for skill in skills:
        projects.extend(
            PROJECTS.get(skill, [])
        )

    return projects