import React, { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//reactstrap
import {
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import * as Yup from "yup";

//component
import Requird from "../../../../Components/Common/Requird";
import { useFormik } from "formik";
import { useAllCountriesQuery } from "../../../../custom-store/services/countriesApi";
import { useGetAllPurposesQuery } from "../../../../custom-store/services/purposesApi";
import { useGetAllProjTypeQuery } from "../../../../custom-store/services/projectTypeApi";
import { useAllZonesQuery } from "../../../../custom-store/services/zonesApi";
import ValidationError from "../../../../Components/Common/ValidationError";
import { useGetAllRealstatesQuery } from "../../../../custom-store/services/realstatesApi";
import { useGetAllOffersTypesQuery } from "../../../../custom-store/services/offersTypes";
import Loader from "../../../../Components/Common/Loader";
import { formDataHandler } from "../../../../custom-store/helper/formData";
import LoadingButton from "../../../../Components/Common/LoadingButton";
import { useAllRegionsQuery } from "../../../../custom-store/services/regionsApi";
registerPlugin(FilePondPluginImagePreview);

export const AdsModal = ({
  isEdit,
  modal,
  toggle,
  setModal,
  isLoading,
  onEdit,
  onAdd,
  isSuccess,
  selected,
}) => {
  const { data: countries } = useAllCountriesQuery();
  const { data: zones } = useAllZonesQuery();
  const { data: regions } = useAllRegionsQuery();
  const { data: purposes } = useGetAllPurposesQuery();
  const { data: projectTypes } = useGetAllProjTypeQuery();
  const { data: realstateTypes } = useGetAllRealstatesQuery();
  const { data: offerTypes } = useGetAllOffersTypesQuery();
  const [showProjectType, setShowProjectType] = useState(false);
  const [mainAddImg, setMainAddImg] = useState();
  const [picturesEstate, setPicturesEstate] = useState(null);
  const [files, setFiles] = useState({ image: undefined, images: undefined });
  // const [location, setLocation] = useState({ long: "31.2653", lat: "31.2653" });

  const validationForm = {
    zone_id: Yup.string().trim().required("المنطقة مطلوبة"),
    purpose_id: Yup.string().trim().required("الغرض مطلوبة"),
    realstate_type_id: Yup.string().trim().required("نوع العقار مطلوبة"),
    offer_type_id: Yup.string().trim().required("نوع الاعلان مطلوبة"),
    // project_type_id: Yup.string().trim().required("نوع المشروع مطلوبة"),
    phone: Yup.string().trim().required(" رقم الهاتف مطلوب"),
    // whatsapp_hone: Yup.string().trim().required(" رقم الواتس اب مطلوب"),
    // contacts: Yup.string().trim().required(" رقم حهة الاتصال مطلوب"),
    price: Yup.string().trim().required("السعر مطلوب"),
    description: Yup.string().trim().required("وصف العقار مطلوب"),
    country_id: Yup.string().trim().required("الدولة مطلوبة"),
  };
  const initialValues = {
    country_id: selected?.country_id || "",
    zone_id: selected?.zone_id || "",
    region_id: selected?.region_id || "",
    main_mage: selected?.main_mage?.url || "",
    images: selected?.images || "",
    code: selected?.code || "",
    purpose_id: selected?.purpose_id || "",
    realstate_type_id: selected?.realstate_type_id || "",
    offer_type_id: selected?.offer_type_id || "",
    project_type_id: selected?.project_type_id || "",
    phone: selected?.phone || "",
    whatsapp_hone: selected?.whatsapp_hone || "",
    views: selected?.views || undefined,
    views_building: selected?.views_building || undefined,
    contacts: selected?.contacts || "",
    price: selected?.price || "",
    description: selected?.description || "",
    // long: selected?.long || location.long,
    // lat: selected?.lat || location.lat,
  };

  const imageHandler = (files) => {
    if (files?.length === 1) {
      return files[0].source;
    }
    return files?.map((item) => item.source);
  };

  //reset form after success
  useEffect(() => {
    if (isSuccess || isEdit) {
      setPicturesEstate();
      setMainAddImg();
    }
  }, [isSuccess, isEdit]);

  //handle images change
  useEffect(() => {
    setFiles((perv) => ({ ...perv, images: imageHandler(picturesEstate) }));
  }, [picturesEstate]);

  useEffect(() => {
    setFiles((perv) => {
      formik.setFieldValue("image", imageHandler(mainAddImg));
      return { ...perv, image: imageHandler(mainAddImg) };
    });
  }, [mainAddImg]);

  const formik = useFormik({
    enableReinitialize: isEdit,
    initialValues,
    validationSchema: Yup.object(
      isEdit
        ? validationForm
        : {
            ...validationForm,
            // main_mage: Yup.mixed().required("الصورة مطلوبة"),
          }
    ),

    onSubmit: (values, { resetForm }) => {
      let body = formDataHandler(
        {
          ...values,
          // ...location,
          main_mage: files.image,
          images: files.images,
        },
        ["images"]
      );

      if (isEdit) {
        onEdit({
          id: selected.id,
          body,
        });
        formik.resetForm();
      } else {
        onAdd(body);
        formik.resetForm();
      }
    },
  });

  //watch realstate type
  useEffect(() => {
    const res = realstateTypes?.data.find(
      (item) => +item.id === +formik.values.realstate_type_id
    );
    if (res?.name === "مشروع") setShowProjectType(true);
  }, [formik.values.realstate_type_id]);

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={() => {
        toggle();
        formik.resetForm();
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <ModalHeader
          className="border-bottom p-3"
          toggle={() => {
            toggle();
            formik.resetForm();
          }}
        >
          {!!isEdit ? (
            <h4>
              تعديل <span className="title-model">أعلان </span>
            </h4>
          ) : (
            <h4>
              اضافه <span className="title-model">أعلان </span>
            </h4>
          )}
        </ModalHeader>

        <ModalBody>
          <Loader loading={isLoading} />

          <Row className="justify-content-between mb-3 ">
            <Col className="mb-3">
              <Label htmlFor="image" className="form-label">
                الصورة الرئيسيه للاعلان <Requird />
              </Label>
              <FilePond
                files={mainAddImg || formik.values.main_mage}
                allowImagePreview
                onupdatefiles={setMainAddImg}
                id="main_mage"
                allowMultiple={false}
                maxFiles={1}
                name="main_mage"
                className="filepond filepond-input-multiple"
                labelIdle='Drog & Drop your files here 
                Or <span class="filepond--label-action">Browse </span>'
                accept="image/png, image/jpeg, image/gif"
              />
              {!!formik.errors?.main_mage && (
                <p style={{ color: "#f00" }}>{formik.errors?.main_mage}</p>
              )}
            </Col>
          </Row>
          <Row className="justify-content-between mb-3 ">
            <Col>
              <Label htmlFor="phone" className="form-label">
                رقم الهاتف <Requird />
              </Label>
              <Input
                className="form-control"
                placeholder="اكتب رقم الهاتف ..."
                type="text"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                invalid={formik.touched.phone && formik.errors.phone}
              />
              <ValidationError validation={formik} name="phone" />
            </Col>

            <Col>
              <Label htmlFor="country" className="form-label">
                الدولة <Requird />
              </Label>
              <Input
                name="country_id"
                type="select"
                className="form-select"
                id="country"
                placeholder="اختار الدولة"
                value={formik.values.country_id}
                onChange={formik.handleChange}
                invalid={formik.touched.country_id && formik.errors.country_id}
              >
                {countries?.data?.map((item) => (
                  <React.Fragment key={item.id}>
                    <option hidden>اختار الدوله</option>
                    <option value={item.id}>{item.name}</option>
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={formik} name="country_id" />
            </Col>
          </Row>
          <Row className="justify-content-between mb-3 ">
            <Col>
              <Label htmlFor="zone" className="form-label">
                المحافظة <Requird />
              </Label>
              <Input
                name="zone_id"
                type="select"
                className="form-select"
                id="zone"
                placeholder="اختار المنطقة"
                value={formik.values.zone_id}
                onChange={formik.handleChange}
                invalid={formik.touched.zone_id && formik.errors.zone_id}
              >
                {zones?.data?.map((item) => (
                  <React.Fragment key={item.id}>
                    <option hidden>اختار المحافظة</option>
                    <option value={item.id}>{item.name}</option>
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={formik} name="zone_id" />
            </Col>
            <Col>
              <Label htmlFor="whatsapp_hone" className="form-label">
                المنطقة <Requird />
              </Label>
              <Input
                className="form-control"
                placeholder="اكتب رقم الهاتف ..."
                type="select"
                id="whatsapp_hone"
                name="whatsapp_hone"
                value={formik.values.region_id}
                onChange={formik.handleChange}
                invalid={formik.touched.region_id && formik.errors.region_id}
              >
                {regions?.data?.map((item) => (
                  <React.Fragment key={item.id}>
                    <option hidden>اختار المنطقة</option>
                    <option value={item.id}>{item.name}</option>
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={formik} name="region_id" />
            </Col>
          </Row>
          <Row className="justify-content-between mb-3">
            <Col>
              <Label htmlFor="realstate_type_id" className="form-label">
                نوع العقار <Requird />
              </Label>
              <Input
                name="realstate_type_id"
                type="select"
                className="form-select"
                id="realstate_type_id"
                placeholder="اختار نوع العقار"
                value={formik.values.realstate_type_id}
                onChange={formik.handleChange}
                invalid={
                  formik.touched.realstate_type_id &&
                  formik.errors.realstate_type_id
                }
              >
                {realstateTypes?.data?.map((item) => (
                  <React.Fragment key={item.id}>
                    <option hidden>اختار نوع العقار</option>
                    <option value={item.id}>{item.name}</option>
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={formik} name="realstate_type_id" />
            </Col>
            <Col>
              <Label htmlFor="offer_type_id" className="form-label">
                نوع الاعلان <Requird />
              </Label>
              <Input
                name="offer_type_id"
                type="select"
                className="form-select"
                id="offer_type_id"
                placeholder="اختار نوع الاعلان"
                value={formik.values.offer_type_id}
                onChange={formik.handleChange}
                invalid={
                  formik.touched.offer_type_id && formik.errors.offer_type_id
                }
              >
                {offerTypes?.data?.map((item) => (
                  <React.Fragment key={item.id}>
                    <option hidden>اختار نوع الاعلان</option>
                    <option value={item.id}>{item.name}</option>
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={formik} name="offer_type_id" />
            </Col>
          </Row>
          <Row className="justify-content-between mb-3">
            {showProjectType && (
              <Col>
                <Label htmlFor="project_type_id" className="form-label">
                  نوع المشروع <Requird />
                </Label>
                <Input
                  name="project_type_id"
                  type="select"
                  className="form-select"
                  id="project_type_id"
                  placeholder="اختار نوع المشروع"
                  value={formik.values.project_type_id}
                  onChange={formik.handleChange}
                  invalid={
                    formik.touched.project_type_id &&
                    formik.errors.project_type_id
                  }
                >
                  {projectTypes?.data?.map((item) => (
                    <React.Fragment key={item.id}>
                      <option hidden>اختار نوع المشروع</option>
                      <option value={item.id}>{item.name}</option>
                    </React.Fragment>
                  ))}
                </Input>
                <ValidationError validation={formik} name="project_type_id" />
              </Col>
            )}
            <Col>
              <Label htmlFor="price" className="form-label">
                السعر
              </Label>
              <Input
                name="price"
                type="text"
                className="form-control"
                id="price"
                placeholder="اكتب السعر"
                value={formik.values.price}
                onChange={formik.handleChange}
                invalid={formik.touched.price && formik.errors.price}
              />
              <ValidationError validation={formik} name="price" />
            </Col>
          </Row>
          <Row className="justify-content-between mb-3">
            <Col>
              <Label htmlFor="purpose" className="form-label">
                الغرض <Requird />
              </Label>
              <Input
                name="purpose_id"
                type="select"
                className="form-select"
                id="purpose"
                placeholder="اختار الغرض"
                value={formik.values.purpose_id}
                onChange={formik.handleChange}
                invalid={formik.touched.purpose_id && formik.errors.purpose_id}
              >
                {purposes?.data?.map((item) => (
                  <React.Fragment key={item.id}>
                    <option hidden>اختار الغرض</option>
                    <option value={item.id}>{item.name}</option>
                  </React.Fragment>
                ))}
              </Input>
              <ValidationError validation={formik} name="purpose_id" />
            </Col>
          </Row>
          <Row className="justify-content-between mb-3">
            <Col>
              <Label htmlFor="description" className="form-label">
                تفاصيل الاعلان <Requird />
              </Label>
              <Input
                className="form-control"
                placeholder="اكتب تفاصيل الاعلان ..."
                type="textarea"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                invalid={
                  formik.touched.description && formik.errors.description
                }
              />
              <ValidationError validation={formik} name="description" />
            </Col>
          </Row>
          <Row className="justify-content-between mb-3 ">
            <Col className="mb-3">
              <Label htmlFor="images" className="form-label">
                صور العقار
              </Label>
              <FilePond
                files={picturesEstate || formik.values.images}
                onupdatefiles={setPicturesEstate}
                allowMultiple={true}
                maxFiles={9}
                name="images"
                id="images"
                className="filepond filepond-input-multiple"
                labelIdle='Drog & Drop your files here 
                Or <span class="filepond--label-action">Browse </span>'
                accept="image/png, image/jpeg, image/gif"
              />
              <ValidationError validation={formik} name="images" />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={() => {
                setModal(false);
              }}
            >
              الغاء
            </button>

            <LoadingButton
              title={!!isEdit ? "تعديل" : "إضافة"}
              isLoading={isLoading}
            />
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
