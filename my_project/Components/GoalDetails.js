import React from 'react'
import { View, Text, Button } from 'react-native'


export default function GoalDetails ({ navigation, route }) {
  return (
      <View>
        {route.params? (
            <Text>GoalDetails {"\n"}Details: {route.params.goal.text}</Text>
        ):(<Text>MoreDetails</Text>)}
        <Button title="More Details" onPress={()=> navigation.push("Details")} />
      </View>
  )
};
