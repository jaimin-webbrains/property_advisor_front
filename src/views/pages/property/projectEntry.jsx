import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import DatepickerWrapper from "components/forms/alldatepickers/datepicker.style";

import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import PropertyActions from "redux/property/action";
import "react-toastify/dist/ReactToastify.css";

const InputSizing = props => {
  const dispatch = useDispatch();
  const propertyData = useSelector(store => store.property);
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
      projectEndDate: ""
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

      dispatch(PropertyActions.addTsData(formData));
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
      // if (!values.certExtFileName) {
      //   errors.certExtFileName = "Required!";
      // }
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
    dispatch(PropertyActions.getStates());
  }, []);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">State</label>
          <div className="col-sm-10">
            <select
              id="state"
              name="state"
              className="form-control form-control-lg react-form-input"
              value={formik.values.state}
              onChange={formik.handleChange}
            >
              {propertyData?.states && propertyData.states.length > 0 ? (
                propertyData.states.map(opt => (
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
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">RERA Number</label>
          <div className="col-sm-10">
            <input
              id="reraNumber"
              name="reraNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.reraNumber}
              className="form-control form-control-lg react-form-input"
            />
            {formik.errors.reraNumber && (
              <p style={{ color: "red" }}>{formik.errors.reraNumber}</p>
            )}
          </div>
        </div>
        <DatepickerWrapper {...props}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Last modified date
            </label>
            <div className="col-sm-10">
              <DatePicker
                selected={formik.values.lastModifiedDate}
                onChange={value => {
                  formik.setFieldValue("lastModifiedDate", new Date(value));
                }}
                id="lastModifiedDate"
                name="lastModifiedDate"
                className="custom-datepicker"
                calendarClassName="custom-calender-class"
              />
              {formik.errors.lastModifiedDate && (
                <p style={{ color: "red" }}>{formik.errors.lastModifiedDate}</p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              RERA approved date
            </label>
            <div className="col-sm-10">
              <DatePicker
                selected={formik.values.reraApprovedDate}
                onChange={value => {
                  formik.setFieldValue("reraApprovedDate", new Date(value));
                }}
                id="reraApprovedDate"
                name="reraApprovedDate"
                className="custom-datepicker"
                calendarClassName="custom-calender-class"
              />
              {formik.errors.reraApprovedDate && (
                <p style={{ color: "red" }}>{formik.errors.reraApprovedDate}</p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              RERA project start date
            </label>
            <div className="col-sm-10">
              <DatePicker
                selected={formik.values.reraProjectStartDate}
                onChange={value => {
                  formik.setFieldValue("reraProjectStartDate", new Date(value));
                }}
                id="reraProjectStartDate"
                name="reraProjectStartDate"
                className="custom-datepicker"
                calendarClassName="custom-calender-class"
              />
              {formik.errors.reraProjectStartDate && (
                <p style={{ color: "red" }}>
                  {formik.errors.reraProjectStartDate}
                </p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Project end date</label>
            <div className="col-sm-10">
              <DatePicker
                selected={formik.values.projectEndDate}
                onChange={value => {
                  formik.setFieldValue("projectEndDate", new Date(value));
                }}
                id="projectEndDate"
                name="projectEndDate"
                className="custom-datepicker"
                calendarClassName="custom-calender-class"
              />
              {formik.errors.projectEndDate && (
                <p style={{ color: "red" }}>{formik.errors.projectEndDate}</p>
              )}
            </div>
          </div>
        </DatepickerWrapper>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
            Certificate file name
          </label>
          <div className="col-sm-10">
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
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
            Certificate EXT file name
          </label>
          <div className="col-sm-10">
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
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Details file name</label>
          <div className="col-sm-10">
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
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Details URL</label>
          <div className="col-sm-10">
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
        </div>

        <button style={buttonBack} type="submit" className="btn form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputSizing;
