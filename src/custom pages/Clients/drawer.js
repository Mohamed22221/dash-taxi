import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import SimpleBar from "simplebar-react";

//import assets
import Image from "../../custom assets/images/Rectangle 17108.png";
import { data } from "./data";

export const AdsDrawer = ({ toggle, setToggle }) => {
  return (
    <Offcanvas
      isOpen={toggle}
      direction="start"
      toggle={() => {
        setToggle(!toggle);
      }}
      id="offcanvasRight"
      style={{ width: "45vw" }}
      className="border-bottom"
    >
      <OffcanvasHeader
        toggle={() => {
          setToggle(!toggle);
        }}
        id="offcanvasRightLabel"
      >
        <h2>تفاصيل الاعلان</h2>
      </OffcanvasHeader>
      <OffcanvasBody className="p-0 overflow-hidden pb-5">
        <SimpleBar style={{ height: "100vh", paddingBottom: "10rem" }}>
          <div className="acitivity-timeline p-4">
            <div className="d-flex justify-content-center">
              <img src={Image} className="img-fluid" alt="ad " />
            </div>{" "}
            <div className="ad-details__container">
              {data.map((item) => (
                <AdDetails
                  key={item.title}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
            <div>
              <AdDetails
                title="الوصف"
                content="مطعم في شرق موقع مميز - زاوية واجهتين المساحة ٧٥ متر بالإضافة إلى ١٥٠ متر مساحة خارجية ) ممكن اعلاقها) سهولة الوصول ومواقف متوفرة. المطعم شبه جاهز مطلوب خلو (سعر معقول)"
              />
            </div>
            <div>
              <h3 className="fs color__primary py-3">الصور </h3>
              <div className="ad-details__gallery">
                {Array(6)
                  .fill(0)
                  .map((item, i) => (
                    <div key={i} className="d-flex justify-content-center">
                      <img src={Image} className="img-fluid" alt="ad " />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </SimpleBar>
      </OffcanvasBody>
      <div className="offcanvas-foorter border p-3 text-center">
        <Button color="danger">
          <span className="fs-3">حظر</span>
        </Button>
      </div>
    </Offcanvas>
  );
};

const AdDetails = ({ title, content }) => {
  return (
    <div className="col mt-2 p-3 ad-details__item">
      <h3 className="fs color__primary">{title} </h3>
      <p className="fs-4 color__gray">{content}</p>
    </div>
  );
};
