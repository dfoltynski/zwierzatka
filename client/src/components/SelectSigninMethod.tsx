import React, { useEffect } from "react";
import { Text, Button, View, StyleSheet, Alert } from "react-native";
import { checkForJwtToken } from "../../utils";

interface IAlert {
  message: string;
}

const SelectSigninMethod = ({ route, navigation }: any) => {
  const alert: IAlert = route.params || { message: "" };

  const redirectToProfile = () => {
    navigation.reset({ index: 0, routes: [{ name: "Profile" }] });
    navigation.navigate("Profile");
  };

  useEffect(() => {
    (async () => {
      alert.message = "";
      (await checkForJwtToken()) ? redirectToProfile() : null;
    })();
    console.log("alert1: ", route.params);
    console.log("alert2: ", { message: "" });
    console.log("alert3 ", alert);
    console.log("alert message: ", alert.message);
  }, []);

  return (
    <View style={styles.container}>
      {alert.message.length > 0 ? Alert.alert(alert.message) : null}
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
