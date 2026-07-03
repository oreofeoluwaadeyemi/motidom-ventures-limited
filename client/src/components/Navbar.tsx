import { Link, useLocation } from "react-router-dom";
const logo = "https://res.cloudinary.com/dsszhrke0/image/upload/v1781872184/Motidom_draft_logo_desktop_ns0uff.png"

function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path: string) =>
    `px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-purple-700 text-white"
        : "text-gray-700 hover:bg-purple-100"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-3">

          <img
            src={logo}
            alt="Motidom Ventures"
            className="h-12 w-auto"
          />

          <div>
            <h1 className="font-bold text-xl text-purple-700">
              Motidom Ventures
            </h1>

            <p className="text-xs text-gray-500">
              Receipt Generator
            </p>
          </div>

        </Link>

        <div className="flex gap-2">

          <Link className={linkStyle("/")} to="/">
            Home
          </Link>

          <Link className={linkStyle("/create")} to="/create">
            Create
          </Link>

          <Link className={linkStyle("/receipts")} to="/receipts">
            History
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;