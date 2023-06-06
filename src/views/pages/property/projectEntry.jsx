import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DatepickerWrapper from "components/forms/alldatepickers/datepicker.style";

import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import PropertyActions from "redux/property/action";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import constants from "redux/property/constants";
import ModalExample from "./ModalView";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import constant from "redux/networkCall/constant";
import GeolocationActions from "redux/master/geolocation/action";

const ProjectEntery = (props) => {
  const dispatch = useDispatch();
  const propertyData = useSelector((store) => store.property);
  const states = useSelector((store) => store.master.geolocation.states);
  const networkCalls = useSelector((store) => store.NetworkCall.NETWORK_CALLS);
  const [isSubmitButtonDisables, setIsSubmitButtonDisables] = useState(false);
  const [bool, setBool] = useState({ num: false, modal: false });
  // const buttonBack = {
  //   backgroundColor: "#563c91",
  //   color: "white",
  // };
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
      sellerMobile : "",
      propertyInsert: "",
      propertyStatus : "",
      propertyFor : "",
      propertyCategory : "",
      propertyName : "",
      newsPaperName : "",
      surveyBy : "",
      surveyDate : "",
      occupencyDate : "",
      propertySpoc : "",
      gatedCommunityType : "",
      propertyStatus2 : "",
      loanBanks : "",
      totalFloors : "",
      openSpaceArea : "",
      commonArea : "",
      dataEntryBy : "",
      newOrResale : "New",
      reraStatus : "",
      price : "",
      projectGrade : "",
      propertyDescription : "",
      propertySubType : "",
      facing : "",
      sizePerUnit : "",
      amenitiesCharges : "",
      otherCharges : "",
      totalUnits : "",
      totalAvailableUnits : "",
      plotLayoutDescription : "",
      dimensionsRooms :"",
      description : "",
      length : "",
      width : "",
      nearByPlaces: "",
      amenities : "",
      selletComments : "",
      advisorComments : "",
      image : "",
      mainImage : ""
    },
    onSubmit: (values) => {
      // let formData = new FormData();
      // let keys = Object.keys(values)
      // if(keys.length > 0){
      //   for(let key of keys){
      //     formData.append(key,values[key])
      //   }
      // }
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
      formData.append("paId", values.paId);
      formData.append("city", values.city);
      formData.append("location", values.location);
      formData.append("subAreaName", values.subAreaName);
      formData.append("propertyType", values.propertyType);
      formData.append("colonyName", values.colonyName);
      formData.append("sellerMobile",values.sellerMobile)
      formData.append("propertyInsert",values.propertyInsert)
      formData.append("propertyStatus",values.propertyStatus)
      formData.append("propertyFor",values.propertyFor)
      formData.append("propertyCategory",values.propertyCategory)
      formData.append("propertyName",values.propertyName)
      formData.append("newsPaperName",values.newsPaperName)
      formData.append("surveyBy",values.surveyBy)
      formData.append("surveyDate",values.surveyDate)
      formData.append("occupencyDate",values.occupencyDate)
      formData.append("propertySpoc",values.propertySpoc)
      formData.append("gatedCommunityType",values.gatedCommunityType)
      formData.append("propertyStatus2",values.propertyStatus2)
      formData.append("loanBanks",values.loanBanks)
      formData.append("totalFloors",values.totalFloors)
      formData.append("openSpaceArea",values.openSpaceArea)
      formData.append("commonArea",values.commonArea)
      formData.append("dataEntryBy",values.dataEntryBy)
      formData.append("newOrResale",values.newOrResale)
      formData.append("reraStatus",values.reraStatus)
      formData.append("price",values.price)
      formData.append("projectGrade",values.projectGrade)
      formData.append("propertyDescription",values.propertyDescription)
      formData.append("propertySubType",values.propertySubType)
      formData.append("facing",values.facing)
      formData.append("sizePerUnit",values.sizePerUnit)
      formData.append("amenitiesCharges",values.amenitiesCharges)
      formData.append("otherCharges",values.otherCharges)
      formData.append("totalUnits",values.totalUnits)
      formData.append("totalAvailableUnits",values.totalAvailableUnits)
      formData.append("plotLayoutDescription",values.plotLayoutDescription)
      formData.append("dimensionsRooms",values.dimensionsRooms)
      formData.append("description",values.description)
      formData.append("length",values.length)
      formData.append("width",values.width)
      formData.append("nearByPlaces",values.nearByPlaces)
      formData.append("amenities",values.amenities)
      formData.append("selletComments",values.selletComments)
      formData.append("advisorComments",values.selletComments)
      formData.append("image",values.image)
      formData.append("mainImage",values.mainImage)
      if(values.mainImage !== "" && values.image !== ""){
        dispatch(PropertyActions.addNewTsData(formData));
      }else{
        dispatch(PropertyActions.addTsData(formData));
      }
      formik.resetForm();
    },
    validate: (values) => {
      const URLregex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;//eslint-disable-line
      let errors = {};
      if (!values.state) {
        errors.state = "State required!";
      }
      if (!values.reraNumber) {
        errors.reraNumber = "Rera no required!";
      }
      if (!values.certFileName) {
        errors.certFileName = "Cert file required!";
      }
      if (!values.detailsFileName) {
        errors.detailsFileName = "Details file required!";
      }
      if (!values.lastModifiedDate) {
        errors.lastModifiedDate = "Modified date required!";
      }
      if (!values.reraApprovedDate) {
        errors.reraApprovedDate = "Approved data required!";
      }
      if (!values.reraProjectStartDate) {
        errors.reraProjectStartDate = "Start date required!";
      }
      if (!values.projectEndDate) {
        errors.projectEndDate = "End date required!";
      }
      if (!values.detailsURL) {
        errors.detailsURL = "URL required!";
      } else if (!URLregex.test(values.detailsURL)) {
        errors.detailsURL = "Invalid URL!";
      }
      return errors;
    },
    validateOnChange: false,
  });
  useEffect(() => {
    dispatch(GeolocationActions.getStates());
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const handleIsExistByReraNumber = () => {
    if (formik.values.reraNumber !== "") {
      dispatch(
        PropertyActions.getTsDataByReraNumberOrPaId(formik.values.reraNumber)
      );
    }
  };
  useEffect(() => {
    if (propertyData.tracks_data.length > 0) {
      setBool({ ...bool, num: true, modal: true });
    }
  }, [propertyData.tracks_data]);// eslint-disable-line react-hooks/exhaustive-deps

  const handleModalChange = (e) => {
    setBool({ ...bool, num: e, modal: e });
  };
  return (
    <div className="container-fluid">
      <div className="row title-sec">
        <div className="col-sm headline">Project Entry</div>
      </div>
      {networkCalls.indexOf(constant.ADD_PROPERTY_NETWORK_CALL) > -1 ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner color="primary" />
        </div>
      ) : (
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
                                states.map((opt) => <option>{opt.name}</option>)
                              ) : (
                                <option>No data</option>
                              )}
                            </select>
                            {formik.errors.state && (
                              <p style={{ color: "red" }}>
                                {formik.errors.state}
                              </p>
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
                              onChange={(value) => {
                                formik.setFieldValue(
                                  "reraNumber",
                                  value.target.value
                                );
                                if (value.target.value === "") {
                                  dispatch({
                                    type: constants.GET_ALL_TS_DATA,
                                    payload: [],
                                  });
                                }
                              }}
                              onBlur={() => handleIsExistByReraNumber()}
                              value={formik.values.reraNumber}
                              className="form-control form-control-lg react-form-input"
                            />
                            {formik.values.reraNumber &&
                              bool.num &&
                              propertyData.tracks_data.length > 0 && (
                                <ModalExample
                                  modal={bool.modal}
                                  setModal={(e) => handleModalChange(e)}
                                  data={propertyData.tracks_data}
                                  isFromRRInput={true}
                                />
                                // <p style={{ color: "red" }}>{`${propertyData.tracks_data.length} versions already exist with this RERA number and last modifieded date is ${format(new Date(propertyData.tracks_data[0].lastModifiedDate), 'dd/MM/yyyy')}`}</p>
                              )}
                            {formik.errors.reraNumber && (
                              <p style={{ color: "red" }}>
                                {formik.errors.reraNumber}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <DatepickerWrapper {...props}>
                              <label>
                                Last modified date{" "}
                                <span className="error-msg">*</span>
                              </label>
                              <DatePicker
                                selected={formik.values.lastModifiedDate}
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    "lastModifiedDate",
                                    new Date(value)
                                  );
                                  if (
                                    formik.values.reraNumber !== "" &&
                                    propertyData.tracks_data.length > 0
                                  ) {
                                    let bool = false;
                                    propertyData.tracks_data.forEach((e) => {
                                      if (
                                        format(
                                          new Date(e.lastModifiedDate),
                                          "dd/MM/yyyy"
                                        ) ===
                                        format(new Date(value), "dd/MM/yyyy")
                                      ) {
                                        bool = true;
                                      }
                                    });
                                    setIsSubmitButtonDisables(bool);
                                    setBool({ ...bool, modal: !bool.modal });
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
                                  setModal={(e) =>
                                    setBool({ ...bool, modal: e })
                                  }
                                  data={propertyData.tracks_data}
                                  isFromRRInput={false}
                                />
                                // <p style={{ color: "red" }}>Data already present with this RERA number and last modified date.</p>
                              )}
                              {formik.errors.lastModifiedDate && (
                                <p style={{ color: "red" }}>
                                  {formik.errors.lastModifiedDate}
                                </p>
                              )}
                            </DatepickerWrapper>
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <DatepickerWrapper {...props}>
                              <label>
                                RERA approved date{" "}
                                <span className="error-msg">*</span>
                              </label>
                              <DatePicker
                                selected={formik.values.reraApprovedDate}
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    "reraApprovedDate",
                                    new Date(value)
                                  );
                                }}
                                maxDate={new Date()}
                                dateFormat="dd-MM-yyyy"
                                id="reraApprovedDate"
                                name="reraApprovedDate"
                                className="custom-datepicker"
                                calendarClassName="custom-calender-class"
                              />
                              {formik.errors.reraApprovedDate && (
                                <p style={{ color: "red" }}>
                                  {formik.errors.reraApprovedDate}
                                </p>
                              )}
                            </DatepickerWrapper>
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <DatepickerWrapper {...props}>
                              <label>
                                RERA project start date{" "}
                                <span className="error-msg">*</span>
                              </label>
                              <DatePicker
                                selected={formik.values.reraProjectStartDate}
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    "reraProjectStartDate",
                                    new Date(value)
                                  );
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
                                Project end date{" "}
                                <span className="error-msg">*</span>
                              </label>
                              <DatePicker
                                selected={formik.values.projectEndDate}
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    "projectEndDate",
                                    new Date(value)
                                  );
                                }}
                                dateFormat="dd-MM-yyyy"
                                id="projectEndDate"
                                name="projectEndDate"
                                minDate={new Date()}
                                className="custom-datepicker"
                                calendarClassName="custom-calender-class"
                              />
                              {formik.errors.projectEndDate && (
                                <p style={{ color: "red" }}>
                                  {formik.errors.projectEndDate}
                                </p>
                              )}
                            </DatepickerWrapper>
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>
                              Certificate file name{" "}
                              <span className="error-msg">*</span>
                            </label>
                            <input
                              id="certFileName"
                              name="certFileName"
                              accept=".pdf"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "certFileName",
                                  event.currentTarget.files[0]
                                );
                              }}
                              type="file"
                              className="form-control form-control-lg react-form-input"
                            />
                            {formik.errors.certFileName && (
                              <p style={{ color: "red" }}>
                                {formik.errors.certFileName}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Certificate ext file name</label>
                            <input
                              id="certExtFileName"
                              name="certExtFileName"
                              accept=".pdf"
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "certExtFileName",
                                  e.currentTarget.files[0]
                                )
                              }
                              type="file"
                              className="form-control form-control-lg react-form-input"
                            />
                            {formik.errors.certExtFileName && (
                              <p style={{ color: "red" }}>
                                {formik.errors.certExtFileName}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>
                              Details file name{" "}
                              <span className="error-msg">*</span>
                            </label>
                            <input
                              type="file"
                              accept=".xlsx"
                              className="form-control form-control-lg react-form-input"
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "detailsFileName",
                                  e.currentTarget.files[0]
                                )
                              }
                              id="detailsFileName"
                              name="detailsFileName"
                            />
                            {formik.errors.detailsFileName && (
                              <p style={{ color: "red" }}>
                                {formik.errors.detailsFileName}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>City</label>
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
                            <label>Location</label>
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
                            <label>Sub area name</label>
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
                            <label>Property type</label>
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
                            <label>Colony name</label>
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
                              Details url<span className="error-msg">*</span>
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
                              <p style={{ color: "red" }}>
                                {formik.errors.detailsURL}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>PA Id</label>
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
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Seller Mobile</label>
                            <input
                              id="sellerMobile"
                              type="number"
                              name="sellerMobile"
                              onChange={formik.handleChange}
                              value={formik.values.sellerMobile}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Property Insert</label>
                            <input
                              id="propertyInsert"
                              name="propertyInsert"
                              onChange={formik.handleChange}
                              value={formik.values.propertyInsert}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Property Status</label>
                            <input
                              id="propertyStatus"
                              name="propertyStatus"
                              onChange={formik.handleChange}
                              value={formik.values.propertyStatus}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Property For</label>
                            <input
                              id="propertyFor"
                              name="propertyFor"
                              onChange={formik.handleChange}
                              value={formik.values.propertyFor}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Property Category</label>
                            <input
                              id="propertyCategory"
                              name="propertyCategory"
                              onChange={formik.handleChange}
                              value={formik.values.propertyCategory}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Property Name</label>
                            <input
                              id="propertyName"
                              name="propertyName"
                              onChange={formik.handleChange}
                              value={formik.values.propertyName}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Newspaper Name</label>
                            <input
                              id="newsPaperName"
                              name="newsPaperName"
                              onChange={formik.handleChange}
                              value={formik.values.newsPaperName}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Survey By</label>
                            <input
                              id="surveyBy"
                              name="surveyBy"
                              onChange={formik.handleChange}
                              value={formik.values.surveyBy}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <DatepickerWrapper {...props}>
                              <label>
                                Survey Date{" "}
                              </label>
                              <DatePicker
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    "surveyDate",
                                    new Date(value)
                                  );
                                }}
                                selected={formik.values.surveyDate}
                                dateFormat="dd-MM-yyyy"
                                id="surveyDate"
                                name="surveyDate"
                                className="custom-datepicker"
                                calendarClassName="custom-calender-class"
                              />
                            </DatepickerWrapper>
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <DatepickerWrapper {...props}>
                              <label>
                                Occupency Date{" "}
                              </label>
                              <DatePicker
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    "occupencyDate",
                                    new Date(value)
                                  );
                                }}
                                selected={formik.values.occupencyDate}
                                dateFormat="dd-MM-yyyy"
                                id="occupencyDate"
                                name="occupencyDate"
                                className="custom-datepicker"
                                calendarClassName="custom-calender-class"
                              />
                            </DatepickerWrapper>
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Property Spoc</label>
                            <input
                              id="propertySpoc"
                              name="propertySpoc"
                              onChange={formik.handleChange}
                              value={formik.values.propertySpoc}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Gated Community Type</label>
                            <input
                              id="gatedCommunityType"
                              name="gatedCommunityType"
                              onChange={formik.handleChange}
                              value={formik.values.gatedCommunityType}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Property Status</label>
                            <input
                              id="propertyStatus2"
                              name="propertyStatus2"
                              onChange={formik.handleChange}
                              value={formik.values.propertyStatus2}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Loan Banks</label>
                            <input
                              id="loanBanks"
                              name="loanBanks"
                              onChange={formik.handleChange}
                              value={formik.values.loanBanks}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Total Floors</label>
                            <input
                              id="totalFloors"
                              name="totalFloors"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.totalFloors}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Project Open Space Area</label>
                            <input
                              id="openSpaceArea"
                              name="openSpaceArea"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.openSpaceArea}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Common Area</label>
                            <input
                              id="commonArea"
                              name="commonArea"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.commonArea}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Data Entry By</label>
                            <input
                              id="dataEntryBy"
                              name="dataEntryBy"
                              onChange={formik.handleChange}
                              value={formik.values.dataEntryBy}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>
                              New/Resale 
                            </label>
                            <select
                              id="newOrResale"
                              name="newOrResale"
                              className="form-control form-control-lg react-form-input"
                              value={formik.values.newOrResale}
                              onChange={formik.handleChange}
                            >
                              {
                                ['New','Resale'].map((opt) => <option>{opt}</option>)
                               }
                            </select>
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Rera Status</label>
                            <input
                              id="reraStatus"
                              name="reraStatus"
                              onChange={formik.handleChange}
                              value={formik.values.reraStatus}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Price</label>
                            <input
                              id="price"
                              name="price"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.price}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Project Grade</label>
                            <input
                              id="projectGrade"
                              name="projectGrade"
                              onChange={formik.handleChange}
                              value={formik.values.projectGrade}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Proerty Description</label>
                            <input
                              id="propertyDescription"
                              name="propertyDescription"
                              onChange={formik.handleChange}
                              value={formik.values.propertyDescription}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Proerty SUb Type</label>
                            <input
                              id="propertySubType"
                              name="propertySubType"
                              onChange={formik.handleChange}
                              value={formik.values.propertySubType}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Facing</label>
                            <input
                              id="facing"
                              name="facing"
                              onChange={formik.handleChange}
                              value={formik.values.facing}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Size/Unit</label>
                            <input
                              id="sizePerUnit"
                              name="sizePerUnit"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.sizePerUnit}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Amenities Charges</label>
                            <input
                              id="amenitiesCharges"
                              name="amenitiesCharges"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.amenitiesCharges}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Amenities</label>
                            <input
                              id="amenities"
                              name="amenities"
                              onChange={formik.handleChange}
                              value={formik.values.amenities}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>Other Charges</label>
                            <input
                              id="otherCharges"
                              name="otherCharges"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.otherCharges}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Total Units</label>
                            <input
                              id="totalUnits"
                              name="totalUnits"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.totalUnits}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Total Available Units</label>
                            <input
                              id="totalAvailableUnits"
                              name="totalAvailableUnits"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.totalAvailableUnits}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Floor Plan/Plot Layout Discription </label>
                            <input
                              id="plotLayoutDescription"
                              name="plotLayoutDescription"
                              onChange={formik.handleChange}
                              value={formik.values.plotLayoutDescription}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Dimensions/Rooms </label>
                            <input
                              id="dimensionsRooms"
                              name="dimensionsRooms"
                              onChange={formik.handleChange}
                              value={formik.values.dimensionsRooms}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Description </label>
                            <input
                              id="description"
                              name="description"
                              onChange={formik.handleChange}
                              value={formik.values.description}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Length </label>
                            <input
                              id="length"
                              name="length"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.length}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Width </label>
                            <input
                              id="width"
                              name="width"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.width}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Nearby Places </label>
                            <input
                              id="nearByPlaces"
                              name="nearByPlaces"
                              onChange={formik.handleChange}
                              value={formik.values.nearByPlaces}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Seller Comments </label>
                            <input
                              id="selletComments"
                              name="selletComments"
                              onChange={formik.handleChange}
                              value={formik.values.selletComments}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label> Advisor Comments </label>
                            <input
                              id="advisorComments"
                              name="advisorComments"
                              onChange={formik.handleChange}
                              value={formik.values.advisorComments}
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>
                              Image{" "}
                            </label>
                            <input
                              id="image"
                              name="image"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "image",
                                  event.currentTarget.files[0]
                                );
                              }}
                              type="file"
                              className="form-control form-control-lg react-form-input"
                            />
                          </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                          <div className="form-group">
                            <label>
                              Main Image{" "}
                            </label>
                            <input
                              id="mainImage"
                              name="mainImage"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "mainImage",
                                  event.currentTarget.files[0]
                                );
                              }}
                              type="file"
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
      )}
    </div>
  );
};

export default ProjectEntery;
