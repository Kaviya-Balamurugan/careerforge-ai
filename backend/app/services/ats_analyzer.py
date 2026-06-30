from app.services.ai_service import ask_ai
import json

def analyze_ats(resume_text):

    prompt = f"""
    You are an ATS Resume Analyzer.

    Analyze this resume:

    {resume_text}

    Return ONLY valid JSON:

    {{
      "ats_score": 0,
      "suggestions": []
    }}
    """

    response = ask_ai(prompt)

    try:
        return json.loads(response)

    except:
        return {
            "ats_score": 75,
            "suggestions": [
                "Unable to analyze ATS score"
            ]
        }