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
} from "reactstrap";
//component
import Requird from "../../../Components/Common/Requird";
import { useFormik } from "formik";
import Loader from "../../../Components/Common/Loader";
import { formDataHandler } from "../../../custom-store/helper/formData";
import ValidationError from "../../../Components/Common/ValidationError";
import CkEditor from "../../../Components/CkEditor";

const PolicyModal = ({
  isEdit,
  modal,
  toggle,
  setModal,
  isLoading,
  name,
  onAdd,
  onEdit,
  selected,
}) => {
  console.log(selected, "selected");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      privacypolicyEn: selected?.privacypolicyEn || "",
      privacypolicyAr: selected?.privacypolicyAr || "",
    },
    validationSchema: Yup.object({
      privacypolicyEn: Yup.string().required("privacy policy Arabic"),
      privacypolicyAr: Yup.string().required("privacy policy English"),
    }),
    onSubmit: (body) => {
      if (isEdit) {
        onEdit(body);
      }
      setTimeout(() => {
        formik.resetForm();
      }, 2000);
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [modal]);

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
              Edit <span className="title-model">{name} </span>
            </h4>
          ) : (
            <h4>
              Add <span className="title-model"> {name} </span>
            </h4>
          )}
        </ModalHeader>
        <Form className="tablelist-form" onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Loader loading={isLoading} />

            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Privacy Policy En <Requird />
              </Label>
              <CkEditor
                onChange={({ target }) => {
                  formik.setFieldValue(target.name, target.value);
                }}
                name="privacypolicyEn"
                value={formik.values.privacypolicyEn}
              />
              <ValidationError validation={formik} name="privacypolicyEn" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Privacy Policy Ar <Requird />
              </Label>
              <CkEditor
                onChange={({ target }) => {
                  formik.setFieldValue(target.name, target.value);
                }}
                name="privacypolicyAr"
                value={formik.values.privacypolicyAr}
              />
              <ValidationError validation={formik} name="privacypolicyAr" />
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
                {!!isEdit ? "Save" : "Add"}{" "}
              </button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default PolicyModal;
