import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getCommonNames = async () => {
    const res = await axios.get(`${baseUrl}/all`);
    return res.data;
};

const getDetailed = async (country) => {
    const res = await axios.get(`${baseUrl}/name/${country}`);
    return res.data;
};

const getWeather = async (country) => {
    const res = _;
};
export default { getCommonNames, getDetailed };