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

envelopesRouter.post("/transfer/:from/:to", (req, res, next) => {
  const from = getEnvelopeById(parseInt(req.params.from));
  const to = getEnvelopeById(parseInt(req.params.to));
  if (!from || !to) {
    res.status(404).send("Not Found");
  } else {
    const amount = parseInt(req.body.amount);
    if (isNaN(amount) || amount <= 0) {
      res.status(400).send("Bad Request");
    } else if (from.budget < amount) {
      res.status(400).send("Bad Request");
    } else {
      from.budget -= amount;
      to.budget += amount;
      res.status(200).send([from, to]);
    }
  }
});

module.exports = envelopesRouter;
