const express = require("express");
const mongoose = require("mongoose")
const morgan = require("morgan");
const {errors} = require("./utils");

morgan.token("body", req => {
  return JSON.stringify(req.body)
});

const cors = require("cors");
require("dotenv").config();

const {Person} = require("./models/Person");

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
            <p>Puhelinluettelossa löytyy tiedot ${result.length} henkilölle</p>
            <p>${new Date(Date.now())}</p>    
        `)
    })
    .catch(err => next(err));
});


app.get("/api/persons", (req, res, next) => {
    Person.find({})
    .then(persons => {
        res.json(persons);
    })
    .catch(err => next(err));
});


app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Person.findById(id)
    .then(result => {
        if(!result) return next(errors.NotFoundError);
        res.status(200).json(result)
    })
    .catch(err =>  next(err));
});


app.post("/api/persons", (req, res, next) => {
    let b = req.body;
    
    if(!b) return next(errors.BodyMissingError);
    if(!b.name || !b.number) return next(errors.BodyFormatError);

    const newPerson = new Person({
        name: b.name,
        number: b.number
    });

    newPerson.save()
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
});


app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    const b = req.body;

    if(!b) return next(errors.BodyMissingError);
    if(!b.name || !b.number) return next(errors.BodyFormatError);

    Person.findByIdAndUpdate({_id: id}, {name: b.name, number: b.number})
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
});


app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Person.findByIdAndDelete({_id: id})
    .then(result => {
        if(result == null) return next(errors.NotFoundError);
        else res.status(200).json(result)
    })
    .catch(err => next(err));
});

const errorHandler = (error, req, res, next) => {    
    if(error.name === "BodyFormatError") res.status(400).json({error: "The body is of wrong format"});
    else if(error.name === "CastError") res.status(400).json({error: "The id is of wrong format"});
    else if(error.name === "BodyMissingError") res.status(400).json({error: "The request is missing a body"});
    else if(error.name === "NotFoundError") res.status(404).send({error: "The id is not associated with any record"});
    else res.status(500).json({error: error});

    next(error);
};

app.listen(PORT, () => {
    console.log("Listening on " + PORT)
});


process.on("SIGINT",() => {
    mongoose.connection.close();
});

app.use(errorHandler);