def decide_next_step(goal, memory, executed_tools):

    tools = [
        "skill_gap",
        "roadmap",
        "learning_plan",
        "resume_score",
        "resume_suggestions",
        "projects",
        "ats",
        "career_summary",
        "job_recommendations",
        "interview_questions",
        "rewrite_resume"
    ]

    for tool in tools:
        if tool not in executed_tools:
            return tool

    return "DONE"