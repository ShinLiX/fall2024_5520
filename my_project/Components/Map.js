import MapView from "react-native-maps";

import React from 'react'

export default function Map() {
  return (
    <MapView initialRegion={{
        latitude: Number,
        longitude: Number,
        latitudeDelta: Number,
        longitudeDelta: Number
      }} style={{flex: 1}}
       />
  )
}
