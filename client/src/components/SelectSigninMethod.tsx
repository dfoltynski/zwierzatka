import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button, View, StyleSheet, Alert } from "react-native";
import axios from "axios";

const SelectSigninMethod = ({ navigation }: any) => {
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  const checkForJwtToken = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      try {
        const res = await axios.get("http://localhost:8080/authed/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setIsTokenValid(true);
        console.log(token);
        return true;
      } catch (error) {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToProfile = () => {
    navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
    navigation.navigate("Profile");
  };

  useEffect(() => {
    (async () => {
      (await checkForJwtToken()) ? redirectToProfile() : null;
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SELECT SIGN IN METHOD</Text>
      <Button
        title="Sign in by google"
        onPress={() => {
          Alert.alert("I am working on it", "sorry...");
        }}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />

      <Button
        title="Or just log in"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SelectSigninMethod;
