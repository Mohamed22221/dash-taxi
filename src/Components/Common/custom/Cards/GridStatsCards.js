import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
} from "reactstrap";
import TwoButtonCard from "../../../../common/card/TwoButtonCard";
import ImgCard from "../../../../common/card/ImgCard";
//Import Icons
import FeatherIcon from "feather-icons-react";
import CountUp from "react-countup";
const GridEstateProjects = ({
  onClickDelete,
  domyData,
  handleCustomerClick,
}) => {
  const [loadMore, setLoadMore] = useState(10);
  const handelLoadMore = () => {
    if (domyData.length >= 10) {
      setLoadMore(loadMore + 10);
    }
  };

  return (
    <Row className="team-list grid-view-filter">
      {domyData
        ?.map((item, key) => (
          <Col md={3} key={key}>
            <Card className="card-animate">
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="fw-medium text-muted mb-0">{item.name}</p>
                    <h2 className="mt-4 ff-secondary fw-semibold">
                      <span className="counter-value" data-target="40">
                        <CountUp start={0} end={item.count} duration={5} />
                      </span>
                      K
                    </h2>
                    <p className="mb-0 text-muted">
                      <span
                        className={`badge bg-light ${
                          item.percentage >= 10 ? "text-success" : "text-danger"
                        }  mb-0`}
                      >
                        <i
                          className={`ri-arrow-${
                            item.percentage >= 10 ? "up-line" : "down-line"
                          } align-middle`}
                        ></i>{" "}
                        %{item.percentage}
                      </span>{" "}
                    </p>
                  </div>
                  <div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-soft-primary rounded-circle ">
                        <img src={item.img} className="text-primary p-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))
        .slice(0, loadMore)}

      <Col lg={12}>
        <div className="text-center mb-3">
          <Link to="#" className="text-success" onClick={handelLoadMore}>
            {/* <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "} */}
            {domyData.length >= 10 ? "Load More" : ""}
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default GridEstateProjects;
