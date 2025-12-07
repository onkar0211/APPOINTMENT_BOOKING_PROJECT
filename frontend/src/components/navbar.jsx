import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-blue-600 text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-xl">Appointment App</Link>

      <div className="flex gap-4">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}
