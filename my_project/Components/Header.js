import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({ name, children }) {
  console.log(name)
  return (
    <View>
      <Text>Welcome to {name}</Text>        
      {children}
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
