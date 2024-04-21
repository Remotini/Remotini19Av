import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Mcard.css";
import CountUp from "react-countup";
import { Bar } from "react-chartjs-2";
import videoSrc from "../../assets/Statistique-animation.mp4";

function Mcard({ color, data, label, per, icon, currentMonth }) {
  const [reportData, setReportData] = useState([]);
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
          {/* <video src={videoSrc}
          autoPlay
          loop
          style={{width:'3rem'}}
          >

          </video> */}
          <h3>
            <CountUp start={0} end={data.length} duration={4} />
          </h3>{" "}
          <span>
            <h4> {currentMonth ? `En ${currentMonth}` : ""}</h4>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Mcard;
