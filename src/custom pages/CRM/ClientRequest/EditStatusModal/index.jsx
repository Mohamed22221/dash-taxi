import React from "react";
import * as Yup from "yup";

import {
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import LoadingButton from "../../../../Components/Common/LoadingButton";
import Requird from "../../../../Components/Common/Requird";
import { useFormik } from "formik";

export const EditStatusModal = ({ show, onClose, onConfirm, selected }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: selected.status || "",
    },
    onSubmit: (values) => {
      console.log(values, "xx26");
      onConfirm(values);
    },
  });
  return (
    <Modal
      centered
      isOpen={show}
      toggle={() => {
        onClose();
        // formik.resetForm();
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <h4>
            Edit <span className="title-model">Status</span>
          </h4>
        </ModalHeader>
        <ModalBody>
          <Row className="justify-content-between mb-3">
            <Col>
              <Label htmlFor="purpose" className="form-label">
                Status <Requird />
              </Label>
              <Input
                name="status"
                type="select"
                className="form-select"
                id="purpose"
                placeholder="اختار الغرض"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <React.Fragment>
                  <option value={"new"}>new</option>
                  <option value={"done"}>done</option>
                </React.Fragment>
              </Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-end">
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={() => {
                // setModal(false);
                onClose();
              }}
            >
              Cancel
            </button>

            <LoadingButton title={"save"} isLoading={false} />
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
