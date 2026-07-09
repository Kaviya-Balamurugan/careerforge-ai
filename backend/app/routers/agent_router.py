from fastapi import APIRouter

from app.services.agent_planner import create_plan
from app.services.agent_executor import execute_plan

router = APIRouter()


@router.post("/agent")
def run_agent(
    filename: str,
    role: str,
    goal: str
):

    plan = create_plan(goal)

    results = execute_plan(
        goal,
        filename,
        role
    )

    return {
        "goal": goal,
        "plan": plan,
        "results": results
    }