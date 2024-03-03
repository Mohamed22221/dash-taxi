import React from "react";
import { Link } from "react-router-dom";

export const IconTabel = ({ HandelAction, cellProps, type, icon, link }) => {
  console.log(cellProps , "adminID")

  return (
    <li className="list-inline-item edit" title={type}>
      <Link
        to={type === "show" ? link : "#"}
        className="text-primary d-inline-block edit-item-btn"
        onClick={() => {
          const RealEstateData = cellProps.row.original;
          {
            HandelAction && HandelAction(RealEstateData);
          }
        }}
      >
        <i className={`${icon} fs-16`}></i>
      </Link>
    </li>
  );
};
