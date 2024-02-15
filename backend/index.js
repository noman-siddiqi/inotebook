const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors')

connectToMongo();
const app = express();
app.use(cors())
const port = 3100;

app.use(express.json());

// Available Routes
app.use('/api/auth', require("./routes/auth"));
app.use('/api/notes', require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`);
});
