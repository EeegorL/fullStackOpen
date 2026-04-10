import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const req = await axios.post(baseUrl, credentials);
    return req;
  }
  catch(err) {
    if(err.response) throw new Error(err.response.data.err);
    throw new Error("Login failed");
  }
};

export default {login};