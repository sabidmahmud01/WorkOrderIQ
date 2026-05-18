import { useState } from "react";
import "./App.css";

type AnalysisResult = {
  summary: string;
  category: string;
  priority: string;
  checklist: string[];
  technicianNote: string;
};

function App() {
  const [workOrderText, setWorkOrderText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAnalyze() {
  if (!workOrderText.trim()) {
    alert("Please enter a work order description first.");
    return;
  }
  
  setIsLoading(true);
  setErrorMessage("");

  try {
    const response = await fetch("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workOrderText: workOrderText,
      }),
    });

    if (!response.ok) {
      throw new Error("Backend returned an error.");
    }

    const data: AnalysisResult = await response.json();

    setResult(data);
  } catch (error) {
    console.error(error);
    setErrorMessage("Unable to analyze work order. Please try again.");
  } finally {
    setIsLoading(false);
  }
}

  return (
    <main className="app-shell">
      <section className="hero-card">
        <h1>WorkOrderIQ</h1>
        <p className="eyebrow">AI Facilities Ticket Assistant</p>

        <p className="subtitle">
          Paste an AiM-style work order description and generate a structured
          summary, category, priority, checklist, and technician note.
        </p>
        <div className="input-section">
          <label htmlFor="work-order">Work Order Description</label>

          <textarea
            id="work-order"
            value={workOrderText}
            onChange={(event) => setWorkOrderText(event.target.value)}
            placeholder="Example: Printer in room 137 is showing offline..."
          />

          <button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Work Order"}
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        

        
      </section>
      

      {result && (
        <section className="results-section">
          <h2>Analysis Result</h2>

          <div className="result-block">
            <h3>Summary</h3>
            <p>{result.summary}</p>
          </div>

          <div className="result-block">
            <h3>Category</h3>
            <p>{result.category}</p>
          </div>

          <div className="result-block">
            <h3>Priority</h3>
            <p>{result.priority}</p>
          </div>

          <div className="result-block">
            <h3>Troubleshooting Checklist</h3>
            <ul>
              {result.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="result-block">
            <h3>Suggested Technician Note</h3>
            <p>{result.technicianNote}</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;