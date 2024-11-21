import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
// import { launchCameraAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ receiveImageUri }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  async function verifyPermission() {
    //check if user has granted permission return true
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      //else ask for permission
      //return the granted property of the response
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission ", err);
    }
  }
  async function takeImageHandler() {
    try {
      // call verify permission and only proceed to open camera if you have permission
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give camera permission");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        //imageUri is still empty string
        receiveImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.log("take an image", err);
    }
  }
  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
          alt="preview of the image user has taken"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: 100, height: 100 },
});