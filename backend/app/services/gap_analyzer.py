def analyze_skill_gap(current_skills, required_skills):

    matched_skills = []
    missing_skills = []

    for skill in required_skills:

        if skill in current_skills:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    if len(required_skills) == 0:
        readiness_score = 0
    else:
        readiness_score = int(
            (len(matched_skills) / len(required_skills)) * 100
        )

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "readiness_score": readiness_score
    }