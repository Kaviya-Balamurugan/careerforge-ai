from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills
from app.services.ai_role_analyzer import get_required_skills
from app.services.gap_analyzer import analyze_skill_gap

from app.services.agent_memory import AgentMemory
from app.services.agent_observer import observe
from app.services.agent_decider import decide_next_step
from app.services.agent_reflector import reflect

from app.agent.executor import execute_tool


def execute_plan(goal, filename, role):

    file_path = f"uploads/{filename}"

    memory = AgentMemory()
    results = {}

    # -----------------------------
    # Initial Perception
    # -----------------------------

    resume_text = extract_resume_text(file_path)
    memory.save("resume_text", resume_text)

    current_skills = extract_skills(resume_text)
    memory.save("current_skills", current_skills)

    required_skills = get_required_skills(role)
    memory.save("required_skills", required_skills)

    gap = analyze_skill_gap(
        current_skills,
        required_skills
    )

    memory.save("skill_gap", gap)

    executed_tools = set()

    state = {
        "goal": goal,
        "role": role,
        "resume_text": resume_text,
        "current_skills": current_skills,
        "required_skills": required_skills,
        "gap": gap,
        "results": results,
        "memory": memory
    }

    while True:

        next_tool = decide_next_step(
            goal,
            memory.all(),
            list(executed_tools)
        )

        print(f"\n🤖 Agent decided -> {next_tool}")

        if next_tool == "DONE":
            print("✅ Goal completed.")
            break

        if next_tool in executed_tools:
            print("⚠ Tool already executed.")
            break

        executed_tools.add(next_tool)

        try:

            execute_tool(
                next_tool,
                state
            )

        except Exception as e:

            print(f"❌ Tool Error: {e}")
            break

        # Sync updated objects
        results = state["results"]
        memory = state["memory"]

        # Observation
        if next_tool in results:

            observation = observe(
                next_tool,
                results[next_tool]
            )

            memory.save(
                f"observation_{next_tool}",
                observation
            )

        # Reflection
        reflection = reflect(
            goal,
            memory.all()
        )

        print("\n🧠 Reflection:")
        print(reflection)

        memory.save(
            f"reflection_{len(executed_tools)}",
            reflection
        )

    results["memory"] = memory.all()

    return results