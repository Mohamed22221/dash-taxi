import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
const HeaderFilter = ({ children, setSearchData, data, nameSearch }) => {
  const [searchField, setSearchField] = useState("");

  const filteredData = data?.filter((item) => {
    return item[nameSearch || "arabicName"]
      ?.toLowerCase()
      ?.includes(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };
  useEffect(() => {
    if (setSearchData) {
      setSearchData(filteredData);
    }
  }, [searchField]);

  return (
    <div className="border border-dashed border-end-0 border-start-0 mb-3  row card-body">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="search-box me-2 mb-2 d-inline-block">
          <Input
            type="text"
            className="form-control search"
            placeholder="Search for name or designation..."
            value={searchField}
            onChange={handleChange}
          />
          <i className="bx bx-search-alt search-icon"></i>
        </div>

        {children}
      </div>
    </div>
  );
};

export default HeaderFilter;
