ROLE_SKILLS = {

    "AI Engineer": [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Keras",
        "Scikit-learn",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Seaborn",
        "OpenCV",
        "NLTK",
        "SciPy"
    ],

    "ML Engineer": [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "NumPy",
        "Pandas",
        "Machine Learning",
        "Deep Learning",
        "Statistics",
        "SQL",
        "OpenCV",
        "Git"
    ],

    "Data Scientist": [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "SQL",
        "Statistics",
        "Machine Learning",
        "Power BI",
        "Tableau",
        "Matplotlib",
        "Seaborn",
        "Excel"
    ],

    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Redux",
        "TypeScript",
        "Git",
        "REST API",
        "Bootstrap",
        "Tailwind CSS",
        "Next.js",
        "Responsive Design"
    ]
}


def get_required_skills(role):
    return ROLE_SKILLS.get(role, [])