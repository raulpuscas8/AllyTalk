import OpenAI from "openai";
import {
  addAssistantMessage,
  getConversation,
} from "./conversationHistoryUtil";
const openai = new OpenAI({
  apiKey: "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",
});

export const makeChatRequest = async (messageText) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: getConversation(),
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  //   printUsage(response.data.usage)
  if (response.choices) {
    let responseText = response.choices[0].message.content;
    responseText = responseText.replace(/(\r\n|\n|\r)/gm, "");
    addAssistantMessage(responseText);
    // console.log(response.choices[0].message);
    console.log(getConversation());
    return;
  }

  throw new Error("The response is in an unsupported format");
};