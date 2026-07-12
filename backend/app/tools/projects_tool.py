from app.services.project_recommender import get_projects


def run(state):

    projects = get_projects(

        state["gap"]["missing_skills"]

    )

    state["results"]["projects"] = projects

    state["memory"].save(

        "projects",

        projects

    )

    return state