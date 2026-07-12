from app.services.agent_planner import create_plan
from app.services.agent_decider import decide_next_step
from app.services.agent_reflector import reflect

from app.agent.executor import execute_tool

from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills
from app.services.ai_role_analyzer import get_required_skills
from app.services.gap_analyzer import analyze_skill_gap
from app.langgraph.report import build_report

def preparation_node(state):

    file_path = f"uploads/{state['filename']}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(resume_text)

    required_skills = get_required_skills(
        state["role"]
    )

    gap = analyze_skill_gap(
        current_skills,
        required_skills
    )

    state["resume_text"] = resume_text
    state["current_skills"] = current_skills
    state["required_skills"] = required_skills
    state["gap"] = gap

    state["memory"].save(
        "resume_text",
        resume_text
    )

    state["memory"].save(
        "current_skills",
        current_skills
    )

    state["memory"].save(
        "required_skills",
        required_skills
    )

    state["memory"].save(
        "skill_gap",
        gap
    )

    return state

def planner_node(state):

    state["plan"] = create_plan(
        state["goal"]
    )

    return state


def decision_node(state):

    tool = decide_next_step(

        state["goal"],

        state["memory"].all(),

        state["executed_tools"]

    )

    state["next_tool"] = tool

    if tool == "DONE":

        state["finished"] = True

    return state


def executor_node(state):

    if state["finished"]:

        return state

    execute_tool(

        state["next_tool"],

        state

    )

    state["executed_tools"].append(

        state["next_tool"]

    )

    return state


def reflection_node(state):

    if state["finished"]:

        return state

    state["reflection"] = reflect(

        state["goal"],

        state["memory"].all()

    )

    return state

def report_node(state):

    state["report"] = build_report(
        state
    )

    return state