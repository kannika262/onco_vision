from fastapi import APIRouter

router = APIRouter()


# =========================================
# FEDERATED LEARNING STATUS API
# =========================================

@router.get("/federated/status")

def federated_status():

    return {

        "hospitalA":
        "Training Complete",

        "hospitalB":
        "Training Complete",

        "hospitalC":
        "Training Complete",

        "globalAccuracy":
        "96.4%",

        "aggregationRounds":
        3,

        "privacy":
        "Patient Data Never Shared",

        "federatedState":
        "Active"

    }