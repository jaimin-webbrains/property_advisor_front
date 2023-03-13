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

const HeaderComponent = props => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
  };
  return <div className={classnames(classes)}>{props.title}</div>;
};

const ClientSideTable = props => {
  const tracks_data = useSelector(state => state.property.tracks_data)
  const [dummyData, setDummyData] = useState(tracks_data);
      const history = useHistory();

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
        accessor: "state"
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
        accessor: "reraNumber"
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
            .format("DD-MM-YYYY")
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
            .format("DD-MM-YYYY")
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
            .format("DD-MM-YYYY")
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
            .format("DD-MM-YYYY")
        },
        placeholder: "RERA project start date",
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
        Cell: props => <a href={props.cell.value}>{props.cell.value}</a>,
        disableFilters: true
      },
      // {
      //   Header: tableInstance => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="certExtFileName"
      //       />
      //     );
      //   },
      //   accessor: "certExtFileName",
      //   Cell: props =><Link to={props.cell.value} target={props.cell.value}  download>Download</Link>,
      //   placeholder: "certExtFileName",
      //   disableFilters: true
      // },
      // {
      //   Header: tableInstance => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="certFileName"
      //       />
      //     );
      //   },
      //   accessor: "certFileName",
      //   placeholder: "certFileName",
      //   disableFilters: true
      // },
      // {
      //   Header: tableInstance => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="detailsFileName"
      //       />
      //     );
      //   },
      //   accessor: "detailsFileName",
      //   placeholder: "detailsFileName",
      //   disableFilters: true
      // },

      // {
      //   Header: tableInstance => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="Action"
      //       />
      //     );
      //   },
      //   accessor: "id",
      //   disableSortBy: true,
      //   disableFilters: true,
      //   Cell: tableInstance => {
      //     return (
      //       <div className="react-action-class wide-cell">
      //         <button
      //           className="react-table-view-button"
      //           onClick={() => viewClick(tableInstance.row.original)}
      //         >
      //           <i className="fas fa-eye" />
      //         </button>
      //         <button
      //           className="react-table-edit-button"
      //           onClick={() => editClick(tableInstance.row.original)}
      //         >
      //           <i className="fas fa-edit" />
      //         </button>
      //         <button
      //           className="react-table-delete-button"
      //           onClick={() => deleteClick(tableInstance.row.original)}
      //         >
      //           <i className="fas fa-trash" />
      //         </button>
      //       </div>
      //     );
      //   }
      // }
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
      data: dummyData,
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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(PropertyActions.getAllTSData())

  }, [])

  return (
    <ReactTableWrapper {...props}>
     <Button className="c-btn c-primary ma-5 align-item-right" onClick={() => history.push('/project_entry')}> <i className="fas fa-plus mr-10" />Add Proprty</Button>
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
    </ReactTableWrapper>
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

export default ClientSideTable;
