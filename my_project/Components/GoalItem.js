import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, Button, Pressable } from 'react-native'

export default function GoalItem ({goalItem, handleDelete, detailHandler}) {

  return (
    <View style={styles.scrollView}>
      <Pressable style={styles.horizontalContainer} onPress={()=>{detailHandler(goalItem)}}>
      <Text style={styles.text}>{goalItem.text}</Text>
      <Button title="X" onPress={()=>{handleDelete(goalItem.id)}} color="grey"/>
      {/* <Button title="i" onPress={()=>{detailHandler(goalItem)}} color="grey"/> */}
      </Pressable>
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
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
