import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, Alert } from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";


export default function Home({ navigation }) {
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

  function goalDeleteHandler(goalID) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== goalID);
    });
  }

  function deleteAllGoals() {
    Alert.alert("Delete All Goals?","Are you sure?", [
      {text: "Yes", onPress: () => setGoals([])},
      {text: "No", onPress: () => console.log("deletion cancelled.")}
    ]);
  }

  function handleDetails(goal) {
    navigation.navigate("Details", { goal: goal});
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
        <FlatList data={goals} ListEmptyComponent={() => <Text style={styles.text}>No goals to show</Text>}
        ListHeaderComponent={() => goals.length > 0 && <Text style={styles.text}>My Goals</Text>}
        ListFooterComponent={() => <Button title="Delete all" onPress={deleteAllGoals}/>}
        ItemSeparatorComponent={() => <View style={{height: 2, backgroundColor: "grey"}}/>}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => {  
          console.log(receivedData) 
          return (
            <GoalItem goalItem={item} handleDelete={goalDeleteHandler} detailHandler={handleDetails}/>
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
    fontSize: 20,
    padding: 5,
    alignItems: "center",
    //justifyContent: "center",

  },
  topView: { flex: 1, alignItems: "center", justifyContent: "center" },
  bottomView: { flex: 4, backgroundColor: "#dcd", alignItems: "center", justifyContent: "center" },
  borderText: {
    marginVertical: 5,
    borderRadius: 5,
    //roundedcorners: 5,
    //borderWidth: 1,
    backgroundColor: "#aaa",
  },
  contentContainer: {
    //flex: 1,
    //backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    //fontSize: 20,
    marginVertical: 5,
  },
});