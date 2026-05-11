import React from "react";

export default function BackButton({ onClick }) {
  return (
    <button
      type="button"
      className="back-icon-btn"
      onClick={onClick}
      aria-label="Back"
      title="Back"
    >
      ←
    </button>
  );
}