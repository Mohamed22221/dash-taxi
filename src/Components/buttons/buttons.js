import { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export const ButtonPrimary = ({ onClick, value, classIcon }) => {
  return (
    <button onClick={onClick} className="btn btn-primary fs-6 text">
      <i className={classIcon}></i>
      <span className="ms-2">{value}</span>
    </button>
  );
};

export const DropdownBtn = ({ options, active, setActive }) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        tag="button"
        className="btn btn-primary"
        id="dropdownMenuButton"
      >
        {active.name} <i className="mdi mdi-chevron-down"></i>
      </DropdownToggle>
      <DropdownMenu>
        {options.map((item) => (
          <DropdownItem onClick={() => setActive(item)} key={item.id}>
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
