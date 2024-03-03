import { Card, Col, Container, Row } from "reactstrap";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";
import { SeoForm } from "./Form/index";
import { useEffect } from "react";
import {
  useGetSeoQuery,
  useUpdateSeoMutation,
} from "../../custom-store/services/Custom/SeoApi";
import { toast } from "react-toastify";

export const Seo = () => {
  const { ...seoData } = useGetSeoQuery();
  const [onUpdateSeo, updateSeoResult] = useUpdateSeoMutation();
  useEffect(() => {
    if (updateSeoResult.isSuccess) {
      toast.success("Seo Updated Successfully");
    }
    if (updateSeoResult.isError) {
      toast.error("Ops Try again later");
    }
  }, [
    updateSeoResult.isFetching,
    updateSeoResult.isError,
    updateSeoResult.isSuccess,
  ]);

  const titleData = ["SEO"];
  document.title = " SEO";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumbs titleData={titleData} />
        <Row>
          <Col lg={6}>
            <Card className="p-4">
              <SeoForm
                selected={seoData.data}
                loading={updateSeoResult.isLoading}
                onConfirm={onUpdateSeo}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
