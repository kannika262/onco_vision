import os
import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets
from torchvision import transforms
from torchvision import models

from torch.utils.data import DataLoader


# =========================
# DATASET PATH
# =========================

DATASET_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../dataset/lung/chest_xray/chest_xray/train"
    )
)
print("DATASET PATH:", DATASET_PATH)


# =========================
# IMAGE TRANSFORMS
# =========================

transform = transforms.Compose([

    transforms.Resize((224, 224)),

    transforms.RandomHorizontalFlip(),

    transforms.RandomRotation(10),

    transforms.ToTensor()

])


# =========================
# LOAD DATASET
# =========================

dataset = datasets.ImageFolder(

    DATASET_PATH,

    transform=transform

)

print("CLASSES:", dataset.classes)

print("TOTAL IMAGES:", len(dataset))


# =========================
# DATALOADER
# =========================

loader = DataLoader(

    dataset,

    batch_size=16,

    shuffle=True

)


# =========================
# LOAD DENSENET121
# =========================

model = models.densenet121(pretrained=True)

num_features = model.classifier.in_features

model.classifier = nn.Linear(
    num_features,
    2
)


# =========================
# LOSS FUNCTION
# =========================

criterion = nn.CrossEntropyLoss()


# =========================
# OPTIMIZER
# =========================

optimizer = optim.Adam(

    model.parameters(),

    lr=0.001

)


# =========================
# TRAINING
# =========================

EPOCHS = 5

print("\nTRAINING STARTED...\n")

for epoch in range(EPOCHS):

    running_loss = 0.0

    correct = 0

    total = 0

    for images, labels in loader:

        # =========================
        # ZERO GRADIENTS
        # =========================

        optimizer.zero_grad()

        # =========================
        # FORWARD PASS
        # =========================

        outputs = model(images)

        # =========================
        # LOSS
        # =========================

        loss = criterion(outputs, labels)

        # =========================
        # BACKPROPAGATION
        # =========================

        loss.backward()

        optimizer.step()

        # =========================
        # STATS
        # =========================

        running_loss += loss.item()

        _, predicted = torch.max(outputs, 1)

        total += labels.size(0)

        correct += (predicted == labels).sum().item()

    # =========================
    # EPOCH RESULTS
    # =========================

    accuracy = 100 * correct / total

    print(

        f"Epoch [{epoch+1}/{EPOCHS}] | "
        f"Loss: {running_loss:.4f} | "
        f"Accuracy: {accuracy:.2f}%"

    )


# =========================
# SAVE MODEL
# =========================

MODEL_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "lung_weights.pth"
    )
)

torch.save(

    model.state_dict(),

    MODEL_PATH

)

print("\nMODEL TRAINED SUCCESSFULLY")

print(f"MODEL SAVED TO:\n{MODEL_PATH}")