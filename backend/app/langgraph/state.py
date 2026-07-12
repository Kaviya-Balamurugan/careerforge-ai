from typing import TypedDict


class CareerState(TypedDict):

    goal: str

    filename: str

    role: str

    resume_text: str

    current_skills: list

    required_skills: list

    gap: dict

    memory: object

    results: dict

    executed_tools: list

    next_tool: str

    observation: str

    reflection: str

    finished: bool

    report: dict