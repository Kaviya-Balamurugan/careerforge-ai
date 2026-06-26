import json
from backend.app.services.ai_service import ask_ai


print("Loaded resume_score.py")
def analyze_resume_score(resume_text, role):
    prompt = f"""
You are an expert technical recruiter.

Analyze this resume for the role:

{role}

Resume:

{resume_text}

Return ONLY valid JSON.

Example:

{{
  "overall_score":85,
  "technical_skills":90,
  "projects":80,
  "experience":70,
  "ats":88,
  "resume_quality":82,
  "summary":"Strong ML profile with good projects but limited industry experience."
}}
"""

    response = ask_ai(prompt)

    try:
        response = response.replace("```json", "")
        response = response.replace("```", "").strip()
        
        return json.loads(response)
    except:
        return {
            "overall_score":70,
            "technical_skills":70,
            "projects":70,
            "experience":70,
            "ats":70,
            "resume_quality":70,
            "summary":"Unable to evaluate."
        }