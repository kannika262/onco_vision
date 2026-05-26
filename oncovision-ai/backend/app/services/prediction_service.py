import os
import sys

# =========================================
# BASE DIRECTORY
# =========================================

BASE_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../"
    )
)

# =========================================
# ADD AI MODEL PATHS
# =========================================

sys.path.append(
    os.path.join(BASE_DIR, "ai-models/brain")
)

sys.path.append(
    os.path.join(BASE_DIR, "ai-models/lung")
)

sys.path.append(
    os.path.join(BASE_DIR, "ai-models/heatmaps")
)

# =========================================
# IMPORT AI MODELS
# =========================================

from brain_model import predict_brain_tumor

from lung_model import predict_lung_cancer

from gradcam import generate_gradcam


# =========================================
# MAIN PREDICTION FUNCTION
# =========================================

def predict_scan(

    image_path,

    scan_type="brain"

):

    try:

        # =========================================
        # BRAIN MRI PREDICTION
        # =========================================

        if scan_type == "brain":

            result = predict_brain_tumor(
                image_path
            )

        # =========================================
        # LUNG X-RAY PREDICTION
        # =========================================

        elif scan_type == "lung":

            result = predict_lung_cancer(
                image_path
            )

        # =========================================
        # INVALID SCAN TYPE
        # =========================================

        else:

            return {

                "prediction":
                "Unsupported Scan Type",

                "confidence":
                "0%",

                "heatmap":
                None,

                "scan_type":
                scan_type

            }

        # =========================================
        # SAFETY CHECKS
        # =========================================

        prediction = result.get(

            "prediction",

            "Prediction Failed"

        )

        confidence = float(

            result.get(
                "confidence",
                0
            )

        )

        # =========================================
        # GENERATE HEATMAP ONLY
        # FOR HIGH CONFIDENCE BRAIN CASES
        # =========================================

        heatmap = None

        if (

            scan_type == "brain"

            and confidence >= 70

            and prediction != "No Tumor"

        ):

            try:

                heatmap = generate_gradcam(
                    image_path
                )

            except Exception as heatmap_error:

                print(
                    "HEATMAP ERROR:",
                    str(heatmap_error)
                )

                heatmap = None

        # =========================================
        # RETURN FINAL RESPONSE
        # =========================================

        return {

            "prediction":
            prediction,

            "confidence":
            f"{round(confidence, 2)}%",

            "heatmap":
            heatmap,

            "scan_type":
            scan_type

        }

    except Exception as e:

        print(
            "PREDICTION ERROR:",
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