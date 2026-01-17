import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import humanizeRoute from "./routes/humanize.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*"  // allow requests from anywhere
}));
app.use(express.json());

app.use("/api", humanizeRoute);

app.get("/health", (req, res) => {
  res.json({ status: "AI Humanizer API running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
