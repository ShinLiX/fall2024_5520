import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
// import { getCurrentPositionAsync } from "expo-location";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();
  const navigation = useNavigation();

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
  async function locateUserHandler() {
    try {
      // call verifyPermission and only proceed if you have permission
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("YOu need to give location permission");
        return;
      }
      const locationResponse = await Location.getCurrentPositionAsync();
      console.log(locationResponse);
      setLocation({
        latitude: locationResponse.coords.latitude,
        longitude: locationResponse.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  }
  function chooseLocationHandler() {
    //navigate to Map.js
    navigation.navigate("Map");
  }

  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
      <Button
        title="Let me choose my location"
        onPress={chooseLocationHandler}
      />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`,
          }}
          style={styles.map}
          alt="static map"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: { width: windowWidth, height: 200 },
});