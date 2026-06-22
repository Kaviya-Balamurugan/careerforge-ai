def generate_career_summary(
    role,
    readiness_score,
    matched_skills,
    missing_skills
):

    return f"""
You are on the path to becoming a {role}.

Current Readiness Score: {readiness_score}%

Strong Skills:
{", ".join(matched_skills)}

Skills To Improve:
{", ".join(missing_skills)}

Recommendation:
Focus on the missing skills and build 2-3 projects in those areas to increase your employability.
"""