const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    passwordHash: String,
    notes: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

userSchema.set("toJSON", {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        delete obj.passwordHash;
    }
});

module.exports = mongo.model("User", userSchema);