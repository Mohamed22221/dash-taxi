import React, { useEffect } from "react";
import * as Yup from "yup";
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
//component
import ValidationError from "../../../Components/Common/ValidationError";

import Requird from "../../../Components/Common/Requird";
import { useFormik } from "formik";
import Loader from "../../../Components/Common/Loader";
const AddNumOfAds = ({
  isEdit,
  modal,
  toggle,
  setModal,
  isLoading,
  name,
  onEdit,
  onAdd,
  selected,
  options,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      offers_number: selected.offers_number,
      offer_type: selected.offer_type,
    },
    validationSchema: Yup.object({
      offers_number: Yup.number().required("عدد الاعلانات المضافة مطلوب "),
      offer_type: Yup.string().required("نوع عدد الاعلانات المضافة مطلوب "),
    }),
    onSubmit: (body) => {
      onAdd({
        id: selected.id,
        body: {
          offers_number: body.offers_number + "",
          offer_type: body.offer_type,
        },
      });
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [modal]);

  console.log(options, "options");
  return (
    <div>
      <Modal
        id="showModal"
        isOpen={modal}
        toggle={() => {
          formik.resetForm();
          setModal(false);
        }}
        centered
      >
        <ModalHeader className="border-bottom p-3" toggle={toggle}>
          {!!isEdit ? (
            <h4>
              تعديل <span className="title-model">{name} </span>
            </h4>
          ) : (
            <h4>
              اضافه <span className="title-model"> {name} </span>
            </h4>
          )}
        </ModalHeader>
        <Form className="tablelist-form" onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Loader loading={isLoading} />

            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                عدد الاعلانات المضافة <Requird />
              </Label>
              <Input
                name="offers_number"
                value={formik.values.offers_number}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="اكتب عدد الاعلانات المضافة ..."
                type="number"
                invalid={
                  formik.touched.offers_number && formik.errors.offers_number
                }
              />
              <ValidationError validation={formik} name="offers_number" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                نوع عدد الاعلانات المضافة <Requird />
              </Label>
              <Input
                onChange={formik.handleChange}
                name="offer_type"
                className="form-control"
                placeholder="اختار   نوع عدد الاعلانات المضافة ..."
                type="text"
                value={formik.values.offer_type}
                invalid={formik.touched.offer_type && formik.errors.offer_type}
              />
              {/* {options?.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Input> */}
              <ValidationError validation={formik} name="offer_type" />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                disabled={isLoading}
                className="btn btn-outline-danger"
                onClick={() => {
                  setModal(false);
                  formik.resetForm();
                }}
              >
                الغاء
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {!!isEdit ? "حفظ" : "إضافة"}
              </button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNumOfAds;
