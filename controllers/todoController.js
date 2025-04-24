import Todo from "../models/todo.js";

// GET all todos
export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// GET single todo
export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
};

// POST create todo
export const createTodo = async (req, res) => {
  const { title, status, priority } = req.body;
  const newTodo = await Todo.create({ title, status, priority });
  res.status(201).json(newTodo);
};

// PATCH update todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
};

// DELETE todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
};
