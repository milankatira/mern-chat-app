import axios from "axios";
import { singlemessageUrl, messageUrl } from "../constant/ApiUrl";

export const getSingleMessage = async (id, config) => {
  return await axios.get(singlemessageUrl(id), config);
};

export const postMessage = async (payload, config) => {
  return await axios.post(messageUrl, payload, config);
};
