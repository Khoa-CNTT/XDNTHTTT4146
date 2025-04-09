import React from "react";
import { motion } from "framer-motion";

const FloorDetail = ({ level, onClose }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 50, opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-xl z-20"
  >
    <h2 className="font-bold text-lg">{level.name}</h2>
    <p className="text-sm text-gray-600">
      Thông tin chi tiết tầng {level.id}...
    </p>
    <button onClick={onClose} className="mt-2 text-blue-500 hover:underline">
      Close
    </button>
  </motion.div>
);

export default FloorDetail;
