RESOURCES = {

    "Deep Learning": [
        "Deep Learning Specialization - Coursera",
        "Neural Networks and Deep Learning - DeepLearning.AI"
    ],

    "TensorFlow": [
        "TensorFlow Official Tutorials",
        "TensorFlow for Beginners"
    ],

    "FastAPI": [
        "FastAPI Official Documentation",
        "FastAPI Crash Course"
    ],

    "Docker": [
        "Docker Official Documentation",
        "Docker for Beginners"
    ],

    "LangGraph": [
        "LangGraph Documentation",
        "LangGraph Tutorials"
    ],

    "PyTorch": [
        "PyTorch Official Tutorials",
        "PyTorch Deep Learning Course"
    ],

    "AWS": [
        "AWS Cloud Practitioner Course",
        "AWS Skill Builder"
    ],

    "Kubernetes": [
        "Kubernetes Official Docs",
        "Kubernetes for Beginners"
    ],

    "React": [
        "React Official Documentation",
        "React Crash Course"
    ],

    "Node.js": [
        "Node.js Official Docs",
        "Node.js Complete Guide"
    ],

    "Spring Boot": [
        "Spring Boot Documentation",
        "Spring Boot Crash Course"
    ],

    "Cyber Security": [
        "TryHackMe",
        "OWASP Top 10"
    ],

    "Linux": [
        "Linux Journey",
        "Linux Command Line Basics"
    ]
}


def get_resources(skill):
    return RESOURCES.get(
        skill,
        [f"{skill} Official Documentation"]
    )