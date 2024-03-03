import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";
import { Table, Row, Col, Button, Input, CardBody } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";
import Loader from "./Loader";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  isProductsFilter,
  isLeadsFilter,
  SearchPlaceholder,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <CardBody className="border border-dashed border-end-0 border-start-0 mb-3  row">
        <form>
          <Row className="d-flex flex-end">
            <Col sm={5}>
              <div
                className={
                  isProductsFilter ||
                  isContactsFilter ||
                  isCompaniesFilter ||
                  isNFTRankingFilter
                    ? "search-box me-2 mb-2 d-inline-block"
                    : "search-box me-2 mb-2 d-inline-block col-12"
                }
              >
                <input
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  id="search-bar-0"
                  type="text"
                  className="form-control search /"
                  placeholder={SearchPlaceholder}
                  value={value || ""}
                />
                <i className="bx bx-search-alt search-icon"></i>
              </div>
            </Col>
            {isProductsFilter && <ProductsGlobalFilter />}
            {isCustomerFilter && <CustomersGlobalFilter />}
            {isOrderFilter && <OrderGlobalFilter />}
            {isContactsFilter && <ContactsGlobalFilter />}
            {isCompaniesFilter && <CompaniesGlobalFilter />}
            {isLeadsFilter && <LeadsGlobalFilter />}
            {isCryptoOrdersFilter && <CryptoOrdersGlobalFilter />}
            {isInvoiceListFilter && <InvoiceListGlobalSearch />}
            {isTicketsListFilter && <TicketsListGlobalFilter />}
            {isNFTRankingFilter && <NFTRankingGlobalFilter />}
            {isTaskListFilter && <TaskListGlobalFilter />}
          </Row>
        </form>
      </CardBody>
    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data = [],
  isGlobalSearch,
  isGlobalFilter,
  isProductsFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isLeadsFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  loading,
  error,
  pagination,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,

    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        total: pagination?.total || 0,
        pageIndex: pagination?.currentPage - 1 || 0,
        pageSize: customPageSize || 15,
        selectedRowIds: 0,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };
  const onChangeInInput = (event) => {
    const page = Number(event.target.value);
    if (page > 0 && page <= state.total) {
      pagination.setCurrentPage(page);
      gotoPage(page);
    }
  };

  return (
    <Fragment>
      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr
                className={trClass}
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={thClass}
                    {...column.getSortByToggleProps()}
                  >
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {!loading && (
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
      <Loader
        loading={loading}
        error={error?.isError}
        empty={data?.length === 0 && true}
      />

      {!loading && (
        <Row className="justify-content-md-end justify-content-center align-items-center p-2">
          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button
                color="primary"
                onClick={() => {
                  previousPage();
                  pagination?.setCurrentPage((perv) => perv - 1);
                }}
                disabled={pagination.currentPage === 1}
              >
                {"<"}
              </Button>
            </div>
          </Col>
          <Col className="col-md-auto d-none d-md-block">
            Page{" "}
            <strong>
              {state?.pageIndex + 1} of {state?.total || pageOptions.length}
            </strong>
          </Col>
          <Col className="col-md-auto">
            <Input
              type="number"
              min={1}
              style={{ width: 70 }}
              max={state?.total}
              defaultValue={state?.pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>

          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button
                color="primary"
                onClick={() => {
                  nextPage();
                  pagination?.setCurrentPage((perv) => perv + 1);
                }}
                disabled={pagination.currentPage === pagination.total}
              >
                {">"}
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
