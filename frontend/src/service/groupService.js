import axios from "axios";
import { addgroup, groupChat } from "../constant/ApiUrl";

export const addGroupChat = async (payload, config) => {
  await axios.post(groupChat, payload, config);
};

export const addGroup = async (payload, config) => {
  await axios.put(addgroup, payload, config);
};

export const removeGroup = async (payload, config) => {
  await axios.put(removeGroup, payload, config);
};
