import OpenAI from "openai";
import {
  addAssistantMessage,
  getConversation,
} from "./conversationHistoryUtil";
const openai = new OpenAI({
  apiKey: "",
});

export const makeImageRequest = async (prompt) => {
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt,
    n: 1,
    size: "256x256",
  });

  if (response.data) {
    return response.data;
  }
  throw new Error("Response is in an unsupported format");
};

export const makeChatRequest = async (chatOptions) => {
  const response = await openai.chat.completions.create({
    ...chatOptions,
    model: "gpt-3.5-turbo",
    messages: getConversation(),
  });

  if (response.choices) {
    let responseText = response.choices[0].message.content;
    responseText = responseText.replace(/(\r\n|\n|\r)/gm, "");
    addAssistantMessage(responseText);
    console.log(getConversation());
    return;
  }

  throw new Error("The response is in an unsupported format");
};
