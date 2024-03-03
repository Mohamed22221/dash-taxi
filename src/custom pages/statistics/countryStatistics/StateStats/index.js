import React, { useState } from "react";
//components
import BreadCrumbs from "../../../../Components/Common/BreadCrumbs";
import {
  dataAddedProvincesApi,
  dataAdsApi,
  dataClientsApi,
  dataOfficeApi,
  dataRevenuesApi,
} from "./components/demoEstate";
//libraries
import { Container, Row, Col, Card } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardAnalysis from "./components/CardAnalysis";
import ChartsCardApex from "../../AllStatistics/components/ChartsCardApex";

const StateStats = () => {
  const [dataRevenues, setDataRevenues] = useState(dataRevenuesApi);
  const [dataAddedProvinces, setDataAddedProvinces] = useState(
    dataAddedProvincesApi
  );
  const [dataClients, setDataClients] = useState(dataClientsApi);
  const [dataAds, setDataAds] = useState(dataAdsApi);
  const [dataOffice, setDataOffice] = useState(dataOfficeApi);

  const titleData = [
    "الاحصائيات",
    "احصائيات الدول",
    "الكويت",
    "احصائيات الدولة",
  ];
  document.title = " احصائيات  |  احصائيات الدولة ";
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
                    <CardAnalysis domyData={dataRevenues} title="المكاتب" />
                  </div>
                  <div className="col-md-12 col-xl-6 mt-3">
                    <CardAnalysis
                      domyData={dataAddedProvinces}
                      title="المحافظات والمناطق المضافة"
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
                    <CardAnalysis domyData={dataClients} title="العملاء" />
                  </div>
                  <div className="col-md-12 col-xl-6 mt-3">
                    <CardAnalysis domyData={dataAds} title="الاعلانات" />
                  </div>
                </div>
                <ToastContainer closeButton={false} limit={1} />
              </div>
            </Col>
            <Col lg={12}>
              <div className="card-body pt-0">
                <div className="row">
                  <div className="col-md-12 col-xl-6 mt-3">
                    <CardAnalysis domyData={dataOffice} title="المكاتب" />
                  </div>
                  <div className="col-md-12 col-xl-6 mt-3">
                    <ChartsCardApex />
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

export default StateStats;
