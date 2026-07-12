from app.services.job_recommender import get_job_recommendations


def run(state):

    jobs = get_job_recommendations(

        state["current_skills"],

        state["role"]

    )

    state["results"]["jobs"] = jobs

    state["memory"].save(

        "jobs",

        jobs

    )

    return state