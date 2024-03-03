import React from "react";
import { Card, CardBody, Col, Row ,CardHeader } from "reactstrap";
import ImgCard from "../../../../../common/card/ImgCard";
//Import Icons
import AboutCard from "../../../../../common/cardStats/AboutCard";
import PercentageCard from "../../../../../common/cardStats/PercentageCard";

const CardAnalysis = ({ domyData ,title }) => {
  return (
    <Card>
      <CardHeader>
        <h4 className="card-title mb-0">{title}</h4>
      </CardHeader>
      <CardBody>
        <Row className="team-list grid-view-filter">
          {domyData?.map((item, key) => (
            <Col md={6} key={key}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <AboutCard name={item.name} counter={item.count}>
                      <PercentageCard percentage={item.percentage} />
                    </AboutCard>
                    <ImgCard image={item.img} name={item.name} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default CardAnalysis;
