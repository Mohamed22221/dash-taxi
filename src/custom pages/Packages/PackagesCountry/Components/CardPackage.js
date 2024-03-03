import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Loader from "../../../../Components/Common/Loader";

const CardPackage = ({
  setDeleteCard,
  setIsEditPackages,
  toggle,
  data,
  dataPlain,
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


  console.log(
    dataPlain?.data.filter((item) => item.id === 17).map((item) => item.name)[0]
  );
  return (
    <Row className="justify-content-between my-5">
      <Col xl={12}>
        {data.isSuccess && data.data?.data.length ? (
          <Row>
            {data?.data?.data?.map((item, key) => (
              <Col md={6} lg={4} xl={3} key={key}>
                <Card className="pricing-box ribbon-box right">
                  {/* {price2.ribbon === true ? (
                    <div className="ribbon-two ribbon-two-danger">
                      <span>Popular</span>
                    </div>
                  ) : (
                    ""
                  )} */}
                  <CardBody className="p-4 m-2">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="mb-1 fw-semibold">
                          {
                            dataPlain?.data
                              .filter((data) => data.id === item.plan_type_id)
                              .map((item) => item.name)[0]
                          }
                        </h5>
                        <p className="text-muted mb-0">خصم {item.discount} %</p>
                      </div>

                      <div>
                        <h2>
                          {item.price}
                          <sup>
                            <small>دك </small>
                          </sup>
                        </h2>
                      </div>
                    </div>

                    
                    <div>
                        <div className="my-2 pt-2 border-top d-flex justify-content-between align-items-center">
                          <h5>عدد شهور الباقه</h5>
                          <p>{item.month_number}</p>
                        </div>
                        <div className="my-2 pt-2 border-top d-flex justify-content-between align-items-center">
                          <h5>عدد اعلانات الباقه</h5>
                          <p>{item.offers_number}</p>
                        </div>
                   
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
      </Col>
    </Row>
  );
};

export default CardPackage;
