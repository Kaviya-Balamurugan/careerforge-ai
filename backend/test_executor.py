from app.agent.executor import execute_tool

from app.services.agent_memory import AgentMemory

state={

"resume_text":"Python SQL TensorFlow",

"role":"ML Engineer",

"results":{},

"memory":AgentMemory()

}

execute_tool(

"ats",

state

)

print(

state["results"]

)