const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // here we are allowing frontend to talk to backend
app.use(bodyParser.json());

// In-memory store
let expenses = [];

// GET /expenses

app.get("/expenses", (req, res) => {
  let result = [...expenses];

  // Filter by category
  if (req.query.category) {
    const cat = req.query.category.toLowerCase();
    result = result.filter((exp) => exp.category.toLowerCase() === cat);
  }

  // Sort by date
  if (req.query.sort === "date_desc") {
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  res.json(result);
});

// POST /expenses

app.post("/expenses", (req, res) => {
  const { id, amount, category, description, date } = req.body;

  if (!id || !amount || !category || !description || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Avoiding duplicates on retries (check by unique id)
  const exists = expenses.find((exp) => exp.id === id);
  if (exists) {
    return res.status(200).json({ message: "Expense already exists", expense: exists });
  }

  const newExpense = {
    id,
    amount: Number(amount),
    category,
    description,
    date,
    created_at: new Date().toISOString(),
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
