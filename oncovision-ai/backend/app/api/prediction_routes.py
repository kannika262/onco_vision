from fastapi import APIRouter

from app.services.prediction_service import (
    predict_scan
)

# =========================================
# ROUTER
# =========================================

router = APIRouter(

    prefix="/prediction",

    tags=["Prediction"]

)

# =========================================
# PREDICTION API
# =========================================

@router.get("/{scan_type}")

def get_prediction(

    scan_type: str,

    image_path: str

):

    try:

        # =========================================
        # RUN AI PREDICTION
        # =========================================

        result = predict_scan(

            image_path=image_path,

            scan_type=scan_type

        )

        return result

    except Exception as e:

        print(

            "PREDICTION ROUTE ERROR:",

            str(e)

        )

        return {

            "prediction":
            "Prediction Failed",

            "confidence":
            "0%",

            "heatmap":
            None,

            "scan_type":
            scan_type,

            "error":
            str(e)

        }