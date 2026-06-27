import os
import time
from groq import Groq, RateLimitError
from dotenv import load_dotenv
import inspect

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_ai(prompt, temperature=0.7):
    caller = inspect.stack()[1].filename
    print(f"\n========== AI CALL ==========")
    print(f"From: {caller}")
    print(f"=============================\n")
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
            print("Groq rate limit reached. Retrying in 5 seconds...")
            time.sleep(5)
            
        except Exception as e:
            import traceback
            print("\n========== AI ERROR ==========")
            traceback.print_exc()
            print("==============================\n")
            return f"ERROR: {str(e)}"