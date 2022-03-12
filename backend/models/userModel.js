import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    gender: { type: String, enum: ["male", "female"] },
    executableChromePath: String,
    chromeDataPath: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // only run this function if password was actually. modified
  if (!this.isModified("password")) return next();

  // hash the password with const of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
