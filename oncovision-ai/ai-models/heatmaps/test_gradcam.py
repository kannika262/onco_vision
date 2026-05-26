from gradcam import generate_gradcam

output = generate_gradcam(
    "../../dataset/brain/brain_tumor_dataset/yes/Y1.jpg"
)

print(output)