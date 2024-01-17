from flask import Flask, request, jsonify
import cv2
from flask_cors import CORS
from deepface import DeepFace
import base64
import numpy as np
from PIL import Image
from io import BytesIO

refayaan = cv2.imread('ayaan.png')
refaditya = cv2.imread('aditya.png')
mydata = {"ayaan": refayaan, "aditya": refaditya}


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

        if 'image' in data:
            print(data)
            image_data = data['image']


            response = verify_image(image_data)
            return response
        else:
            return jsonify({"error": "Please provide 'image' and 'email' parameters in the request."}), 400

if __name__ == '__main__':
    app.run(debug=True)

"""
from flask import Flask, request, jsonify
import cv2
from werkzeug.utils import secure_filename
from PIL import Image
from deepface import DeepFace
from werkzeug.utils import secure_filename
refayaan = cv2.imread('ayaan.png')
refaditya = cv2.imread('aditya.png')
mydata = {"ayaan":refayaan,"aditya":refaditya}
def verify(image,email):
    print(image)
    try:


        if DeepFace.verify(image,mydata[email])['verified']:
            return "verified"
        else:
            return "not verified"
    except ValueError:
        return "not verified"
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def concatenate_hello_world():
    if request.method == 'GET':
        return jsonify(message='Hello, World!')
    elif request.method == 'POST':
        data = request.get_json()
        



        if 'text' in data:
            input_text = data['text']
            response = verify(input_text[1],input_text[0])

            return jsonify(message=response)
        else:
            return jsonify(error='Please provide a "text" parameter in the request.'), 400

if __name__ == '__main__':
    app.run(debug=True)

"""