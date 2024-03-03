import React, { useMemo, useState } from "react";

//libraries
import { Container, Row, Col, Card } from "reactstrap";

//components
import BreadCrumbs from "../../../Components/Common/BreadCrumbs";
import TableContainer from "../../../Components/Common/TableContainer";

import moment from "moment";
import CardStatistics from "../../statistics/AllStatistics/components/CardStatistics";
import {
  useExportFileMutation,
  useGetAllClientSubscriptionQuery,
} from "../../../custom-store/services/Custom/SubscriptionApi";

const pageSize = 5;
export const ClientSubscription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [onExportFile] = useExportFileMutation();
  const { ...clientSubscriptionResponse } = useGetAllClientSubscriptionQuery({
    page: currentPage,
    pageSize,
  });

  const columns = useMemo(
    () => [
      {
        id: "id",
        Header: "ID",
        accessor: "clientsubscriptionId",
        hiddenColumns: true,
      },
      {
        Header: "date",
        accessor: "updatedAt",
        filterable: false,
        Cell: (params) => {
          console.log(params.value);
          return <div>{moment(params.value).format("DD MMMM YYYY")}</div>;
        },
      },

      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
    ],
    []
  );

  const titleData = ["client Subscription"];
  document.title = "client Subscription";

  const Response = clientSubscriptionResponse.data;

  console.log("Response", Response?.clientsubscriptions);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />

          <Row>
            <CardStatistics
              domyData={[
                {
                  name: "TOTAL Emails",
                  count: Response?.pagination?.totalEmails,
                },
              ]}
            />
          </Row>
          <Row className="flex-column gap-3">
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={onExportFile}>
                Export
              </button>
            </div>
            <Col lg={12}>
              <Card id="customerList" className=" overflow-x-auto  w-100">
                {clientSubscriptionResponse.isSuccess && (
                  <TableContainer
                    columns={columns}
                    data={Response?.clientsubscriptions}
                    customPageSize={pageSize}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    loading={clientSubscriptionResponse.isLoading}
                    className="custom-header-css"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="ماذا تريد البحث عنه ...."
                    isApplicationFilter={true}
                    pagination={{
                      total: parseInt(Response?.pagination?.totalPages, 10),
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
