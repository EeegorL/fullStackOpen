const mongoose = require("mongoose");

const password = process.env.MONGOOSE_PASSWORD;

const url = `mongodb+srv://fullstack:${password}@cluster0.fh6cxq9.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`;
             
mongoose.set("strictQuery", false);
mongoose.connect(url)
.catch(err => console.log("Kirjautuminen epäonnistui. Salasana muuttunut?", err));

const validation = (val) => {
  try {
    val = val.trim();
    const parts = val.split("-");
    if (parts.length !== 2) return false;
    if (parts[0].length < 2 || parts[0].length > 3) return false;
    if (parts[0].length + parts[1].length < 8) return false;

    return true;
  }
  catch (e) {
    return false;
  }
}

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true
    },
    number: {
      type: String,
      minlength: 8,
      validate: validation,
      required: true
    }
})
.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
});

const Person = mongoose.model("Person", personSchema);

module.exports = {Person};
