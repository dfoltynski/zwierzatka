import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }: any) {
  useEffect(() => {}, []);

  return (
    <>
      <Text>Welcome</Text>
      <Text>To the profile card</Text>
    </>
  );
}
