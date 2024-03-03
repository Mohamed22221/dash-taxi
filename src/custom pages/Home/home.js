import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UpgradeAccountNotise from "../../pages/DashboardAnalytics/UpgradeAccountNotise";

const Home = () => {
  document.title = "الرئيسة";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="احصائيات" pageTitle="الرئيسيه" />
          <Row>
            <Col xxl={12}>
              <UpgradeAccountNotise />
              {/* <Widget dataHome={allHome} /> */}
            </Col>
            {/* <LiveUsers />
            <UsersByDevice /> */}
          </Row>
          {/* <Row>
            <h2 className="heading">أحدث الإعلانات</h2>
          </Row> */}
          {/* <div className="d-flex justify-content-between mt-5">
            <Col xxl={5}>
              <Input
                type="search"
                className="form-control p-10"
                id="placeholderInput"
                placeholder="ماذا تريد البحث عنه ..."
              />
            </Col>
            <ButtonPrimary
              onClick={() => console.log("clicked")}
              value="تصفيه بواسطه"
              classIcon="ri-list-settings-line"
            />
          </div>
          <div className="mt-5">
            <Card id="customerList">
              {" "}
              <BasicTable dataHome={allHome} />
            </Card>
          </div> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
