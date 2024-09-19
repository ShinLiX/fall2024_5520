import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const [receivedData, setReceivedData] = useState(""); // Store the input data
  const appName = "My app";
  
  function handleInputData(data) {
    // Update receivedData with the text from Input component
    console.log("app", data);
    setReceivedData(data);
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Header name={appName} />
      <Input style={styles.inputStyle} autoFocus={true} inputHandler={handleInputData} />
      {/* Display the received data */}
      {receivedData.length > 0 && (
        <Text>Received Data: {receivedData}</Text>
      )}
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
  inputStyle: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});