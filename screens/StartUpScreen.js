import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import colors from "../constants/colors";
import MainNavigator from "../components/MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setItem } from "../store/settingsSlice";

export default StartUpScreen = () => {
  const dispatch = useDispatch();

  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const keys = ["personality", "mood", "responseSize"];

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          const value = await AsyncStorage.getItem(key);
          value && dispatch(setItem({ key, value }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setInitialised(true);
      }
    };
    getSettings();
  }, []);

  if (!initialised) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  return <MainNavigator />;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
