import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const [receivedData, setReceivedData] = useState(""); // Store the input data
  const [isModelVisible, setIsModelVisible] = useState(false); // For Button (not used yet)
  const appName = "My app";
  
  function handleInputData(data) {
    // Update receivedData with the text from Input component
    console.log("app", data);
    setReceivedData(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style='auto' />
        <Header name={appName} />
        <Button
          title="Add a Goal"
          onPress={() => setIsModelVisible(true)} />
      </View>
      <View style={styles.bottomView}>
        <Input style={styles.inputStyle} autoFocus={true} inputHandler={handleInputData} />
        {receivedData.length > 0 && (
          <Text style={styles.receivedDataText}>Received Data: {receivedData}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    flex: 4,
    backgroundColor: 'purple',  // Set background color of the bottom view
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Make sure the view covers the entire width
  },
  inputStyle: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff', // To make sure input field has a white background
    width: '80%',  // To make the input box more reasonable in size
  },
  receivedDataText: {
    color: '#fff', // Text color for the received data in bottom view
    marginTop: 10,
  },
});