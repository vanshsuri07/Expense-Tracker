import { useState } from 'react'
import styles from './ExpenseList.module.css'

const CATEGORY_ICONS = {
  Food: '🍔',
  Travel: '✈️',
  Marketing: '📢',
  Utilities: '⚡',
  Other: '📦',
}

const CATEGORY_COLORS = {
  Food: '#FF6B6B',
  Travel: '#4ECDC4',
  Marketing: '#6DC93A',
  Utilities: '#FFD93D',
  Other: '#A78BFA',
}

export default function ExpenseList({ expenses, onDelete }) {
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = (id) => {
    setDeletingId(id)
    setTimeout(() => {
      onDelete(id)
      setDeletingId(null)
    }, 300)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleRow}>
          <span className={styles.dot} />
          <h2 className={styles.title}>Expenses</h2>
        </div>
        <span className={styles.count}>{expenses.length} item{expenses.length !== 1 ? 's' : ''}</span>
      </div>

      {expenses.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🧾</span>
          <p>No expenses yet. Add your first one!</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {expenses.map(expense => (
            <li
              key={expense.id}
              className={`${styles.item} ${deletingId === expense.id ? styles.deleting : ''}`}
            >
              <div
                className={styles.iconBadge}
                style={{ background: CATEGORY_COLORS[expense.category] + '22', color: CATEGORY_COLORS[expense.category] }}
              >
                <span>{CATEGORY_ICONS[expense.category] || '📦'}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{expense.name}</span>
                <span
                  className={styles.category}
                  style={{ color: CATEGORY_COLORS[expense.category] }}
                >
                  {expense.category}
                </span>
              </div>
              <span className={styles.amount}>${expense.amount.toFixed(2)}</span>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(expense.id)}
                title="Delete expense"
                aria-label={`Delete ${expense.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
