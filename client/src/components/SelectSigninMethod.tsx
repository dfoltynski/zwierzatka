import React, { useEffect } from "react";
import { Text, Button, View, StyleSheet, Alert } from "react-native";
import { checkForJwtToken } from "../../utils";

const SelectSigninMethod = ({ navigation }: any) => {
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
