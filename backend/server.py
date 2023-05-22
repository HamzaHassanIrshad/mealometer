from flask import Flask, request, jsonify
from PIL import Image
from flask_cors import CORS
import pickle
import torch
import numpy as np
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

# Load the image classification model
with open('./model/model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the class names
with open('./data/classes.txt', 'r') as file:
    classes = [line.strip() for line in file.readlines()]

# Preprocess the image


def process_image(image):
    # Resize the image to 224x224 pixels
    image = image.resize((224, 224))

    # Convert the image to a NumPy array
    image_array = np.array(image)

    # Normalize the image
    normalized_image = image_array / 255.0

    # Convert the image to a PyTorch tensor
    tensor_image = torch.from_numpy(normalized_image).permute(2, 0, 1).float()

    # Add a batch dimension
    tensor_image = tensor_image.unsqueeze(0)

    return tensor_image

# Predict the class label


def predict(image, model):
    with torch.no_grad():
        # Forward pass through the model
        output = model(image)

        # Compute the predicted probabilities and class indices
        probabilities = torch.softmax(output, dim=1)
        _, predicted_indices = torch.max(probabilities, dim=1)

        # Get the predicted class label
        predicted_label = classes[predicted_indices.item()]

        # Format the predicted label
        predicted_label = predicted_label.replace(
            "_", " ")  # Replace underscores with spaces
        predicted_label = predicted_label.title()  # Capitalize each word

        # Get the predicted probability
        predicted_probability = probabilities[0,
                                              predicted_indices].item() * 100.0

    return predicted_label, predicted_probability


# Route for image classification


@app.route('/', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})

    # Load and preprocess the image
    image_file = request.files['image']
    image = Image.open(image_file)
    processed_image = process_image(image)

    # Perform classification
    predicted_label, predicted_probability = predict(processed_image, model)

    # Return the prediction as JSON
    return jsonify({'class': predicted_label, 'probability': predicted_probability})


if __name__ == '__main__':
    app.run()
