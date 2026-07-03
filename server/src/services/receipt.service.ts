import Receipt from "../models/receipt.model";
import generateReceiptNumber from "../utils/generateReceiptNumber";
import AppError from "../utils/AppError";

interface ReceiptItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface CreateReceiptInput {
  customerName: string;
  customerPhone?: string;
  paymentMethod: "Cash" | "Transfer" | "POS";
  items: ReceiptItemInput[];
  discount?: number;
}

export const createReceipt = async (
  data: CreateReceiptInput
) => {
  const receiptNumber = await generateReceiptNumber();

  const items = data.items.map((item) => ({
    ...item,
    total: item.quantity * item.unitPrice,
  }));

  const subtotal = items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const discount = data.discount ?? 0;

  // Set VAT to 0 for now.
  // We'll make this configurable later.
  const vat = 0;

  const total = subtotal - discount + vat;

  const receipt = await Receipt.create({
    receiptNumber,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    paymentMethod: data.paymentMethod,
    items,
    subtotal,
    discount,
    vat,
    total,
  });

  return receipt;
};

export const getAllReceipts = async () => {
  const receipts = await Receipt.find().sort({ createdAt: -1 });

  return receipts;
};

export const getReceiptById = async (id: string) => {
  const receipt = await Receipt.findById(id);

  if (!receipt) {
    throw new AppError("Receipt not found", 404);
  }

  return receipt;
};

export const updateReceipt = async (id: string, data: any) => {
  const receipt = await Receipt.findById(id);

  if (!receipt) {
    throw new AppError("Receipt not found", 404);
  }

  receipt.customerName = data.customerName;
  receipt.customerPhone = data.customerPhone;
  receipt.paymentMethod = data.paymentMethod;
  receipt.discount = data.discount ?? 0;

  const items = data.items.map((item: any) => ({
    ...item,
    total: item.quantity * item.unitPrice,
  }));

  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.total,
    0
  );

  const vat = 0;
  const total = subtotal - receipt.discount + vat;

  receipt.items = items;
  receipt.subtotal = subtotal;
  receipt.vat = vat;
  receipt.total = total;

  await receipt.save();

  return receipt;
};

export const deleteReceipt = async (id: string) => {
  const receipt = await Receipt.findById(id);

  if (!receipt) {
    throw new AppError("Receipt not found", 404);
  }

  await Receipt.findByIdAndDelete(id);

  return receipt;
};