import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { validateEmail, validatePassword } from "../../utils/";
import env from "../../config/env";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const res = await axios.post(`${env.REACT_NATIVE_API_URL}/v1/login`, {
          email: email || "",
          password: password || "",
        });

        try {
          await AsyncStorage.setItem("jwtToken", res.data.token);
          navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
          navigation.navigate("Profile");
        } catch (error) {
          Alert.alert(
            "Something went wrong while saving token to AsyncStorage"
          );
          console.log(
            "Something went wrong while saving token to AsyncStorage"
          );
        }

        setValidEmail(true);
        setValidPassword(true);
        setErrorMessage(false);
      } catch (error) {
        console.log(error);
        setValidEmail(false);
        setValidPassword(false);
        setErrorMessage(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={validEmail ? styles.formTextInput : styles.invalidText}
        autoCapitalize="none"
        placeholder="johndoe@example.com"
        onChangeText={(email) => {
          if (validateEmail(email)) {
            setValidEmail(true);
            setEmail(email.trim());
          } else {
            setValidEmail(false);
          }
        }}
      />
      <TextInput
        style={validPassword ? styles.formTextInput : styles.invalidText}
        placeholder="password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      {errorMessage ? <Text>Wrong email or password</Text> : null}

      <Button title="Log in" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  invalidText: {
    fontSize: 24,

    borderColor: "#fc034e",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,

    backgroundColor: "#ffe0ea",

    width: 250,

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

    marginTop: 10,
    marginBottom: 10,
  },

  formTextInput: {
    fontSize: 24,

    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 30,

    backgroundColor: "#F9F9F9",

    width: 250,

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

    marginTop: 10,
    marginBottom: 10,
  },
});
