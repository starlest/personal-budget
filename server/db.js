const envelopes = [
  {
    id: 0,
    title: "Groceries",
    budget: 300,
  },

  {
    id: 1,
    title: "Rent",
    budget: 1200,
  },
  {
    id: 2,
    title: "Utilities",
    budget: 200,
  },

  {
    id: 3,
    title: "Entertainment",
    budget: 100,
  },
];
let nextIndex = 4;
let totalBudget = 1800;

const isValidEnvelope = (instance) => {
  instance.title = instance.title || "";
  instance.budget = instance.budget || 0;
  if (typeof instance.title !== "string") {
    throw new Error("Budget's title must be a string.");
  }
  if (!isNaN(parseFloat(instance.budget)) && isFinite(instance.budget)) {
    instance.budget = Number(instance.budget);
  } else {
    throw new Error("Envelope's budget must be a number.");
  }
  return true;
};

const getAllEnvelopes = () => envelopes;

const createEnvelope = (instance) => {
  if (!isValidEnvelope(instance)) return null;
  const newEnvelope = {
    id: nextIndex++,
    title: instance.title,
    budget: instance.budget,
  };
  envelopes.push(newEnvelope);
  totalBudget += instance.budget;
  return newEnvelope;
};

const getEnvelopeById = (id) => envelopes.find((e) => e.id === id);

module.exports = { getAllEnvelopes, getEnvelopeById, createEnvelope };