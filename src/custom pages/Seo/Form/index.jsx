import { Form, Input, Label } from "reactstrap";
import ValidationError from "../../../Components/Common/ValidationError";
import { useFormik } from "formik";
import * as Yup from "yup";

const Inputs = [
  {
    label: "website tittle en  ",
    name: "titleEn",
    placeholder: "website tittle en  ",
  },
  {
    label: "website tittle ar  ",
    name: "titleAr",
    placeholder: "website tittle ar  ",
  },
  {
    label: "website Description en ",
    name: "descriptionEn",
    placeholder: "website Description en ",
    type: "textarea",
  },
  {
    label: "website Description ar ",
    name: "descriptionAr",
    placeholder: "website Description ar ",
    type: "textarea",
  },
];

export const SeoForm = ({ selected, onConfirm, loading }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      titleEn: selected?.titleEn || "",
      titleAr: selected?.titleAr || "",
      descriptionEn: selected?.descriptionEn || "",
      descriptionAr: selected?.descriptionAr || "",
    },
    validationSchema: Yup.object({
      titleAr: Yup.string("Must be String"),
      titleEn: Yup.string("Must be String"),
      descriptionEn: Yup.string("Must be String"),
      descriptionAr: Yup.string("Must be String"),
    }),
    onSubmit: (values) => {
      onConfirm(values);
    },
  });
  return (
    <Form>
      <div className="d-flex flex-wrap overflow-hidden  justify-content-between">
        {Inputs.map((item) => (
          <div key={item.name} className="col-12 ">
            <div className="p-3 w-100">
              <Label htmlFor="customername-field" className="form-label">
                {item.label}
              </Label>
              <Input
                name={item.name}
                value={formik.values[item.name]}
                onChange={formik.handleChange}
                className="form-control"
                placeholder={item.placeholder}
                type={item?.type || "text"}
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
          disabled={loading}
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
