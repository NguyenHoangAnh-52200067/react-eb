import axios from "axios";

const server = "http://java-backend-env.eba-rawztn4n.us-east-1.elasticbeanstalk.com";

const instance = axios.create({
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
