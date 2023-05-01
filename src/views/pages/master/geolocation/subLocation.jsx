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

const Sublocation = (props) => {
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
  const [showResult, setshowResult] = useState(true);

  const [selected, setselected] = useState({
    state: "",
    city: "",
    zone: "",
    location: "",
    district: "",
  });
  const [popselected, setpopselected] = useState({
    state: "",
    city: "",
    zone: "",
    location: "",
    district: "",
  });
  const [popLocData, setpopLockData] = useState({
    city: [],
    zone: [],
    location: [],
    district: [],
    location: [],
  });
  const sublocations = useSelector(
    (store) => store.master.geolocation.subLocation
  );

  const formik = useFormik({
    initialValues: {
      state: "",
      district: "",
      city: "",
      zone: "",
      location: "",
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
    return () => {
      dispatch({
        type: Geolocationconstants.DELETE_SUB_LOCATION,
      });
    };
  }, []);

  useEffect(() => {
    if (selected.state.name && selected.state.name !== "" && showResult) {
      dispatch(GeolocationActions.getDistrict(selected.state.name));
    }
    if ( selected.state === "" && showResult) {
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
      selected.district.name &&
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
      selected.city.name && 
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
      selected.zone.name &&
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
      selected.location.name &&
      selected.location !== "" &&
      showResult
    ) {
      dispatch(GeolocationActions.getSubLocation(selected.location.name));
    }
    if (selected.location === "" && showResult) {
      dispatch({
        type: Geolocationconstants.DELETE_SUB_LOCATION,
      });
    }
  }, [selected.location.name]);

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
              title="Sub location Name"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "Sub location Name",
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
      data: sublocations,
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
      });
      if (v !== "") {
        setpopselected({
          ...popselected,
          state: v,
          district: "",
          city: "",
          zone: "",
          location: "",
        });
      } else {
        setpopselected({
          ...popselected,
          state: "",
          district: "",
          city: "",
          zone: "",
          location: "",
        });
      }
    } else if (e === "city") {
      formik.setValues({
        ...formik.values,
        city: v,
        zone: "",
        location: "",
      });
      if (v !== "") {
        setpopselected({ ...popselected, city: v, zone: "", location: "" });
      } else {
        setpopselected({ ...popselected, city: "", zone: "", location: "" });
      }
    } else if (e === "zone") {
      formik.setValues({
        ...formik.values,
        zone: v,
        location: "",
      });
      if (v !== "") {
        setpopselected({ ...popselected, zone: v, location: "" });
      } else {
        setpopselected({ ...popselected, zone: "", location: "" });
      }
    } else if (e === "location") {
      formik.setValues({
        ...formik.values,
        location: v,
      });
      if (v !== "") {
        setpopselected({ ...popselected, location: v });
      } else {
        setpopselected({ ...popselected, location: "" });
      }
    } else if (e === "district") {
      formik.setValues({
        ...formik.values,
        district: v,
        city: "",
        zone: "",
        location: "",
      });
      if (v !== "") {
        setpopselected({
          ...popselected,
          district: v,
          city: "",
          zone: "",
          location: "",
        });
      } else {
        setpopselected({
          ...popselected,
          district: "",
          city: "",
          zone: "",
          location: "",
        });
      }
    } else {
      formik.setValues({ ...formik.values, [e]: v });
    }
  };
  const handleAddClick = (type) => {
    if (formik.values.name !== "") {
      if (type === "add") {
        dispatch(GeolocationActions.addOrUpdateSubLocation(formik.values));
      } else if (type === "update") {
        dispatch(GeolocationActions.addOrUpdateSubLocation(formik.values));
      }
    }
    if (type === "delete") {
      dispatch(
        GeolocationActions.deleteSubLocation({ _id: formik.values._id })
      );
    }
    setshowResult(!showResult);
    setModal(!modal);
  };
  const networkRoleConstants = [
    Geolocationconstants.GET_SUB_LOCATION,
    Geolocationconstants.ADD_OR_UPDATE_SUB_LOCATION,
    Geolocationconstants.DELETE_SUB_LOCATION,
  ];
  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Sub-locations</div>
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
                          setselected({
                            ...selected,
                            zone: data[0],
                            location: "",
                          });
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
                Add Sublocation
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
        ) : sublocations.length > 0 ? (
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
        name="Sub-location"
        states={{
          state: states,
          city: popLocData.city,
          zone: popLocData.zone,
          location: popLocData.location,
          district: popLocData.district,
        }}
        selected={selected}
      />
      <DeleteRoleModal
        modal={modal.delete}
        setModal={(e) => handleModalChange(e, "delete")}
        handleAddClick={(type) => handleAddClick(type)}
        name="Sub-location"
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
        name="sub-location"
        states={{
          state: states,
          city: popLocData.city,
          zone: popLocData.zone,
          location: popLocData.location,
          district: popLocData.district,
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

export default Sublocation;
