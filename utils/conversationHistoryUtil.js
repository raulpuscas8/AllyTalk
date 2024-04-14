let conversation = [];

export const getConversation = () => conversation;

export const initConversation = (personality, mood) => {
  let messageString = "You are a virtual assistant named Tzakalie. ";

  if (personality !== "normal") {
    messageString += `respond as if you are a ${personality}. `;
  }

  if (mood !== "normal") {
    messageString += `Your mood is: ${mood}. `;
  }

  addSystemMessage(messageString);
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

export const resetConversation = (personality, mood) => {
  conversation = [];
  initConversation(personality, mood);
};
