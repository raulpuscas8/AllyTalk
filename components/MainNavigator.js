import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ImageScreen from "../screens/ImageScreen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

const options = {
  headerTitleStyle: {
    fontFamily: "regular",
    color: colors.textColor,
  },
  tabBarLabelStyle: {
    fontFamily: "regular",
    color: colors.textColor,
  },
  tabBarShowLabel: false,
};

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="chat" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Image"
        component={ImageScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="image" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="settings-outline" size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
