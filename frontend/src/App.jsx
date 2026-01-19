import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  const backendURL = "http://localhost:4000/expenses";

  // Fetch's the expenses from backend
  const fetchExpenses = async () => {
    try {
      let url = backendURL;
      if (filterCategory) {
        url += `?category=${filterCategory}`;
      }
      if (sortNewest) {
        url += filterCategory ? "&sort=date_desc" : "?sort=date_desc";
      }

      const res = await axios.get(url);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filterCategory, sortNewest]);

  // Adding new expense
  const addExpense = async () => {
    if (!amount || !category || !description || !date) {
      alert("All fields are required!");
      return;
    }

    const newExpense = {
      id: uuidv4(),
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    try {
      await axios.post(backendURL, newExpense);
      // Clear the form
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // Calculating the total
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Expense Tracker</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by Category: </label>
        <input
          type="text"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <button onClick={() => setSortNewest(!sortNewest)}>
          Sort {sortNewest ? "Oldest First" : "Newest First"}
        </button>
      </div>

      <table border="1" cellPadding="5" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Amount (₹)</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.amount.toFixed(2)}</td>
              <td>{exp.category}</td>
              <td>{exp.description}</td>
              <td>{exp.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ₹{total.toFixed(2)}</h3>
    </div>
  );
}

export default App;























/*
Here is the optional features that i have build i have shared 
*/

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// function App() {
//   const [expenses, setExpenses] = useState([]);
//   const [filteredExpenses, setFilteredExpenses] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [filter, setFilter] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const backendURL = "http://localhost:4000/expenses";

//   // Fetch expenses from backend
//   const fetchExpenses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(backendURL);
//       setExpenses(res.data);
//       setFilteredExpenses(res.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch expenses");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   // Add a new expense
//   const handleAddExpense = async () => {
//     if (!amount || amount <= 0) {
//       alert("Please enter a valid positive amount");
//       return;
//     }
//     if (!date) {
//       alert("Please select a date");
//       return;
//     }

//     const newExpense = {
//       id: uuidv4(),
//       amount: parseFloat(amount),
//       category,
//       description,
//       date,
//     };

//     try {
//       await axios.post(backendURL, newExpense);
//       setAmount("");
//       setCategory("");
//       setDescription("");
//       setDate("");
//       fetchExpenses();
//     } catch {
//       alert("Failed to add expense");
//     }
//   };

//   // Delete an expense
//   const handleDeleteExpense = async (id) => {
//     try {
//       await axios.delete(`${backendURL}/${id}`);
//       fetchExpenses();
//     } catch {
//       alert("Failed to delete expense");
//     }
//   };

//   // Filter expenses by category
//   const handleFilter = (cat) => {
//     setFilter(cat);
//     if (cat === "") {
//       setFilteredExpenses(expenses);
//     } else {
//       setFilteredExpenses(expenses.filter((exp) => exp.category === cat));
//     }
//   };

//   // Calculate total amount
//   const totalAmount = filteredExpenses.reduce(
//     (acc, exp) => acc + parseFloat(exp.amount),
//     0
//   );

//   // Calculate total per category
//   const totalPerCategory = () => {
//     const totals = {};
//     filteredExpenses.forEach((exp) => {
//       if (!totals[exp.category]) totals[exp.category] = 0;
//       totals[exp.category] += parseFloat(exp.amount);
//     });
//     return totals;
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Expense Tracker</h1>

//       {/* Add Expense Form */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//         <button onClick={handleAddExpense}>Add Expense</button>
//       </div>

//       {/* Filter */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>Filter by category: </label>
//         <input
//           type="text"
//           value={filter}
//           onChange={(e) => handleFilter(e.target.value)}
//         />
//       </div>

//       {/* Loading & Error */}
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Total Amount */}
//       <h3>Total: ₹{totalAmount.toFixed(2)}</h3>

//       {/* Total per Category */}
//       <h4>Totals per Category:</h4>
//       <ul>
//         {Object.entries(totalPerCategory()).map(([cat, total]) => (
//           <li key={cat}>
//             {cat}: ₹{total.toFixed(2)}
//           </li>
//         ))}
//       </ul>

//       {/* Expense Table */}
//       <table border="1" cellPadding="5" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Amount</th>
//             <th>Category</th>
//             <th>Description</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredExpenses.map((exp) => (
//             <tr key={exp.id}>
//               <td>{exp.date}</td>
//               <td>₹{exp.amount.toFixed(2)}</td>
//               <td>{exp.category}</td>
//               <td>{exp.description}</td>
//               <td>
//                 <button onClick={() => handleDeleteExpense(exp.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
