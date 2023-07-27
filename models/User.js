import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone_no: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

export default mongoose.model("User", UserSchema);
