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

const City = (props) => {
  const networkCalls = useSelector((store) => store.NetworkCall.NETWORK_CALLS);
  const [modal, setModal] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const states = useSelector((store) => store.master.geolocation.states);
  const districts = useSelector((store) => store.master.geolocation.district);
  const [selected, setselected] = useState({ state: "", district: "" });
  const [popselected, setPopSelected] = useState({ state: "", district: "" });
  const [popLocData, setPopLocData] = useState({ district: [] });
  const [showResult, setshowResult] = useState(true);

  const formik = useFormik({
    initialValues: {
      state: "",
      district: "",
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
      if (!values.name) {
        errors.name = "City name is required!";
      }
      return errors;
    },
    validateOnChange: false,
  });
  const cities = useSelector((store) => store.master.geolocation.cities);
  const [dummyData, setDummyData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selected.state !== "" && selected.district !== "" && showResult) {
      dispatch(GeolocationActions.getCities(selected.district));
    }
    if (selected.state === "") {
      dispatch({
        type: Geolocationconstants.DELETE_CITY,
      });
      dispatch({
        type: Geolocationconstants.DELETE_DISTRICT,
      });
    }
  }, [selected.district, popselected.district]);
  useEffect(() => {
    if (selected && selected.state !== "" && showResult) {
      dispatch(GeolocationActions.getDistrict(selected.state));
      setselected({ ...selected, district: "" });
    }
    if (!selected.state)
      dispatch({
        type: Geolocationconstants.DELETE_DISTRICT,
      });
    if (popselected.state !== "") {
      (async () => {
        await GeolocationService.GET_DISTRICT(popselected.state).then((res) => {
          setPopLocData({ ...popLocData, district: res.data.data });
        });
      })();
    }
  }, [selected.state, popselected.state]);
  useEffect(() => {
    dispatch(GeolocationActions.getStates());
    return () => {
      dispatch({
        type: Geolocationconstants.DELETE_CITY,
      });
    };
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
              title="City name"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "City name",
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
      data: cities,
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
    if (e === "state") {
      formik.setValues({
        ...formik.values,
        state: v,
        district: "",
      });
      setPopSelected({ ...popselected, state: v, district: "" });
    } else if (e === "district") {
      formik.setValues({
        ...formik.values,
        district: v,
      });
      setPopSelected({ ...popselected, district: v });
    } else {
      formik.setValues({ ...formik.values, [e]: v });
    }
  };
  const handleAddClick = (type) => {
    formik.validateForm().then((data) => {
      if (Object.keys(data).length === 0) {
        if (type === "add") {
          dispatch(GeolocationActions.addCity(formik.values));
          setModal(!modal);
          setshowResult(!showResult);
        } else if (type === "update") {
          dispatch(GeolocationActions.addCity(formik.values));
          setModal(!modal);
          setshowResult(!showResult);
        }
      }
      if (type === "delete") {
        dispatch(GeolocationActions.deleteCity({ id: formik.values._id }));
        setModal(!modal);
        setshowResult(!showResult);
      }
    });
  };
  const networkRoleConstants = [
    Geolocationconstants.GET_CITIES,
    Geolocationconstants.DELETE_CITY,
    Geolocationconstants.ADD_CITY,
    Geolocationconstants.UPDATE_CITY,
  ];

  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Cities</div>
        <div className=" w-100">
          <div className="row">
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <label>State</label>
                  <select
                    className="form-control form-control-lg react-form-input"
                    onChange={(e) => {
                      let data = states.filter(
                        (v) => v.name.trim() === e.target.value.trim()
                      );
                      if (data.length > 0)
                        setselected({
                          ...selected,
                          state: data[0].name,
                          district: "",
                        });
                      else {
                        dispatch({
                          type: Geolocationconstants.DELETE_CITY,
                        });
                        setselected({ ...selected, state: "", district: "" });
                      }
                    }}
                    value={selected.state}
                  >
                    <option>Select</option>
                    {states &&
                      states.length > 0 &&
                      states.map((e) => <option>{e.name}</option>)}
                  </select>
                </FormGroup>
              </Form>
            </div>
            <div className="col pr-2">
              <Form>
                <FormGroup>
                  <label>District</label>
                  <select
                    className="form-control form-control-lg react-form-input"
                    onChange={(e) => {
                      let data = districts.filter(
                        (v) => v.name.trim() === e.target.value.trim()
                      );
                      if (data.length > 0)
                        setselected({ ...selected, district: data[0].name });
                      else {
                        dispatch({
                          type: Geolocationconstants.DELETE_CITY,
                        });
                        setselected({ ...selected, district: "" });
                      }
                    }}
                    value={selected.district}
                  >
                    <option>Select</option>
                    {districts &&
                      districts.length > 0 &&
                      districts.map((e) => <option>{e.name}</option>)}
                  </select>
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
                Add city
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
        ) : cities.length > 0 ? (
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
        name="City"
        states={{ state: states, district: popLocData.district }}
        selected={selected}
      />
      <DeleteRoleModal
        modal={modal.delete}
        setModal={(e) => handleModalChange(e, "delete")}
        handleAddClick={(type) => handleAddClick(type)}
        name="City"
      />
      <AddRoleModal
        modal={modal.add}
        setModal={(e) => handleModalChange(e, "add")}
        value={formik.values}
        setValue={(e, v) => handleAddChange(e, v)}
        handleAddClick={(type) => handleAddClick(type)}
        isFromUpdate={false}
        error={formik.errors}
        name="City"
        states={{ state: states, district: popLocData.district }}
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

export default City;
