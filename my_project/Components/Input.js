import { Image, Alert, Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ textInputFocus, inputHandler, modalVisible, onCancel }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function updateText(changedText) {
    setText(changedText);
  }
  function handleConfirm() {
    // call the callback fn received from App.js
    // pass what user has typed
    inputHandler(text);
    setText("");
  }

  function handleCancel() {
    Alert.alert("Are you sure you want to cancel?", "Your data will be lost", 
      [
        {
          text: "Yes",
          onPress: () => {
            setText("");
            onCancel();
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.container}>
        
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          keyboardType="default"
          style={styles.input}
          value={text}
          onChangeText={updateText}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />
        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} disabled={text.length < 3}/>
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    color: "blue",
    margin: 15,
  },
  buttonContainer: {
    width: "30%",
    marginVertical: 5,
    justifyContent: "center",
    flexDirection: "row",
  },
  imgStyle: {
    width: 100,
    height: 100,
  },
});