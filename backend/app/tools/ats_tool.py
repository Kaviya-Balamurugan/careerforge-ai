from app.services.ats_analyzer import analyze_ats


def run(state):

    resume_text = state["resume_text"]

    ats = analyze_ats(resume_text)

    state["results"]["ats"] = ats

    state["memory"].save(
        "ats",
        ats
    )

    return state