import React from 'react'
import { Button, View, Alert, Image, StyleSheet, MapView } from 'react-native'
import * as Location from 'expo-location';

export default function LocationManager() {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [myLocation, setLocation] = React.useState(null);

    const locateUserHandler = async () => {
        try {
          const hasPermission = await verifyPermission();
          if (hasPermission){
            const locationResponse = await Location. getCurrentPositionAsync();
            console.log(locationResponse);
            setLocation({latitude: locationResponse.coords.latitude, longitude: locationResponse.coords.longitude});
            return locationResponse;
            } else {
              Alert.alert("Permission required", "You need to grant location permission to use this feature", [{text: "ok"}]);
            }
        }
        catch (err) {
            console.log("Error locating user: ", err);
        }
      };
    const verifyPermission = async () => {
        if (response == 'granted') {
            return true;
        }
        const result = await requestPermission();
        if (result.status !== 'granted') {
            return false;
        } else {
            return true;
        }   
    }
  if (myLocation) {
    console.log(`https://maps.googleapis.com/maps/api/staticmap?center=${myLocation.latitude},${myLocation.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${myLocation.latitude},${myLocation.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`);
  }

  return (
    <View>
        <Button title="Get Location" onPress={locateUserHandler}/>
        {myLocation &&
        <Image source={{uri:`https://maps.googleapis.com/maps/api/staticmap?center=${myLocation.latitude},${myLocation.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${myLocation.latitude},${myLocation.longitude}&key=${process.env.EXPO_PUBLIC_mapApiKey}`}}
        style={styles.map}
        />}
    </View>
  )
}
const styles = StyleSheet.create({
  map : {
    width: 400,
    height: 200
  }
})