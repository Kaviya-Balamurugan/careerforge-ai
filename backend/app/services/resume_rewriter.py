from app.services.ai_service import ask_ai

def rewrite_resume(resume_text, role):

    resume_text = resume_text[:5000]

    prompt = f"""
You are an expert ATS Resume Writer.

Target Role:
{role}

Rewrite this resume professionally.

Rules:
- Improve grammar.
- Improve formatting.
- Use action verbs.
- Keep facts unchanged.
- Make it ATS friendly.

Resume:

{resume_text}
"""

    response = ask_ai(prompt)

    print("\n===== REWRITE RESPONSE =====")
    print(repr(response))
    print("============================\n")

    if (
        not response
        or response.startswith("ERROR")
        or response.startswith("⚠️")
    ):
        return ""

    return response