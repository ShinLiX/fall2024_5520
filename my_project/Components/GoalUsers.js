import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { readAllDocs, writeToDB } from "../Firebase/firestoreHelper";

export default function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        // check if there is any data in users subcollection
        const dataFromDB = await readAllDocs(`goals/${goalId}/users`);
        if (dataFromDB.length) {
          // if there is call setUsers with that data
          console.log("data from DB");
          setUsers(
            dataFromDB.map((user) => {
              return user.name;
            })
          );
          return;
        }
        // if not then proceed with fetching from fake API
        console.log("data from API");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error happened with status ${response.status}`);
        }
        // We only get here if the response.ok is true. let's extract data
        const data = await response.json();
        // write data to firestore using writeToDB
        data.forEach((user) => {
          writeToDB(user, `goals/${goalId}/users`);
        });
        setUsers(
          data.map((user) => {
            return user.name;
          })
        );
        // setUsers(data);
      } catch (err) {
        console.log("fetch users data ", err);
      }
    }
    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});