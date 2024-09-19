import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

export default function Input({ autoFocus}) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function updateText(changedText) {
    setText(changedText);
  }

  function handleBlur() {
    setIsFocused(false);
    if (text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more tham 3 characters");
    }
  }

  function handleFocus() {
    setIsFocused(true);
    setMessage("");
  }

  function handleConfirm() {
    console.log(text);
  }

  return (
    <View>
      <TextInput 
        placeholder="Type something" 
        keyboardType="default" 
        style={{borderBottomColor: "purple", borderBottomWidth:2}} 
        value={{text}} 
        onchangeText={updateText}
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
      <Button
      title="Confirm"
      onPress={handleConfirm(text)} />
    </View>
    );
}

const styles = StyleSheet.create({});
