import { useMemo, useState, useEffect } from "react";
//custom
import { data } from "../constant/data";
import TableContainer from "../../../Components/Common/TableContainer";
import StatusCell from "../../../common/table/components/StatusCell";
import { IconTable } from "../../../common/table/IconTable";
import DateCell from "../../../common/table/components/DateCell";
import {
  useGetAllClientsQuery,
  useDeleteClientsMutation,
  useUpdateClientMutation,
} from "../../../custom-store/services/clientsApi";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { EditClientModal } from "./editClient";

export const ClientsTable = ({ pagination, clients, isLoading, isError }) => {
  const [selected, setSelected] = useState({});

  const [modals, setModals] = useState({
    edit: false,
    show: false,
    delete: false,
  });
  //RTQ
  const [handleDeleteClient, deleteResult] = useDeleteClientsMutation();
  const [handleEditClient, EditResult] = useUpdateClientMutation();

  useEffect(() => {
    if (deleteResult.isSuccess) modalsHandlers("delete");
  }, [deleteResult.isSuccess]);

  useEffect(() => {
    if (EditResult.isSuccess) modalsHandlers("edit");
  }, [EditResult.isSuccess]);

  const modalsHandlers = (name, data = {}) => {
    setModals({ ...modals, [name]: !modals[name] });
    setSelected(data);
  };

  const columns = useMemo(() => [
    {
      Header: "رقم العميل",
      accessor: "id",
      filterable: true,
    },
    {
      Header: "تاريخ التسجيل",
      accessor: "created_at",
      filterable: false,
      Cell: (params) => <DateCell value={params.value} />,
    },
    {
      Header: "اسم العميل",
      accessor: "name",
      filterable: false,
    },
    {
      Header: "رقم الهاتف",
      accessor: "phone",
      filterable: false,
    },
    {
      Header: "رصيد العميل",
      accessor: "total_wallet",
      Cell: (params) => <p>{params.value || 0 + "د.ك"}</p>,
    },
    {
      Header: "الحاله",
      accessor: "status",
      Cell: (params) => <StatusCell value={params.value} />,
    },
    {
      Header: "الاجراءات",
      accessor: "code",
      Cell: (cellProps) => {
        const data = cellProps.row.original;
        return (
          <ul className="p-0">
            <IconTable
              type="delete"
              icon="ri-delete-bin-5-fill"
              HandelAction={() => modalsHandlers("delete", data)}
              cellProps={cellProps}
            />
            <IconTable
              type="edit"
              icon="ri-pencil-fill"
              HandelAction={() => modalsHandlers("edit", data)}
              cellProps={cellProps}
            />
            <IconTable
              type="show"
              icon="ri-eye-line"
              link={`/client-profile/${data.id}`}
            />
          </ul>
        );
      },
    },
  ]);

  return (
    <>
      {/* delete ad modal */}
      <DeleteModal
        show={modals.delete}
        onDeleteClick={() => {
          handleDeleteClient(selected.id);
        }}
        onCloseClick={() => modalsHandlers("delete")}
        isLoading={deleteResult.isLoading}
      />
      {/* edit client  */}
      <EditClientModal
        selected={selected}
        isOpen={modals.edit}
        toggle={() => modalsHandlers("edit")}
        onEdit={handleEditClient}
        isLoading={EditResult.isLoading}
      />
      <TableContainer
        pagination={pagination}
        columns={columns}
        data={clients || []}
        customPageSize={10}
        className="custom-header-css"
        theadClass="table-light text-muted"
        loading={isLoading}
        error={{ isError, errorMsg: "فشل تحميل الاعلانات" }}
      />
    </>
  );
};
