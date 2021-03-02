import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

import env from "../../config/env";
import { validateEmail, validatePassword } from "../../utils/";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handleSubmit = async () => {
    const res = await axios.post(`${env.REACT_NATIVE_API_URL}/login`, {
      email,
      password,
    });
    if (res.data === "auth ok") {
      console.log(email, password);
      console.log(res.data);
      setValidEmail(true);
      setValidPassword(true);
      setErrorMessage(false);
    } else {
      console.log(res.data);
      setValidEmail(false);
      setValidPassword(false);
      setErrorMessage(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={validEmail ? styles.formTextInput : styles.invalidText}
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
