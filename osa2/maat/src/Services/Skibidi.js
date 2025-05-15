import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const openWeatherMap_baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getCommonNames = async () => {
    const res = await axios.get(`${baseUrl}/all`);
    return res.data;
};

const getDetailed = async (country) => {
    const res = await axios.get(`${baseUrl}/name/${country}`);
    return res.data;
};

const getWeather = async (lat, lon) => {
    const key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const url = `${openWeatherMap_baseUrl}?lat=${lat}&lon=${lon}&appid=${key}`;

    const res = await axios.get(url);
    return res.data;
};
export default { getCommonNames, getDetailed, getWeather };