import os
import time
import traceback
import inspect

from dotenv import load_dotenv
from groq import Groq, RateLimitError

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_ai(prompt, temperature=0.7):

    caller = inspect.stack()[1].filename

    print("\n========== AI CALL ==========")
    print(f"From: {caller}")
    print(f"Prompt Length: {len(prompt)}")
    print("=============================\n")

    for attempt in range(3):

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

            answer = response.choices[0].message.content

            print("\n========== AI SUCCESS ==========")
            print(answer[:500])
            print("================================\n")

            return answer

        except RateLimitError:

            print(
                f"Groq Rate Limit (Attempt {attempt+1}/3)"
            )

            time.sleep(5)

        except Exception as e:

            print("\n========== AI ERROR ==========")
            traceback.print_exc()
            print("==============================\n")

            return f"ERROR: {str(e)}"

    return "ERROR: Groq rate limit exceeded after 3 retries."