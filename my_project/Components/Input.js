import { StyleSheet, Text, TextInput, View, Button, Modal } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

export default function Input({ autoFocus, inputHandler }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function updateText(changedText) {
    setText(changedText);
    // Call inputHandler every time the text changes to pass it back to the App
    inputHandler(changedText);
  }

  function handleBlur() {
    setIsFocused(false);
    if (text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more than 3 characters");
    }
  }

  function handleFocus() {
    setIsFocused(true);
    setMessage("");
  }

  function handleConfirm() {
    console.log(text);
    // Call inputHandler when the confirm button is pressed
    inputHandler(text);
  }

  function handleVisible() {
    setIsVisible(false);
  }

  return (
    <Modal visible={isVisible} animationType="slide">

      <View style={styles.container}>
        <TextInput
          placeholder="Type something"
          keyboardType="default"
          style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
          value={text}
          onChangeText={updateText} // Pass updated text to the parent component
          ref={inputRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {text.length > 0 && (
          <Text>Character Count: {text.length}</Text>
        )}
        {!isFocused && message.length > 0 && (
          <Text>{message}</Text>
        )}
        <Button onPress={handleConfirm} title="Confirm" />
        <Button onPress={handleVisible} title="Close" />
      </View>
    </Modal>


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