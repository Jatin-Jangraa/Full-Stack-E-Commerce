import mongoose from "mongoose";

const coupanschima = new mongoose.Schema(
  {
    coupan: {
      type: String,
      unique:true,
      required: true,
      
    },

    amount: {
      type: Number,
      required: true,
    },
  },
 {timestamps:true}
);

export const DisCoupan = mongoose.model("DisCoupan", coupanschima);
