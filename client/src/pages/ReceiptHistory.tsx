import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteReceipt, getReceipts } from "../api/receiptApi";
import type { Receipt } from "../types/receipt";

function ReceiptHistory() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReceipts = async () => {
    try {
      const response = await getReceipts();
      setReceipts(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this receipt?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReceipt(id);
      fetchReceipts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete receipt.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-purple-700">
            Receipt History
          </h1>

          <Link
            to="/create"
            className="bg-purple-700 text-white px-5 py-3 rounded-lg"
          >
            New Receipt
          </Link>

        </div>

        <table className="w-full">

          <thead className="bg-purple-700 text-white">

            <tr>

              <th className="p-3">Receipt</th>

              <th>Customer</th>

              <th>Phone</th>

              <th>Total</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {receipts.map((receipt) => (
              <tr
                key={receipt._id}
                className="border-b text-center"
              >
                <td className="p-4">
                  {receipt.receiptNumber}
                </td>

                <td>{receipt.customerName}</td>

                <td>{receipt.customerPhone}</td>

                <td>₦{receipt.total}</td>

                <td className="space-x-2">

                  <Link
                    to={`/receipt/${receipt._id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>

                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(receipt._id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
    </>
  );
}

export default ReceiptHistory;