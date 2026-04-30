import { toast } from "sonner";

type ToastOptions = {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};
export function showSuccessToast(message: string, options?: ToastOptions) {
  toast.success(message, {
    description: options?.description,
    action: options?.action,
  });
}

export function showErrorToast(message: string, options?: ToastOptions) {
  toast.error(message, {
    description: options?.description,
    action: options?.action,
  });
}
