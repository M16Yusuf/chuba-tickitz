import React from "react";

const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
