from flask import Flask, request, jsonify
import cv2
from flask_cors import CORS
from deepface import DeepFace
import base64
import numpy as np
from PIL import Image
from io import BytesIO
import imghdr
refayaan = cv2.imread('ayaan.png')
refaditya = cv2.imread('aditya.png')
mydata = {"ayaan": refayaan, "aditya": refaditya}
def save_image(image, file_path):
    image.save(file_path)
def convert_base64_to_image(base64_data):
    try:
        # Decode base64 data
        data = base64_data[base64_data.index(',')+1:]
        image_data = base64.b64decode(data)

        # Check if the decoded data is a valid image file
        image_format = Image.open(BytesIO(image_data))
        outimag = image_format.convert('RGB')
        outimag.save('image.jpg')
        if image_format:
            # Create a BytesIO object to read the image data
            image_buffer = BytesIO(image_data)

            # Open the image using PIL (Python Imaging Library)
            img = Image.open(image_buffer)

            # Save the image to the specified output path
            img.save("image.jpg")

            print(f"Image saved to image.jpg")
        else:
            print("Invalid or unsupported image file format.")
    except Exception as e:
        print(f"Error converting base64 to image: {e}")

def verify_image(image_data):
    try:
        # Convert base64 image data to OpenCV format
        image_bytes = base64.b64decode(image_data)
        image_array = np.array(Image.open(BytesIO(image_bytes)))

        if DeepFace.verify(image_array, refayaan)['verified']:
            return jsonify({"message": "verified"})
        else:
            return jsonify({"message": "not verified"})
    except Exception as e:
        print(str(e))
        return jsonify({"message": "not verified"})


app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def process_request():
    if request.method == 'GET':
        return jsonify({"message": "Hello, World!"})
    elif request.method == 'POST':
        data = request.get_json()

        base64_data = data['base64Data']
        print(base64_data)

        convert_base64_to_image(base64_data)
          # Provide your desired file path

        return {'status': 'success'}

if __name__ == '__main__':
    app.run(debug=True)

