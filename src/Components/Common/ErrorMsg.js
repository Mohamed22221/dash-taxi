import React from "react";
import { Alert } from "reactstrap";

const ErrorMsg = ({ data, isError, errorData }) => {
  return (
    <div>
      <p>
        {/* {data?.status === false && (
          <Alert color="danger"> {data?.message} </Alert>
        )} */}
        {isError === true && (
          <Alert color="danger"> {errorData?.data?.message} </Alert>
        )}
      </p>
    </div>
  );
};

export default ErrorMsg;
