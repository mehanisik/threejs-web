import { toast } from "sonner";

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 5000,
    position: "top-center",
  });
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: "top-center",
  });
};
