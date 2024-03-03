import React from "react";
import { Card, CardBody, CardHeader, Col, Input, Label } from "reactstrap";

const AdSettings = () => {
  return (
    <React.Fragment>
      <Col xl={6}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">إعدادات الاعلانات</h4>
          </CardHeader>
          <CardBody className="py-3">
            <div className="d-flex justify-content-between form-check form-switch-lg form-switch form-switch-success mb-3">
              <Label className="form-check-label h5" for="SwitchCheck3">
                تنزيل الاعلانات تلقائي
              </Label>
              <Input
                className="form-check-input mx-2"
                type="checkbox"
                role="switch"
                id="SwitchCheck3"
              />
            </div>
            <div className="d-flex justify-content-between form-check form-switch-lg form-switch form-switch-success mb-3">
              <Label className="form-check-label h5" for="SwitchCheck3">
                تنزيل الموقع علي جوجل في الاعلان
              </Label>
              <Input
                className="form-check-input mx-2"
                type="checkbox"
                role="switch"
                id="SwitchCheck3"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default AdSettings;
