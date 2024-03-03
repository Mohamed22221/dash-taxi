import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";

//redux
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-toastify";
//Import config
import { facebook, google } from "../../config";
import withRouter from "../../Components/Common/withRouter";
import AuthSlider from "../AuthenticationInner/authCarousel";
import { useLoginUserMutation } from "../../custom-store/services/Custom/authApi";
import { setUser } from "../../custom-store/services/authSlice";
import { CookiesProvider, useCookies } from "react-cookie";

const Login = (props) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }
  const [loginUser, resultLogin] = useLoginUserMutation();

  const emailMatch =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        // .matches(emailMatch, "يرجى إدخال البريد الإلكتروني بشكل صحيح")
        .required("Please enter your username"),
      password: Yup.string().required("Please enter a password"),
    }),
    onSubmit: async (values) => {
      await loginUser(values);
    },
  });

  useEffect(() => {
    console.log("login data", resultLogin);
    if (resultLogin.isSuccess) {
      toast.success("You successfully logged in");
      localStorage.setItem("JWT", resultLogin?.data?.token);
      handleLogin(resultLogin?.data?.message);
      navigate("/dashboard");
    }
  }, [resultLogin.isSuccess]);

  document.title = "Login";
  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="auth-page-content">
          <Container>
            <Card className="overflow-hidden card-bg-fill border-0 card-border-effect-none ">
              <Row className="g-0">
                <Col lg={6}>
                  <div className="p-lg-5 p-4">
                    <div>
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Activate the login to proceed to the console.{" "}
                      </p>
                    </div>
                    {resultLogin.error?.data?.success === false && (
                      <Alert color="danger">
                        {" "}
                        {resultLogin.error?.data?.message}{" "}
                      </Alert>
                    )}
                    <div className="mt-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Name
                          </Label>
                          <Input
                            name="username"
                            className="form-control"
                            placeholder=" Enter Name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.username}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot your password?{" "}
                            </Link>
                          </div>
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            password{" "}
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={passwordShow ? "text" : "password"}
                              className="form-control pe-5"
                              placeholder="Enter the password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() => setPasswordShow(!passwordShow)}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </Label>
                        </div>

                        <div className="mt-4">
                          <Button
                            color="primary"
                            disabled={
                              resultLogin?.error
                                ? null
                                : resultLogin.isLoading
                                ? true
                                : false
                            }
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            {resultLogin?.error ? null : resultLogin.isLoading ? (
                              <Spinner size="sm" className="me-2">
                                download...
                              </Spinner>
                            ) : null}
                            sign in{" "}
                          </Button>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">sign in with</h5>
                          </div>
                          <div>
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              // callback={facebookResponse}
                              render={(renderProps) => (
                                <Button
                                  color="primary"
                                  className="btn-icon me-1"
                                  // onClick={renderProps.onClick}
                                >
                                  <i className="ri-facebook-fill fs-16" />
                                </Button>
                              )}
                            />
                            <GoogleLogin
                              clientId={
                                google.CLIENT_ID ? google.CLIENT_ID : ""
                              }
                              render={(renderProps) => (
                                <Button
                                  color="danger"
                                  to="#"
                                  className="btn-icon me-1"
                                  // onClick={renderProps.onClick}
                                >
                                  <i className="ri-google-fill fs-16" />
                                </Button>
                              )}
                              // onSuccess={googleResponse}
                              // onFailure={() => {}}
                            />
                            <Button color="dark" className="btn-icon">
                              <i className="ri-github-fill fs-16"></i>
                            </Button>{" "}
                            <Button color="info" className="btn-icon">
                              <i className="ri-twitter-fill fs-16"></i>
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>
                    {/* 
                    <div className="mt-5 text-center">

                      <p className="mb-0">
                        Don't have an account ?{" "}
                        <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup</Link>

                      </p>
                    </div> */}
                  </div>
                </Col>
                <AuthSlider />
              </Row>
            </Card>
          </Container>
        </div>

        <footer className="footer">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()}
                    <i className="mdi mdi-heart text-danger"></i> Easy media
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

export default withRouter(Login);
