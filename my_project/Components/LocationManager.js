import React from 'react'
import { Button, View } from 'react-native'
import * as Location from 'expo-location';

export default function LocationManager() {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [myLocation, setLocation] = React.useState(null);

    const locateUserHandler = async () => {
        try {
          if (verifyPermission()){
            const location = await Location. getCurrentPositionAsync();
            console.log(location);
            return location;
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

  return (
    <View>
        <Button title="Get Location" onPress={getLocation} />
    </View>
  )
}
