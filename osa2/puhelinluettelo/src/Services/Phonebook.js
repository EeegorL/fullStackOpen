import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
   const res = await axios.get(baseUrl);
    return res.data;
};

const create = async (obj) => {
    await axios.get(baseUrl)
    .then(res => res.data)
    .then(data => {
        if(data.some(d => d.name === obj.name)) {
            throw new Error("Henkilö on jo olemassa!");
        };
    });
    const res = await axios.post(baseUrl, obj);
    return res.data;
};

const annihilate = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/${id}`);
        return res.data;
    }
    catch(e) {
        throw new Error("Henkilö oli jo poistettu!");
    };
};

const update = async (id, obj) => {
    try {
        const res = await axios.put(`${baseUrl}/${id}`, obj);
        return res.data;
    }
    catch(e) {
        throw new Error("Henkilöä ei ole olemassa");
    }
};

export default { getAll, create, annihilate, update };