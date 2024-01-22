import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
const App = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!photo.cancelled) {
      const imageUri = photo.uri;
      console.log(imageUri);      
      convertToBase64(imageUri, function (base64Data) {
        console.log(base64Data);
        sendToFlaskAPI(base64Data);
    });

    }
  };
  function convertToBase64(uri, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', uri);
    xhr.responseType = 'blob';
    xhr.send();

}
  const sendToFlaskAPI = async (base64Data) => {
    try {
      const response = await axios.post('https://1925-2409-40f2-b-caed-802e-b220-5fdf-1430.ngrok-free.app/', { base64Data });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="take photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
     
    </View>
  );
};

export default App;





