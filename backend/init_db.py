from app.database.database import engine
from app.database.database import Base

import app.database.models

print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")