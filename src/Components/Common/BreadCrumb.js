import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const BreadCrumb = ({ title, pageTitle ,pageTitle2 ,pageTitle3}) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                      
                            <div className="breadcrumb m-0">
                                <h4 className="breadcrumb-item active">{title}</h4>
                                <h4 className="breadcrumb-item"><Link to="#">{pageTitle}</Link></h4>
                                {pageTitle2 && <h4 className="breadcrumb-item"><Link to="#">{pageTitle2}</Link></h4>}
                                {pageTitle3 && <h4 className="breadcrumb-item"><Link to="#">{pageTitle3}</Link></h4>}
                            </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb;