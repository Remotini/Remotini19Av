import { useEffect, useState } from "react";
import { data1 } from "./data1";
import "./CardProject.css";

const CardProject = () => {
  const [selected, setSelected] = useState(0);
  const length = data1.length;
  function calculateDays(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  }

  const daysDifference = calculateDays(
    data1[selected].startDate,
    data1[selected].deadline
  );
  const currentDate = new Date(); // Current date
  const daysLeft = calculateDays(currentDate, data1[selected].deadline);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress((daysLeft / daysDifference) * 100);
  }, [daysLeft / daysDifference]);
  const getColor = () => {
    if (progress < 30) {
      return "linear-gradient(30deg, #FF416C, #FF4B2B)";
    } else if (progress < 60) {
      return "linear-gradient(30deg, #fdc830, #fdc830)";
    } else {
      return "linear-gradient(30deg, #90ee90, #a8e063)";
    }
  };

  return (
    <div className="card">
      <div className="project-name">Projet: <h4>{data1[selected].name}</h4></div>
      <hr />
      <div className="info">
        <p className="days-left">
          <strong>Jours restants:</strong> {daysLeft} Jours
        </p>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%`, background: getColor() }}
          ></div>
        </div>
        <p className="deadline">
          <strong>Deadline: </strong>
          {data1[selected].deadline}
        </p>
        <div className="arrows">
          <span
            id="arrow-left"
            class="material-symbols-outlined"
            onClick={() => {
              selected === 0
                ? setSelected(length - 1)
                : setSelected((prev) => prev - 1);
            }}
          >
            arrow_back
          </span>
          <span
            id="arrow-right"
            class="material-symbols-outlined"
            onClick={() => {
              selected === length - 1
                ? setSelected(0)
                : setSelected((prev) => prev + 1);
            }}
          >
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
