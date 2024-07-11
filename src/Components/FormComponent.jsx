import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    textAreaValue: '',
    dropdownValue: '',
    selectedDate: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, selectedDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="textArea">Text Area</label>
        <textarea
          id="textArea"
          name="textAreaValue"
          value={formData.textAreaValue}
          onChange={handleInputChange}
          className="form-control"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="dropdown">Dropdown</label>
        <select
          id="dropdown"
          name="dropdownValue"
          value={formData.dropdownValue}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ReactDatePicker">Date Picker</label>
        <br />
        <ReactDatePicker
          id="ReactDatePicker"
          selected={formData.selectedDate}
          onChange={handleDateChange}
          className="form-control"
        />
      </div>
   
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
