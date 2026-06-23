def get_resume_suggestions(
    current_skills,
    missing_skills
):

    suggestions = []

    if "Git" not in current_skills:
        suggestions.append(
            "Add Git and GitHub experience to your resume."
        )

    if "Docker" in missing_skills:
        suggestions.append(
            "Learn Docker and include a containerized project."
        )

    if "TensorFlow" in missing_skills:
        suggestions.append(
            "Build a TensorFlow project and add it to your resume."
        )

    if "Deep Learning" in missing_skills:
        suggestions.append(
            "Add a Deep Learning project showcasing CNNs or Transformers."
        )

    suggestions.append(
        "Add measurable achievements to projects."
    )

    suggestions.append(
        "Include your GitHub and LinkedIn profile links."
    )

    suggestions.append(
        "Write stronger project descriptions with technologies used."
    )

    return suggestions