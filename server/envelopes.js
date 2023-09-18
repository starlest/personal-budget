const express = require("express");
const { createEnvelope, getAllEnvelopes, getEnvelopeById } = require("./db");

const envelopesRouter = express.Router();

envelopesRouter.post("/", (req, res, next) => {
  const newEnvelope = createEnvelope(req.body);
  if (newEnvelope) {
    res.status(201).send(newEnvelope);
  } else {
    res.status(400).send("Bad Request");
  }
});

envelopesRouter.get("/", (req, res, next) => {
  res.send(getAllEnvelopes());
});

envelopesRouter.get("/:envelopeId", (req, res, next) => {
  const envelopeId = parseInt(req.params.envelopeId);
  const envelope = getEnvelopeById(envelopeId);
  if (envelope) {
    res.send(envelope);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = envelopesRouter;
