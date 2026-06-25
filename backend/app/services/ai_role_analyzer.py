import google.generativeai as genai
from dotenv import load_dotenv
import os
import ast

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.0-flash"
)

def get_required_skills(role):

    prompt = f"""
    You are a career expert.

    For the role:
    {role}

    Return ONLY a Python list
    containing the top 10 technical skills.

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