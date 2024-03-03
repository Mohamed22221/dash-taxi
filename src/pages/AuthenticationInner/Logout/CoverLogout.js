import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'reactstrap';

import AuthSlider from '../authCarousel';

const CoverLogout = () => {
    document.title = "Log Out ---  | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden card-bg-fill border-0 card-border-effect-none">
                                    <Row className="justify-content-center g-0">
                                        
                                   

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4 text-center">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hzomhqxz.json"
                                                    trigger="loop"
                                                    colors="primary:#8c68cd,secondary:#4788ff"
                                                    style={{ width: "180px", height: "180px" }}>
                                                </lord-icon>

                                                <div className="mt-4 pt-2">
                                                    <h5>لقد قمت بتسجيل الخروج</h5>
                                                    <p className="text-muted">شكرا لك علي استخدام وحده التحكم الرئيسيه <span className="fw-semibold"> Easymedia </span >وحده التحكم الرئيسيه</p>
                                                    <div className="mt-4">
                                                        <Link to="/login" className="btn btn-primary w-100">تسجيل الدخول</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </Col>
                                        <AuthSlider />
                                    </Row>
                                </Card>
                            </Col>
                           
                        </Row>
                        
                    </Container>
                </div>

                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>

                {/* <!-- end Footer --> */}
            </div>
        </React.Fragment>
    );
};

export default CoverLogout;