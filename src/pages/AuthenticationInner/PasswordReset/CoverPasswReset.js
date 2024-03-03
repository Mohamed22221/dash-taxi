import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";

import AuthSlider from "../authCarousel";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

const CoverPasswReset = () => {
  document.title = "Reset Password ";

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {},
  });
  const navigate = useNavigate();
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
                      <div className="p-lg-5 p-4">
                        <h5 className="text-primary">هل نسيت كلمة السر؟</h5>
                        <p className="text-muted">إعادة تعيين كلمة المرور </p>

                        <div className="mt-2 text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/rhvddzym.json"
                            trigger="loop"
                            colors="primary:#8c68cd"
                            className="avatar-xl"
                            style={{ width: "120px", height: "120px" }}
                          ></lord-icon>
                        </div>

                        <div
                          className="alert alert-borderless alert-warning text-center mb-2 mx-2"
                          role="alert"
                        >
                          أدخل بريدك الإلكتروني وسيتم إرسال التعليمات إليك!
                        </div>
                        <div className="p-2">
                          <Form onSubmit={validation.handleSubmit}>
                            <div className="mb-4">
                              <Label className="form-label">
                                بريد إلكتروني
                              </Label>
                              <Input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="أدخل عنوان البريد الالكتروني"
                                name="email"
                                value={validation.values.email}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={
                                  validation.errors.email &&
                                  validation.touched.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.errors.email &&
                              validation.touched.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="text-center mt-4">
                              <Button
                                color="primary"
                                className="w-100"
                                type="submit"
                                onClick={() => navigate("/auth-twostep-cover")}
                              >
                                أرسل رابط إعادة التعيين
                              </Button>
                            </div>
                          </Form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            انتظر ، أتذكر كلمة المرور الخاصة بي ...{" "}
                            <Link
                              to="/login"
                              className="fw-bold text-primary text-decoration-underline"
                            >
                              انقر هنا
                            </Link>{" "}
                          </p>
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
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()} Velzon. Crafted with 
                    <i className="mdi mdi-heart text-danger"></i>by Easy media
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default CoverPasswReset;
