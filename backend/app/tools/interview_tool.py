from app.services.ai_interview_generator import generate_questions


def run(state):

    questions = generate_questions(

        state["role"]

    )

    state["results"]["interview_questions"] = questions

    state["memory"].save(

        "interview_questions",

        questions

    )

    return state