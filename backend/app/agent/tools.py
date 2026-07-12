from app.tools.ats_tool import run as ats_tool
from app.tools.resume_score_tool import run as resume_score_tool
from app.tools.skill_gap_tool import run as skill_gap_tool
from app.tools.career_summary_tool import run as career_summary_tool
from app.tools.resume_suggestions_tool import run as resume_suggestions_tool
from app.tools.rewrite_resume_tool import run as rewrite_resume_tool
from app.tools.roadmap_tool import run as roadmap_tool
from app.tools.projects_tool import run as projects_tool
from app.tools.jobs_tool import run as jobs_tool
from app.tools.interview_tool import run as interview_tool
from app.tools.learning_plan_tool import run as learning_plan_tool


TOOLS = {

    "ats": ats_tool,

    "resume_score": resume_score_tool,

    "skill_gap": skill_gap_tool,

    "career_summary": career_summary_tool,

    "resume_suggestions": resume_suggestions_tool,

    "rewrite_resume": rewrite_resume_tool,

    "roadmap": roadmap_tool,

    "projects": projects_tool,

    "job_recommendations": jobs_tool,

    "interview_questions": interview_tool,

    "learning_plan": learning_plan_tool

}