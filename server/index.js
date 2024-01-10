const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("", require("./routes/movies"));
app.use("/auth", require("./routes/auth"));
app.use("/sub", require("./routes/sub"));

app.listen(8080, () => {
  console.log("Now listening on PORT 8080");
});
