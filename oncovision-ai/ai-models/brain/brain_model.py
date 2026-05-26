import os

import torch

import torch.nn as nn

from torchvision import models, transforms

from PIL import Image


# =========================================
# DEVICE CONFIG
# =========================================

device = torch.device(

    "cuda"

    if torch.cuda.is_available()

    else "cpu"

)

print("USING DEVICE:", device)

# =========================================
# MODEL PATH
# =========================================

MODEL_PATH = os.path.join(

    os.path.dirname(__file__),

    "brain_weights.pth"

)

# =========================================
# LOAD MODEL
# =========================================

model = models.resnet18(weights=None)

model.fc = nn.Linear(

    model.fc.in_features,

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

    print("BRAIN MODEL LOADED SUCCESSFULLY")

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

classes = [

    "No Tumor",

    "Tumor Detected"

]

# =========================================
# PREDICTION FUNCTION
# =========================================

def predict_brain_tumor(image_path):

    try:

        # =====================================
        # VALIDATE IMAGE
        # =====================================

        if not os.path.exists(image_path):

            return {

                "prediction":
                "Prediction Failed",

                "confidence":
                0

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
        # SCORES
        # =====================================

        no_tumor_prob = probabilities[
            0
        ][0].item()

        tumor_prob = probabilities[
            0
        ][1].item()

        # =====================================
        # STABLE DECISION LOGIC
        # =====================================

        THRESHOLD = 0.70

        if tumor_prob >= THRESHOLD:

            prediction = "Tumor Detected"

            confidence = round(

                tumor_prob * 100,

                2

            )

        else:

            prediction = "No Tumor"

            confidence = round(

                no_tumor_prob * 100,

                2

            )

        # =====================================
        # SAFETY LIMITS
        # =====================================

        if confidence > 99.5:

            confidence = 99.0

        # =====================================
        # DEBUG LOGS
        # =====================================

        print("\n========== AI PREDICTION ==========")

        print("Tumor Probability:", tumor_prob)

        print("No Tumor Probability:", no_tumor_prob)

        print("Final Prediction:", prediction)

        print("Confidence:", confidence)

        print("===================================\n")

        # =====================================
        # RETURN RESULT
        # =====================================

        return {

            "prediction":
            prediction,

            "confidence":
            confidence

        }

    except Exception as e:

        print(

            "BRAIN PREDICTION ERROR:",

            str(e)

        )

        return {

            "prediction":
            "Prediction Failed",

            "confidence":
            0

        }