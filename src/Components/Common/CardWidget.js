import React from "react";
import CountUp from "react-countup";
import { Card, CardBody } from "reactstrap";

const CardWidget = ({ title, percentage, icon, counter }) => {
  return (
    <Card className="card-animate">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            <p className="fw-medium text-muted mb-0">{title}</p>
            <h2 className="mt-4 ff-secondary fw-semibold">
              <span className="counter-value">
                <CountUp start={0} end={counter} decimals={1} duration={4} />0
              </span>
              k
            </h2>
            <p className="mb-0 text-muted">
              <span className="badge bg-light text-success mb-0">
                <i className="ri-arrow-up-line align-middle"></i> {percentage}
              </span>{" "}
              vs. previous month
            </p>
          </div>
          <div>
            <div className="avatar-sm flex-shrink-0">
              <span className="avatar-title bg-soft-primary rounded-circle fs-2">
                <i className={`${icon} text-primary`}></i>
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardWidget;
