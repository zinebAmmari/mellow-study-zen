const Task = require("../models/Task");
const Note = require("../models/Note");

// Tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const createTasks = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const task = await Task.create({
      user: req.user,
      title,
      description,
      priority,
      dueDate,
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Notes
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const createNotes = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.create({ user: req.user, title, content, tags });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user });
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user });
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }
    Object.assign(note, req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};
