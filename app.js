const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Core = require("./core");
const routes = require("./routes");
new Core();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

const port = 3333;
app.listen(port, () =>
  console.log(`Server started on http://localhost:${3333}`)
);
