import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';


export default function App() {
  const appName = "My app";
  const [text, setText] = useState("");
  function updatedText(newText) {
    setText(newText);
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Header name={appName}/>
      <TextInput placeholder="Type something" keyboardType="default" style={{borderBottomColor: "purple", borderwidth:2}}/>
      onChangeText={(text) => updatedText(text)}
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
