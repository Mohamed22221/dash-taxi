import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const MainStatistics = () => {
document.title ="Statistics";
  return (
    <React.Fragment>      
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="الاحصائيات" pageTitle="الاحصائيات الكليه" />
          <Row>
            <Col xs={12}>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MainStatistics;