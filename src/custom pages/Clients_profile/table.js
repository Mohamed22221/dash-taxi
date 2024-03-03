import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import { data, tableData } from "./data";

export const BasicTable = ({ setShowAD }) => {
  const columns = [
    {
      name: (
        <Input
          className="form-check-input fs-15"
          type="checkbox"
          name="checkAll"
          value="option1"
        />
      ),
      cell: () => (
        <input
          className="form-check-input fs-15"
          type="checkbox"
          name="checkAll"
          value="option1"
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">كود الاعلان</span>,
      selector: (row) => (
        <Link to="#" className="fw-medium">
          {row.ad_code}
        </Link>
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">توقيت إضافة الإعلان</span>,
      selector: (row) => row.ad_date,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">الدولة </span>,
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">المنطقه</span>,
      selector: (row) => row.area,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">نوع العقار </span>,
      selector: (row) => row.estate_type,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">الغرض </span>,
      selector: (row) => row.purpose,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">نوع الاعلان</span>,
      selector: (row) => row.ad_type,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">السعر</span>,
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">الحاله</span>,
      selector: (row) => row.status,
      sortable: true,
      cell: (param) => {
        const color = param.status === "نشط" ? "success" : "danger";
        return (
          <div className="status">
            <span className={`badge badge-soft-${color} text-uppercase`}>
              {param.status}
            </span>
          </div>
        );
      },
    },
    {
      name: <span className="font-weight-bold fs-13">الاجراءات</span>,
      sortable: true,

      cell: () => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-primary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end ">
              <DropdownItem
                href="#! "
                className="edit-item-btn d-flex flex-row align-items-center"
                onClick={() => setShowAD(true)}
              >
                <i className="ri-eye-fill align-bottom me-2 text-muted "></i>
                View
              </DropdownItem>
              <DropdownItem className="edit-item-btn d-flex flex-row align-items-center">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem className="remove-item-btn d-flex flex-row align-items-center">
                {" "}
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete{" "}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={tableData} pagination />;
};
