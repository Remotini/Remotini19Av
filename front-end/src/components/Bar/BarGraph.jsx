import React from "react";
import { 
   defaults } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./BarGraph.css";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.padding = 20;
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "#000";
function BarGraph({ Title, data }) {
  const options = {
    
    plugins: {
      title: {
        text: Title,
        
      },
      legend: {
        align: "center",
        position: "bottom",
        height:'1rem',
        
      },
    },
  };
  return <Pie data={data} options={options}  />;
}

export default BarGraph;
