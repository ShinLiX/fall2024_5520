import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'


export default function GoalDetails ({ navigation, route }) {

  const [textColor, setTextColor] = useState("black");

  const handleWarningPress = () => {
    setTextColor("red");
    navigation.setOptions({
        title: "Warning"
    });
  }
  navigation.setOptions({
    headerRight: () => (
      <Button title="Warning" onPress={handleWarningPress} />
    )
  });
  return (
      <View>
        {route.params? (
            <Text>GoalDetails {"\n"}Details: {route.params.goal.text}</Text>
        ):(<Text>More Details</Text>)}
        <Button title="More Details" onPress={()=> navigation.push("Details")} />
        
      </View>
  )
};
