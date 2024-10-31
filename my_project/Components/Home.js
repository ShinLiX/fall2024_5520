import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../Firebase/firebaseSetup";
import {
  deleteAllFromDB,
  deleteFromDB,
  writeToDB,
} from "../Firebase/firestoreHelper";
import { collection, onSnapshot } from "firebase/firestore";

export default function Home({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app";
  const collectionName = "goals";
  useEffect(() => {
    //querySnapshot is a list/array of documentSnapshots
    const unsubscribe = onSnapshot(
      collection(database, collectionName),
      (querySnapshot) => {
        //define an array
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          //populate the array
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
          console.log(docSnapshot.id);
        });
        console.log(newArray);
        //setGoals with this array
        setGoals(newArray);
      }
    );
    return () => unsubscribe();
  }, []);
  //update this fn to receive data
  function handleInputData(data) {
    //log the data to console
    console.log("App ", data);
    // declare a JS object
    let newGoal = { text: data };
    // add the newGoal to db
    //call writeToDB
    writeToDB(newGoal, collectionName);

    // update the goals array to have newGoal as an item
    //async

    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });
    //updated goals is not accessible here
    setIsModalVisible(false);
  }
  function dismissModal() {
    setIsModalVisible(false);
  }

  // function goalPressHandler(pressedGoal) {
  //   //which goal?
  //   console.log("goal pressed");
  //   navigation.navigate("Details", { goalObj: pressedGoal });
  // }
  function goalDeleteHandler(deletedId) {
    console.log("goal deleted ", deletedId);
    //Use array.filter to update the array by removing the deletedId
    deleteFromDB(deletedId, collectionName);
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goal) => {
    //     return goal.id != deletedId;
    //   });
    // });
  }
  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          // setGoals([]);
          deleteAllFromDB(collectionName);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <PressableButton
          pressedFunction={() => {
            setIsModalVisible(true);
          }}
          componentStyle={{ backgroundColor: "purple" }}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
        {/* <Button
          title="Add a Goal"
          onPress={() => {
            setIsModalVisible(true);
          }}
        /> */}
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        modalVisible={isModalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length && <Text style={styles.header}>My Goals List</Text>
          }
          ListFooterComponent={
            goals.length && <Button title="Delete all" onPress={deleteAll} />
          }
          ItemSeparatorComponent={({ highlighted }) => {
            return (
              <View
                style={{
                  height: 5,
                  backgroundColor: highlighted ? "purple" : "gray",
                }}
              />
            );
          }}
          contentContainerStyle={styles.scrollViewContent}
          data={goals}
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                separators={separators}
                goalObj={item}
                handleDelete={goalDeleteHandler}
                // handlePress={goalPressHandler}
              />
            );
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView> */}
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
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },

  topView: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  bottomView: { flex: 4, backgroundColor: "#dcd" },

  scrollViewContent: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 5,
  },
});