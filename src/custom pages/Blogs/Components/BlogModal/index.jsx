import React, { useEffect, useState } from "react";
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
import { FilePond, registerPlugin } from "react-filepond";
import { useFormik } from "formik";
import Loader from "../../../../Components/Common/Loader";
import { formDataHandler } from "../../../../custom-store/helper/formData";
import ShowImage from "../../../../Components/Common/custom/showImage";
import CkEditor from "../../../../Components/CkEditor";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
//style
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginImageExifOrientation);

const AddBlog = ({
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
  const [imageBlog, setImageBlog] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      titleAr: isEdit ? selected.titleAr : "",
      titleEn: isEdit ? selected.titleEn : "",
      imageAlTextAr: isEdit ? selected.imageAlTextAr : "",
      imageAlTextEn: isEdit ? selected.imageAlTextEn : "",
      descriptionEn: isEdit ? selected.descriptionEn : "",
      descriptionAr: isEdit ? selected.descriptionAr : "",
    },
    validationSchema: Yup.object({
      titleAr: Yup.string().required("Blog title in Arabic"),
      titleEn: Yup.string().required("Blog title in English"),
      imageAlTextAr: Yup.string().required("Blog Image Alt in Arabic"),
      imageAlTextEn: Yup.string().required("Blog Image Alt in English"),
      descriptionEn: Yup.string().required("Blog Description Alt in English"),
      descriptionAr: Yup.string().required("Blog Description Alt in Arabic"),
    }),
    onSubmit: (values) => {
      let img = imageBlog?.length > 0 ? imageBlog[0].source : null;

      let body = formDataHandler(
        {
          ...values,
          image: img,
        },
        ["userInterface"]
      );

      if (isEdit) {
        onEdit({
          id: selected.blogId,
          body,
        });
      } else {
        onAdd(body);
      }
      setTimeout(() => {
        formik.resetForm();
      }, 2000);
    },
  });

  useEffect(() => {
    setImageBlog(null);
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
            <div>
              <Label htmlFor="id-field1" className="form-label">
                Blog Image <Requird />
              </Label>
              <FilePond
                files={imageBlog}
                onupdatefiles={setImageBlog}
                allowMultiple={false}
                maxFiles={1}
                name="image"
                className="filepond filepond-input-multiple"
                labelIdle='Drog & Drop your files here 
                Or <span class="filepond--label-action">Browse </span>'
                accept="image/png, image/jpeg, image/gif"
              />
              {!imageBlog?.length > 0 && selected?.image && isEdit && (
                <ShowImage isEdit={isEdit} image={selected?.image} />
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Blog tittle AR <Requird />
              </Label>
              <Input
                name="titleAr"
                value={formik.values.titleAr}
                onChange={formik.handleChange}
                className="form-control"
                placeholder=" Blog tittle AR"
                type="text"
                invalid={formik.touched.name && formik.errors.name}
              />
              <ValidationError validation={formik} name="titleAr" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Blog tittle EN
                <Requird />
              </Label>
              <Input
                name="titleEn"
                value={formik.values.titleEn}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="  Blog tittle EN"
                type="text"
                invalid={formik.touched.name && formik.errors.name}
              />
              <ValidationError validation={formik} name="titleEn" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                ALT image text EN <Requird />
              </Label>
              <Input
                name="imageAlTextEn"
                value={formik.values.imageAlTextEn}
                onChange={formik.handleChange}
                className="form-control"
                placeholder=" ALT image text EN"
                type="text"
                invalid={formik.touched.name && formik.errors.name}
              />
              <ValidationError validation={formik} name="imageAlTextEn" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                ALT image text AR
                <Requird />
              </Label>
              <Input
                name="imageAlTextAr"
                value={formik.values.imageAlTextAr}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="ALT image text AR"
                type="text"
                invalid={formik.touched.name && formik.errors.name}
              />
              <ValidationError validation={formik} name="imageAlTextAr" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Description in Arabic <Requird />
              </Label>
              {/* <Input
                name="descriptionAr"
                value={formik.values.descriptionAr}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="description in Arabic"
                type="text"
                invalid={formik.touched.name && formik.errors.name}
              /> */}
              <CkEditor
                name="descriptionAr"
                value={formik.values.descriptionAr}
                onChange={({ target }) =>
                  formik.setFieldValue(target.name, target.value)
                }
              />
              <ValidationError validation={formik} name="descriptionAr" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Description in English <Requird />
              </Label>
              {/* <Input
                name="descriptionEn"
                value={formik.values.descriptionEn}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="description in English"
                type="text"
                invalid={formik.touched.name && formik.errors.name}
              /> */}
              <CkEditor
                value={formik.values.descriptionEn}
                name="descriptionEn"
                onChange={({ target }) =>
                  formik.setFieldValue(target.name, target.value)
                }
              />

              <ValidationError validation={formik} name="descriptionEn" />
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

export default AddBlog;
