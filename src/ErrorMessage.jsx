
import React from "react";

const ErrorMessage = ({ text, onClose }) => {
  if (!text) return null;

  return (
    <div className="alert alert-error shadow-md flex items-center justify-between px-4 py-2 mb-3 rounded-lg animate-fade-in">
      <span className="text-sm text-white">{text}</span>
      {onClose && (
        <button
          className="btn btn-xs btn-outline border-white text-white hover:bg-white hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
