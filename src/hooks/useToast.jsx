import { toast } from "react-hot-toast";

const useToast = () => {
  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);

  return { error, success };
};

export default useToast;
