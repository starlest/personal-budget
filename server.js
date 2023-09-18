const express = require("express");

const app = express();
const PORT = 3000;

const jsonParser = require("body-parser");
app.use(jsonParser.json());

const envelopesRouter = require("./server/envelopes");
app.use('/envelopes', envelopesRouter);

app.get("/", (req, res, next) => res.send("Hello, World"));

app.listen(PORT, console.log(`Listening at PORT: ${PORT}`));
