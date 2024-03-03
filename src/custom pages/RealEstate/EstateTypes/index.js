import React, { useState, useCallback, useEffect } from "react";
//Assets
import realstateCover from "../../../assets/images/demos/bg-top-image.png";
import realstateIcon from "../../../assets/images/demos/home.png";

//libraries
import { Container, Row, Col, Card, Alert } from "reactstrap";
import {
  useAddRealstateTypeMutation,
  useDeleteRealstateMutation,
  useGetAllRealstatesQuery,
  useUpdateRealstateMutation,
} from "../../../custom-store/services/realstatesApi";
import { requestHandler } from "../../../custom-store/helper/requestHandler";

//components
import HandelEstateTypes from "../../Blogs/Components/BlogModal";
import HeaderFilter from "../../../common/table/HeaderFilter";
import { ButtonPrimary } from "../../../Components/buttons/buttons";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import Loader from "../../../Components/Common/Loader";
import GridCards from "../../../Components/Common/custom/Cards/GridCards";

const EstateTypes = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [searchData, setSearchData] = useState([]);

  // RTQ
  const {
    data: realstates,
    isSuccess,
    isError,
    isLoading,
  } = useGetAllRealstatesQuery();
  const [deleteRealstate, deleteStateResult] = useDeleteRealstateMutation();
  const [addRealstate, addRealstateResult] = useAddRealstateTypeMutation();
  const [editRealstate, editRealstateResult] = useUpdateRealstateMutation();

  useEffect(() => {
    if (isSuccess) {
      setSearchData(realstates?.data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (deleteStateResult.isSuccess)
      requestHandler(
        deleteStateResult.isSuccess,
        `تم حذف  نوع عقار ${selected.name}`,
        undefined,
        () => setDeleteModal(false)
      );
  }, [deleteStateResult.isSuccess]);

  useEffect(() => {
    if (editRealstateResult.isSuccess)
      requestHandler(
        editRealstateResult.isSuccess,
        `تم تعديل  نوع عقار ${selected.name}`,
        undefined,
        () => setModal(false)
      );
  }, [editRealstateResult.isSuccess]);

  useEffect(() => {
    if (addRealstateResult.isSuccess)
      requestHandler(
        addRealstateResult.isSuccess,
        `تم اضافة نوع عقار `,
        undefined,
        () => setModal(false)
      );
  }, [addRealstateResult.isSuccess]);

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

  // Delete Data
  const onClickDelete = (item) => {
    setIsEdit(isEdit);
    setDeleteModal(true);
    setSelected(item);
  };

  const handleDeleteEstate = () => {
    if (isEdit) {
      setDeleteModal(false);
    }
    deleteRealstate(selected.id);
  };

  const titleData = ["العقارات", "أنواع العقارات"];
  document.title = "العقارات | انواع العقارات";
  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          isLoading={deleteStateResult.isLoading}
          show={deleteModal}
          onDeleteClick={handleDeleteEstate}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <div className="card-body pt-0">
                  <div>
                    <HeaderFilter
                      data={realstates?.data}
                      setSearchData={setSearchData}
                    >
                      <div className="d-flex align-items-center">
                        <ButtonPrimary
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                          value="إضافة نوع عقار"
                          classIcon="ri-add-line align-bottom me-1"
                        />
                      </div>
                    </HeaderFilter>
                    {searchData?.length > 0 && isSuccess ? (
                      <GridCards
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEdit}
                        data={searchData}
                        isEdit={isEdit}
                        defaultIcon={realstateIcon}
                        defaultCover={realstateCover}
                      />
                    ) : (
                      <div className="d-flex justify-content-center mx-2 mt-2">
                        <Alert color="primary">
                          {" "}
                          لا يوجد انواع عقارات متاحه{" "}
                        </Alert>
                      </div>
                    )}
                  </div>
                  <HandelEstateTypes
                    isEdit={isEdit}
                    modal={modal}
                    toggle={toggle}
                    setModal={setModal}
                    name="نوع العقار"
                    onAdd={addRealstate}
                    onEdit={editRealstate}
                    isLoading={
                      addRealstateResult.isLoading ||
                      editRealstateResult.isLoading
                    }
                    selected={selected}
                  />
                </div>
                <Loader loading={isLoading} isError={isError} />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EstateTypes;
