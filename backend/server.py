from flask import Flask, request, jsonify
from PIL import Image
from flask_cors import CORS
import pickle
import torch
import numpy as np

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
    # Get the dimensions of the image
    width, height = image.size

    # Resize the image while maintaining the aspect ratio, with the shorter side resized to 255 pixels
    image = image.resize((255, int(255 * (height / width)))
                         if width < height else (int(255 * (width / height)), 255))

    # Get the dimensions of the new image size
    width, height = image.size

    # Set the coordinates to do a center crop of 224 x 224
    left = (width - 224) / 2
    top = (height - 224) / 2
    right = (width + 224) / 2
    bottom = (height + 224) / 2
    image = image.crop((left, top, right, bottom))

    # Convert the image to a NumPy array
    image_array = np.array(image)

    # Make all values between 0 and 1
    image_array = image_array / 255.0

    # Normalize the image based on preset mean and standard deviation values
    image_array[:, :, 0] = (image_array[:, :, 0] - 0.485) / 0.229
    image_array[:, :, 1] = (image_array[:, :, 1] - 0.456) / 0.224
    image_array[:, :, 2] = (image_array[:, :, 2] - 0.406) / 0.225

    # Convert the image to a PyTorch tensor
    tensor_image = torch.from_numpy(image_array).permute(2, 0, 1).float()

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

    # Determine if it's a food image or non-food image based on the predicted probability
    if predicted_probability > 50:
        result = {'class': predicted_label,
                  'probability': predicted_probability}
    else:
        non_food_probability = 100.0 - predicted_probability
        result = {'class': 'non_food', 'probability': non_food_probability}

    # Return the prediction as JSON
    return jsonify(result)


if __name__ == '__main__':
    app.run()
