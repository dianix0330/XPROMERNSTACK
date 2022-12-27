const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

require("./routes/users.routes.js")(app);

app.listen(port, () => console.log(`Server running on PORT ${port}`));
