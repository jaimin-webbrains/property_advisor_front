import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
const AddRoleModal = ({
  modal,
  setModal,
  value,
  setValue,
  handleAddClick,
  isFromUpdate,
  error,
  name,
  states,
  selected,
}) => {
  const filtered = ["_id", "status", "updatedAt", "createdAt", "__v"];
  const numberField = ["mobile"];
  const selectField = [
    "role",
    "state",
    "city",
    "district",
    "zone",
    "location",
    "subLocation",
  ];
  const errorField = ["mobile"];
  const disabledField = ["email"];
  const notRequiredField = ["description"]
  const getSelectedValue = (e) => {
   let val = "";
    if ( value[e] !== "") {
      val = value[e]["name"] ? value[e]["name"] : value[e];
    } else {
      if (selected[e] && selected[e] !== "") {
        val =
          selected[e] && selected[e]["name"]
            ? selected[e]["name"]
            : selected[e];
      }
    }
    return val;
  };
  return (
    <div>
      {states && (
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>
            {isFromUpdate ? `Update ${name}` : `Add ${name}`}
          </ModalHeader>
          <ModalBody>
            {Object.keys(value).length > 0
              ? Object.keys(value).map((e) => {
                  if (!filtered.includes(e)) {
                    return !selectField.includes(e) ? (
                      <div className="form-group">
                        <label>
                          {e.charAt(0).toUpperCase() + e.slice(1)}
                          {notRequiredField.indexOf(e) === -1 && <span className="error-msg">*</span>}
                        </label>
                        <input
                          type={numberField.includes(e) ? "number" : "text"}
                          className="form-control react-form-input"
                          placeholder={e.charAt(0).toUpperCase() + e.slice(1)}
                          id={e}
                          onChange={(v) => setValue(e, v.target.value)}
                          value={value[e]}
                          disabled={isFromUpdate && disabledField.includes(e)}
                        />
                        {errorField.includes(e) && value[e].length > 0 && (
                          <p style={{ color: "red" }}>{error[e]}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label>
                          {e.charAt(0).toUpperCase() + e.slice(1)}
                          <span className="error-msg">*</span>
                        </label>
                        <select
                          id={e}
                          name={e}
                          className="form-control form-control-lg react-form-input mb-5"
                          value={getSelectedValue(e)}
                          onChange={(v) => setValue(e, v.target.value)}
                        >
                          <option>Select</option>
                          {states[e].length > 0 &&
                            states[e].map((opt) => <option>{opt.name}</option>)}
                        </select>
                      </div>
                    );
                  }
                })
              : ""}
            <div className="d-flex">
              {isFromUpdate ? (
                <Button
                  className="btn btn-blue w-100 border-0 mr-5"
                  type="button"
                  onClick={() => handleAddClick("update")}
                  disabled={Object.keys(error).length > 0}
                >
                  Update
                </Button>
              ) : (
                <Button
                  className="btn btn-blue w-100 border-0 mr-5"
                  type="button"
                  onClick={() => handleAddClick("add")}
                  disabled={Object.keys(error).length > 0}
                >
                  Add
                </Button>
              )}
              <Button
                className="btn btn-blue w-100 border-0 mr-5"
                type="button"
                onClick={() => setModal(!modal)}
              >
                Cancel
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};
export default AddRoleModal;
