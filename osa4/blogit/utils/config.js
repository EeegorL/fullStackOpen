require("dotenv").config({quiet: true});

const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

module.exports = {port, mongo_uri};