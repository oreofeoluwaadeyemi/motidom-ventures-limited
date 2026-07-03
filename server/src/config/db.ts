import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`✅ MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
// adeolaaadeyemi07_db_user
// AUECfm4K42hjG4jT
// mongodb+srv://adeolaaadeyemi07_db_user:AUECfm4K42hjG4jT@cluster0.rha6rbf.mongodb.net/?appName=Cluster0
// npm install mongodb
// berreladeyemi_db_user
// xdEKL4boYzveNndV