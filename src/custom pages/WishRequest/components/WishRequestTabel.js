import React from "react";
import { useMemo } from "react";
import { IconTable } from "../../../common/table/IconTable";
import Loader from "../../../Components/Common/Loader";
import TableContainer from "../../../Components/Common/TableContainer";
import { useGetAllClientsQuery } from "../../../custom-store/services/clientsApi";
import { useAllZonesQuery } from "../../../custom-store/services/zonesApi";
import { useGetAllRealstatesQuery } from "../../../custom-store/services/realstatesApi";
import { useGetAllOffersQuery } from "../../../custom-store/services/offersApi";

const WishRequest = ({
  isCustomerSuccess,
  customers,
  error,
  loading,
  showDetailsRequest,
  pagination,
}) => {
  // Customers Column
  const { data: dataUser, isSuccess: isSuccessUser } = useGetAllClientsQuery();
  const { data: dataZones, isSuccess: isSuccessZones } = useAllZonesQuery();
  const { data: dataRealstates, isSuccess: isSuccessRealstates } =
    useGetAllRealstatesQuery();
  const { data: dataOffers, isSuccess: isSuccessOffers } =
    useGetAllOffersQuery();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        filterable: false,
      },
      {
        Header: "تاريخ الطلب",
        accessor: "created_at",
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value != null
            ? cellProps.cell.value.slice(0, 10)
            : "لم يسجل";
        },
      },
      ,
      {
        Header: "تاريخ الانتهاء",
        accessor: "expiration_date",
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value != null
            ? cellProps.cell.value.slice(0, 10)
            : "لم يسجل";
        },
      },
      {
        Header: "اسم صاحب الطلب ",
        accessor: "user_id",
        filterable: false,
        Cell: (cellProps) => {
          const nameUser = dataUser?.data
            ?.filter((item) => item.id === cellProps.cell.value)
            ?.map((item) => item.name)[0];
          return nameUser === undefined ? "لا يوجد" : nameUser;
        },
      },
      {
        Header: "المنطقه",
        accessor: "zone",
        filterable: false,
        Cell: (cellProps) => {
          return !cellProps.cell.value ? "لا يوجد" : cellProps.cell.value.name;
        },
      },
      {
        Header: "نوع العقار ",
        accessor: "realstate_type",
        filterable: false,
        Cell: (cellProps) => {
          return !cellProps.cell.value ? "لا يوجد" : cellProps.cell.value.name;
        },
      },
      {
        Header: "الغرض",
        accessor: "purpose",
        filterable: false,
        Cell: (cellProps) => {
          return !cellProps.cell.value ? "لا يوجد" : cellProps.cell.value.name;
        },
      },
      {
        Header: "السعر التقريبي",
        accessor: "price",
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value ? cellProps.cell.value + "د.ك" : "لايوجد";
        },
      },

      {
        Header: "الحاله",
        accessor: "status",
        filterable: false,
        Cell: (param) => {
          const color =
            param.value === "active"
              ? "success"
              : param.value === "inActive"
              ? "warning"
              : "danger";
          return (
            <div className="status">
              <span className={`badge badge-soft-${color} text-uppercase`}>
                {param.value === "active"
                  ? "تم"
                  : param.value === "inActive"
                  ? "غير نشط"
                  : "مرفوض"}
              </span>
            </div>
          );
        },
      },

      {
        Header: "الاجراءات",
        Cell: (cellProps) => {
          return (
            <ul className="p-0">
              {/* <IconTable
                type="blocked"
                icon="ri-creative-commons-zero-line"
                cellProps={cellProps}
                color="text-danger"
              /> */}
              <IconTable
                type="show"
                icon="ri-eye-line"
                cellProps={cellProps}
                HandelAction={showDetailsRequest}
                link="#"
              />
            </ul>
          );
        },
      },
    ],
    [
      isCustomerSuccess,
      isSuccessUser,
      isSuccessRealstates,
      isSuccessZones,
      isSuccessOffers,
    ]
  );
  return (
    <div>
      {isCustomerSuccess && customers?.length ? (
        <TableContainer
          pagination={pagination}
          columns={columns}
          data={customers || []}
          isGlobalFilter={true}
          isAddUserList={false}
          customPageSize={10}
          className="custom-header-css"
          handleCustomerClick={showDetailsRequest}
          isCustomerFilter={false}
          theadClass="table-light text-muted"
        />
      ) : (
        <Loader
          error={error}
          loading={loading}
          empty={customers?.length === 0}
        />
      )}
    </div>
  );
};

export default WishRequest;
