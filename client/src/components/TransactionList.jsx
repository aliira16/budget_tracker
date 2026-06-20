export default function TransactionList({ transactions, onDelete }) {
    return (
        <div className="transactions">
            <h2>Transactions</h2>
            {transactions.length === 0 ? (<p className="empty" >No transaction</p>) : (
                <div className="trasaction-list">
                    {transactions.map((t => (<div key={t.id} className={`transaction ${t.type}`}>
                        <div className="transaction-info">
                            <p className="descreption">
                                {t.description}
                            </p>
                            <p className="date">
                                {new Date(t.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div className="transaction-actions">
                            <span className={`amount ${t.type}`}>
                                {t.type === 'income' ? '+' : '-'} ${parseFloat(t.amount).toFixed(2)}
                            </span>
                        </div>
                        <button onClick={() => onDelete(t.id)}>DELETE</button>
                    </div>)))}
                </div>
            )}
        </div>
    )
}