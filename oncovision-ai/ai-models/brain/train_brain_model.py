import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets, transforms, models
from torchvision.models import ResNet18_Weights

from torch.utils.data import DataLoader


# Transform Images
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Dataset Path
dataset_path = '../../dataset/brain/brain_tumor_dataset'
# Load Dataset
dataset = datasets.ImageFolder(
    root=dataset_path,
    transform=transform
)

# Data Loader
train_loader = DataLoader(
    dataset,
    batch_size=16,
    shuffle=True
)

# Load ResNet18
model = models.resnet18(
    weights=ResNet18_Weights.DEFAULT
)

# Modify Output Layer
num_features = model.fc.in_features

model.fc = nn.Linear(num_features, 2)

# Device
device = torch.device(
    'cuda' if torch.cuda.is_available() else 'cpu'
)

model = model.to(device)

# Loss Function
criterion = nn.CrossEntropyLoss()

# Optimizer
optimizer = optim.Adam(
    model.parameters(),
    lr=0.001
)

# Training
epochs = 5

for epoch in range(epochs):

    running_loss = 0.0

    for images, labels in train_loader:

        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

    print(f'Epoch [{epoch+1}/{epochs}] Loss: {running_loss:.4f}')

# Save Model
torch.save(
    model.state_dict(),
    'brain_weights.pth'
)

print('Model Trained Successfully')