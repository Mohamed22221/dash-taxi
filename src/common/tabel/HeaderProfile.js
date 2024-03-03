import React from "react";
import profilePf from "../../assets/images/profile-bg.jpg";

const HeaderProfile = ({ onClick , img , name , about , total }) => {
  return (
    <div className="main-header-profile">
      <div className="profile-cover">
        <img alt="profile-pg" src={profilePf} className="img-fluid" />
      </div>
      <div className="content-profile">
        <div className="top-content">
          <div className="profile-person">
            <img alt="profile-pg" src={img} />
            <div className="about-person mx-3">
              <h4 className="text-light">{name}</h4>
              <div className="d-flex align-items-center">
                <p className="icon-state mx-2 my-1 active"></p>
                <h5 className="text-light m-0">{about}</h5>
              </div>
            </div>
          </div>
          <div className="total">
            <h5 className="text-light">الرصيد الكلي</h5>
            <h3 className="text-center text-light">{total}</h3>
          </div>
        </div>
        <div className="block">
          <button onClick={onClick} className="btn btn-danger fs-6 text">
            حظر
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
