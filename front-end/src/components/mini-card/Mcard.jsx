import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Mcard.css";
import CountUp from "react-countup";
import { Bar } from "react-chartjs-2";
import videoSrc from '../../assets/Statistique-animation.mp4';

function Mcard({ color, data, label, per, icon, currentMonth }) {
  // const [rapport, setRapport] = useState([]);
  // useEffect(() => {
  //   const fetchRapport = async () => {
  //     const response = await axios.get(
  //       `http://localhost:5001/api/reports/${user_id}`
  //     );
  //     if (response) {
  //       console.count(rapport);
  //       setRapport(response.data.rapport);
  //     } else {
  //       console.log("error");
  //     }
  //   };
  //   fetchRapport();
  // }, []);

  const [reportData, setReportData] = useState([]);

  // useEffect(() => {
  //   fetchData();zc
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/api/reports"); // Update with your API endpoint
  //     setReportData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const formatChartData = () => {
  //   const labels = reportData.map((report) => report.label);
  //   const data = reportData.map((report) => report.value);

  //   return {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Report Data",
  //         backgroundColor: "rgba(75,192,192,1)",
  //         borderColor: "rgba(0,0,0,1)",
  //         borderWidth: 2,
  //         data,
  //       },
  //     ],
  //   };
  // };

  return (
    <div className="card-container" style={{ backgroundColor: color }}>
      <div className="Title ">
        <div className="card-icon right-card"> {icon}</div>
        <div className="Left-card">
          <span className="titleCard"> {label} </span>{" "}
          <button className="btn-title">/ {per}</button>
        </div>
      </div>

      <div className="card-values">
        <div className="card-description">
          {/* <h3>High desc</h3> */}
          {/* <h6>{reportData}</h6> */}
          {/* <div style={{ height: "40px", width: "60px" }}>
            <Bar
              data={formatChartData()}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },C:\Users\ahmed\OneDrive\Documents\GitHub\Remotini19Av\front-end\src\assets\Statistique-animation.mp4
              }}
            />
          </div> */}
          <video src={videoSrc}
          autoPlay
          loop
          style={{width:'3rem'}}
          >

          </video>
          <h3>
            <CountUp start={0} end={data.length} duration={4} />
          </h3>{" "}
          <span> {currentMonth ? `En ${currentMonth}` : ""}</span>
        </div>
      </div>
    </div>
  );
}

export default Mcard;
