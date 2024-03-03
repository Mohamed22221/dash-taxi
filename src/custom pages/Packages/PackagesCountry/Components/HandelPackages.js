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
import Requird from "../../../../Components/Common/Requird";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMsg from "../../../../Components/Common/ErrorMsg";
import ValidationError from "../../../../Components/Common/ValidationError";
import { toast } from "react-toastify";
import LoadingButton from "../../../../Components/Common/LoadingButton";
import {
  formDataHandler,
  formURLSearchParams,
} from "../../../../custom-store/helper/formData";
import {
  useAddPlainMutation,
  useUpdatePlainMutation,
} from "../../../../custom-store/services/planesApi";
import UploadComponent, {
  formatBytes,
} from "../../../../common/Upload/UploadComponent";
import { FilePond } from "react-filepond";
import ShowImage from "../../../../Components/Common/custom/showImage";

const HandelPackages = ({
  isEdit,
  modal,
  toggle,
  setModal,
  dataItem,
  dataPlain,
}) => {
  const [valuesReset, setValuesReset] = useState({});
  const [imgEstateType, setImgEstateType] = useState([]);

  const [
    addPlain,
    {
      data: dataAdd,
      isError: isErrorAdd,
      error: errorAdd,
      isLoading: isLoadingAdd,
    },
  ] = useAddPlainMutation();

  const [
    updatePlain,
    {
      data: dataUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdatePlainMutation();

  //select => type of package
  const typePackage = dataPlain?.data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // select => number of months of the package
  const numberMonth = [
    {
      options: [
        { label: "خلال شهر الاشتراك فقط", value: "1" },
        { label: "2 شهور", value: "2" },
        { label: "3 شهور", value: "3" },
        { label: "4 شهور", value: "4" },
        { label: "5 شهور", value: "5" },
        { label: "6 شهور", value: "6" },
        { label: "7 شهور", value: "7" },
        { label: "8 شهور", value: "8" },
        { label: "9 شهور", value: "9" },
        { label: "10 شهور", value: "10" },
        { label: "11 شهور", value: "11" },
        { label: "12 شهور", value: "12" },
      ],
    },
  ];
  //handel image

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      plan_type_id: isEdit ? dataItem?.plan_type?.id : "",
      offers_number: isEdit ? dataItem?.offers_number : "",
      month_number: isEdit ? dataItem?.month_number : "",
      price: isEdit ? dataItem?.price : "",
      discount: isEdit ? dataItem?.discount : "",
    },
    validationSchema: Yup.object({
      plan_type_id: Yup.string().required("الرجاء اختيار نوع الباقه"),
      month_number: Yup.string().required("الرجاء اختيار شهور الباقه"),
      offers_number: Yup.string().required("الرجاء تحديد عدد اعلانات"),
      price: Yup.string().required("الرجاء تحديد سعر الباقه"),
      discount: Yup.string().required("الرجاء تحديد سعر الخصم"),
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
        updatePlain({ id: dataItem?.id, body: body });
      } else {
        addPlain(body);
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
            <div>
              <Label htmlFor="status-field" className="form-label">
                نوع الباقه<span className="text-danger">*</span>
              </Label>
              <Input
                name="plan_type_id"
                type="select"
                min="0"
                className="form-select"
                id="status-field"
                placeholder="اختار نوع الباقه"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.plan_type_id || ""}
                invalid={
                  validation.touched.plan_type_id &&
                  validation.errors.plan_type_id
                    ? true
                    : false
                }
              >
                {typePackage?.map((item, key) => (
                  <React.Fragment key={key}>
                    <option hidden>اختار نوع الباقه</option>
                    <option value={item.value} key={key}>
                      {item.label}
                    </option>
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={validation} name="plan_type_id" />
            </div>
            <div className="my-3">
              <Label htmlFor="status-field" className="form-label">
                عدد شهور الباقة <Requird />
              </Label>
              <Input
                name="month_number"
                type="select"
                className="form-select"
                id="status-field"
                placeholder="اختار عدد شهور الباقة"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.month_number || ""}
                invalid={
                  validation.touched.month_number &&
                  validation.errors.month_number
                    ? true
                    : false
                }
              >
                {numberMonth.map((item, key) => (
                  <React.Fragment key={key}>
                    <option hidden>اختار عدد شهور الباقه</option>
                    {item.options.map((item, key) => (
                      <option value={item.value} key={key}>
                        {item.label}
                      </option>
                    ))}
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={validation} name="month_number" />
            </div>
            <div className="my-3">
              <Label className="form-label">
                عدد الاعلانات <Requird />
              </Label>
              <Input
                type="number"
                name="offers_number"
                id="exampleNumber"
                placeholder="اكتب عدد الاعلاانات"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.offers_number || ""}
                invalid={
                  validation.touched.offers_number &&
                  validation.errors.offers_number
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="offers_number" />
            </div>
            <div className="my-3">
              <Label className="form-label">
                الخصم <Requird />
              </Label>
              <Input
                type="number"
                name="discount"
                id="exampleNumber"
                placeholder="اكتب نسبه الخصم"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.discount}
                invalid={
                  validation.touched.discount && validation.errors.discount
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="discount" />
            </div>
            <div className="my-3">
              <Label className="form-label">
                السعر <Requird />
              </Label>
              <Input
                type="number"
                name="price"
                id="exampleNumber"
                placeholder="اكتب سعر الباقه"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.price || ""}
                invalid={
                  validation.touched.price && validation.errors.price
                    ? true
                    : false
                }
              />
              <ValidationError validation={validation} name="price" />
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
