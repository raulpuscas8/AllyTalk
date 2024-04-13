import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DataItem from "../components/DataItem";
import { personalities } from "../constants/settings";
import { useSelector, useDispatch } from "react-redux";
import { setItem } from "../store/settingsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen(props) {
  const dispatch = useDispatch();

  const personality = useSelector((state) => state.settings.personality);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Settings",
    });
  }, []);

  const updateValue = useCallback(async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      dispatch(setItem({ key, value }));
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <DataItem
        title="Personality"
        subTitle={personality}
        type="link"
        onPress={() => {
          props.navigation.navigate("DataListScreen", {
            data: personalities,
            title: "Personalities",
            onPress: (value) => updateValue("personality", value),
            selectedValue: personality,
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
