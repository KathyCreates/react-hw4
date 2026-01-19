import { Suspense, useMemo, useState } from "react";
import MessageComponent from "./components/MessageComponent";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

function createMessagePromise(delayMs: number, shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Симульована помилка завантаження (Promise rejected)."));
        return;
      }
      resolve("Привіт! Це повідомлення отримано через use() з Promise ✨");
    }, delayMs);
  });
}

export default function App() {
  const [reloadKey, setReloadKey] = useState(0);
  const [shouldFail, setShouldFail] = useState(false);

  // Важливо: Promise має бути стабільним, інакше Suspense буде “вічно” вантажити.
  const messagePromise = useMemo(() => {
    return createMessagePromise(1200, shouldFail);
  }, [reloadKey, shouldFail]);

  return (
    <div className="page">
      <h1>React use() + Suspense</h1>

      <div className="controls">
        <button onClick={() => setReloadKey((k) => k + 1)}>Оновити</button>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => setShouldFail(e.target.checked)}
          />
          Симулювати помилку
        </label>
      </div>

      <ErrorBoundary onReset={() => setReloadKey((k) => k + 1)}>
        <Suspense fallback={<div className="card">Завантаження...</div>}>
          <div className="card">
            <MessageComponent messagePromise={messagePromise} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
