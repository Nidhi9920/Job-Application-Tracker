import React from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ logout }) => {
  return (
    <div className="w-64 bg-blue-700 text-white h-screen p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">Job Tracker</h2>
        <ul className="space-y-3">
          <li className="hover:bg-blue-600 p-2 rounded cursor-pointer flex items-center gap-2">
            <FaHome /> Dashboard
          </li>
        </ul>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
