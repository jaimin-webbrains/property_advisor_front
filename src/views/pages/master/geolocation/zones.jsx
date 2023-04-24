import React, { useState, useMemo, useCallback, useEffect } from "react";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "../../../../components/reacttable/reacttbl.style";
import { useDispatch, useSelector } from "react-redux";
import Geolocationconstants from "redux/master/geolocation/constants";
import constant from "redux/networkCall/constant";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import DeleteRoleModal from "../masterModals/deleteModal";
import AddRoleModal from "../masterModals/addOrUpdateModal";
import RoleActions from "redux/master/Role/action";
import { useFormik } from "formik";
import GeolocationActions from "redux/master/geolocation/action";
import { Select } from "react-select/dist/Select-a783e33f.cjs.prod";

const HeaderComponent = (props) => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
  };
  return <div className={classnames(classes)}>{props.title}</div>;
};

const Zone = (props) => {
  const networkCalls = useSelector((store) => store.NetworkCall.NETWORK_CALLS);
  const [modal, setModal] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const geolocation = useSelector((store) => store.master.geolocation);
  const { states, cities, district, zones } = geolocation;
  const [selected, setselected] = useState({ state: "", city: "", district });
  const [showResult, setshowResult] = useState(true);

  const formik = useFormik({
    initialValues: {
      state: "",
      district: "",
      city: "",
      name: "",
      description: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.state || values.state === "Select") {
        errors.state = "Required!";
      }
      if (!values.district || values.district === "Select") {
        errors.district = "Required!";
      }
      if (!values.city || values.city === "Select") {
        errors.city = "Required!";
      }
      if (!values.name) {
        errors.name = "Required!";
      }
      return errors;
    },
    validateOnChange: true,
  });
  const [dummyData, setDummyData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GeolocationActions.getStates());
  }, []);

  const deleteClick = useCallback(
    (data) => {
      // Here you can view the data and delete through API calling
      const array = dummyData;
      remove(array, function(n) {
        return n.id === data.id;
      });
      setDummyData([...array]);
    },
    [dummyData]
  );

  const columns = useMemo(
    () => [
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Zone name"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Zone name",
        accessor: "name",
        disableFilters: true,
      },
      // {
      //   Header: (tableInstance) => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="City name"
      //       />
      //     );
      //   },
      //   Filter: FilterComponent,
      //   placeholder: "City name",
      //   accessor: "city.name",
      //   disableFilters: true,
      // },
      // {
      //   Header: (tableInstance) => {
      //     return (
      //       <HeaderComponent
      //         isSortedDesc={tableInstance.column.isSortedDesc}
      //         title="State name"
      //       />
      //     );
      //   },
      //   Filter: FilterComponent,
      //   placeholder: "State name",
      //   accessor: "state.name",
      //   disableFilters: true,
      // },
      {
        Header: (tableInstance) => {
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
        Cell: (tableInstance) => {
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
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          );
        },
      },
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
    state: { pageIndex },
  } = useTable(
    {
      data: zones,
      columns: columns,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleModalChange = (e, tab) => {
    if (tab === "update") {
      setModal({ ...modal, update: e });
    } else if (tab === "add") {
      setModal({ ...modal, add: e });
    } else {
      setModal({ ...modal, delete: e });
    }
    setshowResult(!showResult);
  };
  const handleAddChange = (e, v) => {
    // formik.setValues({ ...formik.values, [e]: v });
    if (e === "state") {
      formik.setValues({
        ...formik.values,
        state: v,
        district: "",
        city: "",
      });
      let data = states.length > 0 && states.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({ ...selected, state: data[0] });
        dispatch({
          type: Geolocationconstants.DELETE_DISTRICT,
        });
      } else {
        setselected({ ...selected, state: "", district: "", city: "" });
        dispatch({
          type: Geolocationconstants.DELETE_DISTRICT,
        });
      }
    } else if (e === "city") {
      formik.setValues({
        ...formik.values,
        city: v,
      });
      let data = cities.length > 0 && cities.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({ ...selected, city: data[0] });
        dispatch({
          type: Geolocationconstants.DELETE_ZONE,
        });
      } else {
        dispatch({
          type: Geolocationconstants.DELETE_ZONE,
        });
      }
    } else if (e === "district") {
      formik.setValues({
        ...formik.values,
        district: v,
        city: "",
      });
      let data =
        district.length > 0 && district.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({ ...selected, district: data[0] });
        dispatch({
          type: Geolocationconstants.DELETE_CITY,
        });
      } else {
        setselected({ ...selected, district: "", city: "" });
        dispatch({
          type: Geolocationconstants.DELETE_CITY,
        });
      }
    } else {
      formik.setValues({ ...formik.values, [e]: v });
    }
  };
  const handleAddClick = (type) => {
    if (formik.values.name !== "") {
      if (type === "add") {
        dispatch(GeolocationActions.addOrUpdateZone(formik.values));
      } else if (type === "update") {
        dispatch(GeolocationActions.addOrUpdateZone(formik.values));
      }
    }
    if (type === "delete") {
      dispatch(GeolocationActions.deleteZone({ _id: formik.values._id }));
    }
    setModal(!modal);
  };
  const networkRoleConstants = [
    Geolocationconstants.GET_ZONES,
    Geolocationconstants.ADD_ZONE,
    Geolocationconstants.UPDATE_ZONE,
    Geolocationconstants.DELETE_ZONE,
  ];
  useEffect(() => {
    if (selected.state._id) {
      dispatch(GeolocationActions.getDistrict(selected.state.name));
    }
    if (!selected.state.name || selected.state.name === "") {
      dispatch({
        type: Geolocationconstants.DELETE_DISTRICT,
      });
    }
    return () => {
      dispatch({
        type: Geolocationconstants.DELETE_ZONE,
      });
    };
  }, [selected.state]);
  useEffect(() => {
    if (
      selected.city.name !== "" &&
      selected.city.name !== undefined &&
      showResult
    ) {
      dispatch(GeolocationActions.getZones(selected.city.name));
    }
    if (!selected.city.name || selected.city.name === "") {
      dispatch({
        type: Geolocationconstants.DELETE_ZONE,
      });
    }
  }, [selected.city]);
  useEffect(() => {
    if (selected.district.name !== "" && selected.district.name !== undefined) {
      dispatch(GeolocationActions.getCities(selected.district.name));
    }
    if (!selected.district.name || selected.district.name === "") {
      dispatch({
        type: Geolocationconstants.DELETE_ZONE,
      });
      dispatch({
        type: Geolocationconstants.DELETE_CITY,
      });
    }
  }, [selected.district]);
  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Zones</div>
        <div className=" w-100">
          <div className="row">
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <div>
                    <label>State</label>
                    <select
                      className="form-control form-control-lg react-form-input"
                      onChange={(e) => {
                        let data = states.filter(
                          (v) => v.name === e.target.value
                        );
                        if (data.length > 0) {
                          setselected({ ...selected, state: data[0] });
                          dispatch({
                            type: Geolocationconstants.DELETE_DISTRICT,
                          });
                        } else {
                          setselected({
                            ...selected,
                            state: "",
                            city: "",
                            district: "",
                          });
                          dispatch({
                            type: Geolocationconstants.DELETE_DISTRICT,
                          });
                        }
                      }}
                      value={selected.state.name ? selected.state.name : ""}
                    >
                      <option>Select</option>
                      {states &&
                        states.length > 0 &&
                        states.map((e) => <option>{e.name}</option>)}
                    </select>
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <div>
                    <label>District</label>
                    <select
                      className="form-control form-control-lg react-form-input"
                      onChange={(e) => {
                        let data = district.filter(
                          (v) => v.name === e.target.value
                        );
                        if (data.length > 0) {
                          setselected({
                            ...selected,
                            district: data[0],
                            city: "",
                          });
                          dispatch({
                            type: Geolocationconstants.DELETE_CITY,
                          });
                        } else {
                          setselected({ ...selected, district: "", city: "" });
                          dispatch({
                            type: Geolocationconstants.DELETE_ZONE,
                          });
                        }
                      }}
                      value={selected.district.name}
                    >
                      <option>Select</option>

                      {district &&
                        district.length > 0 &&
                        district.map((e) => <option>{e.name}</option>)}
                    </select>
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <div>
                    <label>City</label>
                    <select
                      className="form-control form-control-lg react-form-input"
                      onChange={(e) => {
                        let data = cities.filter(
                          (v) => v.name === e.target.value
                        );
                        if (data.length > 0) {
                          setselected({ ...selected, city: data[0] });
                          dispatch({
                            type: Geolocationconstants.DELETE_ZONE,
                          });
                        } else {
                          setselected({ ...selected, city: "" });
                          dispatch({
                            type: Geolocationconstants.DELETE_ZONE,
                          });
                        }
                      }}
                      value={selected.city.name}
                    >
                      <option>Select</option>

                      {cities &&
                        cities.length > 0 &&
                        cities.map((e) => <option>{e.name}</option>)}
                    </select>
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div className="col-sm-auto">
              <label>&nbsp;</label>
              <Button
                className="btn btn-blue w-100 mb-3"
                onClick={(e) => {
                  setModal({ ...modal, add: e });
                  formik.setValues(formik.initialValues);
                  setshowResult(!showResult);
                }}
              >
                {" "}
                <i className="fas fa-plus mr-10" />
                Add zone
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {networkRoleConstants.some((i) => networkCalls.includes(i)) ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner color="primary" />
          </div>
        ) : zones.length > 0 ? (
          <div className="div-container">
            <ReactTableWrapper {...props}>
              <div className="row title-sec align-items-center">
                <div className="table-responsive common-table card-box grey-box mb-2">
                  <table
                    border={1}
                    className="table border-0"
                    {...getTableProps()}
                  >
                    <thead className="thead-color">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((header) => (
                            <th
                              className="thead-color"
                              {...header.getHeaderProps(
                                header.getSortByToggleProps()
                              )}
                            >
                              <div>{header.render("Header")}</div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}></tr>
                      ))}
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                              <td
                                className="td-border"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  onPageChange={gotoPage}
                  pages={pageCount === 0 ? 1 : pageCount}
                  page={pageIndex}
                />
              </div>
            </ReactTableWrapper>
          </div>
        ) : (
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
                    className="table border-0"
                    {...getTableProps()}
                  >
                    <thead className="thead-color">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((header) => (
                            <th
                              className="thead-color"
                              {...header.getHeaderProps(
                                header.getSortByToggleProps()
                              )}
                            >
                              <div>{header.render("Header")}</div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      <tr>
                        {networkCalls.indexOf(
                          constant.ADD_TRACKS_LIST_NETWORK_CALL
                        ) > -1 ? (
                          <td colSpan={8}>
                            <div className="d-flex justify-content-center align-items-center">
                              <Spinner color="primary" />
                            </div>
                          </td>
                        ) : (
                          <td colSpan={8} style={{ color: "#898989" }}>
                            No records found
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Pagination
                  onPageChange={gotoPage}
                  pages={pageCount === 0 ? 1 : pageCount}
                  page={pageIndex}
                />
              </div>
            </ReactTableWrapper>
          </div>
        )}
      </div>
      <AddRoleModal
        modal={modal.update}
        setModal={(e) => handleModalChange(e, "update")}
        value={formik.values}
        setValue={(e, v) => handleAddChange(e, v)}
        handleAddClick={(type) => handleAddClick(type)}
        isFromUpdate={true}
        error={formik.errors}
        name="Zone"
        states={{ state: states, city: cities, district: district }}
        selected={selected}
      />
      <DeleteRoleModal
        modal={modal.delete}
        setModal={(e) => handleModalChange(e, "delete")}
        handleAddClick={(type) => handleAddClick(type)}
        name="Zone"
      />
      <AddRoleModal
        modal={modal.add}
        setModal={(e) => handleModalChange(e, "add")}
        value={formik.values}
        setValue={(e, v) => handleAddChange(e, v)}
        handleAddClick={(type) => handleAddClick(type)}
        isFromUpdate={false}
        error={formik.errors}
        name="Zone"
        states={{ state: states, city: cities, district: district }}
        selected={selected}
      />
    </div>
  );
};

const FilterComponent = (tableInstance) => {
  const { filterValue, setFilter } = tableInstance.column;
  return (
    <input
      type="text"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      className="tabl-search react-form-input"
      placeholder={`Search ${tableInstance.column.placeholder}`}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default Zone;
