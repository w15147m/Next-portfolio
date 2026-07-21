export type ToastType = "success" | "error" | "loading" | "default";

export type ToastState = {
  message: string;
  type: ToastType;
 key: number;
};
