import axios from "axios";
const baseUrl = "/api/persons";

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

    const res = await axios.post(baseUrl, obj)
    .catch(err => {
        throw new Error(err.response.data.error);
    });

    return res.data;
};

const annihilate = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/${id}`);
        return res.data
    }
    catch(err) {
        throw new Error("Henkilöä ei ole olemassa");
    };
};

const update = async (id, obj) => {
    try {
        const res = await axios.put(`${baseUrl}/${id}`, obj);
        if(res.data === null) throw new Error("Henkilöä ei ole olemassa");
        return res.data;
    }
    catch(err) {
        throw new Error(err.response.data.error);
    }
};

export default { getAll, create, annihilate, update };