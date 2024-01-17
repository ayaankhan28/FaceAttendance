import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      if (image) {
        const imageData = {
          image: image,
          email: 'ayaan' // Replace with the actual email or get it dynamically
        };
  
        const response = await axios.post('https://cc38-106-51-13-146.ngrok-free.app/', imageData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Handle the response as needed
        console.log('Upload success:', response.data);
      } else {
        Alert.alert('Error', 'Please select an image first.');
      }
    } catch (error) {
      // Handle errors as before
      console.error('Upload failed:', error);
    }
  };

  return (
    <View>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

export default App;





/*

import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import { View, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import client from './api/client';

const Home = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const cameraRef = React.useRef(null);
    const [myData, setMydata] = useState([]);
    const [isError, setIsError] = useState("");
    var con = false;
    const [profileImage, setProfileImage] = useState(null);
    
    

    useEffect(() => {
        (async () => {
            await MediaLibrary.requestPermissionsAsync();
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
       
        
    }, []);

    const openCamera = () => {
        if (hasPermission) {
            setShowCamera(true);
        } else {
            Alert.alert('Permission Denied', 'Camera permissions are required to use this feature.');
        }
    };
    const sendDataToApi = async (photoUri) => {
        // Replace 'imageUri' with the actual URI of your captured photo
        const imageUri = photoUri;

        // Create FormData object
        const formData = new FormData();
        formData.append('image', {
            name: '_image',
            uri: profileImage,
            type: 'image/jpg',
        });


        try{
            const rs = await client.post('/hello', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log(rs.data);
        }catch (err) {
            console.log(err);
        }
    
      };

    const uploadImage = async (imageUri) => {
    try {
        // Convert image URI to Blob
        const response = await fetch(imageUri);
        const blob = await response.blob();
    
        // Create FormData object and append the Blob
        const formData = new FormData();
        formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', // Adjust the type based on your image format
        name: 'photo.jpg',
        });
    
        // Adjust the API endpoint accordingly
        const apiUrl = 'https://fb41-106-51-13-146.ngrok-free.app/';
        
        // Make a POST request to the API with FormData containing the image Blob
        const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
        });
    
        // Handle the API response as needed
        const result = await apiResponse.json();
        console.log('API Response:', result);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
    };
      

    const closeCamera = () => {
        if (hasPermission) {
            setShowCamera(false);
        } else {
            Alert.alert('Permission Denied', 'Camera permissions are required to use this feature.');
        }
    };
    

    const takePicture = async () => {
        
        
       
        if (cameraRef.current) {
            try {
                const { uri } = await cameraRef.current.takePictureAsync();
                //const { uri2 } = await cameraRef.current.launchImageLibraryAsync();
                //console.log(uri2.uri);
                console.log(uri);
                uploadImage(uri);
                setProfileImage(uri);
                
                //const result = await launchCamera();
                Alert.alert('Picture Taken', 'The picture has been taken.');
                
                
                //sendDataToApi(uri);
                saveToGallery(uri);
                
            } catch (error) {
                Alert.alert('Error', `Could not take the picture: ${error}`);
            }
        }
        //closeCamera();
    };

    const saveToGallery = async (uri) => {
        try {
            await MediaLibrary.saveToLibraryAsync(uri);
            Alert.alert('Photo Saved', 'The photo has been saved to your device.');
        } catch (error) {
            Alert.alert('Error', `Could not save the photo to the device: ${error}`);
        }
    };

    return (
        <View>
            <Button title="Open Camera" onPress={openCamera} />
            <Button title="Close Camera" onPress={closeCamera} />

            {showCamera && hasPermission && (
                <>
                    <Camera
                        style={{ width: '100%', height: 500 }}
                        type={Camera.Constants.Type.front}
                        ref={cameraRef}
                    />
                    <Button title="Take Picture" onPress={takePicture} />
                </>
            )}
           
            


        </View>
    );
};

export default Home;



*/