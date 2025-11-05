const app =  require("./app");
const {port} = require("./utils/config");

app.listen(port, () => {
    console.log(`localhost:${port}`);
});