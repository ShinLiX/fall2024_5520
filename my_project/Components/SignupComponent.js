import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function SignupComponent({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailHandler = (email) => {
        setEmail(email);
    };
    const passwordHandler = (password) => {
        setPassword(password);
    };

    async function register() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
          secureTextEntry={true}
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
