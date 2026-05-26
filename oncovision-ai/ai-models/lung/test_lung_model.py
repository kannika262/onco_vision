from lung_model import predict_lung_cancer

image_path = "../../dataset/lung/chest_xray/chest_xray/test/PNEUMONIA/person1_virus_6.jpeg"

result = predict_lung_cancer(image_path)

print(result)