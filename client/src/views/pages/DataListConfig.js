import React, { Component } from "react"
import {
  Progress,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import { history } from "../../history"
import {
  Edit,
  Trash,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight
} from "react-feather"
import { connect } from "react-redux"
import {
  getData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData
} from "../../redux/actions/data-list/"

import "../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../assets/scss/pages/data-list.scss"

const chipColors = {
  "on hold": "warning",
  delivered: "success",
  pending: "primary",
  canceled: "danger"
}

const getColorByProgress = (value) => {
  if (value <= 25)
    return "danger";
  if (value <= 50 && value > 25)
    return "warning";
  if (value > 50 && value <= 75)
    return "primary"
  if (value > 75)
    return "success";
}

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important"
      }
    }
  }
}

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row)
        }}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.deleteRow(props.row)
        }}
      />
    </div>
  )
}

const CustomHeader = props => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
              {`${props.index[0]} - ${props.index[1]} of ${props.total}`}
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(4)}>
              4
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="filter-section">
          <Input type="text" onChange={e => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  )
}

class DataListConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    // console.log(props, state);return;
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex
      }
    }

    // Return null if the state hasn't changed
    return null
  }

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Plate Number",
        selector: "plateNumber",
        sortable: true,
        minWidth: "300px",
        cell: row => (
          <></>
        )
      },
      {
        name: "Make",
        selector: "make",
        sortable: true,
        minWidth: "300px",
        cell: row => (
          <></>
        )
      },
      {
        name: "Model",
        selector: "model",
        sortable: true,
        minWidth: "300px",
        cell: row => (
          <></>
        )
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: row => (
          <>
          </>
        )
      },
      {
        name: "Actions",
        sortable: true,
        cell: row => (
          <ActionsComponent
            row={row}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
          />
        )
      }
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: ""
  }

  thumbView = this.props.thumbView

  componentDidMount() {
    this.props.getData(this.props.parsedFilter);
    this.props.getInitialData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.thumbView) {
      this.thumbView = false
      let columns = [
        {
          name: "Photos",
          selector: "photos",
          minWidth: "400px",
          cell: row => (
            <ul className="list-unstyled users-list m-0 d-flex">
              {
                row.photos && Object.keys(row.photos).map(function (key, index) {
                  return (
                    <li className="avatar pull-up" key={key}>
                      <img
                        src={`/uploads/${row.photos[key]}`}
                        alt="avatar"
                        height="50"
                        width="50"
                        id="avatar1"
                      />
                    </li>
                  )
                })
              }
            </ul>
          )
        },
        {
          name: "Plate Number",
          selector: "plateNumber",
          sortable: true,
          minWidth: "250px",
          cell: row => (
            <p>
              {row.vehicle_details && row.vehicle_details.plateNumber}
            </p>
          )
        },
        {
          name: "Make",
          selector: "make",
          sortable: true,
          minWidth: "250px",
          cell: row => (
            <p>
              {row.vehicle_details && row.vehicle_details.make}
            </p>
          )
        },
        {
          name: "Model",
          selector: "model",
          sortable: true,
          minWidth: "250px",
          cell: row => (
            <p>
              {row.vehicle_details && row.vehicle_details.model}
            </p>
          )
        },
        {
          name: "Status",
          selector: "status",
          sortable: false,
          cell: row => (
            <Progress
              className="w-100 mb-0"
              color={getColorByProgress(parseInt(Object.keys(row).length / 16 * 100))}
              value={ parseInt(Object.keys(row).length / 16 * 100) }
            />
          )
        },
        {
          name: "Actions",
          sortable: true,
          cell: row => (
            <ActionsComponent
              row={row}
              currentData={this.handleCurrentData}
              deleteRow={this.handleDelete}
            />
          )
        }
      ]
      this.setState({ columns })
    }
  }

  handleFilter = e => {
    this.setState({ value: e.target.value })
    this.props.filterData(e.target.value)
  }

  handleRowsPerPage = value => {
    let { parsedFilter, getData } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`/?page=${page}&perPage=${value}`)
    this.setState({ rowsPerPage: value })
    getData({ page: parsedFilter.page, perPage: value })
  }

  handleDelete = row => {
  }

  handleCurrentData = obj => {
    this.setState({ currentData: obj })
  }

  handlePagination = page => {
    let { parsedFilter, getData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4
    history.push(
      `/?page=${page.selected + 1}&perPage=${perPage}`
    )
    getData({ page: page.selected + 1, perPage: perPage })
    this.setState({ currentPage: page.selected })
  }

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      totalRecords,
      sortIndex
    } = this.state
    return (
      <div
        className={`data-list thumb-view`}>
        <DataTable
          columns={columns}
          data={value.length ? allData : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={page => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          // selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          // onSelectedRowsChange={data =>
          //   this.setState({ selected: data.selectedRows })
          // }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
            />
          }
          sortIcon={<ChevronDown />}
          // selectableRowsComponent={Checkbox}
          // selectableRowsComponentProps={{
          //   color: "primary",
          //   icon: <Check className="vx-icon" size={12} />,
          //   label: "",
          //   size: "sm"
          // }}
        />
        <div
          className={classnames("data-list-overlay")}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.dataList
  }
}

export default connect(mapStateToProps, {
  getData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  filterData
})(DataListConfig)
