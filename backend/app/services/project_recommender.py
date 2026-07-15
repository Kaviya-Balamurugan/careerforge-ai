PROJECTS = {

    "Python":[

        {
            "title":"AI Resume Analyzer",

            "difficulty":"Intermediate",

            "duration":"2 Weeks",

            "tech_stack":[
                "FastAPI",
                "React",
                "Python"
            ],

            "description":"Analyze resumes using AI.",

            "career_value":"Very High"

        },

        {
            "title":"Student Performance Prediction",

            "difficulty":"Beginner",

            "duration":"1 Week",

            "tech_stack":[
                "Python",
                "Scikit-learn",
                "Pandas"
            ],

            "description":"Predict student marks using ML.",

            "career_value":"Medium"

        }

    ],

}

def get_projects(skills):

    projects=[]

    for skill in skills:

        projects.extend(

            PROJECTS.get(skill, [])

        )

    if not projects:

        projects=[

            {

                "title":"AI Resume Analyzer",

                "difficulty":"Intermediate",

                "duration":"2 Weeks",

                "tech_stack":[
                    "FastAPI",
                    "React"
                ],

                "description":"AI ATS Resume Analyzer",

                "career_value":"Very High"

            }

        ]

    unique=[]

    seen=set()

    for p in projects:

        if p["title"] not in seen:

            unique.append(p)

            seen.add(p["title"])

    return unique