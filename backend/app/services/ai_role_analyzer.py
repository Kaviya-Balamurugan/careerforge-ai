import google.generativeai as genai
import ast

genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-2.0-flash")


def get_required_skills(role):

    prompt = f"""
    You are a career expert.

    For the role:
    {role}

    Return ONLY a Python list
    of the top 10 technical skills.

    Example:
    ["Python","SQL","Docker"]
    """

    response = model.generate_content(prompt)

    try:
        return ast.literal_eval(
            response.text.strip()
        )
    except:
        return []