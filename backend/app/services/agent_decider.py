def decide_next_step(goal, memory, executed_tools):

    # Only run the essential analysis during upload
    tools = [
        "skill_gap",
        "roadmap",
        "learning_plan",
        "resume_score",
        "resume_suggestions",
        "projects"
    ]

    for tool in tools:
        if tool not in executed_tools:
            return tool

    return "DONE"