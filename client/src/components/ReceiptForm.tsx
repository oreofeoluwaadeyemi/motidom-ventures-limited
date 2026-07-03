import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReceipt } from "../api/receiptApi";

function ReceiptForm() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([
    {
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const updateItem = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await createReceipt({
        customerName,
        customerPhone,
        paymentMethod,
        discount,
        items,
      });

      navigate(`/receipt/${response.data.data._id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create receipt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-purple-700 mb-8">
        Create Receipt
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label>Customer Name</label>

          <input
            className="w-full border rounded-lg p-3 mt-2"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div>
          <label>Phone Number</label>

          <input
            className="w-full border rounded-lg p-3 mt-2"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>

      </div>

      <div className="mt-6">

        <label>Payment Method</label>

        <select
          className="w-full border rounded-lg p-3 mt-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Cash</option>
          <option>Transfer</option>
          <option>POS</option>
        </select>

      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Items
      </h2>

      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 gap-4 mb-4"
        >
          <input
            placeholder="Description"
            className="border rounded-lg p-3"
            value={item.description}
            onChange={(e) =>
              updateItem(index, "description", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            className="border rounded-lg p-3"
            value={item.quantity}
            onChange={(e) =>
              updateItem(index, "quantity", Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Unit Price"
            className="border rounded-lg p-3"
            value={item.unitPrice}
            onChange={(e) =>
              updateItem(index, "unitPrice", Number(e.target.value))
            }
          />
        </div>
      ))}

      <button
        onClick={addItem}
        className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
      >
        + Add Item
      </button>

      <div className="mt-8">

        <label>Discount</label>

        <input
          type="number"
          className="w-full border rounded-lg p-3 mt-2"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />

      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-10 bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-xl"
      >
        {loading ? "Generating..." : "Generate Receipt"}
      </button>

    </div>
  );
}

export default ReceiptForm;