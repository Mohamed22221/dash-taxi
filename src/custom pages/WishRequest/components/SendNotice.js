import React, { useEffect, useState } from "react";
//reactstrap
import {
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
} from "reactstrap";
//upload img
import Requird from "../../../Components/Common/Requird";
import noticeAccept from "../../../assets/images/notice-accept.png";
import noticeReject from "../../../assets/images/notice-reject.png";
import { useAddRejectedWishMutation } from "../../../custom-store/services/wishOffersApi";
import { toast } from "react-toastify";
import { formDataHandler } from "../../../custom-store/helper/formData";
import ErrorMsg from "../../../Components/Common/ErrorMsg";
import ValidationError from "../../../Components/Common/ValidationError";
import LoadingButton from "../../../Components/Common/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const SendNotice = ({
  isReson,
  modalNotice,
  toggleNotice,
  setModalNotice,
  dataDetails,
}) => {
  const [valuesReset, setValuesReset] = useState({});
  const [
    addRejectedWish,
    {
      data: dataAdd,
      isError: isErrorAdd,
      error: errorAdd,
      isLoading: isLoadingAdd,
    },
  ] = useAddRejectedWishMutation();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      reason_rejected: "",
    },
    validationSchema: Yup.object({
      reason_rejected: Yup.string().required("الرجاء كتابه سبب الرفض "),
    }),
    onSubmit: (values, action) => {
      const valuesInbuts = formDataHandler(values);
      
        addRejectedWish({ id: dataDetails?.id, body: valuesInbuts });
        setValuesReset({ action, values });
      
    },
  });

  useEffect(() => {
    if (dataAdd?.status) {
      setModalNotice(false);
    }
    if (dataAdd?.status) {
      toast.success("تم ارسال سبب الرفض");
      valuesReset.action.resetForm({ [valuesReset.values]: "" });
    }
  }, [dataAdd]);
  return (
    <div>
      <Modal id="showModal" isOpen={modalNotice} toggle={toggleNotice} centered>
        <ModalHeader className="border-bottom p-3" toggle={toggleNotice}>
          {isReson === "rejecte" ? (
            <h4>
              {" "}
              رفض <span className="title-model">الطلب </span>
            </h4>
          ) : (
            <h4>
              {" "}
              ارسال <span className="title-model">اشعار </span>
            </h4>
          )}
        </ModalHeader>
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          action="#"
        >
          <ModalBody>
            <div className="p-4 d-flex justify-content-center">
              {isReson === "rejecte" ? (
                <img src={noticeReject} alt="notice" />
              ) : (
                <img src={noticeAccept} alt="notice" />
              )}
            </div>
            {
              (isReson = "rejecte" && (
                <ErrorMsg
                  data={dataAdd}
                  isError={isErrorAdd}
                  errorData={errorAdd}
                />
              ))
            }
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                {isReson === "rejecte" ? "نص رفض الطلب" : "نص الاشعار"}
                <Requird />
              </Label>
              <Input
                name="reason_rejected"
                id="customername-field"
                className="form-control"
                placeholder={
                  isReson === "rejecte"
                    ? "اكتب نص رفض الطلب ..."
                    : "اكتب نص الاشعار ..."
                }
                type="textarea"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.reason_rejected}
                invalid={
                  validation.touched.reason_rejected && validation.errors.reason_rejected
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="reason_rejected" />
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-center">
            <div className="hstack gap-2 ">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setModalNotice(false);
                }}
              >
                {" "}
                حذف{" "}
              </button>
                
              <LoadingButton title="ارسال" isLoading={isLoadingAdd} />

            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default SendNotice;
