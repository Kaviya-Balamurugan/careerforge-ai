from backend.app.services.ai_service import ask_ai

def generate_questions(role, resume_text):

    prompt = f"""
    You are an expert interviewer.

    Candidate Resume:

    {resume_text}

    Target Role:
    {role}

    Generate exactly 10 technical interview questions.

    Make the questions based on BOTH:
    - the candidate's resume
    - the target role

    Return only the questions.
    One question per line.
    """

    response = ask_ai(prompt)

    if not response or response.startswith("⚠️") or response.startswith("ERROR"):

        return [
            "Tell me about yourself.",
            "Explain one of your projects.",
            "Why are you interested in this role?",
            "Explain your favorite technology.",
            "Describe a difficult bug you fixed.",
            "How do you optimize machine learning models?",
            "What challenges did you face in your project?",
            "Explain overfitting and underfitting.",
            "How would you deploy an ML model?",
            "What are your future career goals?"
        ]

    return [
        q.strip()
        for q in response.split("\n")
        if q.strip()
    ]