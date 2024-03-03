import React, { useEffect, useState } from "react";
//library
import { useCallback } from "react";
import { Col, Container, Row } from "reactstrap";
//components
import { ButtonPrimary } from "../../../Components/buttons/buttons";
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import DeleteModal from "../../../Components/Common/DeleteModal";
import CardPackage from "./Components/CardPackage";
import HandelPackages from "./Components/HandelPackages";
import { useAllPlanesQuery, useDeletePlainMutation } from "../../../custom-store/services/planesApi";
import { toast } from "react-toastify";
import { useAllPlanesTypeQuery } from "../../../custom-store/services/planesTypesApi";

const PackagesCountry = () => {
  const [isEditPackages, setIsEditPackages] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [dataItem, setDataItem] = useState({});
  //RTK Planes Types
  const dataPlanesType = useAllPlanesQuery();
  const { data: dataPlain } = useAllPlanesTypeQuery();
  const [deletePlainType, deleteResult] = useDeletePlainMutation();
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
  const titleData = ["الباقات","تفاصيل الباقات"];
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
            dataPlain={dataPlain}
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

              <CardPackage
                data={dataPlanesType}
                dataPlain={dataPlain}
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

export default PackagesCountry;
