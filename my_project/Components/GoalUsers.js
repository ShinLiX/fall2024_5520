import React, {useEffect, useState} from 'react';
import { Text, View, FlatList } from 'react-native';


export default function GoalUsers() {
const [users, setUsers] = useState();
    useEffect(() => {
      async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
        console.log(response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.map((user) => {
            return user.name;
        }));
        console.log(users);
    } catch(err) {
            console.log(err)
      }
    }
    fetchData();
    },[]);
  return (
    <FlatList
      data={users}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text>{item}</Text>}
    />
  )
}
