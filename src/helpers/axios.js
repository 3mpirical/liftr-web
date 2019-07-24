import axios from "axios";
import { initMiddleware } from "devise-axios";

initMiddleware();

const instance = axios.create({
    baseURL: "https://liftr-server.herokuapp.com/"
  });

export default instance;