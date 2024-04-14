import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DataItem from "../components/DataItem";
import {
  appSettings,
  moods,
  personalities,
  responseSizes,
} from "../constants/settings";
import { useSelector, useDispatch } from "react-redux";
import { setItem } from "../store/settingsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen(props) {
  const dispatch = useDispatch();

  const personality = useSelector((state) => state.settings.personality);
  const mood = useSelector((state) => state.settings.mood);
  const responseSize = useSelector((state) => state.settings.responseSize);

  const allSettings = useSelector((state) => state.settings);

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
      <FlatList
        data={appSettings}
        renderItem={(itemData) => {
          const settingData = itemData.item;

          return (
            <DataItem
              title={settingData.title}
              subTitle={allSettings[settingData.id]}
              type="link"
              onPress={() => {
                props.navigation.navigate("DataListScreen", {
                  data: settingData.data,
                  title: settingData.title,
                  onPress: (value) => updateValue(settingData.id, value),
                  selectedValue: allSettings[settingData.id],
                });
              }}
            />
          );
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
