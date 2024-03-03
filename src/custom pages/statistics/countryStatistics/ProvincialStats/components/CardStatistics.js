import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import icon3 from "../../../../../assets/images/demos/office.svg";
import icon4 from "../../../../../assets/images/demos/discount.svg";
import icon5 from "../../../../../assets/images/demos/person.svg";
//Import Icons
import AboutCard from "../../../../../common/cardStats/AboutCard";
import PercentageCard from "../../../../../common/cardStats/PercentageCard";

const CardStatistics = ({ domyData }) => {
  return (
    <Row className="team-list grid-view-filter">
      {domyData?.map((item, key) => (
        <Col md={6} key={key}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between w-100">
                <AboutCard name={item.name} counter={item.count}>
                  <div className="d-flex justify-content-between align-items-center w-100 py-2">
                    <div>
                      <img src={icon3} alt="office" />
                      <span className="mx-1 text-muted fw-bold ">30 %</span>
                    </div>
                    <div>
                      <img src={icon4} alt="office" />
                      <span className="mx-1 text-muted fw-bold ">30 %</span>
                    </div>
                    <div>
                      <img src={icon5} alt="office" />
                      <span className="mx-1 text-muted fw-bold ">30 %</span>
                    </div>
                  </div>
                </AboutCard>
                <div className="h-50">
                  <PercentageCard percentage={item.percentage} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardStatistics;
