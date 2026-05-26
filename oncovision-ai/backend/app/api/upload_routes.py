from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../uploads"
    )
)

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/scan")
async def upload_scan(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "File uploaded successfully",
        "file_path": file_path
    }