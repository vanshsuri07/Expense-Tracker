import { useState, useEffect } from "react";
import styles from "./CurrencyConverter.module.css";

const CURRENCIES = ["EUR", "GBP", "INR", "JPY", "AUD", "CAD", "AED", "SGD"];

export default function CurrencyConverter({ totalUSD }) {
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?from=USD&to=${targetCurrency}`,
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setRate(data.rates[targetCurrency]);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Could not fetch exchange rate. Showing last known value.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchRate();
    return () => {
      cancelled = true;
    };
  }, [targetCurrency]);

  const converted = rate !== null ? totalUSD * rate : null;

  const formatConverted = (val, currency) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(val);
    } catch {
      return `${currency} ${val.toFixed(2)}`;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.dot} />
        <h2 className={styles.title}>Currency Converter</h2>
      </div>

      <div className={styles.fromRow}>
        <span className={styles.fromLabel}>Total in USD</span>
        <span className={styles.fromAmount}>${totalUSD.toFixed(2)}</span>
      </div>

      <div className={styles.arrow}>↓</div>

      <div className={styles.toRow}>
        <select
          className={styles.select}
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className={styles.result}>
          {loading && <span className={styles.loading}>Fetching rate…</span>}
          {!loading && error && <span className={styles.errorText}>—</span>}
          {!loading && !error && converted !== null && (
            <span className={styles.convertedAmount}>
              {formatConverted(converted, targetCurrency)}
            </span>
          )}
        </div>
      </div>

      {error && <p className={styles.errorMsg}>⚠️ {error}</p>}

      {!error && rate && (
        <p className={styles.rateNote}>
          1 USD = {rate} {targetCurrency}
        </p>
      )}
    </div>
  );
}
