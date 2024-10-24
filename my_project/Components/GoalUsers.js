import React, {useEffect, useState} from 'react';
import { Text, View, FlatList } from 'react-native';
import { writeToDB } from '../Firebase/firestoreHelper';


export default function GoalUsers({id}) {
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
        data.forEach(element => {
            writeToDB(element, `goals/${id}/users`);
            
        });
        
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
