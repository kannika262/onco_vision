import os

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

# =========================================
# ROUTER
# =========================================

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

# =========================================
# UPLOAD DIRECTORY
# =========================================

UPLOAD_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../uploads"
    )
)

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

# =========================================
# UPLOAD SCAN API
# =========================================

@router.post("/scan")
async def upload_scan(

    file: UploadFile = File(...)

):

    try:

        # =========================================
        # VALIDATE FILE
        # =========================================

        if not file.filename:

            return {

                "message":
                "No file selected"

            }

        # =========================================
        # CREATE FILE PATH
        # =========================================

        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        # =========================================
        # SAVE FILE
        # =========================================

        with open(
            file_path,
            "wb"
        ) as buffer:

            content = await file.read()

            buffer.write(content)

        # =========================================
        # SUCCESS RESPONSE
        # =========================================

        return {

            "message":
            "File uploaded successfully",

            "filename":
            file.filename,

            "file_path":
            file_path

        }

    except Exception as e:

        print("UPLOAD ERROR:", str(e))

        return {

            "message":
            "Upload Failed",

            "error":
            str(e)

        }