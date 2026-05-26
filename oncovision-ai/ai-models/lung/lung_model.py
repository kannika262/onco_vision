import os
import torch
import torch.nn as nn

from torchvision import models
from torchvision import transforms

from PIL import Image


# =========================
# MODEL PATH
# =========================

MODEL_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "lung_weights.pth"
    )
)


# =========================
# LOAD DENSENET121
# =========================

model = models.densenet121(weights=None)

num_features = model.classifier.in_features

model.classifier = nn.Linear(
    num_features,
    2
)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=torch.device("cpu")
    )
)

model.eval()


# =========================
# IMAGE TRANSFORM
# =========================

transform = transforms.Compose([

    transforms.Resize((224, 224)),

    transforms.ToTensor()

])


# =========================
# PREDICTION FUNCTION
# =========================

def predict_lung_cancer(image_path):

    image = Image.open(image_path).convert("RGB")

    image = transform(image).unsqueeze(0)

    with torch.no_grad():

        output = model(image)

        probabilities = torch.softmax(
            output,
            dim=1
        )

        confidence, predicted = torch.max(
            probabilities,
            1
        )

    prediction = (
        "Lung Disease Detected"
        if predicted.item() == 1
        else "Normal Lung"
    )

    return {

        "prediction": prediction,

        "confidence": round(
            confidence.item() * 100,
            2
        )
    }