import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Navbar from "./Navbar";
import logo from "../assets/Logo.png";
import '../css/dashboard.css'

const Dashboard = () => {
  const [counters, setCounters] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const countersResponse = await axios.get("http://localhost:5000/api/counters");
      setCounters(countersResponse.data);

      const departmentDataResponse = await axios.get("http://localhost:5000/api/departmentData");
      setDepartmentData(departmentDataResponse.data);
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Department-wise Total Vs Closed',
    },
    xAxis: {
      categories: departmentData ? departmentData.map(dept => dept.department) : [],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Projects',
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        pointWidth: 20,  
      },
    },
    series: [
      {
        name: 'Total Projects',
        data: departmentData ? departmentData.map(dept => dept.totalProjects) : [],
      },
      {
        name: 'Closed Projects',
        data: departmentData ? departmentData.map(dept => dept.closedProjects) : [],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h3 className="h3">Dashboard</h3>
        <img className="img" src={logo} alt="ss" />
        {(!counters || !departmentData) ? (
          <div><h3>Data is being fetched...</h3></div>
        ) : (
          <>
            {counters && (
              <div className="counters-container">
                <div className="counter-box">
                  <div className="counter-title">Total Projects</div>
                  <div className="counter-value">{counters.totalProjects}</div>
                </div>
                <div className="counter-box">
                  <div className="counter-title">Closed Projects</div>
                  <div className="counter-value">{counters.closedProjects}</div>
                </div>
                <div className="counter-box">
                  <div className="counter-title">Running Projects</div>
                  <div className="counter-value">{counters.runningProjects}</div>
                </div>
                <div className="counter-box">
                  <div className="counter-title">Closure Delay</div>
                  <div className="counter-value">{counters.closureDelay}</div>
                </div>
                <div className="counter-box">
                  <div className="counter-title">Canceled Projects</div>
                  <div className="counter-value">{counters.canceledProjects}</div>
                </div>
              </div>
            )}
            {departmentData && (
              <div className="chart">
                <h2></h2>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
