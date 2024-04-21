import React from "react";
import Back_button from "./Back_button";
function TachesInterfaces(props) {
  const { setTachesInterfaces } = props;
  return (
    <div>
      ena el taches
      <Back_button text={"Back Taches"} setFunction={setTachesInterfaces} />
    </div>
  );
}

export default TachesInterfaces;
