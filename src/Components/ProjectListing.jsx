import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import "../css/projectlisting.css"; // Import custom CSS file
import logo from "../assets/Logo.png";
import back from "../assets/back arrow.png";

function ProjectListing() {
  const [formDataList, setFormDataList] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/formdata");
      setFormDataList(response.data);
      setFilteredRecords(response.data); // Initially set filtered records to all data
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const handleFilter = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = formDataList.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery)
      )
    );
    setFilteredRecords(filteredData);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/formdata/${id}/status`, {
        status,
      });
      const updatedData = formDataList.map((item) =>
        item._id === id ? { ...item, status } : item
      );
      setFormDataList(updatedData);
      setFilteredRecords(updatedData);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSortChange = (event) => {
    const sortKey = event.target.value;
    setSortColumn(sortKey);
    const sortedData = [...filteredRecords].sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey])
    );
    setFilteredRecords(sortedData);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  return (
    <>
      <Navbar />
    
      <div className="project-listing-container">
        <h3 className="h3">
          <Button variant="link" onClick={() => window.history.back()}>
            <img src={back} alt="" />
          </Button>{" "}
          Project Listing
        </h3>

        <img className="img" src={logo} alt="ss" />
        <div className="main-div">
        <div className="second">
        <div className="filter-sort-container">
       
  <div className="search-container">
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="🔍 Search"
        onChange={handleFilter}
        className="filter-input"
      />
    </InputGroup>
  </div>

  <div className="filter-sort-container">
  <Form.Group controlId="sortColumn" className="sort-container">
    <Form.Label>Sort by:</Form.Label>
    <Form.Control
      as="select"
      value={sortColumn}
      onChange={handleSortChange}
      className="sort-select"
    >
      <option value="">Select Column</option>
      <option value="description">Description</option>
      <option value="reason">Reason</option>
      <option value="type">Type</option>
      <option value="division">Division</option>
      <option value="category">Category</option>
      <option value="priority">Priority</option>
      <option value="department">Department</option>
      <option value="location">Location</option>
      <option  value="status">Status</option>
    </Form.Control>
  </Form.Group>
</div>
</div>


          {isMobile ? (
            <table className="project-table">
              <tbody className="tbody">
                {currentRecords.map((record) => (
                  <tr key={record._id}>
                    <td>
                      <div className="mobile-row">
                       <b>{record.description}</b> {" "}
                        <b>{record.status}</b> 
                      </div>
                      <div className="mobile-row">
                        {" "}
                        {new Date(record.startDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        <span>To:</span>{" "}
                        {new Date(record.endDate) >= new Date(record.startDate)
                          ? new Date(record.endDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "End date is earlier than start date"}
                      </div>
                      <div className="mobile-row">
                        <span>Reason:</span> <b>{record.reason}</b> 
                      </div>
                      <div className="mobile-row">
                        <span>Type:</span> <b>{record.type}</b> <span>Category:</span>{" "}
                        <b>{record.category}</b>
                      </div>
                      <div className="mobile-row">
                        <span>Division:</span> <b>{record.division}</b>{" "}
                        <span>Department:</span> <b>{record.department}</b>
                      </div>
                      <div className="mobile-row">
                        <span>Location:</span> <b>{record.location}</b>
                      </div>
                      <div className="mobile-row">
                        <span>Priority:</span> <b>{record.priority}</b>
                      </div>
                      <div className="mobile-row action-buttons">
                        <button
                          className={`custom-button ${
                            record.status === "Running" ? "active" : ""
                          }`}
                          onClick={() =>
                            handleStatusUpdate(record._id, "Running")
                          }
                          disabled={record.status === "Running"}
                        >
                          Start
                        </button>
                        <button
                          className={`custom-button ${
                            record.status === "Closed" ? "active" : ""
                          } ml-2`}
                          onClick={() =>
                            handleStatusUpdate(record._id, "Closed")
                          }
                          disabled={record.status === "Closed"}
                        >
                          Close
                        </button>
                        <button
                          className={`custom-button ${
                            record.status === "Cancelled" ? "active" : ""
                          } ml-2`}
                          onClick={() =>
                            handleStatusUpdate(record._id, "Cancelled")
                          }
                          disabled={record.status === "Cancelled"}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="project-table">
              <thead>
                <tr className="inner">
                  <th>Description</th>
                  <th>Reason</th>
                  <th>Type</th>
                  <th>Division</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="tbody">
                {currentRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{record.description}  <br/>
                    {" "}
                    {new Date(record.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    <span> To </span>
                  
                  
                    {new Date(record.endDate) >= new Date(record.startDate)
                      ? new Date(record.endDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "End date is earlier than start date"}
                  </td>
                    
                    <td>{record.reason}</td>
                    <td>{record.type}</td>
                    <td>{record.division}</td>
                    <td>{record.category}</td>
                    <td>{record.priority}</td>
                    <td>{record.department}</td>
                    <td>{record.location}</td>
                    <td>{record.status}</td>
                    <td className="action-buttons">
                      <button
                        className={`custom-button ${
                          record.status === "Running" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleStatusUpdate(record._id, "Running")
                        }
                        disabled={record.status === "Running"}
                      >
                        Start
                      </button>
                      <button
                        className={`custom-button ${
                          record.status === "Closed" ? "active" : ""
                        } ml-2`}
                        onClick={() =>
                          handleStatusUpdate(record._id, "Closed")
                        }
                        disabled={record.status === "Closed"}
                      >
                        Close
                      </button>
                      <button
                        className={`custom-button ${
                          record.status === "Cancelled" ? "active" : ""
                        } ml-2`}
                        onClick={() =>
                          handleStatusUpdate(record._id, "Cancelled")
                        }
                        disabled={record.status === "Cancelled"}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        </div>
        <div className="pagination">
          <button onClick={() => setCurrentPage(1)}>&laquo;&laquo;</button>
          <button
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
          >
            &laquo;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
          >
            &raquo;
          </button>
          <button onClick={() => setCurrentPage(totalPages)}>&raquo;&raquo;</button>
        </div>
   
      </div>
    </>
  );
}

export default ProjectListing;
