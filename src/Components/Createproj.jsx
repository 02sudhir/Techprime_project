import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import axios from "axios";
import "../css/createproject.css";
import logo from "../assets/Logo.png";
import back from '../assets/back arrow.png'

const validate = (values) => {
  const errors = {};
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.reason) {
    errors.reason = "Reason is required";
  }
  if (!values.type) {
    errors.type = "Type is required";
  }
  if (!values.division) {
    errors.division = "Division is required";
  }
  if (!values.category) {
    errors.category = "Category is required";
  }
  if (!values.priority) {
    errors.priority = "Priority is required";
  }
  if (!values.department) {
    errors.department = "Department is required";
  }
  if (!values.startDate) {
    errors.startDate = "Start date is required";
  }
  if (!values.endDate) {
    errors.endDate = "End date is required";
  } else if (values.endDate < values.startDate) {
    errors.endDate = "End date cannot be before start date";
  }
  if (!values.location) {
    errors.location = "Location is required";
  }
  return errors;
};

const Createproj = (props) => {
  const [status, setStatus] = useState("Registered");

  const handleSubmit = async (values, { setSubmitting,resetForm  }) => {
    try {
      values.status = status; 
      const response = await axios.post(
        "http://localhost:5000/api/formdata",
        values
      );
      console.log(response.data); 
      setSubmitting(false);
      resetForm(); 
      props.onSubmit(values); 
    } catch (error) {
      console.error("Error submitting form data:", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="createproj">
      <h3 className="h3">
      <Button variant="link" onClick={() => window.history.back()}>
          <img src={back} alt=""/>
         
          </Button>{" "}
        Create Project</h3>
        <img className="img" src={logo} alt="ss" />

        <Navbar />
        <div className="form-container">
          <Formik
            initialValues={{
              description: "",
              reason: "",
              type: "",
              division: "",
              category: "",
              priority: "",
              department: "",
              startDate: null,
              endDate: null,
              location: "",
              status: "Registered",
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                <div className="form-group row">
                  <div className="col">
                    <label></label>
                    <Field
                      as="input"
                      type="text"
                      name="description"
                      placeholder="Enter project Theme"
                      style={{ height: '80px', width: '700px', resize: 'none' , }}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="submit-button"
                    >
                      Save Project
                    </button>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col">
                    <label>Reason:</label>
                    <Field as="select" name="reason">
                      <option value="">Select Reason</option>
                      <option value="personal">Personal</option>
                      <option value="business">Business</option>
                    </Field>
                    <ErrorMessage
                      name="reason"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col">
                    <label>Type:</label>
                    <Field as="select" name="type">
                      <option value="">Select Type</option>
                      <option value="internal">Internal</option>
                      <option value="external">External</option>
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col">
                    <label>Division:</label>
                    <Field as="select" name="division">
                      <option value="">Select Division</option>
                      <option value="compressor">Compressor</option>
                      <option value="filters">Filters</option>
                      <option value="pumps">Pumps</option>
                      <option value="glass">Glass</option>
                      <option value="Water_Heater">Water Heater</option>
                    </Field>
                    <ErrorMessage
                      name="division"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <label>Category:</label>
                    <Field as="select" name="category">
                      <option value="">Select Category</option>
                      <option value="Quality A">Quality A</option>
                      <option value="Quality B">Quality B</option>
                      <option value="Quality C">Quality C</option>
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col">
                    <label>Priority:</label>
                    <Field as="select" name="priority">
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Low">Low</option>
                    </Field>
                    <ErrorMessage
                      name="priority"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col">
                    <label>Department:</label>
                    <Field as="select" name="department">
                      <option value="">Select Department</option>
                      <option value="Stratergy">Stratergy</option>
                      <option value="Plan">Plan</option>
                      <option value="Implement">Implement</option>
                    </Field>
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <label>Start Date:</label>
                    <DatePicker
                      selected={values.startDate}
                      onChange={(date) => setFieldValue("startDate", date)}
                      dateFormat="MM/dd/yyyy"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col">
                    <label>End Date:</label>
                    <DatePicker
                      selected={values.endDate}
                      onChange={(date) => setFieldValue("endDate", date)}
                      dateFormat="MM/dd/yyyy"
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col">
                    <label>Location:</label>
                    <Field name="location" placeholder="Enter location" />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="status"><span>Status</span>:      {status}</label> 
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

Createproj.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Createproj;
