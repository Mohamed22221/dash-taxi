import React, { useState } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import bell from "../../assets/images/svg/bell.svg";

//SimpleBar
import SimpleBar from "simplebar-react";
import { useAllNotificationQuery } from "../../custom-store/services/userApi";

const NotificationDropdown = () => {
  //Dropdown Toggle
  const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdown(!isNotificationDropdown);
  };
  //Tab
  const [activeTab, setActiveTab] = useState("3");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const { data: allNotification, isSuccess: successAllNotification } =
    useAllNotificationQuery();
  const { data: unreadNotification } =
    useAllNotificationQuery("?status=unread");

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isNotificationDropdown}
        toggle={toggleNotificationDropdown}
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <i className="bx bx-bell fs-22"></i>
          <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
            {allNotification?.data?.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="dropdown-head bg-primary bg-pattern rounded-top">
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0 fs-16 fw-semibold text-white">
                    {" "}
                    Notifications{" "}
                  </h6>
                </Col>
                <div className="col-auto dropdown-tabs">
                  <span className="badge badge-soft-light fs-13">
                    {" "}
                    {unreadNotification?.data?.length} New
                  </span>
                </div>
              </Row>
            </div>

            <div className="px-2 pt-2">
              <Nav className="nav-tabs dropdown-tabs nav-tabs-custom">
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    All ({allNotification?.data?.length})
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>

          <TabContent activeTab={activeTab}>
            {successAllNotification && allNotification?.data?.length > 0 ? (
              <TabPane tabId="3" className="py-2 ps-2">
                <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                  <div className="text-reset notification-item d-block dropdown-item position-relative">
                    {allNotification?.data?.map((item, index) => {
                      return (
                        <div className="d-flex" key={index}>
                          <div className="flex-1">
                            <Link to="#" className="stretched-link">
                              <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                {item?.user?.name}
                              </h6>
                            </Link>
                            <div className="fs-13 text-muted">
                              <p className="mb-1">{item?.title}</p>
                            </div>
                          </div>
                          <div className="px-2 fs-15">
                            <div className="form-check notification-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="all-notification-check04"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="all-notification-check04"
                              ></label>
                            </div>
                            {/* <input className="form-check-input" type="checkbox" /> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="my-3 text-center">
                    <button
                      type="button"
                      className="btn btn-soft-success waves-effect waves-light"
                    >
                      View All Notifications{" "}
                      <i className="ri-arrow-right-line align-middle"></i>
                    </button>
                  </div>
                </SimpleBar>
              </TabPane>
            ) : (
              <TabPane tabId="3" className="p-4">
                <div className="w-25 w-sm-50 pt-3 mx-auto">
                  <img src={bell} className="img-fluid" alt="user-pic" />
                </div>
                <div className="text-center pb-5 mt-2">
                  <h6 className="fs-18 fw-semibold lh-base">
                    Hey! You have no any notifications{" "}
                  </h6>
                </div>
              </TabPane>
            )}
          </TabContent>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default NotificationDropdown;
