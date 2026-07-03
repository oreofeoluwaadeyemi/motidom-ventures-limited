import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import receiptRoutes from "./routes/receipt.routes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(
  cors({
    origin: "https://motidom-ventures-limited-1.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/receipts", receiptRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Motidom Receipt Generator API is running 🚀",
  });
});

// 👇 This should be the LAST middleware
app.use(errorHandler);

export default app;