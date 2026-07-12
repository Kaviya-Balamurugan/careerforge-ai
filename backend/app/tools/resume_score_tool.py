from app.services.resume_score import analyze_resume_score


def run(state):

    score = analyze_resume_score(

        state["resume_text"],

        state["role"]

    )

    state["results"]["resume_score"] = score

    state["memory"].save(

        "resume_score",

        score

    )

    return state