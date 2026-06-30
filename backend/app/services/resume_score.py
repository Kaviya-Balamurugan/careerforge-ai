from app.services.skill_extractor import extract_skills

def analyze_resume_score(resume_text, role):

    skills = extract_skills(resume_text)

    technical = min(len(skills) * 8, 100)

    projects = 90 if "project" in resume_text.lower() else 50
    experience = 80 if "intern" in resume_text.lower() else 50
    ats = 90
    quality = int((technical + projects + experience + ats) / 4)

    return {
        "overall_score": quality,
        "technical_skills": technical,
        "projects": projects,
        "experience": experience,
        "ats": ats,
        "resume_quality": quality,
        "summary": "Automatically generated using CareerForge AI."
    }