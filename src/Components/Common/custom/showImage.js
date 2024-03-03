import React from "react";

const ShowImage = ({ isEdit, image }) => {
  return (
    <div className="col col-auto dropzone-previews mt-3" id="file-previews">
      <div className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
        <div className="p-2">
          <div className="row align-items-center flex-center text-center">
            <div className="col col-auto h-50">
              <a
                target="_blank"
                href={isEdit && image}
                className="text-muted fw-bold"
              >
                <img
                  data-dz-thumbnail=""
                  height="180"
                  className="avatar-sm w-100 h-100 rounded bg-light w-100"
                  src={isEdit && image}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowImage;
