import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DatepickerWrapper from "components/forms/alldatepickers/datepicker.style";

import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import PropertyActions from "redux/property/action";
import "react-toastify/dist/ReactToastify.css";
import { format } from 'date-fns';
import constants from "redux/property/constants";
import ModalExample from "./ModalView";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import constant from "redux/networkCall/constant";
import PageTitle from "components/common/PageTitle";
import GeolocationActions from "redux/master/geolocation/action";


const ProjectEntery = props => {
  const dispatch = useDispatch();
  const propertyData = useSelector(store => store.property);
  const states = useSelector(store => store.master.geolocation.states);
  const networkCalls = useSelector(store => store.NetworkCall.NETWORK_CALLS)
  const [isSubmitButtonDisables, setIsSubmitButtonDisables] = useState(false)
  const [bool, setBool] = useState({ num: false, modal: false })
  const buttonBack = {
    backgroundColor: "#563c91",
    color: "white"
  };
  const formik = useFormik({
    initialValues: {
      state: "Telangana",
      reraNumber: "",
      certFileName: "",
      certExtFileName: "",
      detailsFileName: "",
      detailsURL: "",
      lastModifiedDate: "",
      reraApprovedDate: "",
      reraProjectStartDate: "",
      projectEndDate: "",
      paId: "",
      city: "",
      location: "",
      subAreaName: "",
      propertyType: "",
      colonyName: "",
    },
    onSubmit: values => {
      let formData = new FormData();
      formData.append("state", values.state);
      formData.append("reraNumber", values.reraNumber);
      formData.append("lastModifiedDate", values.lastModifiedDate);
      formData.append("reraApprovedDate", values.reraApprovedDate);
      formData.append("reraProjectStartDate", values.reraProjectStartDate);
      formData.append("projectEndDate", values.projectEndDate);
      formData.append("detailsURL", values.detailsURL);
      formData.append("certFileName", values.certFileName);
      formData.append("certExtFileName", values.certExtFileName);
      formData.append("detailsFileName", values.detailsFileName);
      formData.append("paId", values.paId)
      formData.append("city", values.city)
      formData.append("location", values.location)
      formData.append("subAreaName", values.subAreaName)
      formData.append("propertyType", values.propertyType)
      formData.append("colonyName", values.colonyName)

      dispatch(PropertyActions.addTsData(formData));
      formik.resetForm()
    },
    validate: values => {
      const URLregex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      let errors = {};
      if (!values.state) {
        errors.state = "Required!";
      }
      if (!values.reraNumber) {
        errors.reraNumber = "Required!";
      }
      if (!values.certFileName) {
        errors.certFileName = "Required!";
      }
      if (!values.detailsFileName) {
        errors.detailsFileName = "Required!";
      }
      if (!values.lastModifiedDate) {
        errors.lastModifiedDate = "Required!";
      }
      if (!values.reraApprovedDate) {
        errors.reraApprovedDate = "Required!";
      }
      if (!values.reraProjectStartDate) {
        errors.reraProjectStartDate = "Required!";
      }
      if (!values.projectEndDate) {
        errors.projectEndDate = "Required!";
      }
      if (!values.detailsURL) {
        errors.detailsURL = "Required!";
      } else if (!URLregex.test(values.detailsURL)) {
        errors.detailsURL = "Invalid URL!";
      }
      return errors;
    },
    validateOnChange: false
  });
  useEffect(() => {
    dispatch(GeolocationActions.getStates());
    // dispatch(PropertyActions.getTsDataByReraNumberOrPaId("a"))
  }, []);
  const handleIsExistByReraNumber = () => {
    dispatch(PropertyActions.getTsDataByReraNumberOrPaId(formik.values.reraNumber))
  }
  useEffect(() => {
    if (propertyData.tracks_data.length > 0) {
      setBool({ ...bool, num: true, modal: true })
    }
  }, [propertyData.tracks_data])

  const handleModalChange = (e) => {
    setBool({ ...bool, num: e, modal: e })

  }
  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Project Entry</div>
      </div>
      {
        networkCalls.indexOf(constant.ADD_PROPERTY_NETWORK_CALL) > -1
          ?
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner color="primary" />
          </div>
          :
          <div className="div-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="div-container">
                <Row>
                  <Col xl={8} className="pr-xl-2">
                    <Card className="card-box customer-form-card1">
                      <CardBody>
                        <Row>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                State <span className="error-msg">*</span>
                              </label>
                              <select
                                id="state"
                                name="state"
                                className="form-control form-control-lg react-form-input"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                              >
                                {states && states.length > 0 ? (
                                  states.map(opt => (
                                    <option>{opt.state_name}</option>
                                  ))
                                ) : (
                                  <option>No data</option>
                                )}
                              </select>
                              {formik.errors.state && (
                                <p style={{ color: "red" }}>{formik.errors.state}</p>
                              )}
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                RERA number <span className="error-msg">*</span>
                              </label>
                              <input
                                id="reraNumber"
                                name="reraNumber"
                                type="text"
                                onChange={value => {
                                  formik.setFieldValue("reraNumber", value.target.value);
                                  if (value.target.value === "") {
                                    dispatch({
                                      type: constants.GET_ALL_TS_DATA,
                                      payload: []
                                    })
                                  }
                                }}
                                onBlur={() => handleIsExistByReraNumber()}
                                value={formik.values.reraNumber}
                                className="form-control form-control-lg react-form-input"
                              />
                              {formik.values.reraNumber && bool.num && propertyData.tracks_data.length > 0 && (
                                <ModalExample
                                  modal={bool.modal}
                                  setModal={(e) => handleModalChange(e)}
                                  data={propertyData.tracks_data}
                                  isFromRRInput={true}
                                />
                                // <p style={{ color: "red" }}>{`${propertyData.tracks_data.length} versions already exist with this RERA number and last modifieded date is ${format(new Date(propertyData.tracks_data[0].lastModifiedDate), 'dd/MM/yyyy')}`}</p>
                              )}
                              {formik.errors.reraNumber && (
                                <p style={{ color: "red" }}>{formik.errors.reraNumber}</p>
                              )}
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <DatepickerWrapper {...props}>

                                <label>
                                  Last modified date <span className="error-msg">*</span>
                                </label>
                                <DatePicker
                                  selected={formik.values.lastModifiedDate}
                                  onChange={value => {
                                    formik.setFieldValue("lastModifiedDate", new Date(value));
                                    if (formik.values.reraNumber !== "" && propertyData.tracks_data.length > 0) {
                                      let bool = false
                                      propertyData.tracks_data.forEach((e) => {
                                        if (format(new Date(e.lastModifiedDate), 'dd/MM/yyyy') === format(new Date(value), 'dd/MM/yyyy')) {
                                          bool = true
                                        }
                                      })
                                      setIsSubmitButtonDisables(bool)
                                      setBool({ ...bool, modal: !bool.modal })
                                    }
                                  }}
                                  dateFormat="dd-MM-yyyy"
                                  id="lastModifiedDate"
                                  name="lastModifiedDate"
                                  className="custom-datepicker"
                                  maxDate={new Date()}
                                  calendarClassName="custom-calender-class"
                                />
                                {isSubmitButtonDisables && bool.modal && (
                                  <ModalExample
                                    modal={bool.modal}
                                    setModal={(e) => setBool({ ...bool, modal: e })}
                                    data={propertyData.tracks_data}
                                    isFromRRInput={false}
                                  />
                                  // <p style={{ color: "red" }}>Data already present with this RERA number and last modified date.</p>
                                )}
                                {formik.errors.lastModifiedDate && (
                                  <p style={{ color: "red" }}>{formik.errors.lastModifiedDate}</p>
                                )}
                              </DatepickerWrapper>
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <DatepickerWrapper {...props}>

                                <label>
                                  RERA approved date <span className="error-msg">*</span>
                                </label>
                                <DatePicker
                                  selected={formik.values.reraApprovedDate}
                                  onChange={value => {
                                    formik.setFieldValue("reraApprovedDate", new Date(value));
                                  }}
                                  maxDate={new Date()}
                                  dateFormat="dd-MM-yyyy"
                                  id="reraApprovedDate"
                                  name="reraApprovedDate"
                                  className="custom-datepicker"
                                  calendarClassName="custom-calender-class"
                                />
                                {formik.errors.reraApprovedDate && (
                                  <p style={{ color: "red" }}>{formik.errors.reraApprovedDate}</p>
                                )}
                              </DatepickerWrapper>
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <DatepickerWrapper {...props}>

                                <label>
                                  RERA project start date <span className="error-msg">*</span>
                                </label>
                                <DatePicker
                                  selected={formik.values.reraProjectStartDate}
                                  onChange={value => {
                                    formik.setFieldValue("reraProjectStartDate", new Date(value));
                                  }}
                                  dateFormat="dd-MM-yyyy"
                                  id="reraProjectStartDate"
                                  name="reraProjectStartDate"
                                  className="custom-datepicker"
                                  maxDate={new Date()}
                                  calendarClassName="custom-calender-class"
                                />
                                {formik.errors.reraProjectStartDate && (
                                  <p style={{ color: "red" }}>
                                    {formik.errors.reraProjectStartDate}
                                  </p>
                                )}
                              </DatepickerWrapper>
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <DatepickerWrapper {...props}>

                                <label>
                                  Project end date <span className="error-msg">*</span>
                                </label>
                                <DatePicker
                                  selected={formik.values.projectEndDate}
                                  onChange={value => {
                                    formik.setFieldValue("projectEndDate", new Date(value));
                                  }}
                                  dateFormat="dd-MM-yyyy"
                                  id="projectEndDate"
                                  name="projectEndDate"
                                  minDate={new Date()}
                                  className="custom-datepicker"
                                  calendarClassName="custom-calender-class"
                                />
                                {formik.errors.projectEndDate && (
                                  <p style={{ color: "red" }}>{formik.errors.projectEndDate}</p>
                                )}
                              </DatepickerWrapper>
                            </div>
                          </Col>

                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Certificate file name <span className="error-msg">*</span>
                              </label>
                              <input
                                id="certFileName"
                                name="certFileName"
                                accept=".pdf"
                                onChange={event => {
                                  formik.setFieldValue(
                                    "certFileName",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                type="file"
                                className="form-control form-control-lg react-form-input"
                              />
                              {formik.errors.certFileName && (
                                <p style={{ color: "red" }}>{formik.errors.certFileName}</p>
                              )}
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Certificate ext file name
                              </label>
                              <input
                                id="certExtFileName"
                                name="certExtFileName"
                                accept=".pdf"
                                onChange={e =>
                                  formik.setFieldValue(
                                    "certExtFileName",
                                    e.currentTarget.files[0]
                                  )
                                }
                                type="file"
                                className="form-control form-control-lg react-form-input"
                              />
                              {formik.errors.certExtFileName && (
                                <p style={{ color: "red" }}>{formik.errors.certExtFileName}</p>
                              )}
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Details file name <span className="error-msg">*</span>
                              </label>
                              <input
                                type="file"
                                accept=".xlsx"
                                className="form-control form-control-lg react-form-input"
                                onChange={e =>
                                  formik.setFieldValue(
                                    "detailsFileName",
                                    e.currentTarget.files[0]
                                  )
                                }
                                id="detailsFileName"
                                name="detailsFileName"
                              />
                              {formik.errors.detailsFileName && (
                                <p style={{ color: "red" }}>{formik.errors.detailsFileName}</p>
                              )}
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                City
                              </label>
                              <input
                                id="city"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                className="form-control form-control-lg react-form-input"
                              />
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Location
                              </label>
                              <input
                                id="location"
                                name="location"
                                onChange={formik.handleChange}
                                value={formik.values.location}
                                className="form-control form-control-lg react-form-input"
                              />
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Sub area name
                              </label>
                              <input
                                id="subAreaName"
                                name="subAreaName"
                                onChange={formik.handleChange}
                                value={formik.values.subAreaName}
                                className="form-control form-control-lg react-form-input"
                              />
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Property type
                              </label>
                              <input
                                id="propertyType"
                                name="propertyType"
                                onChange={formik.handleChange}
                                value={formik.values.propertyType}
                                className="form-control form-control-lg react-form-input"
                              />
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Colony name
                              </label>
                              <input
                                id="colonyName"
                                name="colonyName"
                                onChange={formik.handleChange}
                                value={formik.values.colonyName}
                                className="form-control form-control-lg react-form-input"
                              />
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                Details url
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg react-form-input"
                                value={formik.values.detailsURL}
                                onChange={formik.handleChange}
                                id="detailsURL"
                                name="detailsURL"
                              />
                              {formik.errors.detailsURL && (
                                <p style={{ color: "red" }}>{formik.errors.detailsURL}</p>
                              )}
                            </div>
                          </Col>
                          <Col sm={12} md={6} lg={4}>
                            <div className="form-group">
                              <label>
                                PA Id 
                              </label>
                              <input
                                id="paId"
                                name="paId"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.paId}
                                className="form-control form-control-lg react-form-input"
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className="col-sm-auto">
                          <Button
                            className="btn btn-blue w-100 mb-3"
                            // disabled={isSubmitButtonDisables}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                </Row>
              </div>
            </form>
          </div>

      }
    </div>
  );
};

export default ProjectEntery;
