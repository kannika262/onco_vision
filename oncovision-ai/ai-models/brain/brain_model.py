import torch

import torch.nn as nn

from torchvision import models, transforms

from PIL import Image

import os


# =========================================
# MODEL PATH
# =========================================

MODEL_PATH = os.path.join(

    os.path.dirname(__file__),

    "brain_model.pth"

)

# =========================================
# DEVICE
# =========================================

device = torch.device(

    "cuda" if torch.cuda.is_available()

    else "cpu"

)

print("USING DEVICE:", device)

# =========================================
# LOAD MODEL
# =========================================

model = models.resnet18(weights=None)

model.fc = nn.Linear(

    model.fc.in_features,

    2

)

# =========================================
# LOAD WEIGHTS
# =========================================

model.load_state_dict(

    torch.load(

        MODEL_PATH,

        map_location=device

    )

)

model.to(device)

model.eval()

print("BRAIN MODEL LOADED SUCCESSFULLY")

# =========================================
# IMAGE TRANSFORM
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
# CLASSES
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

        image = Image.open(

            image_path

        ).convert("RGB")

        image = transform(image)

        image = image.unsqueeze(0)

        image = image.to(device)

        with torch.no_grad():

            outputs = model(image)

            probabilities = torch.softmax(

                outputs,

                dim=1

            )

            confidence, predicted = torch.max(

                probabilities,

                1

            )

        prediction = classes[

            predicted.item()

        ]

        confidence = round(

            confidence.item() * 100,

            2

        )

        return {

            "prediction": prediction,

            "confidence": confidence

        }

    except Exception as e:

        print(

            "BRAIN MODEL ERROR:",

            str(e)

        )

        return {

            "prediction": "Prediction Failed",

            "confidence": 0

        }