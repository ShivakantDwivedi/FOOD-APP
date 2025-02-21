import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "restaurantOwner", "deliveryPerson"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
