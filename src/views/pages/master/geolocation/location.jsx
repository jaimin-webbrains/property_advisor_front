import React, { useState, useMemo, useCallback, useEffect } from "react";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "../../../../components/reacttable/reacttbl.style";
import { useDispatch, useSelector } from "react-redux";
import Geolocationconstants from "redux/master/geolocation/constants";
import constant from "redux/networkCall/constant";
import { Button, Form, FormGroup, Spinner } from "reactstrap";
import DeleteRoleModal from "../masterModals/deleteModal";
import AddRoleModal from "../masterModals/addOrUpdateModal";
import RoleActions from "redux/master/Role/action";
import { useFormik } from "formik";
import GeolocationActions from "redux/master/geolocation/action";

const HeaderComponent = (props) => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
  };
  return <div className={classnames(classes)}>{props.title}</div>;
};

const Location = (props) => {
  const networkCalls = useSelector((store) => store.NetworkCall.NETWORK_CALLS);
  const [modal, setModal] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const states = useSelector((store) => store.master.geolocation.states);
  const cities = useSelector((store) => store.master.geolocation.cities);
  const zones = useSelector((store) => store.master.geolocation.zones);
  const locations = useSelector((store) => store.master.geolocation.location);
  const district = useSelector((store) => store.master.geolocation.district);
  const [showResult, setshowResult] = useState(true);

  const formik = useFormik({
    initialValues: {
      state: "",
      district: "",
      city: "",
      zone: "",
      locationGrade: "",
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
      if (!values.zone || values.zone === "Select") {
        errors.zone = "Required!";
      }
      if (!values.locationGrade) {
        errors.locationGrade = "Required!";
      }
      if (!values.name) {
        errors.name = "Required!";
      }
      return errors;
    },
    validateOnChange: true,
  });
  const [dummyData, setDummyData] = useState([]);
  const [selected, setselected] = useState({
    state: "",
    district: "",
    city: "",
    zone: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GeolocationActions.getStates());
    if (selected.state !== "") {
      dispatch(GeolocationActions.getDistrict(selected.state));
    }
    if (selected.state !== "" && selected.district !== "") {
      dispatch(GeolocationActions.getCities(selected.district));
    }
    if (
      selected.state !== "" &&
      selected.district !== "" &&
      selected.city !== ""
    ) {
      dispatch(GeolocationActions.getZones(selected.city));
    }
    if (
      selected.state !== "" &&
      selected.district !== "" &&
      selected.city !== "" &&
      selected.zone !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getLocation(selected.zone));
    }
    if (selected.state === "") {
      dispatch({
        type: Geolocationconstants.DELETE_DISTRICT,
      });
    }
    if (selected.district === "") {
      dispatch({
        type: Geolocationconstants.DELETE_CITY,
      });
    }
    if (selected.city === "") {
      dispatch({
        type: Geolocationconstants.DELETE_ZONE,
      });
    }
    if (selected.zone === "") {
      dispatch({
        type: Geolocationconstants.DELETE_LOCATION,
      });
    }

    return () => {
      dispatch({
        type: Geolocationconstants.DELETE_LOCATION,
      });
    };
  }, [selected.city, selected.state, selected.zone, selected.district]);
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
              title="Location Name"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Location Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Location grade"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Location grade",
        accessor: "locationGrade",
        disableFilters: true,
      },
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
      data: locations,
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
        zone: "",
      });
      let data = states.length > 0 && states.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({
          ...selected,
          state: data[0].name,
          city: "",
          zone: "",
          district: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_DISTRICT,
        });
      } else {
        setselected({
          ...selected,
          state: "",
          city: "",
          zone: "",
          district: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_DISTRICT,
        });
      }
    } else if (e === "district") {
      formik.setValues({
        ...formik.values,
        district: v,
        city: "",
        zone: "",
      });
      let data =
        district.length > 0 && district.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({
          ...selected,
          district: data[0].name,
          city: "",
          zone: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_CITY,
        });
      } else {
        setselected({
          ...selected,
          city: "",
          zone: "",
          district: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_CITY,
        });
      }
    } else if (e === "city") {
      formik.setValues({
        ...formik.values,
        city: v,
        zone: "",
      });
      let data = cities.length > 0 && cities.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({ ...selected, city: data[0].name, zone: "" });
        dispatch({
          type: Geolocationconstants.DELETE_ZONE,
        });
      } else {
        setselected({
          ...selected,
          city: "",
          zone: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_ZONE,
        });
      }
    } else if (e === "zone") {
      formik.setValues({
        ...formik.values,
        zone: v,
      });
      let data = zones.length > 0 && zones.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({ ...selected, zone: data[0].name });
        dispatch({
          type: Geolocationconstants.DELETE_LOCATION,
        });
      } else {
        setselected({
          ...selected,
          zone: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_LOCATION,
        });
      }
    } else {
      formik.setValues({ ...formik.values, [e]: v });
    }
  };
  const handleAddClick = (type) => {
    if (formik.values.name !== "") {
      if (type === "add") {
        dispatch(GeolocationActions.addOrUpdateLocation(formik.values));
      } else if (type === "update") {
        dispatch(GeolocationActions.addOrUpdateLocation(formik.values));
      }
    }
    if (type === "delete") {
      dispatch(GeolocationActions.deleteLocation({ _id: formik.values._id }));
    }
    setModal(!modal);
  };
  const networkRoleConstants = [
    Geolocationconstants.GET_LOCATION,
    Geolocationconstants.ADD_OR_UPDATE_LOCATION,
    Geolocationconstants.DELETE_LOCATION,
  ];
  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Locations</div>
        <div className="w-100">
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
                        if (data.length > 0)
                          setselected({ ...selected, state: data[0].name });
                        else
                          setselected({
                            ...selected,
                            state: "",
                            city: "",
                            zone: "",
                            district: "",
                          });
                      }}
                      value={selected.state}
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
                        if (data.length > 0)
                          setselected({ ...selected, district: data[0].name });
                        else
                          setselected({
                            ...selected,
                            district: "",
                            city: "",
                            zone: "",
                          });
                      }}
                      value={selected.district}
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
                        if (data.length > 0)
                          setselected({ ...selected, city: data[0].name });
                        else setselected({ ...selected, city: "", zone: "" });
                      }}
                      value={selected.city}
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
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <div>
                    <label>Zone</label>
                    <select
                      className="form-control form-control-lg react-form-input"
                      onChange={(e) => {
                        let data = zones.filter(
                          (v) => v.name === e.target.value
                        );
                        if (data.length > 0)
                          setselected({ ...selected, zone: data[0].name });
                        else setselected({ ...selected, zone: "" });
                      }}
                      value={selected.zone}
                    >
                      <option>Select</option>

                      {zones &&
                        zones.length > 0 &&
                        zones.map((e) => <option>{e.name}</option>)}
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
                Add Location
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
        ) : locations.length > 0 ? (
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
        name="Location"
        states={{
          state: states,
          city: cities,
          zone: zones,
          district: district,
        }}
        selected={selected}
      />
      <DeleteRoleModal
        modal={modal.delete}
        setModal={(e) => handleModalChange(e, "delete")}
        handleAddClick={(type) => handleAddClick(type)}
        name="Location"
        states={[]}
      />
      <AddRoleModal
        modal={modal.add}
        setModal={(e) => handleModalChange(e, "add")}
        value={formik.values}
        setValue={(e, v) => handleAddChange(e, v)}
        handleAddClick={(type) => handleAddClick(type)}
        isFromUpdate={false}
        error={formik.errors}
        name="Location"
        states={{
          state: states,
          city: cities,
          zone: zones,
          district: district,
        }}
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

export default Location;
