from app.agent.tools import TOOLS


def execute_tool(tool_name, state):

    if tool_name not in TOOLS:
        raise Exception(f"Unknown Tool: {tool_name}")

    return TOOLS[tool_name](state)