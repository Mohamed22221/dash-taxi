import React from "react";
import { FormFeedback } from "reactstrap";

const ValidationError = ({ validation, name }) => {
  return (
    <>
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback className="d-block" type="invalid">
          {validation.errors[name]}
        </FormFeedback>
      ) : null}
    </>
  );
};

export default ValidationError;
