from app.langgraph.graph import career_graph

state = {
    "goal": "Become an ML Engineer",
    "filename": "KAVIYA_B.pdf",
    "role": "ML Engineer",
    "plan": [],
    "results": {},
    "observation": "",
    "reflection": ""
}

result = career_graph.invoke(state)

print(result)