from app.services.ai_service import ask_ai


def chat_with_resume(resume_text, role, question):

    prompt = f"""
You are CareerForge AI, an expert Resume Reviewer, Career Coach, ATS Expert and Interview Mentor.

The user's target role is:

{role}

Resume:

{resume_text}

User Question:

{question}

Instructions:

- Answer only using the resume.
- Give practical career advice.
- Suggest improvements if required.
- If the user asks about resume improvements, provide a bullet list.
- If the user asks about interview preparation, answer according to the target role.
- Keep the response professional and concise.
"""

    response = ask_ai(prompt)

    if not response or response.startswith("⚠️") or response.startswith("ERROR"):
        return (
            "Sorry, the AI service is currently unavailable. "
            "Please try again in a minute."
        )

    return response