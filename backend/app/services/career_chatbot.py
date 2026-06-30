from app.services.role_analyzer import get_required_skills

def career_chat(user_message):

    message = user_message.lower()

    if "docker" in message:
        return "Docker is a containerization platform used for deploying applications."

    elif "tensorflow" in message:
        return "TensorFlow is a deep learning framework developed by Google."

    elif "langgraph" in message:
        return "LangGraph helps build AI agents and multi-agent workflows."

    elif "ai engineer" in message:
        return "An AI Engineer should know Python, Machine Learning, Deep Learning, TensorFlow, APIs, and deployment."

    else:
        return (
            "I can help with careers, skills, projects, interview preparation, ATS optimization, and learning roadmaps."
        )