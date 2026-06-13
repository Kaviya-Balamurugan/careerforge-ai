from fastapi import FastAPI, UploadFile, File
import shutil

app = FastAPI()

@app.get("/")
def home():
    return {"message": "CareerForge AI Backend Running"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }
