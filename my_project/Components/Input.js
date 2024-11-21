import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ImageManager from "./ImageManager";

export default function Input({
  textInputFocus,
  inputHandler,
  modalVisible,
  dismissModal,
}) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const minimumChar = 3;

  function updateText(changedText) {
    setText(changedText);
  }
  function receiveImageUri(uri) {
    setImageUri(uri);
  }
  function handleConfirm() {
    // call the callback fn received from App.js
    // pass what user has typed
    //also send back the imageUri
    inputHandler({ text, imageUri });
    setText("");
  }
  function handleCancel() {
    // hide the modal
    Alert.alert("Cancel", "Are you sure you want to cancel", [
      { text: "cancel", style: "cancel" },
      {
        text: "ok",
        onPress: () => {
          setText("");
          dismissModal();
        },
      },
    ]);
  }
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            style={styles.image}
            alt="Image of a an arrow"
          />
          <Image
            source={require("../assets/lab2pic.png")}
            style={styles.image}
            alt="Image of a an arrow"
          />

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
            text.length >= minimumChar ? (
              <Text>Thank you</Text>
            ) : (
              <Text>Please type more than {minimumChar} characters</Text>
            )
          ) : (
            text && <Text>{text.length}</Text>
          )}
          <ImageManager receiveImageUri={receiveImageUri} />
          <View style={styles.buttonsRow}>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={text.length < minimumChar}
                title="Confirm"
                onPress={handleConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    alignItems: "center",
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    color: "blue",
    marginVertical: 5,
  },
  buttonContainer: {
    width: "30%",
    margin: 10,
  },
  buttonsRow: { flexDirection: "row" },

  image: { width: 100, height: 100 },
});