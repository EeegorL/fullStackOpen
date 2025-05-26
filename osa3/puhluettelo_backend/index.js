const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { newId } = require("./utils");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", req => {
  return JSON.stringify(req.body)
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms | :body"));

let persons = [
    {
        id: "1",
        name: "Henk_1",
        number: "num_1"
    },
    {
        id: "2",
        name: "Henk_2",
        number: "num_2"
    },
    {
        id: "3",
        name: "Henk_3",
        number: "num_3"
    },
    {
        id: "4",
        name: "Henk_4",
        number: "num_4"
    }
];
const ids = persons.map(p => p.id);


app.get("/info", (req, res) => {
    res.send(`
        <p>Puhelinluettelossa löytyy tiedot ${persons.length}:lle henkilölle</p>
        <p>${new Date(Date.now())}</p>    
    `);
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const found = persons.find(p => p.id == id) || {};

    Object.keys(found).length > 0
    ? res.status(200).json(found)
    : res.status(404).json({});
});

app.post("/api/persons", (req, res) => {
    let b = req.body;

    let newPerson = {
        id: newId(ids),
        name: b.name,
        number: b.number
    };

    let virheet = [];
    
    if(!b.name) virheet.push("Nimi puuttuuu");
    if(!b.number) virheet.push("Numero puuttuu");
    if(persons.some(p => p.name === b.name)) virheet.push("Nimen pitää olla ainutlaatuinen");

    virheet.length !== 0
    ? res.status(409).json({errors: virheet})
    : persons.push(newPerson)
    res.status(201).end();
});

app.put("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const number = req.body.number;

    if(!persons.some(p => p.id === id)) {
        res.status(404).json({error: "Henkilöä ei ole olemassa"});
    };

    const idx = persons.findIndex(p => p.id === id);
    persons[idx] = {
        id: id,
        name: name,
        number: number
    };
    res.status(200).end();
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    if(persons.some(p => p.id === id)) {
        persons = persons.filter(p => p.id != id);
        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
});

app.listen(PORT, () => {
    console.log("Listening on " + PORT)
})