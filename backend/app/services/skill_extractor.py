def extract_skills(text):

    common_skills = [
        "Python",
        "Java",
        "C++",
        "TensorFlow",
        "PyTorch",
        "Machine Learning",
        "Deep Learning",
        "SQL",
        "FastAPI",
        "Docker",
        "LangGraph",
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Git"
    ]

    found_skills = []

    for skill in common_skills:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    return found_skills