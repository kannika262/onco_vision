from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles

import os

# =========================================
# IMPORT ROUTES
# =========================================

from app.api.upload_routes import router as upload_router

from app.api.prediction_routes import router as prediction_router

from app.api.report_routes import router as report_router

from app.api.pdf_routes import router as pdf_router
from app.api.doctor_routes import router as doctor_router
from app.api.federated_routes import router as federated_router


# =========================================
# FASTAPI APP
# =========================================

app = FastAPI(

    title="OncoVision AI",

    version="1.0.0"

)

# =========================================
# CORS
# =========================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

# =========================================
# INCLUDE ROUTES
# =========================================

app.include_router(upload_router)

app.include_router(prediction_router)

app.include_router(report_router)

app.include_router(pdf_router)
app.include_router(doctor_router)
app.include_router(federated_router)
# =========================================
# STATIC FILES
# =========================================

UPLOAD_DIR = os.path.join(

    os.path.dirname(__file__),

    "uploads"

)

os.makedirs(

    UPLOAD_DIR,

    exist_ok=True

)

app.mount(

    "/uploads",

    StaticFiles(directory=UPLOAD_DIR),

    name="uploads"

)

# =========================================
# ROOT ROUTE
# =========================================

@app.get("/")

def home():

    return {

        "message":
        "OncoVision AI Backend Running"

    }