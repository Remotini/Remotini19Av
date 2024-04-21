import React, { useState } from "react";
import "./Admin.css";
import UserInterface from "./UserInterface";
import RapportsInterface from "./RapportsInterface";
import TachesInterfaces from "./TachesInterfaces";
function Admin() {
  const [userInterface, setUserInterface] = useState(false);
  const [rapportsInterface, setRapportsInterfaces] = useState(false);
  const [tachesInterface, setTachesInterfaces] = useState(false);
  console.log("set user interface", setUserInterface);

  return (
    <>
      {userInterface ? (
        <UserInterface
          setUserInterface={setUserInterface}
          userInterface={userInterface}
        />
      ) : rapportsInterface ? (
        <RapportsInterface setRapportsInterfaces={setRapportsInterfaces} />
      ) : tachesInterface ? (
        <TachesInterfaces setTachesInterfaces={setTachesInterfaces} />
      ) : (
        <div className="Admin-wrapper">
          <div className="button-wrapper">
            <button onClick={() => setUserInterface(!userInterface)}>
              Consulter Utilisateurs
            </button>
            <button onClick={() => setRapportsInterfaces(!rapportsInterface)}>
              Consulter Rapports
            </button>
            <button
              onClick={() => {
                setTachesInterfaces(!tachesInterface);
              }}
            >
              Consulter Taches{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
