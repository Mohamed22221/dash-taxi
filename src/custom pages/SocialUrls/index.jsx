import { Card, Col, Container, Row } from "reactstrap";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";
import { GeneralForm } from "./Form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetSocialQuery,
  useUpdateSocialMutation,
} from "../../custom-store/services/Custom/socialApi";

export const SocialURLS = () => {
  const { ...socialData } = useGetSocialQuery();
  const [onUpdateSocial, updateSocialResult] = useUpdateSocialMutation();
  useEffect(() => {
    if (updateSocialResult.isSuccess) {
      toast.success("Seo Updated Successfully");
    }
    if (updateSocialResult.isError) {
      toast.error("Ops Try again later");
    }
  }, [
    updateSocialResult.isFetching,
    updateSocialResult.isError,
    updateSocialResult.isSuccess,
  ]);
  const titleData = ["Social URLS"];
  document.title = " Social URLS";

  // console.log(socialResponse, "socialResponse");
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumbs titleData={titleData} />
        <Row>
          <Col lg={12}>
            <Card className="p-4">
              <GeneralForm
                isLoading={updateSocialResult.isLoading}
                selected={socialData?.data}
                onConfirm={(data) => onUpdateSocial(data)}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
