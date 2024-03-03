import React, { useEffect, useState } from "react";
import moment from "moment";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";
import PolicyModal from "./PolicyModal";
import {
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} from "../../custom-store/services/Custom/privacyApi";
import { toast } from "react-toastify";

const PrivacyPolicy = () => {
  const [openModal, setOpenModal] = useState(false);

  const { ...privacyPolicyData } = useGetPrivacyQuery();
  const [updatePrivacyPolicy, updatePrivacyPolicyResult] =
    useUpdatePrivacyMutation();

  useEffect(() => {
    if (updatePrivacyPolicyResult.isSuccess) {
      toast.success(`Privacy Policy Changed Successfully`);
      setOpenModal(false);
    }
  }, [
    updatePrivacyPolicyResult.isSuccess,
    updatePrivacyPolicyResult.isFetching,
  ]);
  console.log(updatePrivacyPolicyResult, "updatePrivacyPolicyResult");
  document.title = "privacy policy";
  const titleData = ["Settings", "Privacy Policy"];
  return (
    <React.Fragment>
      <PolicyModal
        isLoading={updatePrivacyPolicyResult.isLoading}
        isEdit
        onAdd={updatePrivacyPolicy}
        onEdit={updatePrivacyPolicy}
        setModal={() => setOpenModal(!openModal)}
        modal={openModal}
        name="privacy policy"
        selected={privacyPolicyData?.data}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <div className="d-flex gap-5 justify-content-center mb-5">
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className="btn btn-border border"
            >
              Change Policy
            </button>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card>
                <div className="bg-soft-info position-relative">
                  <CardBody className="p-5">
                    <div className="text-center">
                      <h3>privacy policy</h3>
                      <p className="mb-0 text-muted">
                        last updated{" "}
                        {moment(privacyPolicyData?.data?.updatedAt).format(
                          "D MMMM YYYY"
                        )}
                      </p>
                    </div>
                  </CardBody>
                </div>
                <CardBody className="p-4">
                  <h3>English</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: privacyPolicyData?.data?.privacypolicyEn,
                    }}
                  />
                  <hr />
                  <h3>Arabic</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: privacyPolicyData?.data?.privacypolicyAr,
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PrivacyPolicy;
