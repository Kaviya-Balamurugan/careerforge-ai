from app.services.ai_service import ask_ai

def chat_with_resume(resume_text, role, question):

    resume_text = resume_text[:1500]

    prompt = f"""
You are CareerForge AI, an expert Resume Reviewer, Career Coach, ATS Expert and Interview Mentor.

Target Role:
{role}

Resume:

{resume_text}

Question:
{question}

Instructions:
- Answer only using the resume.
- Give professional advice.
- Keep the response concise.
"""

    response = ask_ai(prompt)
    
    print("\n========== CHAT RESPONSE ==========")
    print(response)
    print("===================================\n")

    return response