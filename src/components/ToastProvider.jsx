import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showSuccess(message) {
  toast.success(message);
}

export function showInfo(message) {
  toast.info(message);
}

export function showWarning(message) {
  toast.warn(message);
}

const ToastProvider = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          borderRadius: "12px",
          border: "1px solid var(--primary)",
          backgroundColor: "var(--background)",
          color: "var(--text)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontWeight: "600",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: "1rem",
          minWidth: "300px",
        }}
        bodyClassName="toast-body"
      />

      <style jsx="true">{`
        .toast-body {
          color: var(--text);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1rem;
        }
        .Toastify__progress-bar {
          background: var(--primary) !important;
        }
        .Toastify__toast--success {
          border-color: var(--primary);
          background-color: var(--background);
          color: var(--text);
        }
        .Toastify__toast--info {
          border-color: var(--secondary);
          background-color: var(--background);
          color: var(--text);
        }
        .Toastify__toast--warn {
          border-color: #d43d3d;
          background-color: #fff0f0;
          color: #a22f2f;
        }
        .toast-confirm-buttons {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .toast-confirm-button {
          padding: 6px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: background-color 0.2s ease;
        }
        .toast-confirm-button.yes {
          background-color: #d43d3d;
          color: white;
        }
        .toast-confirm-button.yes:hover {
          background-color: #a32a2a;
        }
        .toast-confirm-button.no {
          background-color: var(--background);
          color: var(--text);
          border: 1px solid var(--secondary);
        }
        .toast-confirm-button.no:hover {
          background-color: var(--secondary);
          color: var(--background);
        }
      `}</style>
    </>
  );
};

export default ToastProvider;
