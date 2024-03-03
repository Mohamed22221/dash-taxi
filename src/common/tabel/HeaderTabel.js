import React from "react";
import { Row } from "reactstrap";

const HeaderTabel = ({
  title,
  titlebutton,
  viewButton,
  toggle,
  setIsEdit,
}) => {
  return (
    <Row className="g-4 align-items-center">
      <div className="col-sm">
        <div>
          <h5 className="card-title mb-0">{title}</h5>
        </div>
      </div>
      <div className="col-sm-auto">
        <div className="d-flex flex-wrap align-items-start gap-2">
          {viewButton && (
            <button
              type="button"
              className="btn btn-primary add-btn"
              id="create-btn"
              onClick={() => {
                setIsEdit(false);
                toggle();
              }}
            >
              <i className="ri-add-line align-bottom me-1"></i>{" "}
              {viewButton && titlebutton}
            </button>
          )}
        </div>
      </div>
    </Row>
  );
};

export default HeaderTabel;
