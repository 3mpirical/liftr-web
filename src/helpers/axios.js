import axios from "axios";

const instance = axios.create({
    baseURL: "https://liftr-server.herokuapp.com/"
  });

export default instance;