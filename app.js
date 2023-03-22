require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.MYSQL_PORT;

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

require("./middleware/routes")(app);

app.get("/", (req, res) => {
  res.send({
    message: "URL hit successfull",
  });
});

app.listen(port, () => {
  console.log(`Node App Running on ${port}`);
});
