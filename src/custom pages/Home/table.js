import { useMemo } from "react";
import Loader from "../../Components/Common/Loader";
import TableContainer from "../../Components/Common/TableContainer";
import { useAllCountriesQuery } from "../../custom-store/services/countriesApi";
import { useGetAllClientsQuery } from "../../custom-store/services/clientsApi";
import { useAllZonesQuery } from "../../custom-store/services/zonesApi";
import { useGetAllRealstatesQuery } from "../../custom-store/services/realstatesApi";
import { useGetAllOffersQuery } from "../../custom-store/services/offersApi";

export const BasicTable = ({ dataHome }) => {
  console.log(dataHome, "dataHome");
  // Customers Column
  const { data: dataCountry, isSuccess: isSuccessCountry } =
    useAllCountriesQuery();
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
        id: "ID",
      },
      {
        Header: " تاريخ الاضافه الإعلان",
        accessor: "created_at",
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value?.slice(0, 10);
        },
      },
      {
        Header: "اسم صاحب الإعلان",
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
        Header: "اسم الدولة",
        accessor: "country_id",
        filterable: false,
        Cell: (cellProps) => {
          const nameCountry = dataCountry?.data
            ?.filter((item) => item.id === cellProps.cell.value)
            ?.map((item) => item.name)[0];
          return nameCountry === undefined ? "لا يوجد" : nameCountry;
        },
      },
      {
        Header: "المنطقه",
        accessor: "zone",
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value === null
            ? "لا يوجد"
            : cellProps.cell.value?.name;
        },
      },
      {
        Header: "نوع العقار ",
        accessor: "realstate_type",
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value === null
            ? "لا يوجد"
            : cellProps.cell.value?.name;
        },
      },
      {
        Header: "الغرض",
        accessor: "offer_type_id",
        filterable: false,
        Cell: (cellProps) => {
          const nameOffers = dataOffers?.data
            ?.filter((item) => item.id === cellProps.cell.value)
            ?.map((item) => item.name)[0];
          return nameOffers === undefined ? "لا يوجد" : nameOffers;
        },
      },
      {
        Header: "نوع الاعلان ",
        accessor: "type",
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value === null
            ? "لا يوجد"
            : cellProps.cell.value;
        },
      },
      {
        Header: "السعر",
        accessor: "price",

        filterable: false,
        Cell: (cellProps) => {
          return cellProps.cell.value === null
            ? "لا يوجد"
            : cellProps.cell.value + "دك";
        },
      },
    ],
    [
      dataHome.isSuccess,
      isSuccessCountry,
      isSuccessUser,
      isSuccessZones,
      isSuccessRealstates,
      isSuccessOffers,
    ]
  );
  return (
    <div>
      {dataHome.isSuccess && dataHome?.data?.latst_offers?.length ? (
        <TableContainer
          columns={columns}
          data={dataHome?.data?.latst_offers || []}
          isGlobalFilter={true}
          isAddUserList={false}
          customPageSize={10}
          className="custom-header-css"
          isCustomerFilter={false}
          theadClass="table-light text-muted"
          SearchPlaceholder="ماذا تريد البحث عنه ...."
        />
      ) : (
        <Loader
          loading={dataHome.isLoading}
          error={dataHome.isError}
          empty={dataHome?.data?.latst_offers?.length === 0}
        />
      )}
    </div>
  );
};
