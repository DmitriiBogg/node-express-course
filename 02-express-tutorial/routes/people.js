const express = require("express");
const router = express.Router();
const {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

// API ways (info for me and my submitter ) . commands for router
// GET /api/v1/people
router.get("/", getPeople);

// POST /api/v1/people
router.post("/", addPerson);

// GET /api/v1/people/:id
router.get("/:id", getPersonById);

// PUT /api/v1/people/:id
router.put("/:id", updatePerson);

// DELETE /api/v1/people/:id
router.delete("/:id", deletePerson);

module.exports = router;
