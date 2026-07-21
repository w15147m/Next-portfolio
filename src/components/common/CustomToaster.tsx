"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import toast, { Toaster } from "react-hot-toast";
import { type ToastType } from "@/lib/types/types";

// ---- module-level store (lives outside React, survives across renders) ----
type ToastState = {
  message: string;
  type: ToastType;
  key: number;
};

let state: ToastState = { message: "", type: "default", key: 0 };
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

// ---- the function you import and call from anywhere ----
export function showToast(message: string, type: ToastType = "default") {
  state = { message, type, key: state.key + 1 };
  emitChange();
}

// ---- the component you mount once per page that needs it ----
interface CustomToasterProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  duration?: number;
}

export function CustomToaster({
  position = "bottom-right",
  duration = 3000,
}: CustomToasterProps) {
  const toastState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    if (!toastState.key || !toastState.message) return;

    const options = {
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
      duration,
    };

    switch (toastState.type) {
      case "success":
        toast.success(toastState.message, options);
        break;
      case "error":
        toast.error(toastState.message, options);
        break;
      case "loading":
        toast.loading(toastState.message, options);
        break;
      default:
        toast(toastState.message, options);
    }
    // fires on every showToast() call, because `key` always changes
  }, [toastState, duration]);

  return <Toaster position={position} />;
}

export default CustomToaster;