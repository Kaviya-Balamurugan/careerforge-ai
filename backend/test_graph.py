from app.langgraph.graph import career_graph
from app.services.agent_memory import AgentMemory

state = {

    "goal":"Become ML Engineer",

    "filename":"KAVIYA_B.pdf",

    "role":"ML Engineer",

    "resume_text":"",

    "current_skills":[],

    "required_skills":[],

    "gap":{},

    "memory":AgentMemory(),

    "results":{},

    "executed_tools":[],

    "next_tool":"",

    "observation":"",

    "reflection":"",

    "finished":False

}

result = career_graph.invoke(state)

print(result["report"])