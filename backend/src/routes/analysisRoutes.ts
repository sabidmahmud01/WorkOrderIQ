import { Router } from "express";
import { analyzeWorkOrder } from "../services/analysisService";

const router = Router();



router.get("/health", (req,res) => {
    res.json({
        status: "ok",
        message: "WorkOrderIQ API is healthy",
    });
});

router.post("/analyze", (req,res) => {
    const { workOrderText } = req.body;

    if(!workOrderText || typeof workOrderText !== "string") {
        return res.status(400).json({ 
            error: "workOrderText is required and must be a string"
        });
    }

    const analysis = analyzeWorkOrder(workOrderText);

    res.json(analysis);
});

export default router;