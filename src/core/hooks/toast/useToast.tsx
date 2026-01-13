import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  description?: string;
  duration?: number;
};

export const useToaster = () => {
  return {
    toast: {
      success: (title: string, options?: ToastOptions) =>
        sonnerToast.success(title, options),

      error: (title: string, options?: ToastOptions) =>
        sonnerToast.error(title, options),

      info: (title: string, options?: ToastOptions) =>
        sonnerToast.info(title, options),

      warning: (title: string, options?: ToastOptions) =>
        sonnerToast.warning(title, options),

      loading: (title: string) =>
        sonnerToast.loading(title),

      dismiss: (toastId?: string | number) =>
        sonnerToast.dismiss(toastId),
    },
  };
};
