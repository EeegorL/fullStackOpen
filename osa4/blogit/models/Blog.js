const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    url: String,
    author: String,
    likes: Number
}).set("toJSON", {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj.__v;
        delete obj._id;
    }
});

module.exports = mongoose.model("Blog", blogSchema);