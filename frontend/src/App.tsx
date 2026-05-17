import { useState } from "react";

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

  function handleAnalyze() {
  if (!workOrderText.trim()) {
    alert("Please enter a work order description first.");
    return;
  }

  const mockResult: AnalysisResult = {
    summary:
      "The reported issue needs technical review and may require first-level troubleshooting.",
    category: "General IT Support",
    priority: "Medium",
    checklist: [
      "Confirm the issue with the user.",
      "Check the affected device or system.",
      "Verify network, power, or account access if relevant.",
      "Document troubleshooting steps.",
      "Escalate if the issue cannot be resolved at first level.",
    ],
    technicianNote:
      "Reviewed the reported issue and began standard troubleshooting. Further action may be required depending on device or system status.",
  };

  setResult(mockResult);
}

  return (
    <main>
      <h1>WorkOrderIQ</h1>
      <p>AI Facilities Ticket Assistant</p>

      <p>
        Paste an AiM-style work order description and generate a structured
        summary, category, priority, checklist, and technician note.
      </p>

      <label htmlFor="work-order">Work Order Description</label>

      <textarea
        id="work-order"
        value={workOrderText}
        onChange={(event) => setWorkOrderText(event.target.value)}
        placeholder="Example: Printer in room 137 is showing offline..."
      />

      <button onClick={handleAnalyze}>Analyze Work Order</button>

      {result && (
        <section>
          <h2>Analysis Result</h2>

          <div>
            <h3>Summary</h3>
            <p>{result.summary}</p>
          </div>

          <div>
            <h3>Category</h3>
            <p>{result.category}</p>
          </div>

          <div>
            <h3>Priority</h3>
            <p>{result.priority}</p>
          </div>

          <div>
            <h3>Troubleshooting Checklist</h3>
            <ul>
              {result.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Suggested Technician Note</h3>
            <p>{result.technicianNote}</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;