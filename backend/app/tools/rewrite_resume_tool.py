from app.services.resume_rewriter import rewrite_resume


def run(state):

    rewritten = rewrite_resume(

        state["resume_text"],

        state["role"]

    )

    state["results"]["rewritten_resume"] = rewritten

    state["memory"].save(

        "rewritten_resume",

        rewritten

    )

    return state