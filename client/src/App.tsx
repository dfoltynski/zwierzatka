import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Register, SelectSigninMethod, Login } from "./components/";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Select Sign in Method">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Select Sign in Method"
          component={SelectSigninMethod}
        />
        <Stack.Screen name="Login" component={Login} />
        {/* <View style={styles.container}> */}
        {/* <Register /> */}
        {/* </View> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
