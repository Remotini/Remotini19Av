import React from "react";
import Back_button from "./Back_button";

function RapportsInterface(props) {
  const { setRapportsInterfaces } = props;
  return (
    <div>
      Ena howa el Rapports{" "}
      <Back_button text={"Back rapports"} setFunction={setRapportsInterfaces} />
    </div>
  );
}

export default RapportsInterface;
