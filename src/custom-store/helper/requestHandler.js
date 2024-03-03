import { toast } from "react-toastify";

export const requestHandler = (
  isSuccess,
  successMsg = "تمت العملية بنجاح",
  errorMsg = "حدث خطا حاول مرة اخري",
  successFun = () => {},
  errorFun = () => {}
) => {
  if (isSuccess) {
    toast.success(successMsg);
    successFun();
  } else {
    toast.error(errorMsg);
    errorFun();
  }
};
