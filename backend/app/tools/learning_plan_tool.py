from app.services.roadmap_generator import generate_roadmap
from app.services.resource_recommender import get_resources


def run(state):

    roadmap = generate_roadmap(

        state["gap"]["missing_skills"]

    )

    learning_plan = {}

    for week, skill in roadmap.items():

        learning_plan[week] = {

            "skill": skill,

            "resources": get_resources(skill)

        }

    state["results"]["learning_plan"] = learning_plan

    state["memory"].save(

        "learning_plan",

        learning_plan

    )

    return state