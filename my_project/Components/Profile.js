import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';
import LocationManager from './LocationManager';

export default function Profile() {
    const user = auth.currentUser;
    if (user) {
        return (
            <View>
                <Text>{user.email}</Text>
                <Text>{user.uid}</Text>
                <LocationManager />
            </View>
        )
    } else {
        return (
            <View>
                <Text>Not logged in</Text>
            </View>
        )
    }
}