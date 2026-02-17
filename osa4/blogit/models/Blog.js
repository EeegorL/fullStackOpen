const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: 1
        },
        url: {
            type: String,
            unique: 1
        },
        author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    {strict: "throw"}
).set("toJSON", {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj.__v;
        delete obj._id;
    }
});

module.exports = mongoose.model("Blog", blogSchema);