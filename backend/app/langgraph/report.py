def build_report(state):

    report = {}

    report["goal"] = state["goal"]

    report["role"] = state["role"]

    report["results"] = state["results"]

    gap = state["gap"]

    report["matched_skills"] = gap.get(
        "matched_skills",
        []
    )

    report["missing_skills"] = gap.get(
        "missing_skills",
        []
    )

    report["readiness_score"] = gap.get(
        "readiness_score",
        0
    )

    return report