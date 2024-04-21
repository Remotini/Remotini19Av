import React from "react";

function Back_button(props) {
  const { text, setFunction } = props;
  return <button onClick={() => setFunction(false)}>{text}</button>;
}

export default Back_button;
