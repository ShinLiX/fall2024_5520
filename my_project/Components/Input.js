import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useEffect} from 'react'

export default function Input() {
  const [text, setText] = useState("");
  function updatedText(newText) {
    setText(newText);
  }
  return (
    <View>
      <TextInput placeholder="Type something" keyboardType="default" style={{borderBottomColor: "purple", borderwidth:2}}/>
      onChangeText={(text) => updatedText(text)}
      <Text>{text}</Text>
    </View>
    )
}
