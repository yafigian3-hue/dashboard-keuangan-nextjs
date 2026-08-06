"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

import Toast from "./Toast";

const ToastContext = createContext(null);

const AUTO_DISMISS_MS = 3000;
const EXIT_ANIMATION_MS = 200; 

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  const dismissTimeoutRef = useRef(null);
  const removeTimeoutRef = useRef(null);

 const hideToast = useCallback(() => {
   clearTimeout(dismissTimeoutRef.current);
   setVisible(false);

   removeTimeoutRef.current = setTimeout(() => {
     setToast(null);
   }, EXIT_ANIMATION_MS);
 }, []);

 useEffect(() => {
   return () => {
     clearTimeout(dismissTimeoutRef.current);
     clearTimeout(removeTimeoutRef.current);
   };
 }, []);

 const showToast = useCallback(
   (message, type = "success") => {
     clearTimeout(dismissTimeoutRef.current);
     clearTimeout(removeTimeoutRef.current);

     setToast({ message, type });
     requestAnimationFrame(() => setVisible(true));

     dismissTimeoutRef.current = setTimeout(hideToast, AUTO_DISMISS_MS);
   },
   [hideToast],
 );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={visible}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
