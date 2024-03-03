import { Form, Input, Label } from "reactstrap";
import ValidationError from "../../../Components/Common/ValidationError";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formDataHandler } from "../../../custom-store/helper/formData";

const Inputs = [
  {
    name: "facebook",
    placeholder: "www.facebook.com",
  },
  {
    name: "instagram",
    placeholder: "www.instagram.com",
  },
  {
    name: "twitter",
    placeholder: "www.twitter.com",
  },
  {
    name: "youtube",
    placeholder: "www.youtube.com",
  },
  {
    name: "linkedin",
    placeholder: "www.linkedin.com",
  },
  {
    name: "bechance",
    placeholder: "www.bechance.com",
  },
];

export const GeneralForm = ({ selected, onConfirm, isLoading }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facebook: selected?.facebook || "",
      instagram: selected?.instagram || "",
      twitter: selected?.twitter || "",
      youtube: selected?.youtube || "",
      linkedin: selected?.linkedin || "",
      bechance: selected?.behance || "",
    },
    validationSchema: Yup.object({
      facebook: Yup.string("Must be String"),
      instagram: Yup.string("Must be String"),
      twitter: Yup.string("Must be String"),
      youtube: Yup.string("Must be String"),
      linkedin: Yup.string("Must be String"),
      bechance: Yup.string("Must be String"),
    }),
    onSubmit: (values) => {
      // const body = formDataHandler({ ...values });
      onConfirm(values);
    },
  });
  return (
    <Form>
      <div className="d-flex flex-wrap overflow-hidden  justify-content-between">
        {Inputs.map((item) => (
          <div key={item.name} className="col-12 col-md-6">
            <div className="p-3 w-100">
              <Label htmlFor="customername-field" className="form-label">
                {item.name}
              </Label>
              <Input
                name={item.name}
                value={formik.values[item.name]}
                onChange={formik.handleChange}
                className="form-control"
                placeholder={item.placeholder}
                type="text"
                invalid={formik.touched.name && formik.errors.name}
              />
              <ValidationError validation={formik} name={item.name} />
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end mt-5">
        <button
          type="button"
          disabled={isLoading}
          className="btn btn-primary"
          onClick={() => {
            formik.submitForm();
          }}
        >
          Save
        </button>
      </div>
    </Form>
  );
};
