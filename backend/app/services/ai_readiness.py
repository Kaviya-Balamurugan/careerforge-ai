import json
import re

from app.services.ai_service import ask_ai


def evaluate_readiness(resume_text, role):

    prompt = f"""
You are an expert technical recruiter.

Evaluate this resume for the role:

Role:
{role}

Resume:
{resume_text}

Return ONLY JSON.

Example:

{{
    "score":82,
    "strengths":[
        "Python",
        "Machine Learning"
    ],
    "weaknesses":[
        "Docker",
        "AWS"
    ],
    "recommendation":"Learn Docker and AWS to improve job readiness."
}}
"""

    response = ask_ai(prompt)

    if response is None:
        
        return {

        "score": 70,

        "strengths": [],

        "weaknesses": [],

        "recommendation": "AI service is busy. Please try again."

    }

    

    try:

        response = response.strip()

        response = response.replace("```json", "")

        response = response.replace("```", "")

        response = response.strip()

        match = re.search(r"\{.*\}", response, re.DOTALL)

        if match:

            response = match.group(0)

        print(response)

        return json.loads(response)

    except Exception as e:

        print("AI Readiness Error:", e)

        print(response)

        return {

            "score": 70,

            "strengths": [],

            "weaknesses": [],

            "recommendation": "Unable to evaluate."

        }