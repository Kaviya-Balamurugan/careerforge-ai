import json
from backend.app.services.ai_service import ask_ai


def evaluate_readiness(resume_text, role):

    prompt = f"""
You are an expert technical recruiter.

Evaluate the following resume for the role:

Role:
{role}

Resume:
{resume_text}

Return ONLY valid JSON.

Example:

{{
    "score": 82,
    "strengths": [
        "Python",
        "Machine Learning",
        "TensorFlow"
    ],
    "weaknesses": [
        "Docker",
        "Kubernetes"
    ],
    "recommendation":
    "Strong candidate with good ML skills but needs cloud deployment experience."
}}
"""

    response = ask_ai(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "score": 70,
            "strengths": [],
            "weaknesses": [],
            "recommendation": "Unable to evaluate."
        }