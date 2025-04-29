import Todo from "../models/todo.js";

// GET all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todos", error });
  }
};

// GET single todo
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todo", error });
  }
};

// POST create todo
export const createTodo = async (req, res) => {
  try {
    const { title, status, priority } = req.body;
    const newTodo = await Todo.create({ title, status, priority });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

// PATCH update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

// DELETE todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
