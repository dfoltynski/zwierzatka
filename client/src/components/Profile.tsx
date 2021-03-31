import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUserData from "../../utils/getUserData/getUserData";
import { encode } from "base64-arraybuffer";
import { decode } from "base-64";
import { ScrollView } from "react-native-gesture-handler";

export default function Profile({ navigation }: any) {
  const [user, setUser] = useState<IUser>({
    name: "",
    birth: "",
    gender: "",
  });

  const [pet, setPet] = useState([]);

  interface IUser {
    name: string;
    birth: string;
    gender: string;
    photo?: string;
  }

  interface IPet {
    pet_breed: string;
    pet_name: string;
    pet_birth: string;
    pet_gender: string;
    pet_photo?: string;
  }

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      const userRes = await getUserData(token);
      const encodedProfilePictureUrl = decode(
        encode(userRes.profile_picture.data)
      );

      setUser({
        name: userRes.name,
        birth: userRes.birth.toString().split("T")[0],
        gender: userRes.gender,
        photo: encodedProfilePictureUrl,
      });

      const petsWithoutAnyRepeats = new Set();

      userRes.pet.forEach((pet: any) => {
        const encodedetPictureUrl = decode(encode(pet.pet_photo.data));

        petsWithoutAnyRepeats.add({
          pet_name: pet.pet_name,
          pet_birth: pet.pet_birth.toString().split("T")[0],
          pet_gender: pet.pet_gender,
          pet_breed: pet.pet_breed,
          pet_photo: encodedetPictureUrl,
        });

        setPet([...petsWithoutAnyRepeats]);
      });
    })();
  }, []);

  const logout = () => {
    (async () => {
      try {
        await AsyncStorage.removeItem("jwtToken");

        navigation.reset({
          index: 0,
          routes: [{ name: "Select Sign in Method" }],
        });
        navigation.navigate("Select Sign in Method");
      } catch (error) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Select Sign in Method" }],
        });
        navigation.navigate("Select Sign in Method");
      }
    })();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Welcome</Text>
      <Text>{user.name}</Text>
      <Text>{user.birth}</Text>
      <Text>{user.gender}</Text>
      <Text>{user.photo} asd</Text>
      <Image style={styles.tinyLogo} source={{ uri: user.photo }}></Image>

      {pet.map((pet: IPet) => (
        <>
          <Text key={pet.pet_name}>{pet.pet_name}</Text>
          <Text key={pet.pet_breed}>{pet.pet_breed}</Text>
          <Text key={pet.pet_birth}>{pet.pet_birth}</Text>
          <Text key={pet.pet_gender}>{pet.pet_gender}</Text>

          <Image
            key={pet.pet_photo}
            style={styles.tinyLogo}
            source={{ uri: pet.pet_photo }}
          ></Image>
        </>
      ))}

      <Button title="Logout" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  tinyLogo: {
    width: 50,
    height: 50,
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
