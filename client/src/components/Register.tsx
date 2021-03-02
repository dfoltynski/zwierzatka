import React, { useState, useEffect } from "react";
import { NativeTouchEvent, Platform } from "react-native";
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
import axios from "axios";
// import * as ImagePicker from "expo-image-picker";

import env from "../../config/env";
import { validateEmail, validatePassword } from "../../utils/";

export default function Register({ navigation }: any) {
  // passowrd strength regexs
  const passwordMinimum = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const passwordMid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const passwordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // waiting for resolving M1 problems with opening gallery ios
  // const [image, setImage] = useState(null);

  const [name, setName] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [passwordStrength, setPasswordStrength] = useState<string | undefined>(
    ""
  );

  const [gender, setGender] = useState<string>("");

  const [birth, setBirth] = useState<Date | string>(
    new Date(
      new Date().getFullYear() - 16,
      new Date().getMonth() + 1,
      new Date().getDate()
    )
  );

  // waiting for resolving M1 problems with opening gallery ios
  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const {
  //         status,
  //       } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();
  // }, []);

  const handleSubmit = async (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    if (email === "") {
      setValidEmail(false);
    }
    if (password === "") {
      setValidPassword(false);
    }
    if (name === "") {
      setValidName(false);
    }

    if (
      email !== "" &&
      validEmail &&
      password !== "" &&
      validPassword &&
      name !== "" &&
      validName &&
      gender !== ""
    ) {
      console.log(
        `--------------------${env.REACT_NATIVE_API_URL}/owner-------------------------`
      );
      console.log({
        email,
        password,
        name,
        birth,
        gender,
      });
      console.log("valid email: ", validEmail);
      console.log("valid password: ", validPassword);
      console.log("valid name: ", validName);

      console.log("-----------------------------------------------------");
      try {
        await axios.post(`${env.REACT_NATIVE_API_URL}/owner`, {
          email,
          password,
          name,
          birth,
          gender,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // DATA VALIDATION
  const validateName = (name: string): boolean => {
    if (name.trim().split(" ").length >= 2) return true;

    setValidName(false);
    return false;
  };

  const checkPasswordStrength = (password: string): void => {
    if (password.trim().match(passwordMinimum)) setPasswordStrength("Low");
    if (password.trim().match(passwordMid)) setPasswordStrength("Medium");
    if (password.trim().match(passwordStrong)) setPasswordStrength("Strong");
  };

  // waiting for resolving M1 problems with opening gallery ios
  // const handleChoosePhoto = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={validName ? styles.formTextInput : styles.invalidText}
        placeholder="John Doe"
        onChangeText={(name) => {
          if (validateName(name)) {
            setValidName(true);
            setName(name.trim());
          }
        }}
      />
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
        onChangeText={(password) => {
          if (validatePassword(password)) {
            setValidPassword(true);
            checkPasswordStrength(password);
            setPassword(password.trim());
          } else {
            setValidPassword(false);
            setPasswordStrength(undefined);
          }
          checkPasswordStrength("");
        }}
      />

      <Text>{passwordStrength}</Text>

      <DateTimePicker
        value={birth}
        mode="date"
        display="default"
        style={styles.dateInput}
        maximumDate={
          new Date(
            new Date().getFullYear() - 16,
            new Date().getMonth() + 1,
            new Date().getDate() + 1
          )
        }
        onChange={(ev: Event, date: Date) => {
          setBirth(date.toISOString().split("T")[0]);
        }}
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

      {/* <Button title="Choose your profile picture" onPress={handleChoosePhoto} /> */}

      <Button title="Register" onPress={handleSubmit} />
      <Button
        title="Go home"
        onPress={() => navigation.navigate("Select Sign in Method")}
      />
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
