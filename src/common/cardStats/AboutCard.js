import React from "react";
import CountUp from "react-countup";

const AboutCard = ({ name, counter, children }) => {
  return (
    <div>
      <p className="fw-medium text-muted mb-0">{name}</p>
      <h2 className="mt-4 ff-secondary fw-semibold">
        <span className="counter-value" data-target="40">
          <CountUp start={0} end={counter} duration={5} /> Request
        </span>
      </h2>
      {children}
    </div>
  );
};

export default AboutCard;
