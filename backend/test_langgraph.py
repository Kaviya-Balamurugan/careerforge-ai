from langgraph.graph import StateGraph
from typing import TypedDict


class State(TypedDict):
    message: str


def hello_node(state):
    print("Hello from LangGraph!")
    state["message"] += " -> Planner"
    return state


graph = StateGraph(State)

graph.add_node("hello", hello_node)

graph.set_entry_point("hello")

graph.set_finish_point("hello")

app = graph.compile()

result = app.invoke(
    {
        "message": "Start"
    }
)

print(result)