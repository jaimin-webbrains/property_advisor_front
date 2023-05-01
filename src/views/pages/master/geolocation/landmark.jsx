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
import { useFormik } from "formik";
import GeolocationActions from "redux/master/geolocation/action";
import GeolocationService from "redux/master/geolocation/service";

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
  const [popselected, setpopselected] = useState({
    state: "",
    city: "",
    zone: "",
    location: "",
    district: "",
    subLocation: "",
  });
  const [popLocData, setpopLockData] = useState({
    city: [],
    zone: [],
    location: [],
    district: [],
    subLocation: [],
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
        errors.state = "State is required!";
      }
      if (!values.district || values.district === "Select") {
        errors.district = "District is required!";
      }
      if (!values.city || values.city === "Select") {
        errors.city = "City is required!";
      }
      if (!values.zone || values.zone === "Select") {
        errors.zone = "Zone is required!";
      }
      if (!values.location || values.location === "Select") {
        errors.location = "Location is required!";
      }
      if (!values.subLocation || values.subLocation === "Select") {
        errors.subLocation = "Sub location is required!";
      }
      if (!values.name) {
        errors.name = "Landmark name is required!";
      }
      return errors;
    },
    validateOnChange: false,
  });
  const [dummyData, setDummyData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GeolocationActions.getStates());
    return () => {
      dispatch({
        type: Geolocationconstants.DELETE_LANDMARK,
      });
    };
  }, []);
  useEffect(() => {
    if (selected.state && selected.state.name !== "" && showResult) {
      dispatch(GeolocationActions.getDistrict(selected.state.name));
    }
    if (selected.state === "" && showResult) {
      dispatch({
        type: Geolocationconstants.DELETE_DISTRICT,
      });
    }
    if (popselected.state) {
      if (popselected.state !== "" && !showResult) {
        (async () => {
          await GeolocationService.GET_DISTRICT(popselected.state).then(
            (res) => {
              setpopLockData({
                ...popLocData,
                district: res.data.data,
                city: [],
                zone: [],
              });
            }
          );
        })();
      } else {
        setpopLockData({ ...popLocData, district: [], city: [], zone: [] });
      }
    }
  }, [selected.state.name, popselected.state]);
  useEffect(() => {
    if (
      selected.state.name !== "" &&
      selected.district &&
      selected.district.name !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getCities(selected.district.name));
    }
    if (selected.district === "" && showResult) {
      dispatch({
        type: Geolocationconstants.DELETE_CITY,
      });
    }
    if (popselected.district) {
      if (
        popselected.state !== "" &&
        popselected.district !== "" &&
        !showResult
      ) {
        (async () => {
          await GeolocationService.GET_CITIES(popselected.district).then(
            (res) => {
              setpopLockData({ ...popLocData, city: res.data.data, zone: [] });
            }
          );
        })();
      } else {
        setpopLockData({ ...popLocData, city: [], zone: [] });
      }
    }
  }, [selected.district.name, popselected.district]);
  useEffect(() => {
    if (
      selected.state.name !== "" &&
      selected.district.name !== "" &&
      selected.city &&
      selected.city.name !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getZones(selected.city.name));
    }
    if (selected.city === "" && showResult) {
      dispatch({
        type: Geolocationconstants.DELETE_ZONE,
      });
    }
    if (popselected.city) {
      if (
        popselected.state !== "" &&
        popselected.district !== "" &&
        popselected.city !== "" &&
        !showResult
      ) {
        (async () => {
          await GeolocationService.GET_ZONE(popselected.city).then((res) => {
            setpopLockData({ ...popLocData, zone: res.data.data });
          });
        })();
      } else {
        setpopLockData({ ...popLocData, zone: [] });
      }
    }
  }, [selected.city.name, popselected.city]);

  useEffect(() => {
    if (
      selected.state.name !== "" &&
      selected.district.name !== "" &&
      selected.city.name !== "" &&
      selected.zone &&
      selected.zone.name !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getLocation(selected.zone.name));
    }
    if (selected.zone === "" && showResult) {
      dispatch({
        type: Geolocationconstants.DELETE_LOCATION,
      });
    }
    if (popselected.zone) {
      if (
        popselected.state !== "" &&
        popselected.district !== "" &&
        popselected.city !== "" &&
        popselected.zone !== "" &&
        !showResult
      ) {
        (async () => {
          await GeolocationService.GET_LOCATION(popselected.zone).then(
            (res) => {
              setpopLockData({ ...popLocData, location: res.data.data });
            }
          );
        })();
      } else {
        setpopLockData({ ...popLocData, location: [] });
      }
    }
  }, [selected.zone.name, popselected.zone]);
  useEffect(() => {
    if (
      selected.state !== "" &&
      selected.city !== "" &&
      selected.zone !== "" &&
      selected.location &&
      selected.location.name !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getSubLocation(selected.location.name));
    }
    if (selected.location === "" && showResult) {
      dispatch({
        type: Geolocationconstants.DELETE_SUB_LOCATION,
      });
    }
    if (popselected.location) {
      if (
        popselected.state !== "" &&
        popselected.district !== "" &&
        popselected.city !== "" &&
        popselected.zone !== "" &&
        popselected.location !== "" &&
        !showResult
      ) {
        (async () => {
          await GeolocationService.GET_SUB_LOCATION(popselected.location).then(
            (res) => {
              setpopLockData({ ...popLocData, subLocation: res.data.data });
            }
          );
        })();
      } else {
        setpopLockData({ ...popLocData, subLocation: [] });
      }
    }
  }, [selected.location, popselected.location]);

  useEffect(() => {
    if (
      selected.state !== "" &&
      selected.district !== "" &&
      selected.city !== "" &&
      selected.zone !== "" &&
      selected.location !== "" &&
      selected.subLocation &&
      selected.subLocation.name !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getLandmark(selected.subLocation.name));
    }
    if (selected.subLocation === "" && showResult) {
      dispatch({
        type: Geolocationconstants.DELETE_LANDMARK,
      });
    }
  }, [selected.subLocation.name]);

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
      if (v !== "") {
        setpopselected({
          ...popselected,
          state: v,
          district: "",
          city: "",
          zone: "",
          location: "",
          subLocation: "",
        });
      } else {
        setpopselected({
          ...popselected,
          state: "",
          district: "",
          city: "",
          zone: "",
          location: "",
          subLocation: "",
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
      if (v !== "") {
        setpopselected({
          ...popselected,
          city: v,
          zone: "",
          location: "",
          subLocation: "",
        });
      } else {
        setpopselected({
          ...popselected,
          city: "",
          zone: "",
          location: "",
          subLocation: "",
        });
      }
    } else if (e === "zone") {
      formik.setValues({
        ...formik.values,
        zone: v,
        location: "",
        subLocation: "",
      });
      if (v !== "") {
        setpopselected({
          ...popselected,
          zone: v,
          location: "",
          subLocation: "",
        });
      } else {
        setpopselected({
          ...popselected,
          zone: "",
          location: "",
          subLocation: "",
        });
      }
    } else if (e === "location") {
      formik.setValues({
        ...formik.values,
        location: v,
        subLocation: "",
      });
      if (v !== "") {
        setpopselected({ ...popselected, location: v, subLocation: "" });
      } else {
        setpopselected({ ...popselected, location: "", subLocation: "" });
      }
    } else if (e === "subLocation") {
      formik.setValues({
        ...formik.values,
        subLocation: v,
      });
      if (v !== "") {
        setpopselected({ ...popselected, subLocation: v });
      } else {
        setpopselected({ ...popselected, subLocation: "" });
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
      if (v !== "") {
        setpopselected({
          ...popselected,
          district: v,
          city: "",
          zone: "",
          location: "",
          subLocation: "",
        });
      }
    } else {
      formik.setValues({ ...formik.values, [e]: v });
    }
  };
  const handleAddClick = (type) => {
    formik.validateForm().then((data) => {
      if (Object.keys(data).length === 0) {
        if (type === "add") {
          dispatch(GeolocationActions.addOrUpdateLandmark(formik.values));
          setshowResult(!showResult);
          setModal(!modal);
        } else if (type === "update") {
          dispatch(GeolocationActions.addOrUpdateLandmark(formik.values));
          setshowResult(!showResult);
          setModal(!modal);
        }
      }
      if (type === "delete") {
        dispatch(GeolocationActions.deleteLandmark({ _id: formik.values._id }));
        setshowResult(!showResult);
        setModal(!modal);
      }
    });
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
                          setselected({
                            ...selected,
                            state: data[0],
                            district: "",
                            city: "",
                            zone: "",
                            location: "",
                            subLocation: "",
                          });
                        else
                          setselected({
                            ...selected,
                            state: "",
                            district: "",
                            city: "",
                            zone: "",
                            location: "",
                            subLocation: "",
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
                          setselected({
                            ...selected,
                            district: data[0],
                            city: "",
                            zone: "",
                            location: "",
                            subLocation: "",
                          });
                        else
                          setselected({
                            ...selected,
                            district: "",
                            city: "",
                            zone: "",
                            location: "",
                            subLocation: "",
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
                          setselected({
                            ...selected,
                            city: data[0],
                            zone: "",
                            location: "",
                            subLocation: "",
                          });
                        else
                          setselected({
                            ...selected,
                            city: "",
                            zone: "",
                            location: "",
                            subLocation: "",
                          });
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
                          setselected({
                            ...selected,
                            zone: data[0],
                            location: "",
                            subLocation: "",
                          });
                        else
                          setselected({
                            ...selected,
                            zone: "",
                            location: "",
                            subLocation: "",
                          });
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
                          setselected({
                            ...selected,
                            location: data[0],
                            subLocation: "",
                          });
                        else
                          setselected({
                            ...selected,
                            location: "",
                            subLocation: "",
                          });
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
        name="Landmark"
        states={{
          state: states,
          city: popLocData.city,
          zone: popLocData.zone,
          location: popLocData.location,
          district: popLocData.district,
          subLocation: popLocData.subLocation,
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
          city: popLocData.city,
          zone: popLocData.zone,
          location: popLocData.location,
          district: popLocData.district,
          subLocation: popLocData.subLocation,
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
