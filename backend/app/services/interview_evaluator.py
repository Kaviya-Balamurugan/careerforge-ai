def evaluate_answer(question, answer):

    answer_words = len(answer.split())

    score = 0
    feedback = []

    # Length Score
    if answer_words >= 20:
        score += 3
    else:
        feedback.append(
            "Answer is too short."
        )

    if answer_words >= 50:
        score += 2

    # Keyword Matching
    question_keywords = [
        word.lower()
        for word in question.split()
        if len(word) > 3
    ]

    matches = 0

    for keyword in question_keywords:

        if keyword in answer.lower():
            matches += 1

    score += min(matches, 3)

    # Technical Terms
    technical_terms = [
        "algorithm",
        "model",
        "data",
        "training",
        "prediction",
        "learning",
        "accuracy",
        "optimization"
    ]

    tech_matches = 0

    for term in technical_terms:

        if term in answer.lower():
            tech_matches += 1

    score += min(tech_matches, 2)

    score = min(score, 10)

    if score >= 8:
        feedback.append(
            "Excellent answer."
        )

    elif score >= 5:
        feedback.append(
            "Good answer. Add more examples."
        )

    else:
        feedback.append(
            "Need more technical depth."
        )

    return {
        "score": score,
        "feedback": feedback
    }