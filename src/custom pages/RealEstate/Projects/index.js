import React, { useState, useCallback, useEffect } from "react";
//assets
import projectCover from "../../../assets/images/demos/bg-project.png";
import projectIcon from "../../../assets/images/demos/shop.png";

//libraries
import { Container, Row, Col, Card, Alert } from "reactstrap";

//components
import HandelEstateProjects from "../../Blogs/Components/BlogModal";
import HeaderFilter from "../../../common/table/HeaderFilter";
import { ButtonPrimary } from "../../../Components/buttons/buttons";
import DeleteModal from "../../../Components/Common/DeleteModal";
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import Loader from "../../../Components/Common/Loader";

//RTQ

import { requestHandler } from "../../../custom-store/helper/requestHandler";
import GridCards from "../../../Components/Common/custom/Cards/GridCards";
import {
  useAddProjectMutation,
  useAllProjectsQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../../../custom-store/services/projectsApi";

const EstateProjects = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState();
  const [searchData, setSearchData] = useState([]);

  //RTQ
  const {
    data: projects,
    isError,
    isSuccess,
    isLoading,
    isFetching,
  } = useAllProjectsQuery();
  console.log(projects);
  const [deleteProject, deleteProjectResult] = useDeleteProjectMutation();
  const [addProject, addProjectResult] = useAddProjectMutation();
  const [editProject, editProjectResult] = useUpdateProjectMutation();

  useEffect(() => {
    if (isSuccess || isFetching) {
      setSearchData(projects?.message);
    }
  }, [isSuccess, isFetching]);

  useEffect(() => {
    if (deleteProjectResult.isSuccess)
      requestHandler(
        deleteProjectResult.isSuccess,
        `تم حذف المشروع ${selected.cArabicName}`,
        undefined,
        () => setDeleteModal(false)
      );
  }, [deleteProjectResult.isSuccess]);

  useEffect(() => {
    if (editProjectResult.isSuccess)
      requestHandler(
        editProjectResult.isSuccess,
        `تم تعديل المشروع ${selected.cArabicName}`,
        undefined,
        () => setModal(false)
      );
  }, [editProjectResult.isSuccess]);

  useEffect(() => {
    if (addProjectResult.isSuccess)
      requestHandler(
        addProjectResult.isSuccess,
        `تم اضافة غرض `,
        undefined,
        () => setModal(false)
      );
  }, [addProjectResult.isSuccess]);
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

  const handleDeleteProject = () => {
    if (isEdit) {
      setDeleteModal(false);
    }
    deleteProject(selected?.workId);
  };

  const titleData = ["blogs"];
  document.title = " blogs";
  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          isLoading={deleteProjectResult.isLoading}
          show={deleteModal}
          onDeleteClick={handleDeleteProject}
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
                      data={projects?.message}
                      setSearchData={setSearchData}
                      nameSearch="cArabicName"
                    >
                      <div className="d-flex align-items-center">
                        <ButtonPrimary
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                          value="إضافة مشروع"
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
                        <Alert color="primary"> لا يوجد مشاريع متاحه </Alert>
                      </div>
                    )}
                  </div>
                  <HandelEstateProjects
                    isEdit={isEdit}
                    modal={modal}
                    toggle={toggle}
                    setModal={setModal}
                    name=" المشروع"
                    onAdd={addProject}
                    onEdit={editProject}
                    isLoading={
                      addProjectResult.isLoading || editProjectResult.isLoading
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

export default EstateProjects;
