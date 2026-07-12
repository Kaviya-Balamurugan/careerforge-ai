from app.services.roadmap_generator import generate_roadmap


def run(state):

    roadmap = generate_roadmap(

        state["gap"]["missing_skills"]

    )

    state["results"]["roadmap"] = roadmap

    state["memory"].save(

        "roadmap",

        roadmap

    )

    return state