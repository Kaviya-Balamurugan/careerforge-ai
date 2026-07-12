from app.services.career_summary import generate_career_summary


def run(state):

    gap = state["gap"]

    summary = generate_career_summary(

        state["role"],

        gap["readiness_score"],

        gap["matched_skills"],

        gap["missing_skills"]

    )

    state["results"]["career_summary"] = summary

    state["memory"].save(

        "career_summary",

        summary

    )

    return state