import { server_url } from "./appConstant";

export const loginUrl = `${server_url}user/login`;
export const registerUrl = `${server_url}user`;
export const chatUrl = `${server_url}chat`;
export const searchuserUrl = (searchterm) =>
  `${server_url}user?search=${searchterm}`;
export const singlemessageUrl = (id) => `${server_url}message/${id}`;
export const messageUrl = `${server_url}message`;
export const groupChat = `${server_url}chat/group`;
export const renameChat = `${server_url}chat/rename`;
export const addgroup=`${server_url}chat/groupadd`;
export const removegroup = `${server_url}chat/groupremove`;
