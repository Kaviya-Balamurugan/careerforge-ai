from app.agent.executor import execute_tool
from app.services.agent_memory import AgentMemory

state = {
    "resume_text": "Python SQL TensorFlow React FastAPI",
    "role": "ML Engineer",
    "current_skills": ["Python", "SQL", "TensorFlow"],
    "gap": {
        "missing_skills": ["Docker", "AWS"],
        "matched_skills": ["Python"],
        "readiness_score": 70
    },
    "results": {},
    "memory": AgentMemory()
}

execute_tool("resume_score", state)

print(state["results"])