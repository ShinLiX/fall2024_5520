import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import React from "react";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();
console.log( {Stack} );

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{headerStyle: {backgroundColor: 'pink'}, headerTintColor: 'black'}}
      >
        <Stack.Screen name="Home" component={Home} 
        options={{title: 'My Home Page',
         headerStyle: {backgroundColor: 'grey'},
         headerTintColor: 'yellow'}}/>
        <Stack.Screen name="Details" component={GoalDetails} 
        options={({route}) => { 
          return {
            title: route.params? route.params.goal.text: "More Details",
            headerRight: () => (
              <Button title="Warning" onPress={()=> console.log("Warning pressed")} />
            )
          }}
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}