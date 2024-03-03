import React from "react";

const PercentageCard = ({ percentage }) => {
  return (
    <p className={`mb-0  text-muted fs-1`}>
      <span
        className={`badge d-flex align-items-center rounded-circle bg-light ${
          percentage >= 10 ? "text-success" : "text-danger"
        }  mb-0`}
        style={{ width: "7.1rem", height: "7.1rem" }}
      >
        <i
          className={`ri-arrow-${
            percentage >= 10 ? "up-line" : "down-line"
          } align-middle`}
        ></i>{" "}
        %{percentage}
      </span>{" "}
    </p>
  );
};

export default PercentageCard;
