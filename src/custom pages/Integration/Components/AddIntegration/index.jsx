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
import ValidationError from "../../../../Components/Common/ValidationError";
import Requird from "../../../../Components/Common/Requird";
import { useFormik } from "formik";
import Loader from "../../../../Components/Common/Loader";
import { formDataHandler } from "../../../../custom-store/helper/formData";

const AddIntegration = ({
  modal,
  toggle,
  setModal,
  isLoading,
  name,
  onChange,
  selected,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      [selected?.inputName]: selected?.data || "",
    },
    validationSchema: Yup.object({
      [selected?.inputName]: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values, "values");
      // let body = formDataHandler({
      //   ...values,
      // });

      selected.onConfirm(values);

      // setTimeout(() => {
      //   formik.resetForm();
      // }, 2000);
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [modal]);

  console.log(selected, "selected_AddIntegration");
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
          <h4>
            change <span className="title-model"> {name} </span>
          </h4>
        </ModalHeader>
        <Form className="tablelist-form" onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Loader loading={isLoading} />

            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                {selected?.name} <Requird />
              </Label>
              <Input
                name={selected?.inputName}
                value={formik.values[selected?.inputName]}
                onChange={formik.handleChange}
                className="form-control"
                placeholder={selected?.name}
                type="text"
                invalid={formik.touched.inputName && formik.errors.inputName}
              />
              <ValidationError validation={formik} name={selected?.inputName} />
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
                Close
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                change
              </button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};
export default AddIntegration;
