import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";
import styles from "./App.module.css";

const CATEGORIES = ["Food", "Travel", "Marketing", "Utilities", "Other"];

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Lunch", amount: 45, category: "Food" },
          { id: 2, name: "Flight Tickets", amount: 320, category: "Travel" },
          { id: 3, name: "Google Ads", amount: 150, category: "Marketing" },
        ];
  });

  const addExpense = (expense) => {
    setExpenses((prev) => [{ ...expense, id: Date.now() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💰</span>
            <div>
              <h1 className={styles.logoTitle}>ExpenseTracker</h1>
              <p className={styles.logoSub}>by Marketing Mojito</p>
            </div>
          </div>
          <div className={styles.totalBadge}>
            <span className={styles.totalLabel}>Total Spent</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.leftCol}>
          <ExpenseForm onAdd={addExpense} categories={CATEGORIES} />
          <CurrencyConverter totalUSD={total} />
        </div>
        <div className={styles.rightCol}>
          <SummaryPanel
            expenses={expenses}
            categories={CATEGORIES}
            total={total}
          />
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>
      </main>
    </div>
  );
}
