import { toast } from "react-toastify";
import axios from "axios";

export const baseURL = "http://mshns.easymedia.cloud/api/admin/dashboard";
// export const imageURL = ""

const client = axios.create({ baseURL });

export const request = ({ ...options }) => {
  let contentType = "application/json";

  if (options.formData) {
    contentType = "multipart/form-data";
  }

  client.defaults.headers.common.Accept = contentType;
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "realstate-jwt"
  )}`;

  const onSuccess = (response) => {
    console.log("<<Success>>", response.data.data);
    toast.success(options.successMSG || "تمت العملية بنجاح");
    return response.data.data;
  };
  const onError = (err) => {
    console.log("<<Error>>", err);
    toast.error(options.errorMSG || err.message || "حدث خطا حاول مرة اخري");
    return err;
  };

  return client(options).then(onSuccess).catch(onError);
};

export const requestHeaders = (formData = false) => {
  return {
    accept: "application/json",
    "content-type": formData ? "multipart/form-data" : "application/json",
    Authorization: `Bearer ${localStorage.getItem("user")}`,
  };
};
