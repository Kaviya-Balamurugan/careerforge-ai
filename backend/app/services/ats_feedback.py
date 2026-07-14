from app.services.ai_service import ask_ai


def generate_ats_feedback(resume_text, role):

    prompt = f"""
You are an ATS Resume Expert.

Target Role:
{role}

Resume:

{resume_text}

Analyze the resume and return ONLY in this format.

ATS Score:
<number>/100

Strengths:
- point 1
- point 2
- point 3

Improvements:
- point 1
- point 2
- point 3

Missing Keywords:
- keyword 1
- keyword 2
- keyword 3

Final Recommendation:
Provide a short professional recommendation.
"""

    response = ask_ai(prompt)

    if not response or response.startswith("⚠️") or response.startswith("ERROR"):

        return (
            "Unable to generate ATS feedback right now. "
            "Please try again later."
        )

    return response