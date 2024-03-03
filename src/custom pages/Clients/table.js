import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import { data } from "./data";

export const BasicTable = () => {
  const navigate = useNavigate();
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
      name: <span className="font-weight-bold fs-13"> كود العميل</span>,
      selector: (row) => (
        <Link to="#" className="fw-medium">
          {row.client_code}
        </Link>
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13"> تاريخ التسجيل </span>,
      selector: (row) => row.register_date,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13"> اسم العميل</span>,
      selector: (row) => row.client_name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">رقم الهاتف </span>,
      selector: (row) => row.phone,
      sortable: true,
    },

    {
      name: <span className="font-weight-bold fs-13">رصيد العميل</span>,
      selector: (row) => row.charge,
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

      cell: (param) => {
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
                onClick={() => navigate("/client-profile/" + param.id, param)}
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

  return <DataTable columns={columns} data={data} pagination />;
};
