const express = require("express");
const mongoose = require("mongoose")
const morgan = require("morgan");
morgan.token("body", req => {
  return JSON.stringify(req.body)
});

const cors = require("cors");
require("dotenv").config();

const {Person} = require("./models/Person");
const {newId} = require("./utils");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms | :body"));


app.get("/info", (req, res) => {
    Person.find({})
    .then(result => {
        res.send(`
            <p>Puhelinluettelossa löytyy tiedot ${result.length}:lle henkilölle</p>
            <p>${new Date(Date.now())}</p>    
        `);
    })
});


app.get("/api/persons", (req, res) => {
    Person.find({})
    .then(persons => {
        res.json(persons);
    })
});


app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;

    Person.findById(id)
    .then(result => {
        result 
        ? res.status(200).json(result)
        : res.status(404).end();
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({error: "id of wrong format"})
    });
});


app.post("/api/persons", (req, res) => {
    let b = req.body;

    if(!b) res.status(400).json({error: "Body missing"});
    if(!b.name || !b.number) res.status(400).json({error: "Incorrect body"});

    const newPerson = new Person({
        name: b.name,
        number: b.number
    });

    newPerson.save()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json(err));
});


app.put("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const b = req.body;

    if(!b) res.status(400).json({error: "Body missing"});
    if(!b.name || !b.number) res.status(400).json({error: "Incorrect body"});

    Person.updateOne({_id: id}, {name: b.name, number: b.number})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json(err))
});


app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;

    Person.deleteOne({_id: id})
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => res.status(400).json(err));
});


app.listen(PORT, () => {
    console.log("Listening on " + PORT)
});


process.on("SIGINT",() => {
    mongoose.connection.close();
});