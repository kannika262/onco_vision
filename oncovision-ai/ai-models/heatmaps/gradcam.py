import os
import cv2
import torch
import numpy as np

from PIL import Image
from torchvision import transforms, models
import torch.nn as nn
def generate_gradcam(image_path):

    # =========================
    # LOAD ORIGINAL IMAGE
    # =========================

    original = cv2.imread(image_path)

    original = cv2.resize(original, (128, 128))

    gray = cv2.cvtColor(
        original,
        cv2.COLOR_BGR2GRAY
    )

    # =========================
    # BLUR IMAGE
    # =========================

    blur = cv2.GaussianBlur(
        gray,
        (5, 5),
        0
    )

    # =========================
    # THRESHOLD BRIGHT TUMOR AREA
    # =========================

    _, thresh = cv2.threshold(
        blur,
        180,
        255,
        cv2.THRESH_BINARY
    )

    # =========================
    # REMOVE NOISE
    # =========================

    kernel = np.ones((5, 5), np.uint8)

    thresh = cv2.morphologyEx(
        thresh,
        cv2.MORPH_OPEN,
        kernel
    )

    thresh = cv2.morphologyEx(
        thresh,
        cv2.MORPH_CLOSE,
        kernel
    )

    # =========================
    # FIND CONTOURS
    # =========================

    contours, _ = cv2.findContours(
        thresh,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    # =========================
    # COPY ORIGINAL IMAGE
    # =========================

    output = original.copy()

    if contours:

        # Largest contour = tumor
        largest_contour = max(
            contours,
            key=cv2.contourArea
        )

        # Ignore tiny regions
        if cv2.contourArea(largest_contour) > 100:

            # Create mask
            mask = np.zeros_like(gray)

            cv2.drawContours(
                mask,
                [largest_contour],
                -1,
                255,
                -1
            )

            # Smooth mask
            mask = cv2.GaussianBlur(
                mask,
                (31, 31),
                0
            )

            alpha = mask.astype(np.float32) / 255.0

            alpha = alpha * 0.45

            # Apply RED overlay ONLY inside tumor
            for c in range(3):

                if c == 2:  # Red channel

                    output[:, :, c] = np.where(
                        alpha > 0,
                        output[:, :, c] +
                        (255 - output[:, :, c]) * alpha,
                        output[:, :, c]
                    )

            # Draw clean contour
            cv2.drawContours(
                output,
                [largest_contour],
                -1,
                (0, 0, 255),
                2
            )

    # =========================
    # SAVE OUTPUT
    # =========================

    output_dir = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../../backend/app/uploads"
        )
    )

    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(
        output_dir,
        "gradcam_output.jpg"
    )

    cv2.imwrite(output_path, output)

    print("HEATMAP SAVED:", output_path)

    return "uploads/gradcam_output.jpg"