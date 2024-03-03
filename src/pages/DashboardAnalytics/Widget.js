import React from "react";
import { Badge, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import CountUp from "react-countup";

//Import Icons
import FeatherIcon from "feather-icons-react";
import Loader from "../../Components/Common/Loader";

const Widget = ({ dataHome }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={3}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">العملاء</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value">
                      <LoadingCounter dataHome={dataHome}>
                        <CountUp
                          start={0}
                          end={dataHome?.data?.clients}
                          duration={4}
                        />
                      </LoadingCounter>
                    </span>
                  </h2>
                  <p className="mb-0 text-muted">
                    <span className="badge bg-light text-success mb-0">
                      <i className="ri-arrow-up-line align-middle"></i> 16.24 %
                    </span>{" "}
                    الشهر السابق
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-primary rounded-circle fs-2">
                      <FeatherIcon icon="users" className="text-primary" />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">المشاريع</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value" data-target="97.66">
                      <LoadingCounter dataHome={dataHome}>
                        <CountUp
                          start={0}
                          end={dataHome?.data?.countries}
                          duration={4}
                        />
                      </LoadingCounter>
                    </span>
                  </h2>
                  <p className="mb-0 text-muted">
                    <span className="badge bg-light text-danger mb-0">
                      <i className="ri-arrow-down-line align-middle"></i> 3.96 %
                    </span>{" "}
                    الشهر السابق
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-primary rounded-circle fs-2">
                      <FeatherIcon icon="activity" className="text-primary" />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">الفريق</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value" data-target="3">
                      <LoadingCounter dataHome={dataHome}>
                        <CountUp
                          start={0}
                          end={dataHome?.data?.offers}
                          duration={4}
                        />
                      </LoadingCounter>
                    </span>
                  </h2>
                  <p className="mb-0 text-muted">
                    <span className="badge bg-light text-danger mb-0">
                      <i className="ri-arrow-down-line align-middle"></i> 0.24 %
                    </span>{" "}
                    الشهر السابق
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-primary rounded-circle fs-2">
                      <FeatherIcon icon="clock" className="text-primary" />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">الخطط</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value" data-target="33.48">
                      <LoadingCounter dataHome={dataHome}>
                        <CountUp
                          start={0}
                          end={dataHome?.data?.plans}
                          duration={4}
                        />
                      </LoadingCounter>
                    </span>
                  </h2>
                  <p className="mb-0 text-muted">
                    <span className="badge bg-light text-success mb-0">
                      <i className="ri-arrow-up-line align-middle"></i> 7.05 %
                    </span>{" "}
                    الشهر السابق
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-primary rounded-circle fs-2">
                      <FeatherIcon
                        icon="external-link"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Widget;

export const LoadingCounter = ({ dataHome, children }) => {
  return (
    <div>
      {dataHome.isSuccess ? (
        children
      ) : (
        <>
          {dataHome.isLoading && (
            <div className="d-flex justify-content-center mx-1 mt-1">
              <Spinner color="primary" size="sm" animation="border">
                {" "}
                تحميل...{" "}
              </Spinner>
            </div>
          )}
          {dataHome.isError && (
            <div className="d-flex justify-content-center">
              <h6 className="mb-0 text-muted">حدث مشكله في تحميل البيانات </h6>
              {/* <span className="badge rounded-pill badge-outline-danger">
                حدث خطاء  
              </span> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};
