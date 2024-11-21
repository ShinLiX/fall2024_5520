import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header({ name }) {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <Text
        style={[styles.textStyle, { paddingVertical: height < 415 ? 0 : 10 }]}
      >
        Welcome to {name}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "purple",
    fontSize: windowWidth < 400 ? 20 : 26,
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});