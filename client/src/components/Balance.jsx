export default function Balance({ transactions }) {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const balance = income - expense;

    return (
        <div className="balance-card">
            <div className="balance-item">
                <span>Income</span>
                <p className="income">+${income.toFixed(2)}</p>
            </div>
            <div className="balance-item">
                <span>expense</span>
                <p className="expense">-${expense.toFixed(2)}</p>
            </div>
            <div className="balance-item highlight">
                <span>Balance</span>
                <p className={balance >= 0 ? 'income' : 'expense'}>-${balance.toFixed(2)}</p>
            </div>
        </div>
    );
}