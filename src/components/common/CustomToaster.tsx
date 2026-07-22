"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import toast, { Toaster } from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "default";

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

export function showToast(message: string, type: ToastType = "default") {
  state = { message, type, key: state.key + 1 };
  emitChange();
}

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
    // Only fire toast when key > 0 (meaning showToast was explicitly called in this session)
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

    // Reset state after triggering so page navigation won't re-trigger it
    state = { message: "", type: "default", key: 0 };
  }, [toastState, duration]);

  return <Toaster position={position} />;
}

export default CustomToaster;