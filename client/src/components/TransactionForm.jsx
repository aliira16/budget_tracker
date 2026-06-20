import { useState } from 'react';
export default function TransactionForm({ onAdd }) {
    const [description, setDescription] = useState(''); // to store the description of transaction
    const [amount, setAmount] = useState(''); // to store the amount of transaction
    const [type, setType] = useState(''); // to store the type of transaction (income or expense)

    const handelSubmit = (e) => {
        e.preventDefault(); // to stop page refresh 
        if (!description || !amount) {
            alert('Please fill in all fields');
            return;
        }
        onAdd({ description, amount, type }); // call the onAdd function passed from parent component with the form data
        setDescription('');
        setAmount('');
        setType('expense'); // reset the form fields after submission
    };
    return (
        <form onSubmit={handelSubmit} className='form'>
            <div className="from-group">
                <label>Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="from-group">
                <label>Amount</label>
                <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} step="0.01" />
            </div>
            <div className="from-group">
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>
            <button type="submit" className='btn-add'>Add transaction</button>
        </form>
    );

}