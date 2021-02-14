const express = require("express");
const app = express();
var cors = require('cors')
let port = process.env.PORT;

if (port == null || port == "") {
    port = 8080;
}

app.use(express.static("public"))
app.use(cors())
app.listen(port, () => console.log(`Server listening on port: ${port}`));