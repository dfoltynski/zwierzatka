import React, { useState } from "react";
import { NativeTouchEvent } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeSyntheticEvent,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Login() {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const [name, setName] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [password, setPassword] = useState<string>("");

  const [gender, setGender] = useState<string>("");

  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    console.log("-----------------------------------------------------");
    console.log("gender: ", gender);
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("date: ", date);
    console.log("valid email: ", validEmail);
    console.log("-----------------------------------------------------");
  };

  const validateEmail = (email: string): boolean => {
    if (email.match(emailRegex)?.length > 0) return true;

    setValidEmail(false);
    return false;
  };

  const validateName = (name: string): boolean => {
    if (name.trim().split(" ").length >= 2) return true;

    setValidName(false);
    return false;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={validName ? styles.formTextInput : styles.invalidText}
        placeholder="John Doe"
        onChangeText={(name) => {
          if (validateName(name)) {
            setValidName(true);
            setName(name);
          }
        }}
      />
      <TextInput
        style={validEmail ? styles.formTextInput : styles.invalidText}
        placeholder="johndoe@example.com"
        onChangeText={(email) => {
          if (validateEmail(email)) {
            setValidEmail(true);
            setEmail(email);
          }
        }}
      />
      <TextInput
        style={styles.formTextInput}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <DateTimePicker
        value={new Date()}
        mode="date"
        maximumDate={new Date()}
        display="default"
        style={styles.dateInput}
        onChange={(ev: Event, date: Date) => setDate(date)}
      />

      <RNPickerSelect
        style={{ ...pickerSelectStyles }}
        placeholder={{
          label: "What is your gender?",
          value: null,
        }}
        onValueChange={(gender) => setGender(gender)}
        items={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />

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

  dateInput: {
    left: "23%",

    width: 320,

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

    marginTop: 10,
    marginBottom: 10,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 20,
    textAlign: "center",
  },
});
