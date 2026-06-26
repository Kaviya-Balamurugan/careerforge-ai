import os
import time
from groq import Groq, RateLimitError
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_ai(prompt, temperature=0.7):
    for _ in range(3):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=temperature
            )

            return response.choices[0].message.content

        except RateLimitError:
            print("Rate limit reached. Waiting 5 seconds...")
            time.sleep(5)

    return "Rate limit exceeded."