import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, Button, Pressable } from 'react-native'
import PressableButton from './PressableButton';

export default function GoalItem ({goalItem, handleDelete, detailHandler}) {

  return (
    <View style={styles.scrollView}>
      <Pressable style={({pressed}) => {
        console.log({pressed}); 
        return [pressed? styles.pressedView : styles.horizontalContainer];
      }} 
      android_ripple={{
        color: 'grey', 
        borderless: false
      }} 
      onPress={()=>{
        detailHandler(goalItem)
      }}>
      <Text style={styles.text}>{goalItem.text}</Text>
      <PressableButton
        pressedFunction={()=> {handleDelete(goalItem.id)}} componentStyle={styles.deleteBackground} pressedStyle={styles.pressedView}>
        
        <Text style={styles.deleteButton}>X</Text> 
      </PressableButton>
      {/* <Button title="X" onPress={()=>{handleDelete(goalItem.id)}} color="grey"/> */}
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
  pressedView: {
    backgroundColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  deleteButton: {
    color: "white",
  },
  deleteBackground: {
    backgroundColor: "red",
  },

});
