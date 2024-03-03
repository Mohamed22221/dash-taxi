import React from "react";
import { Button, Spinner } from "reactstrap";

const LoadingButton = ({ title, isLoading }) => {
  return (
    <Button color="primary" className="btn btn-primary" type="submit">
      {isLoading ? (
        <Spinner size="sm" className="me-2">
          {" "}
          تحميل...{" "}
        </Spinner>
      ) : null}
      {title}
    </Button>
  );
};

export default LoadingButton;
