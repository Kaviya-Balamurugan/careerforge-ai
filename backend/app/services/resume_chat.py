from backend.app.services.ai_service import ask_ai

def chat_with_resume(resume_text, question):

    prompt = f"""
    You are CareerForge AI.

    Resume:

    {resume_text}

    User Question:

    {question}

    Answer based on the resume.
    """

    return ask_ai(prompt)