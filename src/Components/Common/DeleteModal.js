import PropTypes from "prop-types";
import React from "react";
import { Button, Modal, ModalBody, Spinner } from "reactstrap";
import Loader from "./Loader";

const DeleteModal = ({ show, onDeleteClick, onCloseClick, isLoading }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: "100px", height: "110px" }}
          >
            {/* <Loader loading={isLoading} /> */}
          </lord-icon>

          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Are You Sure?</h4>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Cancel
          </button>
          {/* <button
            type="button"
            className="btn w-sm btn-primary "
            id="delete-record"
            onClick={onDeleteClick}
            disabled={isLoading}
          >
            نعم
          </button> */}

          <Button
            onClick={onDeleteClick}
            color="primary"
            className="btn w-sm btn-primary"
            type="button"
          >
            Yes
            {isLoading ? (
              <Spinner size="sm" className="mx-2">
                {" "}
                تحميل...{" "}
              </Spinner>
            ) : null}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

export default DeleteModal;
