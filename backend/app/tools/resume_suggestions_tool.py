from app.services.resume_improver import get_resume_suggestions


def run(state):

    suggestions = get_resume_suggestions(

        state["current_skills"],

        state["gap"]["missing_skills"]

    )

    state["results"]["resume_suggestions"] = suggestions

    state["memory"].save(

        "resume_suggestions",

        suggestions

    )

    return state