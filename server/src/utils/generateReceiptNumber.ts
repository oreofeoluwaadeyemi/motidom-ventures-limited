import Receipt from "../models/receipt.model";

const generateReceiptNumber = async (): Promise<string> => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const prefix = `MV-${year}${month}`;

  const latestReceipt = await Receipt.findOne({
    receiptNumber: {
      $regex: `^${prefix}`,
    },
  }).sort({ createdAt: -1 });

  let nextNumber = 1;

  if (latestReceipt) {
    const lastPart = latestReceipt.receiptNumber.split("-")[2];
    nextNumber = Number(lastPart) + 1;
  }

  return `${prefix}-${String(nextNumber).padStart(4, "0")}`;
};

export default generateReceiptNumber;