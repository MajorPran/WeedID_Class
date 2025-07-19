import torch
from PIL import Image
import os

# Load the YOLO model
MODEL_PATH = os.path.join('model', 'best.pt')
model = torch.hub.load('ultralytics/yolov5', 'custom', path=MODEL_PATH, force_reload=True)

# Load a test image
image_path = '32227_jpg.rf.e3e43b06dcec3f59abae3689b243bc31.jpg'  # Replace with the path to an image you know works
image = Image.open(image_path)

# Run inference
try:
    results = model(image)
    results.show()  # Displays results visually (if possible in your setup)
    print(results.pandas().xyxy[0])  # Prints detection data
except Exception as e:
    print("Error during model inference:", e)
