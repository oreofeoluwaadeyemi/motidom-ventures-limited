import Navbar from "../components/Navbar";
import ReceiptForm from "../components/ReceiptForm";

function CreateReceipt() {
  return (
   <>
     <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
      <ReceiptForm />
    </div>
   </>
  );
}

export default CreateReceipt;