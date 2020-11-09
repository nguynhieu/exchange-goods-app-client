import { toast } from "react-toastify";

export const notify = (setIsNewExchange) => {
  toast.info("Bạn có 1 đề xuất trao đổi mới");
  setIsNewExchange(false);
};

export const notifyAccept = (data) => {
  toast.success(`${data.viewer} đã chấp nhận yêu cầu trao đổi của bạn`);
};

export const notifyErr = (error, setErr) => {
  toast.error(error);
  setErr(null);
};