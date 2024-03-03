import React, { useState } from "react";
import moment from "moment";
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
import StatusCell from "../../../../common/table/components/StatusCell";

const GridCards = ({
  onClickDelete,
  data,
  onClickEdit,
  defaultIcon,
  defaultCover,
}) => {
  console.log(data, "GridCards");
  const [loadMore, setLoadMore] = useState(10);
  const handelLoadMore = () => {
    if (data?.length >= 10) {
      setLoadMore(loadMore + 10);
    }
  };

  return (
    <Row className="team-list grid-view-filter">
      {data
        ?.map((item, key) => (
          <Col key={key}>
            <Card className="team-box">
              <div className="team-cover">
                <img src={item?.image} alt="" className="img-fluid" />
              </div>
              <CardBody className="p-4">
                <Row className="align-items-center team-row">
                  <Col className="team-settings">
                    <UncontrolledDropdown
                      direction="start"
                      className="col text-end"
                    >
                      <DropdownToggle
                        tag="a"
                        id="dropdownMenuLink2"
                        role="button"
                      >
                        <i className="ri-more-fill fs-17"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          className="dropdown-item edit-list"
                          href="#addmemberModal"
                          onClick={() => onClickEdit(item)}
                        >
                          <i className="ri-pencil-line me-2 align-bottom text-muted"></i>
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          className="dropdown-item remove-list"
                          href="#removeMemberModal"
                          onClick={() => onClickDelete(item)}
                        >
                          <i className="ri-delete-bin-5-line me-2 align-bottom text-muted"></i>
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                  <Col lg={4} className="col">
                    <div className="team-profile-img">
                      {/* <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                        <div className="avatar-title text-uppercase border rounded-circle bg-primary text-primary">
                          <ImgCard
                            image={item?.mainPhoto || defaultIcon}
                            // name={item.cArabicName}
                          />
                        </div>
                      </div> */}
                    </div>
                  </Col>
                  <Col>
                    <div className="team-content mt-5 mb-3 text-center p  fs-16">
                      <h5 className="mt-3"> {item.titleAr}</h5>
                      <p className="text-muted"> {item.titleEn}</p>

                      {/* <h5 className="mt-3"> {item.cEnglishName}</h5> */}
                      <a className="mt-2" href={item?.projectUrl}>
                        {" "}
                        {item?.projectUrl}
                      </a>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-between ">
                      <div className="text-center">
                        <p>{moment(item.createdAt).format("D MMMM YYYY")}</p>
                        <p>create</p>
                      </div>
                      <div className="text-center">
                        <p>{moment(item.updatedAt).format("D MMMM YYYY")}</p>
                        <p>Last update</p>
                      </div>
                    </div>
                  </Col>
                  <TwoButtonCard
                    actionEdit={() => onClickEdit(item)}
                    actionDelete={() => onClickDelete(item)}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))
        .slice(0, loadMore)}

      <Col lg={12}>
        <div className="text-center mb-3">
          <Link to="#" className="text-success" onClick={handelLoadMore}>
            {/* <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "} */}
            {data?.length >= 10 ? "Load More" : ""}
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default GridCards;
