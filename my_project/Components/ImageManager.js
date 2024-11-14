import React, {useState} from 'react'
import { View, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';


export default function ImageManager({ imageHandler }) {
    const [image, setImage] = useState("");
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = useState("");

    async function verifyPermissions() {
      try {
        if (response !== 'granted') {
            const granted = await requestPermission();
            return granted;
        }
        return true;
    } catch (err) {
        console.log(err);
      }
    };

    async function takeImageHandler() {
      try {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            Alert.alert("Permission required", "You need to grant camera permission to use this feature", [{text: "ok"}]);
        } else {
         
            const result = await ImagePicker.launchCameraAsync()
            //console.log(result);
            if (!result.canceled) {
                // setImage(result.assets[0].uri);
                // imageHandler(result.assets[0].uri);
                setImage(result.uri);
                imageHandler(result.uri);
            }
        } 
    }
    catch (err) {
        console.log(err);
        
      };
    };

    async function pickImageHandler() {
      try {
        const hasPermission = await verifyPermissions();
        if (hasPermission) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.1,
            });
            //console.log(result);
            if (!result.canceled) {
                setImageURI(result.uri);
                imageHandler(result.uri);
            }
        }
    } catch (err) {
        console.log(err);
      }
    }

  return (
    <View>
        {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
        <Button 
        title="Take a photo"
        onPress={takeImageHandler}
        ></Button>
    </View>
  )
}
