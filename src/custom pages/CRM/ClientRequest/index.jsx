import React, { useEffect, useMemo, useState } from "react";

//libraries
import { Container, Row, Col, Card } from "reactstrap";

//components
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  useDeleteClientRequestMutation,
  useGetAllClientRequestQuery,
  useUpdateClientRequestMutation,
} from "../../../custom-store/services/Custom/ClientRequest";

import moment from "moment";
import { IconTable } from "../../../common/table/IconTable";
import DeleteModal from "../../../Components/Common/DeleteModal";
import CardStatistics from "../../statistics/AllStatistics/components/CardStatistics";
import { EditStatusModal } from "./EditStatusModal";
import { toast } from "react-toastify";

// import AddBlog from "./Components/BlogModal";

const pageSize = 5;
export const ClientRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState({});
  const [modals, modalsToggler] = useState({ update: false, delete: false });

  //get all requests
  const { ...clientRequestResponse } = useGetAllClientRequestQuery({
    page: currentPage,
    pageSize,
  });
  //update request
  const [onUpdateRequest, updateRequestResult] =
    useUpdateClientRequestMutation();

  useEffect(() => {
    if (updateRequestResult.isSuccess) {
      toast.success("Client Request updated Successfully");
      modalsHandlers("update");
    }
    if (updateRequestResult.isError) {
      toast.error("Ops...try again later");
    }
  }, [updateRequestResult.isFetching, updateRequestResult.isSuccess]);
  //delete request
  const [onDeleteRequest, deleteRequestResult] =
    useDeleteClientRequestMutation();

  useEffect(() => {
    if (deleteRequestResult.isSuccess) {
      toast.success("Client Request Deleted Successfully");
      modalsHandlers("delete");
    }
    if (deleteRequestResult.isError) {
      toast.error("Ops...try again later");
    }
  }, [deleteRequestResult.isFetching, deleteRequestResult.isSuccess]);

  const modalsHandlers = (name, data = {}) => {
    console.log(data, "modalsHandlersData");
    modalsToggler((prev) => ({ ...prev, [name]: !prev[name] }));
    setSelected(data);
  };

  const columns = useMemo(
    () => [
      {
        id: "id",
        Header: "ID",
        accessor: "requestId",
        hiddenColumns: true,
      },
      {
        Header: "Time",
        accessor: "updatedAt",
        filterable: false,
        Cell: (params) => {
          console.log(params.value);
          return <div>{moment(params.value).format("DD MMMM YYYY")}</div>;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: false,
      },
      {
        Header: "Family Name",
        accessor: "familyName",
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Phone",
        accessor: "phone",
        filterable: false,
      },
      {
        Header: "message",
        accessor: "message",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          const obj = {
            new: "info",
            done: "success",
          };
          console.log(cellProps, "cellProps");
          return (
            <span className={`badge text-bg-${obj[cellProps.value]}`}>
              {cellProps.value}
            </span>
          );
        },
      },
      {
        id: "actions",
        accessor: "id",
        Header: "Actions",
        Cell: (cellProps) => {
          const data = cellProps.cell.row.original;
          console.log(data, "data");

          return (
            <ul className="list-inline ">
              <div className="list-inline mb-0">
                <IconTable
                  type="edit"
                  icon="ri-pencil-fill"
                  HandelAction={() => modalsHandlers("update", data)}
                  cellProps={cellProps}
                />
                <IconTable
                  type="delete"
                  icon=" ri-delete-bin-5-line"
                  HandelAction={() => modalsHandlers("delete", data)}
                  cellProps={cellProps}
                  link="#"
                />
              </div>
            </ul>
          );
        },
      },
    ],
    []
  );

  const titleData = ["client Request"];
  document.title = "client Request";

  const Response = clientRequestResponse?.data;
  return (
    <React.Fragment>
      {/* delete Ad*/}
      <DeleteModal
        show={modals.delete}
        onDeleteClick={() => {
          onDeleteRequest({ id: selected.requestId });
        }}
        onCloseClick={() => modalsHandlers("delete")}
        isLoading={deleteRequestResult.isLoading}
      />

      {/* edit status */}
      <EditStatusModal
        show={modals.update}
        selected={selected}
        onConfirm={(body) => onUpdateRequest({ id: selected.requestId, body })}
        onClose={() => modalsHandlers("update")}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />

          <Row>
            <CardStatistics
              domyData={[
                {
                  name: "TOTAL ALL Request",
                  count: Response?.totalRequests,
                },
                {
                  name: "TOTAL Request New",
                  count: Response?.newRequests,
                },
                {
                  name: "TOTAL Request Done",
                  count: Response?.doneRequests,
                },
              ]}
            />
          </Row>
          <Row>
            <Col lg={12}>
              <Card id="customerList" className=" overflow-x-auto  w-100">
                {clientRequestResponse.isSuccess && (
                  <TableContainer
                    columns={columns}
                    data={Response?.clientrequests}
                    customPageSize={pageSize}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    loading={clientRequestResponse.isLoading}
                    className="custom-header-css"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="ماذا تريد البحث عنه ...."
                    isApplicationFilter={true}
                    pagination={{
                      total: parseInt(Response?.pageSize, 10),
                      currentPage,
                      setCurrentPage,
                    }}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
