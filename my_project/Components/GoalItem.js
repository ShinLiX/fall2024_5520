import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function GoalItem({ goalObj, handleDelete, separators }) {
  const navigation = useNavigation();
  function handleLongPress() {
    Alert.alert("Delete A Goal", "Are you sure you want to delete this goal?", [
      { text: "No" },
      { text: "Yes", onPress: () => handleDelete(goalObj.id) },
    ]);
  }
  return (
    <View style={styles.textContainer}>
      <Pressable
        onPressIn={() => separators.highlight()}
        onPressOut={() => separators.unhighlight()}
        android_ripple={{ color: "white", radius: 20 }}
        style={({ pressed }) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
        onLongPress={handleLongPress}
        onPress={() => {
          // handlePress(goalObj);
          navigation.navigate("Details", { goalObj });
        }}
      >
        <Text style={styles.text}>{goalObj.text}</Text>
        <PressableButton
          pressedFunction={() => {
            handleDelete(goalObj.id);
          }}
          componentStyle={styles.deleteContainer}
          pressedStyle={styles.pressedStyle}
        >
          {/* <Text style={styles.deleteButton}>X</Text> */}
          <AntDesign name="delete" size={24} color="white" />
        </PressableButton>
        {/* <Button
          title="X"
          onPress={() => {
            handleDelete(goalObj.id);
          }}
          color="grey"
        /> */}
        {/* <Button
        title="i"
        onPress={() => {
          // handlePress(goalObj);
          navigation.navigate("Details", { goalObj });
        }}
        color="grey"
      /> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    fontSize: 35,
    padding: 5,
  },
  textContainer: {
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  pressedStyle: {
    backgroundColor: "red",
    opacity: 0.5,
  },
  deleteButton: {
    fontSize: 20,
    color: "white",
  },
  deleteContainer: {
    backgroundColor: "grey",
  },
});