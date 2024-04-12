let conversation = [];

export const getConversation = () => conversation;
import OpenAI from "openai";
export const openai = new OpenAI({
  apiKey: "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",
});

export const initConversation = () => {
  addSystemMessage("You are a virtual assistant named Jeff");
};

export const addUserMessage = (messageText) => {
  conversation.push({
    role: "user",
    content: messageText,
  });
};

export const addAssistantMessage = (messageText) => {
  conversation.push({
    role: "assistant",
    content: messageText,
  });
};

export const addSystemMessage = (messageText) => {
  conversation.push({
    role: "system",
    content: messageText,
  });
};

export const resetConversation = () => {
  conversation = [];
  initConversation();
};
