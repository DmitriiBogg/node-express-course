const { people } = require("../data");

// GET /api/v1/people
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

// POST /api/v1/people
const addPerson = (req, res) => {
  const { name } = req.body; // use destructuring for get the name
  // make sure we got a name
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  // make new person (from app.js last lesson)
  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);

  res.status(201).json({ success: true, data: newPerson });
};

// GET /api/v1/people/:id
const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }

  res.status(200).json({ success: true, data: person });
};

// PUT /api/v1/people/:id
const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const person = people.find((p) => p.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  person.name = name;
  res.status(200).json({ success: true, data: person });
};

// DELETE /api/v1/people/:id
const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);

  const personIndex = people.findIndex((p) => p.id === id);

  if (personIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }

  people.splice(personIndex, 1);
  res.status(200).json({ success: true, message: "Person removed" });
};

module.exports = {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
};
