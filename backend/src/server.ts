import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("WorkOrderIQ Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "WorkOrderIQ API is healthy",
  });
});

app.post("/api/analyze", (req,res) => {
    const { workOrderText } = req.body;

    if(!workOrderText || typeof workOrderText !== "string") {
        return res.status(400).json({ 
            error: "workOrderText is required and must be a string"
        });
    }

    res.json({
        summary: "The reported issue needs technical review and may require first-level troubleshooting.",
        category: "General IT Support",
        priority: "Medium",
        checklist: [
            "Confirm the issue with the user.",
            "Check the affected device or system.",
            "Verify network, power, or account access if relevant.",
            "Document troubleshooting steps.",
            "Escalate if the issue cannot be resolved at first level."
        ],
        technicianNote: "Reviewed the reported issue and began standard troubleshooting. Further action may be required depending on device or system status."
    });
});

app.listen(3000, () => {
    console.log("Backend server is running on http://localhost:3000");
});