def match_resume_with_jd(
    resume_skills,
    jd_skills
):

    matched = []

    missing = []

    for skill in jd_skills:

        if skill.lower() in [
            s.lower()
            for s in resume_skills
        ]:
            matched.append(skill)

        else:
            missing.append(skill)

    if len(jd_skills) == 0:
        score = 0
    else:
        score = int(
            (len(matched) /
             len(jd_skills))
            * 100
        )

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }