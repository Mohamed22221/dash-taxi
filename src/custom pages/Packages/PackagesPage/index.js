import React, { useState } from "react";
import { useCallback } from "react";
//library
import { Col, Container, Row } from "reactstrap";
//components
import { ButtonPrimary } from "../../../Components/buttons/buttons";
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import DeleteModal from "../../../Components/Common/DeleteModal";
import CardPackage from "./Components/CardPackage";
import HandelPackages from "./Components/HandelPackages";
import {
  useAllPlanesTypeQuery,
  useDeletePlainTypeMutation,
} from "../../../custom-store/services/planesTypesApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const PackagesPage = () => {
  const [isEditPackages, setIsEditPackages] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [dataItem, setDataItem] = useState({});

  //RTK Planes Types
  const dataPlanesType = useAllPlanesTypeQuery();
  const [deletePlainType, deleteResult] = useDeletePlainTypeMutation();

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);
  useEffect(() => {
    if (deleteResult?.isSuccess) {
      setDeleteCard(false);
      toast.success("تم حذف الباقه");
    }
  }, [deleteResult?.isSuccess]);

  useEffect(() => {
    if (deleteResult?.isError) {
      toast.error(deleteResult?.error?.data?.message);
    }
  }, [deleteResult?.isError]);
  const HandeldeletePlain = () => {
    deletePlainType(itemDelete.id);
  };
  
  document.title = "الباقات";
  const titleData = ["الباقات", "انواع الباقات"];
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <DeleteModal
            show={deleteCard}
            onDeleteClick={HandeldeletePlain}
            onCloseClick={() => setDeleteCard(false)}
            isLoading={deleteResult?.isLoading}
          />
          <HandelPackages
            isEdit={isEditPackages}
            modal={modal}
            toggle={toggle}
            setModal={setModal}
            dataItem={dataItem}
          />
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col xs={12}>
              <div className="d-flex flex-row-reverse ">
                <ButtonPrimary
                  value="إضافة باقه"
                  classIcon="ri-add-line align-bottom me-1"
                  onClick={() => {
                    setIsEditPackages(false);
                    toggle();
                  }}
                />
              </div>
              <Row className="justify-content-center mt-5">
                <Col lg={5}>
                  <div className="text-center mb-4 pb-2">
                    <h4 className="fw-semibold fs-22">
                      اختر الخطة المناسبة لك
                    </h4>
                    <p className="text-muted mb-4 fs-15">
                      تسعير بسيط. لا توجد رسوم خفية. ميزات متقدمة لأعمالك.
                    </p>
                  </div>
                </Col>
              </Row>
              <CardPackage
                data={dataPlanesType}
                setDeleteCard={setDeleteCard}
                setItemDelete={setItemDelete}
                setDataItem={setDataItem}
                setIsEditPackages={setIsEditPackages}
                toggle={toggle}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PackagesPage;
