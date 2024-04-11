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
import { Feather } from "@expo/vector-icons";
import KeyboardAvoidingViewContainer from "../components/KeyboardAvoidingViewContainer";
import { useCallback, useEffect, useState } from "react";
import { makeChatRequest } from "../utils/gptUtils";
import {
  addUserMessage,
  getConversation,
  resetConversation,
} from "../utils/conversationHistoryUtil";
import Bubble from "../components/Bubble";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

export default function ChatScreen(props) {
  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Clear"
            iconName="trash-o"
            onPress={() => {
              setConversation([]);
              resetConversation();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    resetConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (messageText === "") return;

    try {
      addUserMessage(messageText);
      setMessageText("");
      setConversation([...getConversation()]);

      await makeChatRequest();
    } catch (error) {
      console.log(error);
    } finally {
      setConversation([...getConversation()]);
    }
  }, [messageText]);

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          <FlatList
            style={styles.flatList}
            data={conversation}
            renderItem={(itemData) => {
              const convoItem = itemData.item;

              const { role, content } = convoItem;

              if (role === "system") return null;

              return <Bubble text={content} type={role} />;
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textbox}
            placeholder="Type a message..."
            onChangeText={(text) => setMessageText(text)}
            value={messageText}
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Feather name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBg,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  textbox: {
    flex: 1,
    fontFamily: "regular",
  },
  messagesContainer: {
    flex: 1,
  },
  flatList: {
    marginHorizontal: 15,
    paddingVertical: 10,
  },
});
