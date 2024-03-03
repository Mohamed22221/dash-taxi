import React, { useState } from "react";
//components
import CardStatistics from "./components/CardStatistics";
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import DataEstate from "./components/demoEstate";
//libraries
import { Container, Row, Col, Card} from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChartsCardApex from "./components/ChartsCardApex";

const Overallstats = () => {
  const [dataStateProjects, setDataStateProjects] = useState(DataEstate);

  const titleData = ["الاحصائيات", "الاحصائيات الكليه"];
  document.title = "الاحصائيات |  الاحصائيات الكليه";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-md-12 col-xl-6 mt-3">
                      <CardStatistics domyData={dataStateProjects} />
                    </div>
                    <div className="col-md-12 col-xl-6 mt-3">
                      <ChartsCardApex />
                    </div>
                  </div>
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Overallstats;
