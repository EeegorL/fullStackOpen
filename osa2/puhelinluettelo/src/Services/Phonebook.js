import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
   const res = await axios.get(baseUrl);
    return res.data;
};

const create = async (obj) => {
    const res = await axios.post(baseUrl, obj);
    return res.data;
};

const annihilate = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/${id}`);
        return res.data;
    }
    catch(err) {
        alert("Yhteystieto oli jo poistettu!");
    };
};

const update = async (id, obj) => {
    const res = await axios.put(`${baseUrl}/${id}`, obj);
    return res.data;
};

export default { getAll, create, annihilate, update };