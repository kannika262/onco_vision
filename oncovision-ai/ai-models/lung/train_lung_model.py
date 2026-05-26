import os

import torch

import torch.nn as nn

import torch.optim as optim

from torchvision import datasets, transforms, models

from torch.utils.data import DataLoader, random_split


# =========================================
# DATASET PATH
# =========================================

BASE_DIR = os.path.abspath(

    os.path.join(

        os.path.dirname(__file__),

        "../../"

    )

)

DATASET_DIR = os.path.join(

    BASE_DIR,

    "dataset/lung/chest_xray/chest_xray/train"

)

print("DATASET PATH:", DATASET_DIR)

# =========================================
# DEVICE
# =========================================

device = torch.device(

    "cuda"

    if torch.cuda.is_available()

    else "cpu"

)

print("USING DEVICE:", device)

# =========================================
# IMAGE TRANSFORM
# =========================================

transform = transforms.Compose([

    transforms.Resize((224, 224)),

    transforms.RandomHorizontalFlip(),

    transforms.RandomRotation(10),

    transforms.ToTensor(),

    transforms.Normalize(

        mean=[0.485, 0.456, 0.406],

        std=[0.229, 0.224, 0.225]

    )

])

# =========================================
# DATASET
# =========================================

dataset = datasets.ImageFolder(

    DATASET_DIR,

    transform=transform

)

print("CLASSES:", dataset.classes)

# =========================================
# TRAIN / VALID SPLIT
# =========================================

train_size = int(0.8 * len(dataset))

val_size = len(dataset) - train_size

train_dataset, val_dataset = random_split(

    dataset,

    [train_size, val_size]

)

train_loader = DataLoader(

    train_dataset,

    batch_size=16,

    shuffle=True

)

val_loader = DataLoader(

    val_dataset,

    batch_size=16,

    shuffle=False

)

# =========================================
# MODEL
# =========================================

model = models.densenet121(pretrained=True)

model.classifier = nn.Linear(

    model.classifier.in_features,

    2

)

model = model.to(device)

# =========================================
# LOSS & OPTIMIZER
# =========================================

criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(

    model.parameters(),

    lr=0.0001

)

# =========================================
# TRAINING
# =========================================

EPOCHS = 5

best_accuracy = 0

print("TRAINING STARTED...\n")

for epoch in range(EPOCHS):

    # =====================================
    # TRAIN
    # =====================================

    model.train()

    running_loss = 0

    correct = 0

    total = 0

    for images, labels in train_loader:

        images = images.to(device)

        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(

            outputs,

            labels

        )

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

        _, predicted = torch.max(

            outputs,

            1

        )

        total += labels.size(0)

        correct += (

            predicted == labels

        ).sum().item()

    train_accuracy = 100 * correct / total

    # =====================================
    # VALIDATION
    # =====================================

    model.eval()

    val_correct = 0

    val_total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(device)

            labels = labels.to(device)

            outputs = model(images)

            _, predicted = torch.max(

                outputs,

                1

            )

            val_total += labels.size(0)

            val_correct += (

                predicted == labels

            ).sum().item()

    val_accuracy = 100 * val_correct / val_total

    print(

        f"Epoch [{epoch+1}/{EPOCHS}] "

        f"Loss: {running_loss:.4f} "

        f"Train Acc: {train_accuracy:.2f}% "

        f"Val Acc: {val_accuracy:.2f}%"

    )

    # =====================================
    # SAVE BEST MODEL
    # =====================================

    if val_accuracy > best_accuracy:

        best_accuracy = val_accuracy

        SAVE_PATH = os.path.join(

            os.path.dirname(__file__),

            "lung_weights.pth"

        )

        torch.save(

            model.state_dict(),

            SAVE_PATH

        )

        print(

            "BEST MODEL SAVED"

        )

print("\nTRAINING COMPLETE")

print("BEST VALIDATION ACCURACY:", best_accuracy)