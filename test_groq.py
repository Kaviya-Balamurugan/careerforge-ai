from backend.app.services.ai_service import ask_ai

response = ask_ai(
    "Generate 5 AI Engineer interview questions"
)

print(response)