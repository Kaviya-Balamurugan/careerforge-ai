from langgraph.graph import StateGraph
from langgraph.graph import END

from app.langgraph.state import CareerState

from app.langgraph.nodes import (
    preparation_node,
    planner_node,
    decision_node,
    executor_node,
    reflection_node,
    report_node
)

workflow = StateGraph(CareerState)

workflow.add_node(
    "planner",
    planner_node
)
workflow.add_node(
    "prepare",
    preparation_node
)

workflow.add_node(
    "decision",
    decision_node
)
workflow.add_node(
    "report",
    report_node
)

workflow.add_node(
    "executor",
    executor_node
)

workflow.add_node(
    "reflection",
    reflection_node
)

workflow.set_entry_point(
    "prepare"
)

workflow.add_edge(
    "planner",
    "decision"
)
workflow.add_edge(
    "prepare",
    "planner"
)

workflow.add_conditional_edges(

    "decision",

    lambda state:

        "report"

        if state["finished"]

        else "executor"
)
workflow.add_edge(
    "report",
    END
)
workflow.add_edge(
    "executor",
    "reflection"
)

workflow.add_edge(
    "reflection",
    "decision"
)

career_graph = workflow.compile()