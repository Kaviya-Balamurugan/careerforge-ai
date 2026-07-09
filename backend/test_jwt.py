from app.security.jwt_handler import *

token = create_access_token(
    {"email": "test@gmail.com"}
)

print(token)

print(
    verify_token(token)
)