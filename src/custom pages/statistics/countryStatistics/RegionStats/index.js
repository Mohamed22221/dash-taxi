import React, { useState } from "react";
//components
import BreadCrumbs from "../../../../Components/Common/BreadCrumbs";
import {
  dataCapitalApi,
} from "./components/demoEstate";
//libraries
import { Container, Row, Col, Card } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardAnalysis from "./components/CardAnalysis";
import ChartsCardApex from "../../AllStatistics/components/ChartsCardApex";

const RegionStats = () => {
  const [dataCapital , setDataCapital] = useState(dataCapitalApi);

  const titleData = [
    "الاحصائيات",
    "احصائيات الدول",
    "الكويت",
    "احصائيات المناطق",
  ];
  document.title = " احصائيات  |  احصائيات المناطق ";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col lg={12}>
              <div className="card-body pt-0">
                <div className="row">
                  <div className="col-md-12 col-xl-6 mt-3">
                    <CardAnalysis domyData={dataCapital} title="العاصمه" />
                  </div>
                  <div className="col-md-12 col-xl-6 mt-3">
                    <CardAnalysis
                      domyData={dataCapital}
                      title="حولي"
                    />
                  </div>
                </div>
                <ToastContainer closeButton={false} limit={1} />
              </div>
            </Col>
            <Col lg={12}>
              <div className="card-body pt-0">
                <div className="row">
                  <div className="col-md-12 col-xl-6 mt-3">
                    <CardAnalysis domyData={dataCapital} title="الاحمدي" />
                  </div>
                  <div className="col-md-12 col-xl-6 mt-3">
                    <CardAnalysis domyData={dataCapital} title="الفراونه" />
                  </div>
                </div>
                <ToastContainer closeButton={false} limit={1} />
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RegionStats;
