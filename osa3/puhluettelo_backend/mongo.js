const mongoose = require("mongoose");

const args = process.argv;
const password = args[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.fh6cxq9.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
}).set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model("Person", personSchema);

if(args.length === 3) {
  Person.find({})
    .then((res) => {
      console.log("Puhelinluettelo:");
      for(let p of res) {
        console.log(p.name, p.number);
      }
      mongoose.connection.close();
    });
}
else {
  const name = args[3];
  const number = args[4];

  const newPerson = new Person({
    name, number
  });

  newPerson.save().then(() => {
    console.log("Tallennettu!");
    mongoose.connection.close();
  });
};