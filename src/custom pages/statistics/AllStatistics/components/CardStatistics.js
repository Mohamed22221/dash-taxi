import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import ImgCard from "../../../../common/card/ImgCard";

//Import Icons

import AboutCard from "../../../../common/cardStats/AboutCard";
import PercentageCard from "../../../../common/cardStats/PercentageCard";

const CardStatistics = ({ domyData }) => {
  return (
    <Row className="team-list grid-view-filter">
      {domyData?.map((item, key) => (
        <Col md={4} key={key}>
          <Card className="card-animate overflow-hidden">
            <CardBody className="">
              <div className="d-flex  justify-content-between">
                <AboutCard name={item.name} counter={item.count}></AboutCard>
                {/* <ImgCard image={item.img} name={item.name} /> */}
                {/* <PercentageCard percentage={item.percentage} /> */}
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardStatistics;
