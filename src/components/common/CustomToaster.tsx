import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type ToastType = "success" | "error" | "loading" | "default";

interface CustomToasterProps {
  message: string;
  type?: ToastType;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  duration?: number;
  trigger?: boolean; // controls when the toast fires
}

function CustomToaster({
  message,
  type = "default",
  position = "bottom-right",
  duration = 3000,
  trigger = true,
}: CustomToasterProps) {

  useEffect(() => {
    if (!trigger || !message) return;

    const options = {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration,
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "loading":
        toast.loading(message, options);
        break;
      default:
        toast(message, options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <Toaster position={position} />
  )
}

export default CustomToaster