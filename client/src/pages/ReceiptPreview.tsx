import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getReceipt } from "../api/receiptApi";
import type { Receipt } from "../types/receipt";
import html2pdf from "html2pdf.js";

function ReceiptPreview() {
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

  const formatCurrency = (amount: number | undefined) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount ?? 0);

  const downloadPDF = () => {
    if (!receiptRef.current) return;

    html2pdf()
      .set({
        margin: 10,
        filename: `${receipt?.receiptNumber}.pdf`,
        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(receiptRef.current)
      .save();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Receipt not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-10 px-4">

        <div
          ref={receiptRef}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8"
        >
          {/* Logo */}

          <div className="flex justify-center mb-4">
            <img
              src="https://res.cloudinary.com/dsszhrke0/image/upload/v1781872184/Motidom_draft_logo_desktop_ns0uff.png"
              alt="Motidom Logo"
              className="w-28"
            />
          </div>

          {/* Company */}

          <h1 className="text-3xl font-bold text-center text-purple-700">
            MOTIDOM VENTURES
          </h1>

          <p className="text-center text-gray-600">
            123 Example Street, Lagos, Nigeria
          </p>

          <p className="text-center text-gray-600">
            Phone: +234 801 234 5678
          </p>

          <hr className="my-6" />

          <div className="grid grid-cols-2 gap-4 mb-8">

            <div>
              <h3 className="font-semibold">Receipt No</h3>
              <p>{receipt.receiptNumber}</p>
            </div>

            <div>
              <h3 className="font-semibold">Date</h3>
              <p>
                {new Date(receipt.createdAt as string).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Customer</h3>
              <p>{receipt.customerName}</p>
            </div>

            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>{receipt.customerPhone}</p>
            </div>

            <div>
              <h3 className="font-semibold">Payment Method</h3>
              <p>{receipt.paymentMethod}</p>
            </div>

          </div>

          {/* Items */}

          <table className="w-full border-collapse border">

            <thead className="bg-purple-700 text-white">

              <tr>
                <th className="border p-3">Description</th>
                <th className="border p-3">Qty</th>
                <th className="border p-3">Unit Price</th>
                <th className="border p-3">Total</th>
              </tr>

            </thead>

            <tbody>

              {receipt.items.map((item, index) => (

                <tr key={index}>

                  <td className="border p-3">
                    {item.description}
                  </td>

                  <td className="border text-center">
                    {item.quantity}
                  </td>

                  <td className="border text-center">
                    {formatCurrency(item.unitPrice)}
                  </td>

                  <td className="border text-center">
                    {formatCurrency(item.total)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* Totals */}

          <div className="mt-8 flex justify-end">

            <div className="w-72 space-y-2">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(receipt.subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>{formatCurrency(receipt.discount)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold text-purple-700 border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(receipt.total)}</span>
              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="text-center mt-10">

            <p className="font-semibold text-purple-700">
              Thank you for your patronage!
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Powered by Motidom Ventures
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div className="max-w-4xl mx-auto flex gap-4 mt-6">

          <button
            onClick={() => window.print()}
            className="flex-1 bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800"
          >
            Print Receipt
          </button>

          <button
            onClick={downloadPDF}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Download PDF
          </button>

        </div>

      </div>
    </>
  );
}

export default ReceiptPreview;