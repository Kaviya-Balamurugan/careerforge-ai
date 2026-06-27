from backend.app.services.resume_parser import extract_resume_text
from backend.app.services.skill_extractor import extract_skills
from backend.app.services.ai_role_analyzer import get_required_skills
from backend.app.services.gap_analyzer import analyze_skill_gap
from backend.app.services.resume_score import analyze_resume_score
from backend.app.services.career_summary import generate_career_summary
from backend.app.services.resume_improver import get_resume_suggestions
from backend.app.services.resume_rewriter import rewrite_resume
from backend.app.services.ats_analyzer import analyze_ats
from backend.app.services.roadmap_generator import generate_roadmap
from backend.app.services.project_recommender import get_projects
from backend.app.services.job_recommender import get_job_recommendations
from backend.app.services.ai_interview_generator import generate_questions

from backend.app.services.agent_memory import AgentMemory
from backend.app.services.agent_observer import observe
from backend.app.services.agent_decider import decide_next_step
from backend.app.services.agent_reflector import reflect
from backend.app.services.resource_recommender import get_resources

def execute_plan(goal, filename, role):

    file_path = f"backend/uploads/{filename}"

    memory = AgentMemory()
    results = {}

    # -----------------------------
    # Initial Perception
    # -----------------------------

    resume_text = extract_resume_text(file_path)
    memory.save("resume_text", resume_text)

    current_skills = extract_skills(resume_text)
    memory.save("current_skills", current_skills)

    required_skills = get_required_skills(role)
    memory.save("required_skills", required_skills)

    gap = analyze_skill_gap(
        current_skills,
        required_skills
    )

    memory.save("skill_gap", gap)

    executed_tools = set()

    while True:

        next_tool = decide_next_step(
    goal,
    memory.all(),
    list(executed_tools)
)

        print(f"\n🤖 Agent decided -> {next_tool}")

        if next_tool == "DONE":
            print("✅ Goal completed.")
            break

        if next_tool in executed_tools:
            print("⚠ Tool already executed.")
            break

        executed_tools.add(next_tool)

        if next_tool == "skill_gap":

            results["skill_gap"] = gap

            memory.save(
                "observation_skill_gap",
                observe("Skill Gap", gap)
            )

        elif next_tool == "resume_score":

            score = analyze_resume_score(
                resume_text,
                role
            )

            results["resume_score"] = score

            memory.save("resume_score", score)

            memory.save(
                "observation_resume_score",
                observe("Resume Score", score)
            )

        elif next_tool == "career_summary":

            summary = generate_career_summary(
                role,
                gap["readiness_score"],
                gap["matched_skills"],
                gap["missing_skills"]
            )

            results["career_summary"] = summary

            memory.save("career_summary", summary)

            memory.save(
                "observation_career_summary",
                observe("Career Summary", summary)
            )

        elif next_tool == "resume_suggestions":

            suggestions = get_resume_suggestions(
                current_skills,
                gap["missing_skills"]
            )

            results["resume_suggestions"] = suggestions

            memory.save("resume_suggestions", suggestions)

            memory.save(
                "observation_resume_suggestions",
                observe("Resume Suggestions", suggestions)
            )

        elif next_tool == "rewrite_resume":

            rewritten = rewrite_resume(
                resume_text,
                role
            )

            results["rewritten_resume"] = rewritten

            memory.save("rewritten_resume", rewritten)

            memory.save(
                "observation_rewrite_resume",
                observe("Resume Rewrite", rewritten)
            )

        elif next_tool == "ats":

            ats = analyze_ats(resume_text)

            results["ats"] = ats

            memory.save("ats", ats)

            memory.save(
                "observation_ats",
                observe("ATS Analysis", ats)
            )

        elif next_tool == "roadmap":

            roadmap = generate_roadmap(
                gap["missing_skills"]
            )

            results["roadmap"] = roadmap

            memory.save("roadmap", roadmap)

            memory.save(
                "observation_roadmap",
                observe("Roadmap", roadmap)
            )

        elif next_tool == "projects":

            projects = get_projects(
                gap["missing_skills"]
            )

            results["projects"] = projects

            memory.save("projects", projects)

            memory.save(
                "observation_projects",
                observe("Projects", projects)
            )

        elif next_tool == "job_recommendations":

            jobs = get_job_recommendations(
    current_skills,
    role
)

            results["jobs"] = jobs

            memory.save("jobs", jobs)

            memory.save(
                "observation_jobs",
                observe("Job Recommendations", jobs)
            )

        elif next_tool == "interview_questions":

            questions = generate_questions(role)

            results["interview_questions"] = questions

            memory.save(
                "interview_questions",
                questions
            )

            memory.save(
                "observation_interview_questions",
                observe("Interview Questions", questions)
            )
        elif next_tool == "learning_plan":
            
            roadmap = generate_roadmap(
                gap["missing_skills"]
    )
            
            learning_plan = {}

            for week, skill in roadmap.items():
                learning_plan[week] = {
            "skill": skill,
            "resources": get_resources(skill)
        }

            results["learning_plan"] = learning_plan
            
            memory.save(
        "learning_plan",
        learning_plan
    )

        else:
            print("Unknown tool:", next_tool)
            break

        reflection = reflect(
            goal,
            memory.all()
        )

        print("\n🧠 Reflection:")
        print(reflection)

        memory.save(
            f"reflection_{len(executed_tools)}",
            reflection
        )

    results["memory"] = memory.all()

    return results