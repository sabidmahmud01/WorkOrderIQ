import express from "express";
import cors from "cors";
import { analyzeWorkOrder } from "./services/analysisService";

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

    const analysis = analyzeWorkOrder(workOrderText);

    res.json(analysis);
});

app.listen(3000, () => {
    console.log("Backend server is running on http://localhost:3000");
});