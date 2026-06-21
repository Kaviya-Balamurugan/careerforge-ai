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
    ]
}

def get_resources(skill):
    return RESOURCES.get(skill, [])