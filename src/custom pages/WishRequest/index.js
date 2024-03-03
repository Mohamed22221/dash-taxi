import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
//redux
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishRequestTabel from "./components/WishRequestTabel";
import DetailsWishRequest from "./components/DetailsWishRequest";
import HeaderTabel from "../../common/table/HeaderTabel";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";
import HeaderFilter from "../../common/table/HeaderFilter";
import { ButtonPrimary } from "../../Components/buttons/buttons";
import SendNotice from "./components/SendNotice";
import { useAllWishOffersQuery } from "../../custom-store/services/wishOffersApi";

const WishRequest = () => {
  const [dataDetails, setDataDetails] = useState({});
  const [modal, setModal] = useState(false);
  const [modalNotice, setModalNotice] = useState(false);
  const [isReson, setIsReson] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  //RTK get data
  const wishOffers = useAllWishOffersQuery({ page: currentPage });

  useEffect(() => {
    if (wishOffers.isSuccess) {
      setSearchData(wishOffers?.data?.data);
    }
  }, [wishOffers.isSuccess]);
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const toggleNotice = useCallback(() => {
    if (modalNotice) {
      setModalNotice(false);
    } else {
      setModalNotice(true);
    }
  }, [modalNotice]);

  const showDetailsRequest = (wishData) => {
    setDataDetails(wishData);
    toggle();
  };

  const titleData = ["طلبات التمني"];
  document.title = "طلبات التمني";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <HeaderTabel title="طلبات التمني " viewButton={false} />
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <HeaderFilter
                      data={wishOffers?.data?.data}
                      setSearchData={setSearchData}
                      nameSearch="title"
                    >
                      <ButtonPrimary
                        value="تصفيه بواسطه"
                        classIcon="ri-list-settings-line"
                      />
                    </HeaderFilter>
                    <WishRequestTabel
                      pagination={{
                        total: wishOffers?.data?.meta?.total,
                        itemsPerPage: wishOffers?.data?.meta?.per_page,
                        currentPage,
                        setCurrentPage,
                      }}
                      isCustomerSuccess={wishOffers.isSuccess}
                      customers={searchData}
                      error={wishOffers.isError}
                      loading={wishOffers.isLoading}
                      showDetailsRequest={showDetailsRequest}
                    />
                  </div>
                  <DetailsWishRequest
                    dataDetails={dataDetails}
                    modal={modal}
                    toggle={toggle}
                    setModal={setModal}
                    setIsReson={setIsReson}
                    setModalNotice={setModalNotice}
                  />
                  <SendNotice
                    isReson={isReson}
                    toggleNotice={toggleNotice}
                    modalNotice={modalNotice}
                    dataDetails={dataDetails}
                    setModalNotice={setModalNotice}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WishRequest;
