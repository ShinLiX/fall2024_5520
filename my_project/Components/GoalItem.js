import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function GoalItem ({goalItem, handleDelete, detailHandler}) {
  const navigation = useNavigation();

  return (
    <View style={styles.scrollView}>
      <Text style={styles.text}>{goalItem.text}</Text>
      <Button title="X" onPress={()=>{handleDelete(goalItem.id)}} color="grey"/>
      <Button title="i" onPress={()=>{navigation.navigate('Details', { goal: goalItem })}} color="grey"/>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "purple",
    //marginVertical: 5,
    fontSize: 20,
    padding: 5,
  },
});
