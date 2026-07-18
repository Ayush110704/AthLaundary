 import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useParams(); // Gets the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
  token,
  newPassword
});

      if (response.data.success) {
        Swal.fire("Success", "Your password has been reset!", "success");
        navigate("/login");
      }
    } catch (error) {
      Swal.fire("Error", "Invalid or expired token.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <motion.form 
        onSubmit={handleReset}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6">Set New Password</h2>
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 pl-10 rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-900 text-white py-3 rounded-lg">
          Reset Password
        </button>
      </motion.form>
    </div>
  );
};

export default ResetPassword;