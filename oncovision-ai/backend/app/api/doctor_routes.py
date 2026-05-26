from fastapi import APIRouter

from app.database.cases_db import cases_db


# =========================================
# ROUTER
# =========================================

router = APIRouter(

    prefix="/doctor",

    tags=["Doctor"]

)


# =========================================
# GET ALL CASES
# =========================================

@router.get("/cases")

def get_cases():

    return cases_db


# =========================================
# ADD CASE
# =========================================

@router.post("/add-case")

def add_case(case: dict):

    cases_db.append(case)

    return {

        "message":
        "Case Added Successfully"

    }