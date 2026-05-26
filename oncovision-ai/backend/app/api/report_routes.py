from fastapi import APIRouter

router = APIRouter(
    prefix="/report",
    tags=["Report"]
)


@router.get("/generate")
def generate_report(
    prediction: str,
    confidence: str
):

    report = {
        "patient_status": prediction,
        "confidence": confidence,
        "severity": (
            "High"
            if prediction == "Tumor Detected"
            else "Low"
        ),
        "doctor_notes":
        "AI detected abnormal brain activity."
        if prediction == "Tumor Detected"
        else "No abnormality detected.",

        "recommendation":
        "Consult Neurologist Immediately."
        if prediction == "Tumor Detected"
        else "Routine monitoring suggested."
    }

    return report