import React, { useState } from "react";
//library
import { Col, Container, Row } from "reactstrap";
//components
import BreadCrumbs from "./../../Components/Common/BreadCrumbs";
import AdSettings from "./AdSettings ";
import SupervisorsSetting from "./SupervisorsSetting";

const MainSetting = () => {
  document.title = "الاعدادات";
  const titleData = ["الاعدادات", " ضبط الاعدادات"];
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col xs={12}>
              <Row className="justify-content-between">
                <AdSettings />
                <SupervisorsSetting />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainSetting;
