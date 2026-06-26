def reflect(goal, memory):

    if "skill_gap" in memory:
        score = memory["skill_gap"]["readiness_score"]

        if score < 70:
            return "Continue"

    return "DONE"