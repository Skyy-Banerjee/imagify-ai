import mongoose from "mongoose";

//Connecting MongoDB with the server/backend
async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("Database connected✅");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/imagify-ai`);
}

export default connectDB;
