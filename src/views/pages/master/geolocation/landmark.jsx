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

const Landmark = (props) => {
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
  const districts = useSelector((store) => store.master.geolocation.district);
  const subLocations = useSelector(
    (store) => store.master.geolocation.subLocation
  );
  const [showResult, setshowResult] = useState(true);
  const landmarks = useSelector((store) => store.master.geolocation.landmark);
  const [selected, setselected] = useState({
    state: "",
    city: "",
    zone: "",
    location: "",
    district: "",
    subLocation: "",
  });

  const formik = useFormik({
    initialValues: {
      state: "",
      district: "",
      city: "",
      zone: "",
      location: "",
      subLocation: "",
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
      if (!values.location || values.location === "Select") {
        errors.location = "Required!";
      }
      if (!values.subLocation || values.subLocation === "Select") {
        errors.subLocation = "Required!";
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
    if (selected.state !== "") {
      dispatch(GeolocationActions.getDistrict(selected.state.name));
    }
    if (selected.state !== "" && selected.district !== "") {
      dispatch(GeolocationActions.getCities(selected.district.name));
    }
    if (
      selected.state !== "" &&
      selected.district !== "" &&
      selected.city !== ""
    ) {
      dispatch(GeolocationActions.getZones(selected.city.name));
    }
    if (
      selected.state !== "" &&
      selected.district !== "" &&
      selected.city !== "" &&
      selected.zone !== ""
    ) {
      dispatch(GeolocationActions.getLocation(selected.zone.name));
    }
    if (
      selected.state !== "" &&
      selected.district !== "" &&
      selected.city !== "" &&
      selected.zone !== "" &&
      selected.location !== ""
    ) {
      dispatch(GeolocationActions.getSubLocation(selected.location.name));
    }
    if (
      selected.state !== "" &&
      selected.district !== "" &&
      selected.city !== "" &&
      selected.zone !== "" &&
      selected.location !== "" &&
      selected.subLocation !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getLandmark(selected.subLocation.name));
    }
    if (selected.state === "") {
      dispatch({
        type: Geolocationconstants.DELETE_CITY,
      });
    }
    if (selected.district === "") {
      dispatch({
        type: Geolocationconstants.DELETE_DISTRICT,
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
    if (selected.location === "") {
      dispatch({
        type: Geolocationconstants.DELETE_SUB_LOCATION,
      });
    }
    if (selected.subLocation === "") {
      dispatch({
        type: Geolocationconstants.DELETE_LANDMARK,
      });
    }

    return () => {
      dispatch({
        type: Geolocationconstants.DELETE_LANDMARK,
      });
    };
  }, [
    selected.city,
    selected.state,
    selected.zone,
    selected.location,
    selected.district,
    selected.subLocation,
  ]);

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
              title="Landmark Name"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Landmark Name",
        accessor: "name",
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
      data: landmarks,
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
        location: "",
        subLocation: "",
      });
      let data = states.length > 0 && states.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({
          ...selected,
          state: data[0],
          district: "",
          city: "",
          zone: "",
          location: "",
          subLocation: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_DISTRICT,
        });
      } else {
        setselected({
          ...selected,
          state: "",
          district: "",
          city: "",
          zone: "",
          location: "",
          subLocation: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_DISTRICT,
        });
      }
    } else if (e === "city") {
      formik.setValues({
        ...formik.values,
        city: v,
        zone: "",
        location: "",
        subLocation: "",
      });
      let data = cities.length > 0 && cities.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({
          ...selected,
          city: data[0],
          zone: "",
          location: "",
          subLocation: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_ZONE,
        });
      } else {
        setselected({
          ...selected,
          city: "",
          zone: "",
          location: "",
          subLocation: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_ZONE,
        });
      }
    } else if (e === "zone") {
      formik.setValues({
        ...formik.values,
        zone: v,
        location: "",
        subLocation: "",
      });
      let data = zones.length > 0 && zones.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({
          ...selected,
          zone: data[0],
          location: "",
          subLocation: "",
        });
        dispatch({
          type: Geolocationconstants.DELETE_LOCATION,
        });
      } else {
        setselected({ ...selected, zone: "", location: "", subLocation: "" });
        dispatch({
          type: Geolocationconstants.DELETE_LOCATION,
        });
      }
    } else if (e === "location") {
      formik.setValues({
        ...formik.values,
        location: v,
        subLocation: "",
      });
      let data =
        locations.length > 0 && locations.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({ ...selected, location: data[0], subLocation: "" });
        dispatch({
          type: Geolocationconstants.DELETE_SUB_LOCATION,
        });
      } else {
        setselected({ ...selected, location: "", subLocation: "" });
        dispatch({
          type: Geolocationconstants.DELETE_SUB_LOCATION,
        });
      }
    } else if (e === "subLocation") {
      formik.setValues({
        ...formik.values,
        subLocation: v,
      });
      let data =
        subLocations.length > 0 && subLocations.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({ ...selected, subLocation: data[0] });
        dispatch({
          type: Geolocationconstants.DELETE_LANDMARK,
        });
      } else {
        setselected({ ...selected, subLocation: "" });
        dispatch({
          type: Geolocationconstants.DELETE_LANDMARK,
        });
      }
    } else if (e === "district") {
      formik.setValues({
        ...formik.values,
        district: v,
        city: "",
        zone: "",
        location: "",
        subLocation: "",
      });
      let data =
        districts.length > 0 && districts.filter((val) => val.name === v);
      if (data.length > 0) {
        setselected({
          ...selected,
          district: data[0],
          city: "",
          zone: "",
          location: "",
          subLocation: "",
        });
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
        dispatch(GeolocationActions.addOrUpdateLandmark(formik.values));
      } else if (type === "update") {
        dispatch(GeolocationActions.addOrUpdateLandmark(formik.values));
      }
    }
    if (type === "delete") {
      dispatch(GeolocationActions.deleteLandmark({ _id: formik.values._id }));
    }
    setModal(!modal);
  };
  const networkRoleConstants = [
    Geolocationconstants.GET_LANDMARK,
    Geolocationconstants.ADD_OR_UPDATE_LANDMARK,
    Geolocationconstants.DELETE_LANDMARK,
  ];
  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Landmarks</div>
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
                          setselected({ ...selected, state: data[0] });
                        else
                          setselected({
                            ...selected,
                            state: "",
                            district: "",
                            city: "",
                            zone: "",
                          });
                      }}
                      value={selected.state.name}
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
                        let data = districts.filter(
                          (v) => v.name === e.target.value
                        );
                        if (data.length > 0)
                          setselected({ ...selected, district: data[0] });
                        else
                          setselected({
                            ...selected,
                            district: "",
                            city: "",
                            zone: "",
                          });
                      }}
                      value={selected.district.name}
                    >
                      <option>Select</option>
                      {districts &&
                        districts.length > 0 &&
                        districts.map((e) => <option>{e.name}</option>)}
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
                          setselected({ ...selected, city: data[0] });
                        else setselected({ ...selected, city: "", zone: "" });
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
                          setselected({ ...selected, zone: data[0] });
                        else
                          setselected({ ...selected, zone: "", location: "" });
                      }}
                      value={selected.zone.name}
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
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <div>
                    <label>Location</label>
                    <select
                      className="form-control form-control-lg react-form-input"
                      onChange={(e) => {
                        let data = locations.filter(
                          (v) => v.name === e.target.value
                        );
                        if (data.length > 0)
                          setselected({ ...selected, location: data[0] });
                        else setselected({ ...selected, location: "" });
                      }}
                      value={selected.location.name}
                    >
                      <option>Select</option>

                      {locations &&
                        locations.length > 0 &&
                        locations.map((e) => <option>{e.name}</option>)}
                    </select>
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <div>
                    <label>Sublocation</label>
                    <select
                      className="form-control form-control-lg react-form-input"
                      onChange={(e) => {
                        let data = subLocations.filter(
                          (v) => v.name === e.target.value
                        );
                        if (data.length > 0)
                          setselected({ ...selected, subLocation: data[0] });
                        else setselected({ ...selected, subLocation: "" });
                      }}
                      value={selected.subLocation.name}
                    >
                      <option>Select</option>

                      {subLocations &&
                        subLocations.length > 0 &&
                        subLocations.map((e) => <option>{e.name}</option>)}
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
                Add landmark
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
        ) : landmarks.length > 0 ? (
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
                  pages={pageCount}
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
                  pages={pageCount}
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
        name="Landmark"
        states={{
          state: states,
          city: cities,
          zone: zones,
          location: locations,
          district: districts,
          subLocation: subLocations,
        }}
        selected={selected}
      />
      <DeleteRoleModal
        modal={modal.delete}
        setModal={(e) => handleModalChange(e, "delete")}
        handleAddClick={(type) => handleAddClick(type)}
        name="Landmark"
        states={[]}
        selected={selected}
      />
      <AddRoleModal
        modal={modal.add}
        setModal={(e) => handleModalChange(e, "add")}
        value={formik.values}
        setValue={(e, v) => handleAddChange(e, v)}
        handleAddClick={(type) => handleAddClick(type)}
        isFromUpdate={false}
        error={formik.errors}
        name="Landmark"
        states={{
          state: states,
          city: cities,
          zone: zones,
          location: locations,
          district: districts,
          subLocation: subLocations,
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

export default Landmark;
