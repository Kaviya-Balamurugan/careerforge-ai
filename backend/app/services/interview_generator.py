def generate_questions(role):

    questions = {
        "AI Engineer": [
            "What is Machine Learning?",
            "Explain Gradient Descent.",
            "What is Overfitting?",
            "Difference between CNN and RNN?",
            "What is Transfer Learning?"
        ],

        "Data Scientist": [
            "What is Feature Engineering?",
            "Explain Cross Validation.",
            "What is PCA?",
            "Difference between Regression and Classification?",
            "What is Data Leakage?"
        ],

        "Full Stack Developer": [
            "What is React?",
            "Explain Virtual DOM.",
            "Difference between SQL and NoSQL?",
            "What is REST API?",
            "Explain Node.js event loop."
        ]
    }

    return questions.get(
        role,
        [
            f"What skills are important for a {role}?",
            f"Describe a project related to {role}.",
            f"What tools are commonly used by a {role}?"
        ]
    )