import React, { useState, useCallback, useEffect } from "react";
//assets
import projectCover from "../../../assets/images/demos/bg-project.png";
import projectIcon from "../../../assets/images/demos/shop.png";

//libraries
import { Container, Row, Col, Card, Alert } from "reactstrap";
import HeaderFilter from "../../../common/table/HeaderFilter";
//components
import HandelEstatePurposes from "../../Blogs/Components/BlogModal";
import { ButtonPrimary } from "../../../Components/buttons/buttons";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import {
  useAddPurposeMutation,
  useDeletePurposesMutation,
  useGetAllPurposesQuery,
  useUpdatePurposeMutation,
} from "../../../custom-store/services/purposesApi";
import Loader from "../../../Components/Common/Loader";
import { requestHandler } from "../../../custom-store/helper/requestHandler";
import GridCards from "../../../Components/Common/custom/Cards/GridCards";

const EstatePurposes = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState();
  const [searchData, setSearchData] = useState([]);

  //RTQ
  const {
    data: purposes,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllPurposesQuery();
  const [deletePurposes, deletePurposesResults] = useDeletePurposesMutation();
  const [addPurpose, addPurposesResults] = useAddPurposeMutation();
  const [editPurpose, editPurposesResults] = useUpdatePurposeMutation();

  useEffect(() => {
    if (isSuccess) {
      setSearchData(purposes?.data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (deletePurposesResults.isSuccess)
      requestHandler(
        deletePurposesResults.isSuccess,
        `تم حذف الغرض ${selected.name}`,
        undefined,
        () => setDeleteModal(false)
      );
  }, [deletePurposesResults.isSuccess]);

  useEffect(() => {
    if (editPurposesResults.isSuccess)
      requestHandler(
        editPurposesResults.isSuccess,
        `تم تعديل الغرض ${selected.name}`,
        undefined,
        () => setModal(false)
      );
  }, [editPurposesResults.isSuccess]);

  useEffect(() => {
    if (addPurposesResults.isSuccess)
      requestHandler(
        addPurposesResults.isSuccess,
        `تم اضافة غرض `,
        undefined,
        () => setModal(false)
      );
  }, [addPurposesResults.isSuccess]);

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

  const handleDeletePurpose = () => {
    if (isEdit) {
      setDeleteModal(false);
    }
    deletePurposes(selected.id);
  };

  const titleData = ["العقارات", "أغراض العقارات"];
  document.title = "العقارات |  أغراض العقارات";
  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeletePurpose}
          onCloseClick={() => setDeleteModal(false)}
          isLoading={deletePurposesResults.isLoading}
        />
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <div className="card-body pt-0">
                  <div>
                    <HeaderFilter
                      data={purposes?.data}
                      setSearchData={setSearchData}
                    >
                      <div className="d-flex align-items-center">
                        <ButtonPrimary
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                          value="إضافة غرض"
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
                        defaultCover={projectCover}
                        defaultIcon={projectIcon}
                      />
                    ) : (
                      <div className="d-flex justify-content-center mx-2 mt-2">
                        <Alert color="primary">
                          {" "}
                          لا يوجد اغراض عقارات متاحه{" "}
                        </Alert>
                      </div>
                    )}
                  </div>
                  <HandelEstatePurposes
                    isEdit={isEdit}
                    onAdd={addPurpose}
                    onEdit={editPurpose}
                    modal={modal}
                    toggle={toggle}
                    setModal={setModal}
                    isLoading={
                      addPurposesResults.isLoading ||
                      editPurposesResults.isLoading
                    }
                    name="غرض العقار"
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

export default EstatePurposes;
