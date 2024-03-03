import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
} from "reactstrap";
import Loader from "../../../Components/Common/Loader";
import { useFormik } from "formik";

import * as Yup from "yup";
import ValidationError from "../../../Components/Common/ValidationError";
import Requird from "../../../Components/Common/Requird";

export const EditClientModal = ({
  selected,
  isOpen,
  toggle,
  onEdit,
  isLoading,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selected.name,
      phone: selected.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("اسم العميل مطلوب"),
      phone: Yup.string().required("رقم العميل مطلوب"),
    }),
    onSubmit: (values) => {
      onEdit({ id: selected.id, body: values });
    },
  });
  return (
    <Modal centered isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="border-bottom p-3">
        تعديل العميل <span className="title-model">{" " + selected.name} </span>
      </ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Loader loading={isLoading} />
          <div className="mb-3">
            <Label htmlFor="customername-field" className="form-label">
              اسم العميل <Requird />
            </Label>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="اكتب الاسم..."
              type="text"
              invalid={formik.touched.name && formik.errors.name}
            />
            <ValidationError validation={formik} name="name" />
          </div>
          <div className="mb-3">
            <Label htmlFor="customername-field" className="form-label">
              رقم هاتف العميل <Requird />
            </Label>
            <Input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="اكتب رقم العميل..."
              type="text"
              invalid={formik.touched.name && formik.errors.name}
            />
            <ValidationError validation={formik} name="phone" />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              disabled={isLoading}
              className="btn btn-outline-danger"
              onClick={() => {
                // setModal(false);
                toggle();
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
              تعديل
            </button>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
