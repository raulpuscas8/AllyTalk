import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { advancedSettings } from "../constants/settings";
import DataItem from "../components/DataItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAdvancedItem } from "../store/settingsSlice";

export default function AdvancedSettingsScreen(props) {
  const dispatch = useDispatch();

  const advanced = useSelector((state) => state.settings.advanced);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Advanced Settings",
    });
  }, []);

  const onSave = useCallback(async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      dispatch(setAdvancedItem({ key, value }));
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={advancedSettings}
        renderItem={(itemData) => {
          const optionData = itemData.item;

          const val = advanced[optionData.id];

          return (
            <DataItem
              title={optionData.title}
              subTitle={val || optionData.default}
              type="link"
              onPress={() => {
                props.navigation.navigate("InputScreen", {
                  description: optionData.description,
                  title: optionData.title,
                  type: optionData.type,
                  min: optionData.min,
                  max: optionData.max,
                  initialValue: val || optionData.default,
                  updateValue: (value) => onSave(optionData.id, value),
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
