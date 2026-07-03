import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaFileInvoiceDollar, FaHistory } from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />
      
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-12 max-w-3xl w-full text-center">

        <h1 className="text-5xl font-bold text-purple-700">
          Motidom Ventures
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Professional Receipt Generator
        </p>

        <p className="text-gray-500 mt-2">
          Create, manage and print receipts quickly and efficiently.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <Link to="/create">
            <div className="bg-purple-600 hover:bg-purple-700 transition text-white rounded-2xl p-8 cursor-pointer shadow-lg">

              <FaFileInvoiceDollar
                size={45}
                className="mx-auto mb-4"
              />

              <h2 className="text-2xl font-semibold">
                Create Receipt
              </h2>

              <p className="mt-2 text-purple-100">
                Generate a new customer receipt.
              </p>

            </div>
          </Link>

          <Link to="/receipts">
            <div className="bg-white border-2 border-purple-600 hover:bg-purple-100 transition rounded-2xl p-8 cursor-pointer shadow-lg">

              <FaHistory
                size={45}
                className="mx-auto mb-4 text-purple-700"
              />

              <h2 className="text-2xl font-semibold text-purple-700">
                Receipt History
              </h2>

              <p className="mt-2 text-gray-600">
                View and manage all receipts.
              </p>

            </div>
          </Link>

        </div>

      </div>
    </div>
    </>
  );
}

export default Home;