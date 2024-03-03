import React from "react";
import { Alert, Spinner } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

const Loader = ({ loading, error, empty }) => {
  return (
    <React.Fragment>
      {loading && (
        <div className="d-flex justify-content-center mx-2 mt-2">
          <Spinner color="primary"> تحميل... </Spinner>
        </div>
      )}
      {error && (
        <div className="d-flex justify-content-center mx-2 mt-2">
          <Alert color="danger"> حدث خطاء , الرجاء محاوله مره اخري </Alert>
        </div>
      )}
      {empty && (
        <div className="d-flex justify-content-center mx-2 mt-2">
          <Alert color="primary"> لا يوجد بيانات حتي الان </Alert>
        </div>
      )}
    </React.Fragment>
  );
};

export default Loader;
