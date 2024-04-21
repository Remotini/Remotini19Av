import React from "react";
import Back_button from "./Back_button";

function UserInterface(props) {
  const { setUserInterface, userInterface } = props;
  return (
    <div>
      Ena el user interface
      <Back_button text={"Back user"} setFunction={setUserInterface} />
    </div>
  );
}

export default UserInterface;
