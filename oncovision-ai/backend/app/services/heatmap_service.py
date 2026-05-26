import cv2
import numpy as np


def generate_heatmap(image_path):

    image = cv2.imread(image_path)

    heatmap = cv2.applyColorMap(image, cv2.COLORMAP_JET)

    output_path = image_path.replace(".", "_heatmap.")

    cv2.imwrite(output_path, heatmap)

    return output_path