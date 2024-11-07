import React, {useState} from 'react'
import { View, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-image-picker';


export default function ImageManager({ imageHandler }) {
    const [image, setImage] = useState(null);
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = useState(null);

    const verifyPermissions = async () => {
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

    const takeImageHandler = async () => {
      try {
        const hasPermission = await verifyPermissions();
        if (hasPermission) {
            const result = await ImagePicker.launchCameraAsync({
                // mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                // aspect: [4, 3],
                // quality: 1,
            })
            console.log(result);
            if (!result.cancelled) {
                setImage(result.assets[0].uri);
                imageHandler(result.assets[0].uri);
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
                quality: 1,
            });
            console.log(result);
            if (!result.cancelled) {
                setImageURI(result.assets[0].uri);
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
        title="Select Photo"
        onPress={takeImageHandler}
        ></Button>
    </View>
  )
}
