import axios from "axios";
import { chatUrl, renameChat } from "../constant/ApiUrl";

export const getchatService = async (config) => {
  return await axios.get(chatUrl, config);
};

export const postchatService = async (payload, config) => {
  return await axios.post(chatUrl, payload, config);
};

export const renameChatService = async (payload, config) => {
  return await axios.put(renameChat,payload,config);
}