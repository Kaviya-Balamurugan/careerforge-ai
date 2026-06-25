from backend.app.services.ai_service import ask_ai

def generate_questions(role):

    prompt = f"""
    Generate 10 technical interview questions
    for a {role}.

    Return only the questions.
    One question per line.
    """

    response = ask_ai(prompt)

    questions = [
        q.strip()
        for q in response.split("\n")
        if q.strip()
    ]

    return questions