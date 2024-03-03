import React from "react";

const ImgCard = ({ img, name }) => {
  return (
    <div>
      <div className="avatar-sm flex-shrink-0">
        <span className="avatar-title bg-soft-primary rounded-circle ">
          <img src={img} alt={name} className="text-primary p-2" />
        </span>
      </div>
    </div>
  );
};

export default ImgCard;
