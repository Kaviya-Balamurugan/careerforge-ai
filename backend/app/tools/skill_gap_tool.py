def run(state):

    state["results"]["skill_gap"] = state["gap"]

    state["memory"].save(

        "skill_gap",

        state["gap"]

    )

    return state