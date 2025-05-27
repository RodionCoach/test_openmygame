import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input className={`border rounded px-2 py-1 ${className}`} {...props} />
);

export default Input;
