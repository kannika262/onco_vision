import os
import cv2
import torch
import numpy as np

from PIL import Image

import torch.nn.functional as F

from torchvision import transforms


# =====================================================
# IMAGE TRANSFORM
# =====================================================

transform = transforms.Compose([

    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(

        mean=[0.485, 0.456, 0.406],

        std=[0.229, 0.224, 0.225]

    )

])


# =====================================================
# GENERATE GRADCAM
# =====================================================

def generate_gradcam(

    model,

    image_path,

    scan_type="brain"

):

    try:

        # =================================================
        # ONLY FOR BRAIN MRI
        # =================================================

        if scan_type != "brain":

            return None

        # =================================================
        # LOAD IMAGE
        # =================================================

        image = Image.open(
            image_path
        ).convert("RGB")

        original_image = cv2.imread(
            image_path
        )

        original_image = cv2.resize(

            original_image,

            (224, 224)

        )

        input_tensor = transform(
            image
        ).unsqueeze(0)

        # =================================================
        # STORE ACTIVATIONS & GRADIENTS
        # =================================================

        gradients = []

        activations = []

        # =================================================
        # FORWARD HOOK
        # =================================================

        def forward_hook(

            module,

            input,

            output

        ):

            activations.append(output)

        # =================================================
        # BACKWARD HOOK
        # =================================================

        def backward_hook(

            module,

            grad_input,

            grad_output

        ):

            gradients.append(
                grad_output[0]
            )

        # =================================================
        # TARGET LAYER
        # =================================================

        target_layer = model.layer4[-1]

        forward_handle = (
            target_layer.register_forward_hook(
                forward_hook
            )
        )

        backward_handle = (
            target_layer.register_full_backward_hook(
                backward_hook
            )
        )

        # =================================================
        # MODEL EVAL
        # =================================================

        model.eval()

        # =================================================
        # FORWARD PASS
        # =================================================

        output = model(input_tensor)

        predicted_class = output.argmax(
            dim=1
        )

        # =================================================
        # BACKWARD PASS
        # =================================================

        model.zero_grad()

        loss = output[
            0,
            predicted_class
        ]

        loss.backward()

        # =================================================
        # GET GRADIENTS & ACTIVATIONS
        # =================================================

        grads = gradients[0].detach()

        acts = activations[0].detach()

        pooled_grads = torch.mean(

            grads,

            dim=[0, 2, 3]

        )

        # =================================================
        # APPLY CHANNEL WEIGHTS
        # =================================================

        for i in range(
            acts.shape[1]
        ):

            acts[:, i, :, :] *= (
                pooled_grads[i]
            )

        # =================================================
        # CREATE HEATMAP
        # =================================================

        heatmap = torch.mean(

            acts,

            dim=1

        ).squeeze()

        heatmap = F.relu(
            heatmap
        )

        # =================================================
        # NORMALIZE
        # =================================================

        if torch.max(heatmap) != 0:

            heatmap /= torch.max(
                heatmap
            )

        heatmap = heatmap.cpu().numpy()

        # =================================================
        # RESIZE HEATMAP
        # =================================================

        heatmap = cv2.resize(

            heatmap,

            (224, 224)

        )

        heatmap = np.uint8(
            255 * heatmap
        )

        # =================================================
        # APPLY COLORMAP
        # =================================================

        heatmap = cv2.applyColorMap(

            heatmap,

            cv2.COLORMAP_JET

        )

        # =================================================
        # OVERLAY ON ORIGINAL IMAGE
        # =================================================

        superimposed = cv2.addWeighted(

            original_image,

            0.6,

            heatmap,

            0.4,

            0

        )

        # =================================================
        # SAVE HEATMAP
        # =================================================

        output_dir = os.path.join(

            "app",

            "uploads"

        )

        os.makedirs(

            output_dir,

            exist_ok=True

        )

        filename = (
            f"heatmap_"
            f"{os.path.basename(image_path)}"
        )

        output_path = os.path.join(

            output_dir,

            filename

        )

        cv2.imwrite(

            output_path,

            superimposed

        )

        print(
            "HEATMAP SAVED:",
            output_path
        )

        # =================================================
        # REMOVE HOOKS
        # =================================================

        forward_handle.remove()

        backward_handle.remove()

        # =================================================
        # RETURN RELATIVE PATH
        # =================================================

        return f"uploads/{filename}".replace("\\", "/")

    except Exception as e:

        print(
            "GRADCAM ERROR:",
            str(e)
        )

        return None