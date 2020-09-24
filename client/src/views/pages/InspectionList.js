import React, { Component } from "react"
import { Link } from "react-router-dom";
import {
  Progress,
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
} from "../../redux/actions/data-list"

import ThumbView from "../../components/common/ThumbView";

import "../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../assets/scss/pages/data-list.scss"

const CustomHeader = props => {
  return (
    <div className="data-list-header d-flex justify-content-center flex-wrap">
      <div className="actions-right d-flex align-items-center justify-content-center flex-wrap mt-sm-0 mt-2">
        <span className="mx-2"> Rechercher et filtrer les rapports </span>
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

class InspectionList extends Component {
  static getDerivedStateFromProps(props, state) {
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
        <CustomHeader
          handleFilter={this.handleFilter}
          handleRowsPerPage={this.handleRowsPerPage}
          rowsPerPage={rowsPerPage}
          total={totalRecords}
          index={sortIndex}
        />
        {
          value.length ? (
            allData && allData.map((item, index) => {
              return (
                <ThumbView item={item} key={index} />
              )
            })
          ) : (
            data && data.map((item, index) => {
              return (
                <ThumbView item={item} key={index} />
              )
            })
          )
        }
        {/* {
          !value.length && 
        } */}
        {/* <DataTable
          columns={columns}
          data={value.length ? allData : data}
          responsive
          noHeader
          pointerOnHover
          selectableRowsHighlight
          customStyles={selectedStyle}
          sortIcon={<ChevronDown />}
        />
         */}
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
})(InspectionList)
