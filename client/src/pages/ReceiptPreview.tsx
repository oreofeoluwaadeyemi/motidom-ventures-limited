import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getReceipt } from "../api/receiptApi";
import type { Receipt } from "../types/receipt";
// @ts-ignore
import html2pdf from "html2pdf.js";

const logo = "https://res.cloudinary.com/dsszhrke0/image/upload/v1781872184/Motidom_draft_logo_desktop_ns0uff.png";

function ReceiptPreview() {
  const formatCurrency = (amount?: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount ?? 0);

  const { id } = useParams();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await getReceipt(id!);
        setReceipt(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Receipt not found.
      </div>
    );
  }

  const downloadPDF = () => {
    if (!receiptRef.current) return;

    const element = receiptRef.current;

    const options = {
      margin: 10,
      filename: `Receipt-${receipt?.receiptNumber}.pdf`,
      image: { type: "jpeg" as const, quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4",
        orientation: "portrait" as const,
      },
    };

    html2pdf().set(options).from(element).save();
  };

  // Plain RGB colors used instead of Tailwind color classes inside the
  // receipt, since Tailwind v4's oklch() colors aren't parseable by html2canvas.
  const colors = {
    purple700: "rgb(126, 34, 206)",
    purple50: "rgb(250, 245, 255)",
    gray50: "rgb(249, 250, 251)",
    gray500: "rgb(107, 114, 128)",
    gray600: "rgb(75, 85, 99)",
    border: "rgb(229, 231, 235)",
    white: "rgb(255, 255, 255)",
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div
          ref={receiptRef}
          className="max-w-3xl mx-auto shadow-xl rounded-xl p-8"
          style={{ backgroundColor: colors.white }}
        >
          <div className="flex flex-col items-center mb-8">
            <img
              src={logo}
              alt="Motidom Ventures"
              className="w-28 mb-3"
              crossOrigin="anonymous"
            />

            <h1
              className="text-3xl font-bold"
              style={{ color: colors.purple700 }}
            >
              Motidom Ventures Limited
            </h1>

            <p style={{ color: colors.gray500 }}>Professional Receipt</p>

            <div
              className="mt-3 text-center text-sm space-y-1"
              style={{ color: colors.gray500 }}
            >
              <p>📍 19 Adesoye Street, Mende, Maryland, Lagos </p>
              <p>📞 +234 805 075 9829</p>
              <p>📧 info@motidomventures.com</p>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-2 mb-8 border rounded-lg p-5"
            style={{ backgroundColor: colors.gray50, borderColor: colors.border }}
          >
            <div>
              <p className="font-semibold">Receipt No</p>
              <p>{receipt.receiptNumber}</p>
            </div>

            <div>
              <p className="font-semibold">Date</p>
              <p>{new Date(receipt.createdAt).toLocaleString("en-NG")}</p>
            </div>

            <div>
              <p className="font-semibold">Payment</p>
              <p>{receipt.paymentMethod}</p>
            </div>

            <div>
                <p className="font-semibold">Customer</p>
              <p>{receipt.customerName}</p>
            </div>

            <div>
              <p className="font-semibold">Phone</p>
              <p>{receipt.customerPhone}</p>
            </div>
          </div>

          <table className="w-full border" style={{ borderColor: colors.border }}>
            <thead style={{ backgroundColor: colors.purple700, color: colors.white }}>
              <tr>
                <th className="p-3">Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {receipt.items.map((item, index) => (
                <tr
                  key={index}
                  className="text-center border-b"
                  style={{ borderColor: colors.border }}
                >
                  <td className="p-3">{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.unitPrice)}</td>
                  <td>{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="mt-8 ml-auto w-72 border rounded-lg p-5 space-y-3"
            style={{ backgroundColor: colors.purple50, borderColor: colors.border }}
          >
            <p>
              <strong>Subtotal:</strong> {formatCurrency(receipt.subtotal)}
            </p>

            <p>
              <strong>Discount:</strong> {formatCurrency(receipt.discount)}
            </p>

            <p className="text-2xl font-bold" style={{ color: colors.purple700 }}>
              Total: {formatCurrency(receipt.total)}
            </p>
          </div>

          <div
            className="border-t mt-10 pt-6 text-center"
            style={{ borderColor: colors.border, color: colors.gray600 }}
          >
            <p className="font-semibold">Thank you for your patronage!</p>
            <p className="text-sm mt-2">Motidom Ventures</p>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={() => window.print()}
              className="flex-1 text-white py-3 rounded-lg"
              style={{ backgroundColor: colors.purple700 }}
            >
              Print
            </button>

            <button
              onClick={downloadPDF}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiptPreview;