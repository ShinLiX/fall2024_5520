import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";

const Stack = createNativeStackNavigator();
console.log( {Stack} );

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} 
        options={{title: 'My Home Page',
         headerStyle: {backgroundColor: 'grey'},
         headerTintColor: 'yellow'}}/>
        <Stack.Screen name="Details" component={GoalDetails} 
        options={({route}) => ({title: route.params? route.params.goal.text: "More Details"})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}