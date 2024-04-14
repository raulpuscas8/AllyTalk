import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../constants/colors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import KeyboardAvoidingViewContainer from "../components/KeyboardAvoidingViewContainer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { makeChatRequest } from "../utils/gptUtils";
import {
  addUserMessage,
  getConversation,
  resetConversation,
} from "../utils/conversationHistoryUtil";
import Bubble from "../components/Bubble";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import InputContainer from "../components/InputContainer";
import { useSelector } from "react-redux";
import { advancedSettings } from "../constants/settings";

export default function ChatScreen(props) {
  const flatlist = useRef();

  const personality = useSelector((state) => state.settings.personality);
  const mood = useSelector((state) => state.settings.mood);
  const responseSize = useSelector((state) => state.settings.responseSize);
  const settings = useSelector((state) => state.settings.advanced);

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatOptions = useMemo(() => {
    const options = {};

    for (let i = 0; i < advancedSettings.length; i++) {
      const settingsData = advancedSettings[i];
      const id = settingsData.id;

      let value = settings[id];
      if (!value) {
        continue;
      }

      if (settingsData.type === "number") {
        value = parseFloat(value);
      } else if (settingsData.type === "integer") {
        value = parseInt(value);
      }

      options[id] = value;
    }

    return options;
  }, [advancedSettings, settings]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Clear"
            iconName="trash-o"
            onPress={() => {
              setConversation([]);
              resetConversation(personality, mood, responseSize);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [personality, mood, responseSize]);

  useEffect(() => {
    resetConversation(personality, mood, responseSize);
    setConversation([]);
  }, [personality, mood, responseSize]);

  const sendMessage = useCallback(async () => {
    if (messageText === "") return;

    const text = messageText;

    try {
      setLoading(true);
      addUserMessage(messageText);
      setMessageText("");
      setConversation([...getConversation()]);

      await makeChatRequest(chatOptions);
    } catch (error) {
      console.log(error);
      setMessageText(text);
    } finally {
      setConversation([...getConversation()]);
      setLoading(false);
    }
  }, [messageText, chatOptions]);

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          {!loading && conversation.length === 0 && (
            <View style={styles.emptyContainer}>
              <FontAwesome5
                name="lightbulb"
                size={48}
                color={colors.lightGrey}
              />
              <Text style={styles.emptyContainerText}>
                Type a message to get started!
              </Text>
            </View>
          )}

          {conversation.length !== 0 && (
            <FlatList
              ref={(ref) => (flatlist.current = ref)}
              onLayout={() => flatlist.current.scrollToEnd()}
              onContentSizeChange={() => flatlist.current.scrollToEnd()}
              style={styles.flatList}
              data={conversation}
              renderItem={(itemData) => {
                const convoItem = itemData.item;

                const { role, content } = convoItem;

                if (role === "system") return null;

                return <Bubble text={content} type={role} />;
              }}
            />
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <Bubble type="loading" />
            </View>
          )}
        </View>

        <InputContainer
          onChangeText={(text) => setMessageText(text)}
          value={messageText}
          onPress={sendMessage}
          placeholder="Type a message..."
        />
      </View>
    </KeyboardAvoidingViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBg,
  },
  messagesContainer: {
    flex: 1,
  },
  flatList: {
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainerText: {
    marginTop: 10,
    color: colors.lightGrey,
    fontSize: 18,
    fontFamily: "regular",
  },
});
