import React from "react";
const HeaderFilter = ({ children}) => {
  return (

      <div className="border border-dashed border-end-0 border-start-0 mb-3  row card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="search-box me-2 mb-2 d-inline-block"       >
            <input
              id="search-bar-0"
              type="text"
              className="form-control search /"
              placeholder="ماذا تريد البحث عنه ..."
            />
            <i className="bx bx-search-alt search-icon"></i>
          </div>

        {children}
      </div>
      </div>
  );
};

export default HeaderFilter;
