def get_job_recommendations(skills):

    jobs = []

    if "Python" in skills:
        jobs.append({
            "role": "AI Engineer",
            "match": 85
        })

    if "Machine Learning" in skills:
        jobs.append({
            "role": "ML Engineer",
            "match": 80
        })

    if "SQL" in skills:
        jobs.append({
            "role": "Data Scientist",
            "match": 75
        })

    if "React" in skills:
        jobs.append({
            "role": "Frontend Developer",
            "match": 90
        })

    return jobs