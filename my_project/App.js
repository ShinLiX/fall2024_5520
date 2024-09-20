import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = "My app";
  //update this fn to receive data
  function handleInputData(data) {
    //log the data to console
    console.log("App ", data);
    setReceivedData(data);
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button
          title="Add a Goal"
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        modalVisible={isModalVisible}
        onCancel={handleCancel}
      />
      <View style={styles.bottomView}>
        <Text style={styles.text}>{receivedData}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "purple",
    marginVertical: 5,
  },
  topView: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  bottomView: { flex: 4, backgroundColor: "#dcd", alignItems: "center" },
});