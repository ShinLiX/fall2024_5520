import React, { useEffect} from "react"; 
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import { Button } from "react-native";
import LoginComponent from "./Components/LoginComponent";
import SignupComponent from "./Components/SignupComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Profile from "./Components/Profile";
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableButton from "./Components/PressableButton";

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen
          name="Login"
          component={LoginComponent}
          options={({ navigation }) => {
            title: "Login"
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupComponent}
          options={({ navigation }) => {
            title: "Signup"
          }}
        />
  </>
)
const AppStack = (
  <>
  <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation })=> {
              return  {
              title: "All My Goals",
              headerRight: () => {
                return (
                  <PressableButton pressedFunction={() => {navigation.navigate("profile")}}
                  componentStyle={{backgroundColor:"purple"}}>
                    <AntDesign name="user" size={24} color="white" />
                  </PressableButton>
                )
              }
            }}
          }
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{
              title: "My Profile",
            }}
          />
          <Stack.Screen
            name="Details"
            component={GoalDetails}
            options={({ navigation, route }) => {
              return {
                title: route.params ? route.params.goalObj.text : "More Details",
                // headerRight: () => {
                //   return (
                //     <Button
                //       title="Warning"
                //       onPress={() => {
                //         console.log("warning");
                //       }}
                //     />
                //   );
                // },
              };
            }}
          />
  </>
)
export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        {isUserLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}