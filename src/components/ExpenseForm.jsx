import { useState } from "react";
import styles from "./ExpenseForm.module.css";

export default function ExpenseForm({ onAdd, categories }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return triggerError("Please enter an expense name.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return triggerError("Please enter a valid amount greater than 0.");

    onAdd({ name: name.trim(), amount: parseFloat(amount), category });
    setName("");
    setAmount("");
    setCategory(categories[0]);
    setError("");
  };

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className={`${styles.card} ${shake ? styles.shake : ""}`}>
      <div className={styles.cardHeader}>
        <span className={styles.dot} />
        <h2 className={styles.title}>Add Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.field}>
          <label className={styles.label}>Expense Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. Lunch"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            maxLength={60}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Amount (USD)</label>
            <div className={styles.amountWrap}>
              <span className={styles.currency}>$</span>
              <input
                className={`${styles.input} ${styles.amountInput}`}
                type="number"
                placeholder="0.00"
                value={amount}
                min="0.01"
                step="0.01"
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.btn}>
          <span className={styles.btnPlus}>+</span> Add Expense
        </button>
      </form>
    </div>
  );
}
