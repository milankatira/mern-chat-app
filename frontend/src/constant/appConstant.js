const masterConfig = {
  local: {
    server_url: "http://localhost:8000/api/",
    socket_url: "http://localhost:8000",
  },
  staging: {
    server_url: "",
    socket_url: "0",
  },
  prod: {
    server_url: "",
    socket_url: "",
  },
};

export const { server_url,socket_url } = masterConfig[process.env.APP_ENV || "local"];
