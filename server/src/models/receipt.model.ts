import mongoose, { Schema, Document } from "mongoose";

export interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ReceiptDocument extends Document {
  receiptNumber: string;
  customerName: string;
  customerPhone?: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
 vat: number;
  total: number;
  paymentMethod: "Cash" | "Transfer" | "POS";
  status: "Paid" | "Pending";
}

const itemSchema = new Schema<ReceiptItem>(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const receiptSchema = new Schema<ReceiptDocument>(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerPhone: {
      type: String,
      default: "",
    },

    items: {
      type: [itemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    vat: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Transfer", "POS"],
      default: "Cash",
    },

    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ReceiptDocument>("Receipt", receiptSchema);