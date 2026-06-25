import ast
from backend.app.services.ai_service import ask_ai


def get_required_skills(role):

    prompt = f"""
You are an expert technical recruiter.

Generate the top 12 MOST IMPORTANT technical skills required for this role:

Role: {role}

Rules:
- Return ONLY a Python list.
- No explanation.
- No markdown.
- No numbering.

Example:

["Python","Java","SQL","Git"]
"""

    response = ask_ai(
    prompt,
    temperature=0
)

    try:
        skills = ast.literal_eval(response.strip())

        return skills

    except Exception:

        return []