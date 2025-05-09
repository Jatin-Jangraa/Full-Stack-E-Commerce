import mongoose from "mongoose";

const orderschima = new mongoose.Schema(
  {
    shippinginfo: {

     

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },

      pincode: {
        type: Number,
        required: true,
      },
    },

    user: {
      type: String,
      ref: "User",
      required: true,
    },

    name:{
      type: String,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      required: true,
    },

    shippingcharges: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,

      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered"],
    },

    orderitems: [
      {
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        productid: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderschima);
