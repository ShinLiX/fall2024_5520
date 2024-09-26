import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = "My app";
  const [goals, setGoals] = useState([]);
  //update this fn to receive data
  function handleInputData(data) {
    //log the data to console
    console.log("App ", data);
    let newGoalObj = { id: Math.random().toString(), text: data };
    
    //setGoals(newArray);
    setGoals((prevGoals) => [...prevGoals, newGoalObj]);
    setReceivedData(data);
    setIsModalVisible(false);
  }
  function dismissModal() {
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
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList data={goals} renderItem={({item}) => {
          console.log(receivedData) 
          return (
          <View key={item.id} style={styles.contentContainer}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          )
        }} />
        <View style={styles.borderText}>
          {/* <Text style={styles.text}>{receivedData}</Text> */}
        </View>
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
    //marginVertical: 5,
    fontSize: 100,
    padding: 5,

  },
  topView: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  bottomView: { flex: 4, backgroundColor: "#dcd", alignItems: "center" },
  borderText: {
    marginVertical: 5,
    borderRadius: 5,
    //roundedcorners: 5,
    //borderWidth: 1,
    backgroundColor: "#aaa",
  },
  contentContainer: {
    //flex: 1,
    backgroundColor: "#fcf",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
});