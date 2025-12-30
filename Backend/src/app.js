import express from "express";
import cors from "cors";
import morgan from "morgan";
import articlesRouter from "./routes/articles.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/articles", articlesRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "BeyondChats API running" });
});

export default app;
