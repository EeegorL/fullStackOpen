const mongoose = require("mongoose");

const password = process.env.MONGOOSE_PASSWORD;

const url = `mongodb+srv://fullstack:${password}@cluster0.fh6cxq9.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url)
.catch(err => console.log("Kirjautuminen epäonnistui. Salasana muuttunut?", err));

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Person = mongoose.model("Person", personSchema);

module.exports = {Person};
