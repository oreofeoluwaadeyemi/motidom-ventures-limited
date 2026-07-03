import dotenv from "dotenv";
import dns from "dns";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"])

const PORT = process.env.PORT || 2000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();