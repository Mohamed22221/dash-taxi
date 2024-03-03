import React, { useState } from "react";
//reactstrap
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
} from "reactstrap";
import { useGetAllClientsQuery } from "../../../custom-store/services/clientsApi";
import { useAllZonesQuery } from "../../../custom-store/services/zonesApi";
import { useGetAllRealstatesQuery } from "../../../custom-store/services/realstatesApi";

const DetailsWishRequest = ({
  dataDetails,
  modal,
  toggle,
  setModal,
  setIsReson,
  setModalNotice,
}) => {
  const handelSendNotice = () => {
    setModal(false);
    setIsReson("accept");
    setTimeout(() => {
      setModalNotice(true);
    }, "250");
  };
  const handelRejectNotice = () => {
    setModal(false);
    setIsReson("rejecte");
    setTimeout(() => {
      setModalNotice(true);
    }, "250");
  };
  const { data: dataUser } = useGetAllClientsQuery();
  const { data: dataZones } = useAllZonesQuery();
  const { data: dataRealstatess } = useGetAllRealstatesQuery();
  const { data: dataOffers } = useGetAllRealstatesQuery();
  const returnFilter = (dataFilter, filterId) => {
    const nameUser = dataFilter?.data
      ?.filter((item) => item.id === filterId)
      ?.map((item) => item.name)[0];
    return nameUser === undefined ? "لا يوجد" : nameUser;
  };
console.log(dataDetails , "dataDetails")

  return (  
    <div>
      <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="border-bottom p-3" toggle={toggle}>
          <h4>
            {" "}
            <span className="title-model">طلب تمني</span>
          </h4>
        </ModalHeader>
        <ModalBody>
          <Row className="justify-content-between border-bottom py-2">
            <Col>
              <h5 className="py-1 text-primary fw-bolder">كود الطلب</h5>
              <p className=" text-muted">{dataDetails.id}</p>
            </Col>
            <Col>
              <h5 className="py-1 text-primary fw-bolder">تاريخ الطلب </h5>
              <p className=" text-muted">
                {dataDetails.created_at?.slice(0, 10)}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-between border-bottom py-2">
            <Col>
              <h5 className="py-1 text-primary fw-bolder">تاريخ الانتهاء </h5>
              <p className=" text-muted">
                {dataDetails.expiration_date?.slice(0, 10)}
              </p>
            </Col>
            <Col>
              <h5 className="py-1 text-primary fw-bolder">اسم صاحب الطلب</h5>
              <p className="text-muted m-0 p-0 fw-bolder ">
                {returnFilter(dataUser, dataDetails.user_id)}
              </p>
              <p className="text-muted">
                كود العميل :
                <span className="fw-bolder">{dataDetails.user_id === null  ? "لا يوجد" : dataDetails.user_id }</span>
              </p>
            </Col>
          </Row>
          <Row className="justify-content-between border-bottom py-2">
            <Col>
              <h5 className="py-1 text-primary fw-bolder">المنطقة</h5>
              <p className=" text-muted">
                {" "}
                {returnFilter(dataZones, dataDetails.zone_id)}
              </p>
            </Col>
            <Col>
              <h5 className="py-1 text-primary fw-bolder">نوع العقار</h5>
              <p className=" text-muted">
                {returnFilter(dataRealstatess, dataDetails.realstate_type_id)}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-between border-bottom py-2">
            <Col>
              <h5 className="py-1 text-primary fw-bolder">الغرض</h5>
              <p className=" text-muted">
                {returnFilter(dataOffers, dataDetails.offer_type_id)}
              </p>
            </Col>
            <Col>
              <h5 className="py-1 text-primary fw-bolder">السعر</h5>
              <p className=" text-muted"> {dataDetails.price}د.ك </p>
            </Col>
          </Row>
          <Row className="justify-content-between border-bottom py-2">
            <Col>
              <h5 className="py-1 text-primary fw-bolder">الحالة</h5>
              <p
                className={`${
                  dataDetails.status === "active"
                    ? "text-success m-0 p-0"
                    : dataDetails.status === "expired"
                    ? "text-warning m-0 p-0"
                    : dataDetails.status === "inActive"
                    ? "text-warning m-0 p-0"
                    : "text-danger m-0 p-0"
                }`}
              >
                {dataDetails.status === "active"
                  ? "نشط"
                  : dataDetails.status=== "expired "
                  ? "منتهي"
                  : dataDetails.status === "inActive "
                  ? "غير نشط"
                  : "ملغي"}
              </p>
              {dataDetails.status === "rejected" && (
                <p className="text-muted">
                  سبب الرفض : <span> {dataDetails.reason_rejected}</span>
                </p>
              )}
            </Col>
          </Row>

        </ModalBody>
        {dataDetails.status === "pending" && (
          <ModalFooter className=" justify-content-center">
            <div className="hstack gap-2 d-flex">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handelSendNotice}
              >
                ارسال اشعار بالمطابقة
              </button>
              <button
                type="button"
                className="btn btn-outline-danger px-4"
                onClick={handelRejectNotice}
              >
                رفض
              </button>
            </div>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};

export default DetailsWishRequest;
