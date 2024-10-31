import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function SignupComponent({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const emailHandler = (email) => {
        setEmail(email);
    };
    const passwordHandler = (password) => {
        setPassword(password);
    };
    const confirmPasswordHandler = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
    }

    async function register() {
        try {
          if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
          }
          if (
            email.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
          ) {
            Alert.alert("No field should be empty");
            return;
          }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
          if (error.code === "auth/weak-password") {
            Alert.alert("password is too weak");
            return;
          }
            console.log('Signup', error.code);
            Alert.alert(error.message);
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
        <Text>Confirm Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={confirmPasswordHandler}
          value={confirmPassword}
          placeholder="Password"
          //secureTextEntry={true}
        />
        <Button title="Register" onPress={register} />
        <Button title="Already registered? Login" 
            onPress={()=>navigation.replace('Login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10
    }
})
