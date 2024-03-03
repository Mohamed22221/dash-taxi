import React, { useState, useCallback, useEffect } from "react";
//assets
import projectCover from "../../assets/images/demos/bg-project.png";
import projectIcon from "../../assets/images/demos/shop.png";

//libraries
import { Container, Row, Col, Card, Alert } from "reactstrap";

//components
import HeaderFilter from "../../common/table/HeaderFilter";
import { ButtonPrimary } from "../../Components/buttons/buttons";
import DeleteModal from "../../Components/Common/DeleteModal";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";
import Loader from "../../Components/Common/Loader";
import GridCards from "../../Components/Common/custom/Cards/GridCards";

//RTQ
import { requestHandler } from "../../custom-store/helper/requestHandler";

import {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useGetAllBlogsQuery,
} from "../../custom-store/services/Custom/blogsApi";
import AddBlog from "./Components/BlogModal";

export const Blogs = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState();
  const [searchData, setSearchData] = useState([]);

  //RTQ
  const { ...allBlogs } = useGetAllBlogsQuery();
  const [deleteBlog, deleteBlogResult] = useDeleteBlogMutation();
  const [addBlog, addBlogResult] = useAddBlogMutation();
  const [editBlog, editBlogResult] = useEditBlogMutation();

  //   useEffect(() => {
  //     if (isSuccess || isFetching) {
  //       setSearchData(projects?.message);
  //     }
  //   }, [isSuccess, isFetching]);

  useEffect(() => {
    if (deleteBlogResult.isSuccess)
      requestHandler(
        deleteBlogResult.isSuccess,
        `Blog ${selected.titleEn} Deleted`,
        undefined,
        () => setDeleteModal(false)
      );
  }, [deleteBlogResult.isSuccess]);

  useEffect(() => {
    if (editBlogResult.isSuccess)
      requestHandler(
        editBlogResult.isSuccess,
        `Blog ${selected.titleEn} updated`,
        undefined,
        () => setModal(false)
      );
  }, [editBlogResult.isSuccess]);

  useEffect(() => {
    if (addBlogResult.isSuccess)
      requestHandler(
        addBlogResult.isSuccess,
        `Blog Added Successfully`,
        undefined,
        () => setModal(false)
      );
  }, [addBlogResult.isSuccess]);

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

  const handleDeleteBlog = () => {
    if (isEdit) {
      setDeleteModal(false);
    }
    deleteBlog(selected?.blogId);
  };

  const titleData = ["blogs"];
  document.title = " blogs";
  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          isLoading={deleteBlog.isLoading}
          show={deleteModal}
          onDeleteClick={handleDeleteBlog}
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
                      data={allBlogs?.message}
                      setSearchData={setSearchData}
                      nameSearch="cArabicName"
                    >
                      <div className="d-flex align-items-center">
                        <ButtonPrimary
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                          value="Add Blog"
                          classIcon="ri-add-line align-bottom me-1"
                        />
                      </div>
                    </HeaderFilter>
                    {allBlogs.data?.length > 0 && allBlogs.isSuccess ? (
                      <GridCards
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEdit}
                        data={allBlogs.data}
                        isEdit={isEdit}
                        defaultCover={projectCover}
                        defaultIcon={projectIcon}
                      />
                    ) : (
                      <div className="d-flex justify-content-center mx-2 mt-2">
                        <Alert color="primary">
                          {" "}
                          there is no blogs to show
                        </Alert>
                      </div>
                    )}
                  </div>
                  <AddBlog
                    isEdit={isEdit}
                    modal={modal}
                    toggle={toggle}
                    setModal={setModal}
                    name="Blog"
                    onAdd={addBlog}
                    onEdit={editBlog}
                    isLoading={
                      addBlogResult.isLoading || editBlogResult.isLoading
                    }
                    selected={selected}
                  />
                </div>
                <Loader
                  loading={allBlogs.isLoading}
                  isError={allBlogs.isError}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
