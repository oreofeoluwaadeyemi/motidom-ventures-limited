import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getReceipt } from "../api/receiptApi";
import type { Receipt } from "../types/receipt";
// @ts-ignore
import html2pdf from "html2pdf.js";

const logo = "https://res.cloudinary.com/dsszhrke0/image/upload/v1781872184/Motidom_draft_logo_desktop_ns0uff.png"

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div 
      ref={receiptRef}
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

       <div className="flex flex-col items-center mb-8">

        <img
          src={logo}
          alt="Motidom Ventures"
          className="w-28 mb-3"
        />

        <h1 className="text-3xl font-bold text-purple-700">
           Motidom Ventures Limited
       </h1>

       <p className="text-gray-500">
          Professional Receipt
       </p>

        <div className="mt-3 text-center text-sm text-gray-500 space-y-1">
            <p>📍 19 Adesoye Street, Mende, Maryland, Lagos </p>
            <p>📞 +234 805 075 9829</p>
            <p>📧 info@motidomventures.com</p>
        </div>
       </div>

        <div className="grid grid-cols-2 gap-2 mb-8 bg-gray-50 border rounded-lg p-5">

          <div>
            <p className="font-semibold">Receipt No</p>
            <p>{receipt.receiptNumber}</p>
          </div>

        <div>
             <p className="font-semibold">Date</p>

            <p>
             {new Date(receipt.createdAt).toLocaleString("en-NG")}
            </p>
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

        <table className="w-full border">

          <thead className="bg-purple-700 text-white">

            <tr>
              <th className="p-3">Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>

          </thead>

          <tbody>

            {receipt.items.map((item, index) => (
              <tr key={index} className="text-center border-b">

                <td className="p-3">
                  {item.description}
                </td>

                <td>{item.quantity}</td>

                <td>{formatCurrency(item.unitPrice)}</td>

                <td>{formatCurrency(item.total)}</td>

              </tr>
            ))}

          </tbody>

        </table>

        <div className="mt-8 ml-auto w-72 border rounded-lg p-5 bg-purple-50 space-y-3">

          <p>
            <strong>Subtotal:</strong> {formatCurrency(receipt.subtotal)}
          </p>

          <p>
            <strong>Discount:</strong> {formatCurrency(receipt.discount)}
          </p>

          <p className="text-2xl font-bold text-purple-700">
            Total: {formatCurrency(receipt.total)}
          </p>

        </div>

        <div className="border-t mt-10 pt-6 text-center text-gray-600">

          <p className="font-semibold">
            Thank you for your patronage!
          </p>

          <p className="text-sm mt-2">
            Motidom Ventures
          </p>

        </div>

        <div className="flex gap-4 mt-10">

            <button
                onClick={() => window.print()}
                className="flex-1 bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800"
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