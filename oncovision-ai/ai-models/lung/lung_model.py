import os

import torch

import torch.nn as nn

from torchvision import models, transforms

from PIL import Image


# =========================================
# DEVICE CONFIGURATION
# =========================================

device = torch.device(
    "cuda" if torch.cuda.is_available()
    else "cpu"
)

print("USING DEVICE:", device)


# =========================================
# MODEL PATH
# =========================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "lung_weights.pth"
)


# =========================================
# LOAD MODEL
# =========================================

model = models.densenet121(weights=None)

model.classifier = nn.Linear(
    model.classifier.in_features,
    2
)

# =========================================
# LOAD TRAINED WEIGHTS
# =========================================

try:

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location=device
        )
    )

    print("LUNG MODEL LOADED SUCCESSFULLY")

except Exception as e:

    print("MODEL LOAD ERROR:", str(e))


model = model.to(device)

model.eval()


# =========================================
# IMAGE PREPROCESSING
# =========================================

transform = transforms.Compose([

    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(

        mean=[0.485, 0.456, 0.406],

        std=[0.229, 0.224, 0.225]

    )

])


# =========================================
# CLASS LABELS
# =========================================
# IMPORTANT:
# Folder order during training should be:
# NORMAL -> class 0
# PNEUMONIA -> class 1
# =========================================

classes = [
    "Normal",
    "Pneumonia Detected"
]


# =========================================
# PREDICTION FUNCTION
# =========================================

def predict_lung_cancer(image_path):

    try:

        # =====================================
        # CHECK FILE EXISTS
        # =====================================

        if not os.path.exists(image_path):

            return {

                "prediction": "Prediction Failed",

                "confidence": 0

            }

        # =====================================
        # LOAD IMAGE
        # =====================================

        image = Image.open(
            image_path
        ).convert("RGB")

        # =====================================
        # TRANSFORM IMAGE
        # =====================================

        image_tensor = transform(
            image
        ).unsqueeze(0)

        image_tensor = image_tensor.to(device)

        # =====================================
        # MODEL INFERENCE
        # =====================================

        with torch.no_grad():

            outputs = model(
                image_tensor
            )

            probabilities = torch.softmax(
                outputs,
                dim=1
            )

        # =====================================
        # EXTRACT PROBABILITIES
        # =====================================

        normal_prob = probabilities[0][0].item()

        pneumonia_prob = probabilities[0][1].item()

        # =====================================
        # DEBUG OUTPUT
        # =====================================

        print("\n========== LUNG AI ==========")

        print("Normal Probability:",
              round(normal_prob, 4))

        print("Pneumonia Probability:",
              round(pneumonia_prob, 4))

        print("=============================\n")

        # =====================================
        # PREDICTION LOGIC
        # =====================================

        THRESHOLD = 0.80

        if pneumonia_prob >= THRESHOLD:

            prediction = "Pneumonia Detected"

            confidence = round(
                pneumonia_prob * 100,
                2
            )

        else:

            prediction = "Normal"

            confidence = round(
                normal_prob * 100,
                2
            )

        # =====================================
        # SAFETY CONFIDENCE LIMIT
        # =====================================

        if confidence > 99:

            confidence = 98.5

        # =====================================
        # RETURN RESPONSE
        # =====================================

        return {

            "prediction": prediction,

            "confidence": confidence

        }

    except Exception as e:

        print(
            "LUNG PREDICTION ERROR:",
            str(e)
        )

        return {

            "prediction": "Prediction Failed",

            "confidence": 0

        }