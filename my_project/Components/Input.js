import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

export default function Input({ autoFocus}) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function updateText(changedText) {
    setText(changedText);
  }


  return (
    <View>
      <TextInput 
        placeholder="Type something" 
        keyboardType="default" 
        style={{borderBottomColor: "purple", borderBottomWidth:2}} 
        value={{text}} 
        onchangeText={updateText}
      />
      {text.length > 0 && (
        <Text>Character Count: {text.length}</Text>
      )}
      {}
    </View>
    );
}

const styles = StyleSheet.create({});
