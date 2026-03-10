import styles from "./SummaryPanel.module.css";

const CATEGORY_COLORS = {
  Food: "#FF6B6B",
  Travel: "#4ECDC4",
  Marketing: "#6DC93A",
  Utilities: "#FFD93D",
  Other: "#A78BFA",
};

export default function SummaryPanel({ expenses, categories, total }) {
  const breakdown = categories
    .map((cat) => {
      const catTotal = expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0);
      const pct = total > 0 ? (catTotal / total) * 100 : 0;
      return { cat, total: catTotal, pct };
    })
    .filter((b) => b.total > 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.dot} />
        <h2 className={styles.title}>Spending Breakdown</h2>
      </div>

      {breakdown.length === 0 ? (
        <p className={styles.empty}>
          No data yet — add an expense to see your breakdown.
        </p>
      ) : (
        <>
          <ul className={styles.list}>
            {breakdown.map(({ cat, total: catTotal, pct }) => {
              const blocks = Math.round((pct / 100) * 20);
              const bar = "█".repeat(blocks);
              return (
                <li key={cat} className={styles.item}>
                  <span className={styles.catName}>{cat}</span>
                  <span
                    className={styles.bar}
                    style={{ color: CATEGORY_COLORS[cat] }}
                  >
                    {bar}
                  </span>
                  <span className={styles.catAmount}>
                    ${catTotal.toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
