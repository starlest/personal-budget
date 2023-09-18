const express = require("express");
const {
  createEnvelope,
  getAllEnvelopes,
  getEnvelopeById,
  updateEnvelope,
  deleteEnvelope,
} = require("./db");
const { parse } = require("path");

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

envelopesRouter.param("envelopeId", (req, res, next, envelopeId) => {
  const envelope = getEnvelopeById(parseInt(envelopeId));
  if (envelope) {
    req.envelope = envelope;
    next();
  } else {
    res.status(404).send("Not Found");
  }
});

envelopesRouter.get("/:envelopeId", (req, res, next) => res.send(req.envelope));

envelopesRouter.put("/:envelopeId", (req, res, next) => {
  const updatedEnvelope = updateEnvelope({ ...req.body, id: req.envelope.id });
  if (updatedEnvelope) {
    res.status(200).send(updatedEnvelope);
  } else {
    res.status(400).send("Bad Request");
  }
});

envelopesRouter.delete("/:envelopeId", (req, res, next) => {
  const deletedEnvelope = deleteEnvelope(req.envelope.id);
  if (deletedEnvelope) {
    res.status(204).send(deletedEnvelope);
  } else {
    res.status(400).send("Bad Request");
  }
});

module.exports = envelopesRouter;
