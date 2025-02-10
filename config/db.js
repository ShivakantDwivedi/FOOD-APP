import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Database is Connected");
  } catch (error) {
    console.log("Error Occurs", error);
  }
};

export default connectdb;
