const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 3,
            unique: 1
        },
        name: {
            type: String,
            minlength: 1
        },
        passwordHash: String, 
        blogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog"
            }
        ]
}, {strict: true})
.set("toJSON", {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        delete obj.passwordHash;
    }
});

module.exports = mongoose.model("User", userSchema);
