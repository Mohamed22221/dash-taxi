import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
// import { AiOutlineCloudUpload } from "react-icons/ai";

const UploadComponent = ({
  handleAcceptedFiles,
  previewSrc = null,
  isEdit,
  selectedFiles,
}) => {
  return (
    <div className="row">
      <div>
        <Dropzone
          onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone">
              <div className="dz-message needsclick" {...getRootProps()}>
                <input {...getInputProps()} />
                <i className=" ri-image-add-line"></i>
                <h6>
                  Drog & Drop your files here{" "}
                  <span className="filepond--label-action">Browse </span>
                </h6>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
      {previewSrc && (
        <div className="preview-img-upload">
          <>
            <div className="dropzone-previews mt-3" id="file-previews">
              <div className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                <div className="p-2">
                  <div className="row align-items-center flex-center text-center">
                    <div className="col col-auto">
                      <img
                        data-dz-thumbnail=""
                        height="180"
                        className="avatar-sm rounded bg-light w-100"
                        src={
                          isEdit
                            ? !selectedFiles[0]
                              ? previewSrc.url
                              : selectedFiles[0].preview
                            : previewSrc.preview
                        }
                      />
                    </div>
                    <div className="col">
                      <a
                        target="_blank"
                        href={isEdit ? previewSrc.url : previewSrc.preview}
                        className="text-muted fw-bold"
                      >
                        {previewSrc.name.slice(0, 25)}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
