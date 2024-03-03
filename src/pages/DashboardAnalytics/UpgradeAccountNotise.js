import React from "react";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

//import images
import illustarator from "../../assets/images/user-illustarator-2.png";
import { Link } from "react-router-dom";

const UpgradeAccountNotise = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody className="p-0">
              <Alert
                color="primary"
                className="border-0 rounded-0 rounded-top m-0 d-flex align-items-center"
                role="alert"
              >
                <FeatherIcon
                  icon="alert-triangle"
                  className="text-primary me-2 icon-sm"
                />
                <div className="flex-grow-1 text-truncate">مرحبًا بعودتك !</div>
              </Alert>
              <Row className="align-items-end">
                <Col sm={8}>
                  <div className="p-3">
                    <p className="fs-16 lh-base">
                      مرحبًا، مرحبًا بك مرة أخرى في لوحة تحكم easymedia{" "}
                      <i className="mdi mdi-arrow-right"></i>
                    </p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="px-3 py-2">
                    <img src={illustarator} className="img-fluid" alt="" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UpgradeAccountNotise;
