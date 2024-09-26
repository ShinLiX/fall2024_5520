import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

export default function GoalItem ({newGoal}) {
  const [array, setArray] = useState([]);
  setArray((prev) => [...prev, newGoal]);
  console.log(array);

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <FlatList
      data={array}
      renderItem={renderItem}
      //keyExtractor={(item) => item.id}
      contentContainerStyle={styles.scrollView}></FlatList>
  );
}
const styles = StyleSheet.create({
    scrollView: {
      alignItems: "center",
      justifyContent: "center",  
    },
    text: {
      color: "purple",
      marginVertical: 5,
      fontSize: 20,
    },
});
