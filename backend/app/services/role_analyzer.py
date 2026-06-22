def get_required_skills(role):

    role = role.lower()

    if "ai" in role:
        return [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "TensorFlow",
            "FastAPI",
            "Docker",
            "LangGraph"
        ]

    elif "data" in role:
        return [
            "Python",
            "SQL",
            "Statistics",
            "Machine Learning",
            "Pandas"
        ]

    elif "frontend" in role:
        return [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "TypeScript"
        ]

    elif "full stack" in role:
        return [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js"
        ]

    elif "devops" in role:
        return [
            "Linux",
            "Docker",
            "Kubernetes",
            "AWS",
            "Terraform"
        ]

    elif "ml" in role:
        return [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "TensorFlow",
            "PyTorch"
        ]

    return [
        "Python",
        "SQL",
        "Git"
    ]