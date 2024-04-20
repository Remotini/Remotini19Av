import "./UserTable.css";
import UserRapportTable from "../UserRapportTable/UserRapportTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import.meta.hot;
const UserTable = () => {
  // const [hoveredRow, setHoveredRow] = useState(null);
  // const [openOptions, setOpenOptions] = useState(null);
  const [clickedUser, setClickedUser] = useState(false);
  const [userClickedId, setUserClickedId] = useState(null);
  const [usersArray, setUsersArray] = useState([]);
  const [userFullName, setUserFullName] = useState("");
  const { user } = useContext(AuthContext);

  // Effect to load data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("usersArray");

    if (storedData) {
      setUsersArray(JSON.parse(storedData));
    }
  }, []);
  useEffect(() => {
    const chefId = user.id;

    if (chefId) {
      axios
        .get(`http://localhost:5001/api/chef/getusers?chefId=${chefId}`)
        .then((response) => {
          const data = response.data;
          setUsersArray(data);
          console.log("Users fetched successfully:", data);
          // Store data in local storage
          localStorage.setItem("usersArray", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching rapports:", error);
        });
    }
  }, []);

  const handleUserClick = (user) => {
    console.log("dabbouch", user);
    setUserClickedId(user._id);
    setUserFullName(`${user.firstName} ${user.lastName}`);
    setClickedUser(true);
  };

  return (
    <>
      {!clickedUser ? (
        <div className="wrapperTable">
          <div className="rapport-desc"></div>

          <div className="table-head">
            <div className="left">Utilisateurs</div>
            <div className="search">
              <input
                type="search"
                className="search-input"
                placeholder="Rechercher..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="30"
                fill="#838383"
                className="dots"
                viewBox="6 0 6 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </div>
          </div>

          <div className="table">
            <table className="tableaux-rapport">
              <thead>
                <tr className="elhead">
                  <th width={"30%"}>Nom</th>
                  <th width={"40%"}>Email</th>

                  <th>Last seen</th>
                </tr>
              </thead>

              <tbody>
                {usersArray?.map((user, index) => (
                  <tr key={index} className="user-row">
                    <td onClick={() => handleUserClick(user)}>
                      {user.firstName} {user.lastName}
                    </td>
                    <td onClick={() => handleUserClick(user)}>{user.email}</td>
                    <td onClick={() => handleUserClick(user)}>
                      {new Date(user.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="footer-table">
            {/* <button> click </button> */}
          </div>
        </div>
      ) : (
        <UserRapportTable
          employeeId={userClickedId}
          clickedUser={clickedUser}
          setClickedUser={setClickedUser}
          setEmployeeId={setUserClickedId}
          userFullName={userFullName}
          
        />
      )}
    </>
  );
};

export default UserTable;
