// server/routes/dataRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getTasks,
  createTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getNotes,
  createNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/dataController");

// Ces routes ne peuvent être accédées que si l'utilisateur est connecté (grâce à 'protect')
router.route("/tasks").get(protect, getTasks).post(protect, createTasks);
router
  .route("/tasks/:id")
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.route("/notes").get(protect, getNotes).post(protect, createNotes);
router
  .route("/notes/:id")
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
