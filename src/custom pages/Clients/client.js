import React, { useEffect } from "react";
import { useState } from "react";
//custom components
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { ButtonPrimary } from "../../Components/buttons/buttons";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ClientsTable } from "./components/table";
import HeaderFilter from "../../common/table/HeaderFilter";
import HeaderTabel from "../../common/table/HeaderTabel";
import { useGetAllClientsQuery } from "../../custom-store/services/clientsApi";
import { useParams } from "react-router-dom";
import { useGetClientByCountriesQuery } from "../../custom-store/services/clientsApi";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";

const Clients = () => {
  const { countryID } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [custom, setCustom] = useState({
    data: [],
    meta: {},
    isLoading: false,
    isError: false,
  });
  const {
    data: allClients,
    isLoading: allClientsLoading,
    isError: allClientsError,
    isSuccess: allClientsSuccess,
    isFetching: allClientsFetching,
  } = useGetAllClientsQuery({ page: currentPage });
  const {
    data: customClients,
    isLoading: customClientsLoading,
    isError: customClientsError,
    isSuccess: customClientsSuccess,
    isFetching: custClientsFetching,
  } = useGetClientByCountriesQuery(countryID, { page: currentPage });

  useEffect(() => {
    if (countryID === "all") {
      setCustom((perv) => ({
        ...perv,
        data: allClients?.data,
        isLoading: allClientsLoading,
        isError: allClientsError,
        meta: allClients?.meta,
      }));
    } else {
      setCustom((perv) => ({
        ...perv,
        data: customClients?.data,
        isLoading: customClientsLoading,
        isError: customClientsError,
        meta: customClients?.meta,
      }));
    }
  }, [countryID, allClientsFetching, custClientsFetching]);
  const titleData = ["العملاء", "الجميع"];
  document.title = "العملاء";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Card>
            <Col>
              <CardHeader className="border-0">
                <HeaderTabel title="العملاء" />
              </CardHeader>
              <HeaderFilter>
                <ButtonPrimary
                  value="تصفيه بواسطه"
                  classIcon="ri-list-settings-line"
                />
              </HeaderFilter>
              <div className="mt-5">
                <ClientsTable
                  pagination={{
                    total: custom?.meta?.total,
                    itemsPerPage: custom?.meta?.per_page,
                    currentPage,
                    setCurrentPage,
                  }}
                  clients={custom?.data || []}
                  isLoading={custom?.isLoading}
                  isError={custom?.isError}
                />
              </div>
            </Col>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Clients;
