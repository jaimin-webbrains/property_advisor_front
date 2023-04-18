import React, { useState, useMemo, useCallback, useEffect } from "react";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "../../../../components/reacttable/reacttbl.style";
import { useDispatch, useSelector } from "react-redux";
import RoleActionconstants from "redux/master/Role/constants";
import constant from "redux/networkCall/constant";
import { Button, Spinner } from "reactstrap";
import RoleActios from "redux/master/Role/action";
import DeleteRoleModal from "../masterModals/deleteModal";
import AddRoleModal from "../masterModals/addOrUpdateModal";
import RoleActions from "redux/master/Role/action";
import { useFormik } from "formik";



const HeaderComponent = props => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
  };
  return <div className={classnames(classes)}>{props.title}</div>;
};

const Roles = props => {
  const networkCalls = useSelector(store => store.NetworkCall.NETWORK_CALLS)
  const [modal, setModal] = useState({ add: false, update: false, delete: false })
  const initial = { name: "" }
  const formik = useFormik({
    initialValues: { name: "" },
    validate: values => {
      let errors = {};
      if (!values.name) {
        errors.name = "Required!";
      }
      return errors;
    },
    validateOnChange: true
  });  const roles = useSelector(store => store.master.role.roles)
  const [dummyData, setDummyData] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(RoleActios.getRoles())
  }, [])


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
              title="Role Name"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Role name",
        accessor: "name",
        disableFilters: true
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Action"
            />
          );
        },
        accessor: "updated_at",
        disableSortBy: true,
        disableFilters: true,
        Cell: tableInstance => {
          return (
            <div className="react-action-class">
              <button
                className="table-action action-edit"
                onClick={() => {
                  formik.setValues(tableInstance.row.original);
                  setModal({ ...modal, update: true });
                }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
                disabled={tableInstance.row.original.name === 'admin'}
              >
                <i className="fas fa-edit" />
              </button>

              <button
                className="table-action action-delete"
                onClick={() => {
                  formik.setValues(tableInstance.row.original);
                  setModal({ ...modal, delete: true });
                }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Delete"
                disabled={tableInstance.row.original.name === 'admin'}

              >
                <i className="fas fa-trash" />
              </button>
            </div>
          );
        }
      }
    ],
    [deleteClick]
  );


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
      data: roles,
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

  const handleModalChange = (e, tab) => {
    if (tab === 'update') {
      setModal({ ...modal, update: e })
    } else if (tab === "add") {
      setModal({ ...modal, add: e })
    }
    else {
      setModal({ ...modal, delete: e })
    }
  }
  const handleAddChange = (e, v) => {
    formik.setValues({ ...formik.values, [e]: v })
  }
  const handleAddClick = (type) => {
    if(formik.values.name !== ""){
      if (type === "add") {
        dispatch(RoleActions.addRole({ name: formik.values.name }))
      } else if (type === "update") {
        dispatch(RoleActions.updateRole({ id: formik.values._id, name: formik.values.name }))
      }
    }
    if(type === "delete"){
        dispatch(RoleActions.deleteRole({ id: formik.values._id }))
    }
    setModal(!modal)

  }
  const networkRoleConstants = [
    RoleActionconstants.ADD_ROLE,
    RoleActionconstants.DELETE_ROLE,
    RoleActionconstants.GET_ROLES,
    RoleActionconstants.UPDATE_ROLE
  ]
  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Roles</div>
        <div className="col-sm-auto px-0">
          <Button
            className="btn btn-blue w-100 mb-3"
            onClick={(e) => {
              setModal({ ...modal, add: e })
              formik.setValues(initial)
            }}
          >
            {" "}
            <i className="fas fa-plus mr-10" />
            Add role
          </Button>
        </div>
      </div>
      <div>
        {
          networkRoleConstants.some(i => networkCalls.includes(i)) ?
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner color="primary" />
          </div>          :
            roles.length > 0 ?
              <div className="div-container">
                <ReactTableWrapper {...props}>
                  <div className="row title-sec align-items-center">
                    <div className="table-responsive common-table card-box grey-box mb-2">
                      <table
                        border={1}
                        className="table border-0" {...getTableProps()}
                      >
                        <thead className="thead-color">
                          {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map(header => (
                                <th
                                  className="thead-color"
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
                            </tr>
                          ))}
                          {page.map(row => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                  <td className="td-border"{...cell.getCellProps()}>{cell.render("Cell")}</td>
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
              </div>
              :
              <div className="div-container">
                <ReactTableWrapper {...props}>
                  <div className="row title-sec align-items-center">
                    <div className="col-md">
                      {/* <span className="hash"># </span> */}
                      {/* Client Side Table */}
                    </div>
                    <div className="table-responsive common-table card-box grey-box mb-2">
                      <table
                        border={1}
                        className="table border-0" {...getTableProps()}
                      >
                        <thead className="thead-color">
                          {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map(header => (
                                <th
                                  className="thead-color"
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
              </div>
        }
        
      </div>
      <AddRoleModal
        modal={modal.update}
        setModal={(e) => handleModalChange(e, 'update')}
        value={formik.values}
        setValue={(e, v) => handleAddChange(e, v)}
        handleAddClick={(type) => handleAddClick(type)}
        isFromUpdate={true}
        error={formik.errors}
        name = "Role"
        states={[]}
      />
      <DeleteRoleModal
        modal={modal.delete}
        setModal={(e) => handleModalChange(e, 'delete')}
        handleAddClick={(type) => handleAddClick(type)}
        name = "Role"
      />
      <AddRoleModal
        modal={modal.add}
        setModal={(e) => handleModalChange(e, 'add')}
        value={formik.values}
        setValue={(e, v) => handleAddChange(e, v)}
        handleAddClick={(type) => handleAddClick(type)}
        isFromUpdate={false}
        error={formik.errors}
        name = "Role"
        states={[]}
      />
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

export default Roles;
