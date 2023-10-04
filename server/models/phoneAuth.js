import mongoose from "mongoose";

const scheme = new mongoose.Schema({
  phone: {
    type: Number,
    require: [true, "Mobile no. required"],
  },
});

export const PhoneAuth = mongoose.Model("User", schema);
 