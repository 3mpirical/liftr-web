import axios from "axios";

const instance = axios.create({
    baseURL: "https://guarded-lake-89057.herokuapp.com/"
  });

export default instance;