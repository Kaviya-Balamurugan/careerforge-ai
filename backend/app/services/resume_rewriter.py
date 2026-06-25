from backend.app.services.ai_service import ask_ai

def rewrite_resume(resume_text, role):

    prompt = f"""
You are an expert resume writer.

Target Role:
{role}

Rewrite the following resume professionally.

Requirements:
- Improve grammar.
- Use powerful action verbs.
- Make it ATS friendly.
- Improve project descriptions.
- Keep the facts the same.
- Do NOT invent experience.

Resume:

{resume_text}
"""

    return ask_ai(prompt)