import { useState } from 'react'
import axios from "axios"
import TransactionForm from "./components/TransactionForm"
import TransactionList from "./components/TransactionList"
import Balance from "./components/Balance"
import './index.css'

function App() {
  const [transactions, setTransactions] = useState([]);
  const [user_id, setUser_id] = useState(null);
  const API_URL = 'http://localhost:3000/api';

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username: 'ali' });
      setUser_id(response.data.user_id);
      fetchTransactions(response.data.user_id);
    } catch (error) {
      alert('login failed')
    }
  };
  const fetchTransactions = async (uid) => {
    const response = await axios.get(`${API_URL}/transactions/${uid}`);
    setTransactions(response.data);
  };

  const handleAddTransaction = async (formData) => {
    const response = await axios.post(`${API_URL}/transactions`, { user_id, ...formData });
    setTransactions([response.data, ...transactions]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/transactions/${id}`);
    setTransactions(transactions.filter(t => t.id !== id));
  };

  if (!user_id) {
    return <div className="login-container">
      <h1>$Budget Tracker$</h1>
      <button onClick={handleLogin} className='login-btn' > Login as Demo </button>
    </div>
  };

  return (
    <div className="container">
      <header>
        <h1>💰 Budget Tracker</h1>
        <button onClick={() => setUser_id(null)}>Logout</button>
      </header>
      <Balance transactions={transactions} />
      <TransactionForm onAdd={handleAddTransaction} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}

export default App
