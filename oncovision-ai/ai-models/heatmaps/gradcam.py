import os
import sys

import cv2
import torch
import numpy as np

from PIL import Image

from torchvision import transforms
import matplotlib.cm as cm


# =========================================
# IMPORT MODEL
# =========================================

BASE_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../brain"
    )
)

sys.path.append(BASE_DIR)

from brain_model import model


# =========================================
# DEVICE
# =========================================

device = torch.device(
    "cuda" if torch.cuda.is_available()
    else "cpu"
)

model = model.to(device)

model.eval()


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
# TARGET LAYER
# =========================================

target_layer = model.layer4[-1]


# =========================================
# STORAGE
# =========================================

gradients = None
activations = None


# =========================================
# FORWARD HOOK
# =========================================

def forward_hook(module, input, output):

    global activations

    activations = output


# =========================================
# BACKWARD HOOK
# =========================================

def backward_hook(module, grad_input, grad_output):

    global gradients

    gradients = grad_output[0]


# =========================================
# REGISTER HOOKS
# =========================================

target_layer.register_forward_hook(
    forward_hook
)

target_layer.register_full_backward_hook(
    backward_hook
)


# =========================================
# GENERATE HEATMAP
# =========================================

def generate_gradcam(image_path):

    try:

        # =====================================
        # LOAD IMAGE
        # =====================================

        image = Image.open(
            image_path
        ).convert("RGB")

        original_image = np.array(image)

        # =====================================
        # PREPROCESS
        # =====================================

        input_tensor = transform(
            image
        ).unsqueeze(0).to(device)

        # =====================================
        # FORWARD PASS
        # =====================================

        output = model(input_tensor)

        predicted_class = torch.argmax(
            output,
            dim=1
        )

        # =====================================
        # BACKWARD PASS
        # =====================================

        model.zero_grad()

        output[
            0,
            predicted_class
        ].backward()

        # =====================================
        # GET GRADIENTS
        # =====================================

        pooled_gradients = torch.mean(

            gradients,

            dim=[0, 2, 3]

        )

        # =====================================
        # GET ACTIVATIONS
        # =====================================

        activation = activations[0]

        # =====================================
        # APPLY WEIGHTS
        # =====================================

        for i in range(

            pooled_gradients.shape[0]

        ):

            activation[i, :, :] *= pooled_gradients[i]

        # =====================================
        # CREATE HEATMAP
        # =====================================

        heatmap = torch.mean(

            activation,

            dim=0

        ).detach().cpu().numpy()

        # =====================================
        # RELU
        # =====================================

        heatmap = np.maximum(
            heatmap,
            0
        )

        # =====================================
        # NORMALIZE
        # =====================================

        if np.max(heatmap) != 0:

            heatmap /= np.max(heatmap)

        # =====================================
        # RESIZE
        # =====================================

        heatmap = cv2.resize(

            heatmap,

            (
                original_image.shape[1],
                original_image.shape[0]
            )

        )

        # =====================================
        # APPLY COLORMAP
        # =====================================

        colored_heatmap = cm.jet(
            heatmap
        )[:, :, :3]

        colored_heatmap = np.uint8(
            255 * colored_heatmap
        )

        # =====================================
        # OVERLAY
        # =====================================

        superimposed_img = cv2.addWeighted(

            original_image,

            0.65,

            colored_heatmap,

            0.35,

            0

        )

        # =====================================
        # SAVE IMAGE
        # =====================================

        output_path = os.path.abspath(

            os.path.join(

                os.path.dirname(__file__),

                "../../backend/app/uploads/gradcam_output.jpg"

            )

        )

        cv2.imwrite(

            output_path,

            cv2.cvtColor(
                superimposed_img,
                cv2.COLOR_RGB2BGR
            )

        )

        print(
            "HEATMAP SAVED:",
            output_path
        )

        return "uploads/gradcam_output.jpg"

    except Exception as e:

        print(
            "GRADCAM ERROR:",
            str(e)
        )

        return None