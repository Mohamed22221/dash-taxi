import React, { useState, useCallback, useEffect, useMemo } from "react";
import moment from "moment";

//libraries
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//components
import HeaderFilter from "../../common/table/HeaderFilter";
import { ButtonPrimary } from "../../Components/buttons/buttons";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";
import Loader from "../../Components/Common/Loader";
import AddIntegration from "./Components/AddIntegration";

//snap
import Facebook from "../../assets/images/Social/facebook.png";
import WhatsApp from "../../assets/images/Social/whatsapp.png";
import Snapchat from "../../assets/images/Social/snap.png";

import ImgCard from "../../common/card/ImgCard";
import {
  useGetFacebookPixelQuery,
  useGetSnapchatPixelQuery,
  useGetWhatsAppQuery,
  useUpdateFacebookPixelMutation,
  useUpdateSnapchatPixelMutation,
  useUpdateWhatAppMutation,
} from "../../custom-store/services/Custom/integrationApi";
import { toast } from "react-toastify";

export const Integration = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({ data: "fetching" });

  //RTQ
  const { ...facebookResponse } = useGetFacebookPixelQuery();
  const { ...whatsappResponse } = useGetWhatsAppQuery();
  const { ...snapchatResponse } = useGetSnapchatPixelQuery();

  const [onUpdateFacebook, facebookUpdateResult] =
    useUpdateFacebookPixelMutation();
  useEffect(() => {
    if (facebookUpdateResult.isSuccess) {
      toast.success("Facebook pixel updated Successfully");
      setModal(false);
    }
    if (facebookUpdateResult.isError) {
      toast.error("Facebook pixel failed to update");
    }
  }, [
    facebookUpdateResult.isSuccess,
    facebookUpdateResult.isFetching,
    facebookUpdateResult.isError,
  ]);
  const [onUpdateWhats, WhatsUpdateResult] = useUpdateWhatAppMutation();
  useEffect(() => {
    if (WhatsUpdateResult.isSuccess) {
      toast.success("Whats app updated Successfully");
      setModal(false);
    }
    if (WhatsUpdateResult.isError) {
      toast.error("Whats app failed to update");
    }
  }, [
    WhatsUpdateResult.isSuccess,
    WhatsUpdateResult.isFetching,
    WhatsUpdateResult.isError,
  ]);
  const [onUpdateSnap, SnapUpdateResult] = useUpdateSnapchatPixelMutation();
  useEffect(() => {
    if (SnapUpdateResult.isSuccess) {
      toast.success("Snapchat pixel updated Successfully");
      setModal(false);
    }
    if (SnapUpdateResult.isError) {
      toast.error("Snapchat pixel failed to update");
    }
  }, [
    SnapUpdateResult.isSuccess,
    SnapUpdateResult.isFetching,
    SnapUpdateResult.isError,
  ]);

  const Items = [
    {
      name: "whatsapp URL",
      inputName: "url",
      Img: WhatsApp,
      data: whatsappResponse?.data?.url,
      onConfirm: onUpdateWhats,
    },
    {
      onConfirm: onUpdateFacebook,
      name: "Facebook pixel",
      inputName: "facebookpixel",
      Img: Facebook,
      data: facebookResponse?.data?.facebookpixel,
    },
    {
      onConfirm: onUpdateSnap,
      name: "Snapchat pixel",
      inputName: "snapchatpixel",
      Img: Snapchat,
      data: snapchatResponse?.data?.snapchatpixel,
    },
  ];

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const onClickEdit = (item) => {
    setIsEdit(true);
    setSelected(item);
    toggle();
  };

  const titleData = ["Integration"];
  document.title = " Integration";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <div className="card-body pt-0">
                  <div>
                    {/* <HeaderFilter
                      // data={allBlogs?.message}
                      // setSearchData={setSearchData}
                      nameSearch="cArabicName"
                    /> */}

                    <div className="d-flex align-items-center mt-4 flex-wrap justify-content-between gap-3 flex-wrap ">
                      {Items.map((item) => (
                        <Card
                          className="team-box col-12 col-lg"
                          key={item.name}
                        >
                          <CardBody className="p-4">
                            <Row className="align-items-center flex-column team-row">
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
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Col>
                              <Col lg={4} className="col">
                                <div className="d-flex justify-content-center team-profile-img">
                                  <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                    <div className=" avatar-title text-uppercase border rounded-circle bg-primary text-primary">
                                      <ImgCard
                                        image={item?.Img}
                                        alt={item.name}
                                        className="w-100 h-100 object-fit-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col>
                                <div className="team-content mt-5 mb-3 text-center p  fs-16">
                                  <h5 className="mt-3"> {item?.name}</h5>
                                </div>
                              </Col>
                              <Col>
                                <div className="d-flex gap-3 justify-content-between ">
                                  <div className="text-center">
                                    <p>create</p>

                                    <p>
                                      {moment(item.createdAt).format(
                                        "D MMMM YYYY"
                                      )}
                                    </p>
                                  </div>
                                  <div className="text-center">
                                    <p>Last update</p>

                                    <p>
                                      {moment(item.updatedAt).format(
                                        "D MMMM YYYY"
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <ButtonPrimary
                                    onClick={() => {
                                      setSelected(item);
                                      setModal(true);
                                    }}
                                    value={"change"}
                                    classIcon="ri-add-line align-bottom me-1"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <AddIntegration
                    isEdit={isEdit}
                    modal={modal}
                    toggle={toggle}
                    setModal={setModal}
                    name={selected?.name || "integration"}
                    isLoading={
                      facebookResponse.isLoading ||
                      whatsappResponse.isLoading ||
                      snapchatResponse.isLoading
                    }
                    selected={selected}
                  />
                </div>
                <Loader
                  loading={
                    facebookResponse.isLoading ||
                    whatsappResponse.isLoading ||
                    snapchatResponse.isLoading
                  }
                  isError={
                    facebookResponse.isError ||
                    whatsappResponse.isError ||
                    snapchatResponse.isError
                  }
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
