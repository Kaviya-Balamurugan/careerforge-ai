from app.services.ai_service import ask_ai
import json


def get_job_recommendations(skills, target_role):

    prompt = f"""
    You are an AI Career Advisor.

    User Target Role:
    {target_role}

    Resume Skills:
    {", ".join(skills)}

    Recommend exactly 5 job roles closely related to the target role.

    For each role,
    estimate a realistic match percentage based on the resume skills.

    Return ONLY valid JSON.

    Example:

    {{
        "jobs":[
            {{
                "role":"Machine Learning Engineer",
                "match":92
            }},
            {{
                "role":"AI Engineer",
                "match":88
            }}
        ]
    }}
    """

    response = ask_ai(prompt, temperature=0.3)

    try:
        return json.loads(response)["jobs"]

    except Exception:

        return [
            {
                "role": target_role,
                "match": 80
            }
        ]