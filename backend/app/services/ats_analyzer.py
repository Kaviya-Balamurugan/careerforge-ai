def analyze_ats(resume_text):

    score = 100
    suggestions = []

    if "github.com" not in resume_text.lower():
        score -= 10
        suggestions.append(
            "Add GitHub profile link"
        )

    if "linkedin.com" not in resume_text.lower():
        score -= 10
        suggestions.append(
            "Add LinkedIn profile link"
        )

    if "%" not in resume_text:
        score -= 15
        suggestions.append(
            "Add measurable achievements using percentages"
        )

    if "project" not in resume_text.lower():
        score -= 15
        suggestions.append(
            "Add project section"
        )

    if "skill" not in resume_text.lower():
        score -= 10
        suggestions.append(
            "Add skills section"
        )

    return {
        "ats_score": max(score, 0),
        "suggestions": suggestions
    }