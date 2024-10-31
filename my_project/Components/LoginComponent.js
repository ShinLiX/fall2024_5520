import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginComponent({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailHandler = (email) => {
        setEmail(email);
    };
    const passwordHandler = (password) => {
        setPassword(password);
    };

    async function signin() {
        try {
          if(email.length === 0 || password.length === 0) {
            Alert.alert("No field should be empty");
            return;
          }
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <View style={styles.container}>
        <Text>Email Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={emailHandler}
          value={email}
          placeholder="Email Address"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={passwordHandler}
          value={password}
          placeholder="Password"
          //secureTextEntry={true}
        />
        <Button title="Login" onPress={signin} />
        <Button title="New User? Create an account" 
            onPress={()=>navigation.replace('Signup')} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10
    }
})