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
import { auth, database } from "../Firebase/firebaseSetup";
import { deleteAllFromDB, writeToDB } from "../Firebase/firestoreHelper";
import { query, where } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { deleteFromDB } from "../Firebase/firestoreHelper";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";



export default function Home({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app";
  const collectionName = "goals";
  //querySnapshot is a list of ducumentSnapshots
  useEffect(() => {onSnapshot(
    query(collection(database, collectionName),where("owner", "==", auth.currentUser.uid))
    , (querySnapshot) => {
    let goalsArray = [];
    querySnapshot.forEach((docSnapshot) => {
      //populate the array
      goalsArray.push({...docSnapshot.data(), id: docSnapshot.id});
      console.log(docSnapshot);
  });
  //setGoals(goalsArray);
  setGoals(goalsArray);
}, 
(error)=> {
  console.log("on snapshot ", error);
  Alert.alert("An error occured", "Please try again later");
}
)}, []);


  async function handleImageData(image) {
    try {
      const response = await fetch(image);
        if (response.ok){
        const blob = await response.blob();
        const imageName = uri.substring(uri.lastIndexOf('/') + 1);
        const imageRef = await ref(storage, `images/${imageName}`)
        const uploadResult = await uploadBytesResumable(imageRef, blob);
        }
    } catch (error) {
      console.log("handleImageData", error);
      Alert.alert("An error occured", "Please try again later");
    }

  }
  //update this fn to receive data
  function handleInputData(data) {
    //log the data to console
    //console.log("App ", data);
    // declare a JS object
    console.log("received data", data);
    // let {text: newGoal, image: newImage} = data;
    // const goalData = {text: newGoal}
    //const data = {text: data.text}
    if (data.image) {
      handleImageData(data.image);
    }
    const goalDataWithOwner = {...data, owner: auth.currentUser.uid};
    writeToDB(goalDataWithOwner, collectionName);
    //console.log(goals);
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
    //console.log("goal deleted ", deletedId);
    //Use array.filter to update the array by removing the deletedId

    deleteFromDB(collectionName);

    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => {
        return goal.id != deletedId;
      });
    });
  }
  function deleteAll() {
    
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
      
        onPress: () => {
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
          ItemSeparatorComponent={({highlighted})=> (
            
            <View
              style={[
                highlighted? styles.highlightedSeperator : styles.seperator,
              ]}
            />)
          }
          
          contentContainerStyle={styles.scrollViewContent}
          data={goals}
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                goalObj={item}
                handleDelete={goalDeleteHandler}
                onPressIn={() => separators.highlight()}
                onPressOut={() => separators.unhighlight()}
                />
            )}}
                // handlePress={goalPressHandler}
            
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
  seperator: {
    height: 3,
    backgroundColor: "gray",
  },
  highlightedSeperator: {
    height: 3,
    backgroundColor: "purple",
  },
});