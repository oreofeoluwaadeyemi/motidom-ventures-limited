export interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total?: number;
}

export interface Receipt {
  _id: string;
  receiptNumber: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  createdAt: string;
}