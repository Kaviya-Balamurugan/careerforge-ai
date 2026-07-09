from app.security.auth import hash_password
from app.security.auth import verify_password

password = "careerforge123"

hashed = hash_password(password)

print("Original:", password)
print("Hashed :", hashed)

print(
    verify_password(
        password,
        hashed
    )
)