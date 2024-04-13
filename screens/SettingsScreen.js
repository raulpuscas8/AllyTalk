import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DataItem from "../components/DataItem";
import { personalities } from "../constants/settings";

export default function SettingsScreen(props) {
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Settings",
    });
  }, []);

  return (
    <View style={styles.container}>
      <DataItem
        title="Personality"
        subTitle="Change the personality of the model"
        type="link"
        onPress={() => {
          props.navigation.navigate("DataListScreen", {
            data: personalities,
            title: "Personalities",
          });
        }}
      />

      <DataItem
        title="Mood"
        subTitle="Change the mood of the model"
        type="link"
        onPress={() => {
          console.log("Pressed");
        }}
      />

      <DataItem
        title="Model"
        subTitle="Change the GPT model"
        type="link"
        onPress={() => {
          console.log("Pressed");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});
