import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Mcard.css";
import { LuAlertOctagon } from "react-icons/lu";
import { Bar } from "react-chartjs-2";

function Mcard() {
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
  //   fetchData();
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
    <div className="card-container">
      <div className="Title ">
        <span className="titleCard">55 Rapports </span> <span>| week</span>
      </div>
      <div className="card-values">
        <div className="card-icon">
          {" "}
          <LuAlertOctagon />
        </div>
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
                },
              }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Mcard;
