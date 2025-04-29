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
    const { title, status, priority } = req.body;

    // Check nếu không có id
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing todo ID in request params." });
    }

    // Check id có đúng định dạng MongoDB ObjectId không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID format." });
    }

    // Check nếu không có gì để update
    if (!title && !status && !priority) {
      return res.status(400).json({ message: "No update data provided." });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, status, priority },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: error.message });
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
