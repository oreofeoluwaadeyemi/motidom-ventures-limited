import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateReceipt from "./pages/CreateReceipt";
import ReceiptHistory from "./pages/ReceiptHistory";
import ReceiptPreview from "./pages/ReceiptPreview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateReceipt />} />
      <Route path="/receipts" element={<ReceiptHistory />} />
      <Route path="/receipt/:id" element={<ReceiptPreview />} />
    </Routes>
  );
}

export default App;