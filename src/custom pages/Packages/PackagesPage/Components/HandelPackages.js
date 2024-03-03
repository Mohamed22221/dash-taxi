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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Requird from "../../../../Components/Common/Requird";
import { useFormik } from "formik";
import * as Yup from "yup";

import UploadComponent, {
  formatBytes,
} from "../../../../common/Upload/UploadComponent";
import ErrorMsg from "../../../../Components/Common/ErrorMsg";
import ValidationError from "../../../../Components/Common/ValidationError";
import { toast } from "react-toastify";
import LoadingButton from "../../../../Components/Common/LoadingButton";
import {
  formDataHandler,
  formURLSearchParams,
} from "../../../../custom-store/helper/formData";
import {
  useAddPlainTypeMutation,
  useUpdatePlainTypeMutation,
} from "../../../../custom-store/services/planesTypesApi";
import { FilePond } from "react-filepond";
import ShowImage from "../../../../Components/Common/custom/showImage";

const HandelPackages = ({ isEdit, modal, toggle, setModal, dataItem }) => {
  const [valuesReset, setValuesReset] = useState({});
  const [imgEstateType, setImgEstateType] = useState([]);

  const [
    addPlainType,
    {
      data: dataAdd,
      isError: isErrorAdd,
      error: errorAdd,
      isLoading: isLoadingAdd,
    },
  ] = useAddPlainTypeMutation();

  const [
    updatePlainType,
    {
      data: dataUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdatePlainTypeMutation();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      en_name: isEdit ? dataItem?.en_name : "",
      name: isEdit ? dataItem?.name : "",
      ar_name: isEdit ? dataItem?.ar_name : "",
      description: isEdit ? dataItem?.description : "",
      price: isEdit ? dataItem?.price : "",
      note: isEdit ? dataItem?.note : "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("الرجاء ادخال اسم الباقه"),
      en_name: Yup.string().required("الرجاء ادخال نوع الباقه"),
      ar_name: Yup.string().required(" الرجاء ادخال اسم الباقه"),
      description: Yup.string()
        .min(3, "يجب ان يحتوي علي ثلاث حروف او اكثر")
        .required("الرجاء ادخال تفاصيل الباقه"),
      price: Yup.string().required("الرجاء تحديد سعر الباقه"),
    }),
    onSubmit: (values, action) => {
      let body;
      let img = imgEstateType?.length > 0 ? imgEstateType[0].source : null;
      if (img) {
        body = formDataHandler({ ...values, image: img });
      } else {
        body = { ...values };
      }

      if (isEdit) {
        updatePlainType({ id: dataItem?.id, body: body });
      } else {
        addPlainType(body);
        setValuesReset({ action, values });
      }
    },
  });

  useEffect(() => {
    if (dataAdd?.status || dataUpdate?.status) {
      setModal(false);
      setImgEstateType([]);
    }
    if (isEdit && dataUpdate?.status) {
      toast.success("تم تعديل الباقه");
    } else if (!isEdit && dataAdd?.status) {
      toast.success("تم اضافه نوع باقه جديد");
      valuesReset.action.resetForm({ [valuesReset.values]: "" });
      setImgEstateType([]);
    }
  }, [dataAdd, dataUpdate]);

  return (
    <div>
      <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="border-bottom p-3" toggle={toggle}>
          {!!isEdit ? (
            <h4>
              {" "}
              تعديل <span className="title-model">نوع باقه </span>
            </h4>
          ) : (
            <h4>
              {" "}
              اضافه <span className="title-model">نوع باقات جديد </span>
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
            {isEdit ? (
              <ErrorMsg
                data={dataUpdate}
                isError={isErrorUpdate}
                errorData={errorUpdate}
              />
            ) : (
              <ErrorMsg
                data={dataAdd}
                isError={isErrorAdd}
                errorData={errorAdd}
              />
            )}

            <div>
              <Label htmlFor="id-field1" className="form-label">
                شعار الباقة <Requird />
              </Label>
              <FilePond
                files={imgEstateType}
                onupdatefiles={setImgEstateType}
                allowMultiple={false}
                maxFiles={1}
                name="image"
                className="filepond filepond-input-multiple"
                labelIdle='Drog & Drop your files here 
                Or <span class="filepond--label-action">Browse </span>'
                accept="image/png, image/jpeg, image/gif"
              />
              {!imgEstateType?.length > 0 && dataItem?.image?.url && isEdit && (
                <ShowImage isEdit={isEdit} image={dataItem?.image} />
              )}
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                الاسم <Requird />
              </Label>
              <Input
                name="name"
                id="customername-field"
                className="form-control"
                placeholder="اكتب الاسم..."
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.name}
                invalid={
                  validation.touched.name && validation.errors.name
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="name" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                اسم الباقه بالانجليزي
                <Requird />
              </Label>
              <Input
                name="en_name"
                id="customername-field"
                className="form-control"
                placeholder="اكتب الاسم..."
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.en_name}
                invalid={
                  validation.touched.en_name && validation.errors.en_name
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="en_name" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                اسم الباقه بالعربي
                <Requird />
              </Label>
              <Input
                name="ar_name"
                id="customername-field"
                className="form-control"
                placeholder="اكتب الاسم..."
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.ar_name}
                invalid={
                  validation.touched.ar_name && validation.errors.ar_name
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="ar_name" />
            </div>

            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                سعر الباقه <Requird />
              </Label>
              <Input
                name="price"
                id="customername-field"
                className="form-control"
                placeholder="اكتب سعر الباقه..."
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.price}
                invalid={
                  validation.touched.price && validation.errors.price
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="price" />
            </div>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                عروض هذا النوع <Requird />
              </Label>
              <CKEditor
                editor={ClassicEditor}
                data={validation.values.description}
                onChange={(even, editor) => {
                  validation.setFieldValue("description", editor.getData());
                }}
                config={{
                  toolbar: ["bulletedList", "numberedList"],
                  language: "ar",
                }}
              />
              <p className="validation-error">
                {validation.validateOnBlur && validation.errors.description}
              </p>
            </div>

            <div className="my-3">
              <Label htmlFor="customername-field" className="form-label">
                الملاحظات
              </Label>
              <Input
                type="textarea"
                name="note"
                id="exampleText"
                placeholder="اكتب الملاحظات....."
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.note}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setModal(false);
                }}
              >
                {" "}
                حذف{" "}
              </button>
              <div>
                {!!isEdit ? (
                  <LoadingButton title="تعديل" isLoading={isLoadingUpdate} />
                ) : (
                  <LoadingButton title="اضافه" isLoading={isLoadingAdd} />
                )}
              </div>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default HandelPackages;
