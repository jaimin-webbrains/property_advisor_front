import React, { useState, useMemo, useCallback, useEffect } from "react";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "../../../components/reacttable/reacttbl.style";
import { useDispatch, useSelector } from "react-redux";
import PropertyActions from "redux/property/action";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Button from "components/button/Button";
import constants from "redux/property/constants";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import constant from "redux/networkCall/constant";
import PageTitle from "components/common/PageTitle";
import { toast } from "react-toastify";

const HeaderComponent = props => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
  };
  return <div className={classnames(classes)}>{props.title}</div>;
};

const ProjectListing = props => {
  const tracks_data = useSelector(state => state.property.tracks_data);
  const networkCalls = useSelector(store => store.NetworkCall.NETWORK_CALLS)
  const [dummyData, setDummyData] = useState([]);
  const [searchNum, setSearchNum] = useState("")
  const hiddenFileInput = React.useRef(null);
  const history = useHistory();

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
      let formData = new FormData()
      formData.append('bulkfile', fileUploaded)
      dispatch(PropertyActions.bulkAddProperty(formData))           
       toast.success('Bulk upload initiated !!')
    };
  const deleteClick = useCallback(
    data => {
      // Here you can view the data and delete through API calling
      const array = dummyData;
      remove(array, function (n) {
        return n.id === data.id;
      });
      setDummyData([...array]);
    },
    [dummyData]
  );

  const columns = useMemo(
    () => [
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="State"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "State",
        accessor: "state",
        disableFilters: true
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="RERA Number"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "RERA Number",
        accessor: "reraNumber",
        disableFilters: true

      },
      {
        id: "lastModifiedDate",
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Last modified date"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Last Modified Date",
        accessor: d => {
          return moment(d.lastModifiedDate)
            .local()
            .format("DD-MM-YYYY");
        },
        disableFilters: true
      },
      {
        id: "projectEndDate",
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Project End Date"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Project End Date",
        accessor: d => {
          return moment(d.projectEndDate)
            .local()
            .format("DD-MM-YYYY");
        },
        disableFilters: true
      },
      {
        id: "reraApprovedDate",
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="RERA Approved Date"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "RERA Approved Date",
        accessor: d => {
          return moment(d.reraApprovedDate)
            .local()
            .format("DD-MM-YYYY");
        },
        disableFilters: true
      },
      {
        id: "reraProjectStartDate",
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="RERA project start date"
            />
          );
        },
        accessor: d => {
          return moment(d.reraProjectStartDate)
            .local()
            .format("DD-MM-YYYY");
        },
        placeholder: "RERA project start date",
        disableFilters: true
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="PA Id"
            />
          );
        },
        accessor: "paId",
        placeholder: "PA ID",
        disableFilters: true
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Details URL"
            />
          );
        },
        accessor: "detailsURL",
        placeholder: "Details URL",
        Cell: props => <a href={props.cell.value} style={{ wordBreak: "break-word" }}>{props.cell.value}</a>,
        disableFilters: true
      }
    ],
    [deleteClick]
  );

  const viewClick = data => {
    // Here you can view the data and make forward action for view data
    alert(JSON.stringify(data));
  };

  const editClick = data => {
    // Here you can view the data and make forward action for edit data
    alert(JSON.stringify(data));
  };

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    headerGroups,
    pageCount,
    gotoPage,
    state: { pageIndex }
  } = useTable(
    {
      data: tracks_data,
      columns: columns,
      initialState: {
        pageSize: 10,
        pageIndex: 0
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: constants.GET_ALL_TS_DATA,
      payload: []
    });
    return () => {
      dispatch({
        type: constants.GET_ALL_TS_DATA,
        payload: []
      });
    }
  }, []);

  
  return (
    <div>
      <PageTitle title="RERA Project load" />
      <div className=" w-100">
        <div className="row">
          <div className="col pr-2">
            <Form>
              <FormGroup>
                <Input
                  type="search"
                  name="search"
                  id="exampleSearch"
                  onChange={(e) => setSearchNum(e.target.value)}
                  placeholder="Search property by rera number / PA Id"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      dispatch(PropertyActions.getTsDataByReraNumberOrPaId(searchNum))
                    }
                  }}
                />
              </FormGroup>
            </Form>
          </div>
          <div className="col-auto align-items-flex-end text-right ml-auto pl-0">
            <div className="w-100">
              <Button
                className="c-btn c-primary ma-5"
                onClick={(e) => {
                  dispatch(PropertyActions.getTsDataByReraNumberOrPaId(searchNum))
                }}
              >
                {" "}
                <i className="fas fa-search"></i>
              </Button>
            </div>
          </div>
          <div className="text-right h-38">
            <Button
              className="c-btn c-primary ma-5"
              onClick={() => history.push("/project_entry")}
            >
              {" "}
              <i className="fas fa-plus mr-10" />
              Add Proprty
            </Button>
          </div>
           <div className="text-right h-38">
            <Button
              className="c-btn c-primary ma-5"
              onClick={handleClick}
            >
              {" "}
              <i className="fas fa-plus mr-10" />
              Bulk add
            </Button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
      {
        tracks_data.length > 0 ?
          <ReactTableWrapper {...props}>
            <div className="roe-card-style mt-15 mb-30">
              <div className="roe-card-header">
                <span className="hash"># </span>
                {/* Client Side Table */}
              </div>
              <div className="table-container text-center overflow-auto">
                <table
                  border={1}
                  className="custom-react-table-theme-class"
                  {...getTableProps()}
                >
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(header => (
                          <th
                            {...header.getHeaderProps(header.getSortByToggleProps())}
                          >
                            <div>{header.render("Header")}</div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(header => {
                          return (
                            <td
                              {...header.getHeaderProps(
                                header.getSortByToggleProps()
                              )}
                            >
                              <div>
                                {header.canFilter ? header.render("Filter") : null}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {page.map(row => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                onPageChange={gotoPage}
                pages={pageCount}
                page={pageIndex}
              />
            </div>
          </ReactTableWrapper> : <ReactTableWrapper {...props}>
            <div className="roe-card-style mt-15 mb-30">
              <div className="roe-card-header">
                <span className="hash"># </span>
                {/* Client Side Table */}
              </div>
              <div className="table-container text-center overflow-auto">
                <table
                  border={1}
                  className="custom-react-table-theme-class"
                  {...getTableProps()}
                >
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(header => (
                          <th
                            {...header.getHeaderProps(header.getSortByToggleProps())}
                          >
                            <div>{header.render("Header")}</div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    <tr>
                      {
                        networkCalls.indexOf(constant.ADD_TRACKS_LIST_NETWORK_CALL) > -1
                          ?
                          <td colSpan={8} >
                            <div className="d-flex justify-content-center align-items-center">
                              <Spinner color="primary" />
                            </div>
                          </td>
                          :
                          <td colSpan={8} style={{ color: '#898989' }}>
                            No records found
                          </td>
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
              <Pagination
                onPageChange={gotoPage}
                pages={pageCount}
                page={pageIndex}
              />
            </div>
          </ReactTableWrapper>
      }
    </div>
  );
};

const FilterComponent = tableInstance => {
  const { filterValue, setFilter } = tableInstance.column;
  return (
    <input
      type="text"
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      className="tabl-search react-form-input"
      placeholder={`Search ${tableInstance.column.placeholder}`}
      onClick={e => e.stopPropagation()}
    />
  );
};

export default ProjectListing;
