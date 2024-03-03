import React from "react";

import { Col, Row } from "reactstrap";

const BreadCrumbs = ({ titleData }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center">
            {titleData.map((item, index) => {
              return (
                <h4
                  key={index}
                  className={`breadcrumb-item ${
                    index !== 0 ? "breadcrumb-active" : ""
                  }`}
                >
                  {item}
                </h4>
              );
            })}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumbs;
