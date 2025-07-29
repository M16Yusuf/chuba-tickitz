import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded w-full focus:outline-none focus:ring focus:border-blue-500 ${className}`}
    />
  );
};

export default Input;
