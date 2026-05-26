import torch
from torchvision import models, transforms
from PIL import Image

# Load pretrained ResNet50
model = models.resnet50(pretrained=True)

model.eval()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict_breast(image_path):

    image = Image.open(image_path).convert("RGB")

    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)

    probability = torch.softmax(outputs, dim=1)

    confidence = torch.max(probability).item()

    # Mock prediction for hackathon MVP
    prediction = "Possible Breast Tumor Detected"

    return {
        "prediction": prediction,
        "confidence": f"{confidence * 100:.2f}%"
    }