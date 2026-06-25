from backend.app.services.ai_service import ask_ai
import json

def evaluate_answer(question, answer):

    prompt = f"""
    You are a technical interviewer.

    Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate the answer.

    Return ONLY JSON.

    Example:

    {{
        "score": 8,
        "feedback": [
            "Good technical knowledge",
            "Add more examples",
            "Explain implementation details"
        ]
    }}
    """

    response = ask_ai(prompt)

    print("AI EVALUATION RESPONSE:")
    print(response)

    try:
        # Remove markdown fences
        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

        return json.loads(response)

    except Exception as e:
        print("JSON ERROR:", e)

        return {
            "score": 5,
            "feedback": [
                "Evaluation unavailable"
            ]
        }