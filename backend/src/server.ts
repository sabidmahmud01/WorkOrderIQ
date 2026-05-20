import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysisRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", analysisRoutes);

app.get("/", (req,res) => {
    res.send("WorkOrderIQ Backend is running!");
});






app.listen(3000, () => {
    console.log("Backend server is running on http://localhost:3000");
});