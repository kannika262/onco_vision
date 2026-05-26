import os

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.pagesizes import letter


def generate_pdf_report(

    prediction,
    confidence,
    heatmap_path

):

    output_dir = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../reports"
        )
    )

    os.makedirs(output_dir, exist_ok=True)

    pdf_path = os.path.join(
        output_dir,
        "brain_tumor_report.pdf"
    )

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    elements = []

    # =========================
    # TITLE
    # =========================

    title = Paragraph(
        "<b>OncoVision AI Medical Report</b>",
        styles["Title"]
    )

    elements.append(title)

    elements.append(Spacer(1, 20))

    # =========================
    # REPORT DATA
    # =========================

    prediction_text = Paragraph(
        f"<b>Prediction:</b> {prediction}",
        styles["BodyText"]
    )

    confidence_text = Paragraph(
        f"<b>Confidence:</b> {confidence}",
        styles["BodyText"]
    )

    severity_text = Paragraph(
        "<b>Severity:</b> High"
        if prediction == "Tumor Detected"
        else "<b>Severity:</b> Low",
        styles["BodyText"]
    )

    recommendation_text = Paragraph(
        "<b>Recommendation:</b> Consult Neurologist Immediately"
        if prediction == "Tumor Detected"
        else "<b>Recommendation:</b> Routine Monitoring",
        styles["BodyText"]
    )

    elements.append(prediction_text)

    elements.append(Spacer(1, 10))

    elements.append(confidence_text)

    elements.append(Spacer(1, 10))

    elements.append(severity_text)

    elements.append(Spacer(1, 10))

    elements.append(recommendation_text)

    elements.append(Spacer(1, 30))

    # =========================
    # HEATMAP IMAGE
    # =========================

    full_heatmap_path = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../",
            heatmap_path
        )
    )

    if os.path.exists(full_heatmap_path):

        heatmap = Image(
            full_heatmap_path,
            width=300,
            height=300
        )

        elements.append(heatmap)

    # =========================
    # BUILD PDF
    # =========================

    doc.build(elements)

    return pdf_path