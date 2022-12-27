import axios from "axios";
import { loginUrl, registerUrl, searchuserUrl } from "../constant/ApiUrl";

export const loginService = async (payload) => {
  return await axios.post(loginUrl, payload);
};

export const registerService = async (payload) => {
  return await axios.post(registerUrl, payload);
};

export const searchUserService = async (searchTerm,config) => {
  return await axios.get(searchuserUrl(searchTerm),config);
};