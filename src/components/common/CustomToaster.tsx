import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export type ToastType = "success" | "error" | "loading" | "default";

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
   trigger?: boolean | number | string;
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
    // Re-fires whenever trigger changes (by design), or if the message/type
    // change under the same trigger value.
  }, [trigger, message, type, duration]);

  return (
    <Toaster position={position} />
  )
}

export default CustomToaster