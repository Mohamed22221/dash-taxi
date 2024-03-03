import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Loader from "../../../../Components/Common/Loader";
import { Markup } from "interweave";
const CardPackage = ({
  setDeleteCard,
  setIsEditPackages,
  toggle,
  data,
  setItemDelete,
  setDataItem,
}) => {
  const viewEdit = (item) => {
    setIsEditPackages(true);
    toggle();
    setDataItem(item);
  };
  const handelDelete = (item) => {
    setDeleteCard(true);
    setItemDelete(item);
  };

  return (
    <Row className="justify-content-between">
      <Col xl={12}>
        <div>
          {data.isSuccess && data.data?.data.length ? (
            <Row>
              {data?.data?.data?.map((item, key) => (
                <Col md={6} lg={4} xl={3} key={key}>
                  <Card className="pricing-box ribbon-box right">
                    <CardBody className="p-4 m-2">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <h5 className="mb-1 fw-semibold">{item.ar_name}</h5>
                          <p className="text-muted mb-0">سعر الاعلان الواحد</p>
                        </div>
                        <div className="avatar-sm">
                          <div className="avatar-title bg-light rounded-circle text-primary">
                            <img
                              className="rounded-circle"
                              src={item.image?.url}
                            ></img>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <h2>
                          {item.price}
                          <sup>
                            <small>دك </small>
                          </sup>
                        </h2>
                      </div>
                      <hr className="my-4 text-muted" />
                      <div>
                        <div className="d-flex">
                          <div className="">
                            <Markup
                              className=" text-muted "
                              content={item.description}
                            />
                          </div>
                        </div>

                        {item.note !== null && item.note !== "null" && (
                          <div className="my-2 pt-3 border-top">
                            <h5>ملاحظات</h5>
                            <p>{item.note}</p>
                          </div>
                        )}

                        <div className="mt-4 d-flex align-items-center justify-content-between">
                          <button
                            className="btn btn-primary w-50 mx-2 "
                            onClick={() => viewEdit(item)}
                          >
                            تعديل
                          </button>
                          <button
                            className="btn btn-danger w-50  mx-2"
                            onClick={() => handelDelete(item)}
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Loader
              loading={data.isLoading}
              error={data.isError}
              empty={data?.data?.data?.length === 0}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default CardPackage;
