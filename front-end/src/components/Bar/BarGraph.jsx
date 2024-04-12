import React from "react";
import { Chart as ChartJs, Ticks, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
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
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      title: {
        text: Title,
      },
      legend: {
        align: "end",
      },
    },
  };
  return <Bar data={data} options={options} />;
}

export default BarGraph;
