import React, { useContext } from "react";
import "./Statistique.css";
import Title from "../StatTitle/Title";
import Mcard from "../mini-card/Mcard";
// import { useReportContext } from "../../hooks/useReportContext";
import { useReportContext } from "../../hooks/useReportContext";
const Statistique = () => {
  // const { rapports } = useReportContext();

  // console.log("this is rapport ", rapports);
  return (
    <>
      <Title page="Dashboard" />
      <div className="gridding-container">
        <div className="charts"></div>
        <div className="Cards-containerStat">
          <div className="doubled-cards">
            <div className="two-cards">
              <Mcard />
              <Mcard />
            </div>
            <div className="two-cards">
              <Mcard />
              <Mcard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistique;
