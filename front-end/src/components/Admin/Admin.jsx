import { React, useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Admin.css";
import { MdDelete, MdEdit } from "react-icons/md";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useAuthContext } from "../../hooks/useAuthContext";
function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUserAdmin = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5001/api/admin/add", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        cin: cin,
      })
      .then((res) => {
        console.log("response", res.data);

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setCin("");
        if (res.data.message) {
          Swal.fire({
            icon: "error",
            title: "User Not Added",
            text: res.data.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "User Added Successfully",
          });
          setFilteredData([...filteredData, res.data.user]);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setCin("");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      axios
        .get("http://localhost:5001/api/user")
        .then((res) => {
          setUsers(res.data);
          setOriginalData(
            res.data.filter(
              (user) => user.role === "User" || user.role === "Chef"
            )
          );
          setFilteredData(
            res.data.filter(
              (user) => user.role === "User" || user.role === "Chef"
            )
          );
          setLoading(false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchUsers();
  }, []);

  const [filterColumn, setFilterColumn] = useState("firstName");
  const [originalData, setOriginalData] = useState(users);
  const [filteredData, setFilteredData] = useState(originalData);
  const [filterValue, setFilterValue] = useState("");
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);

    if (value === "") {
      setFilteredData(originalData);
    } else {
      const newData = originalData.filter((row) => {
        return row[filterColumn].toLowerCase().includes(value);
      });
      setFilteredData(newData);
    }
  };
  const handleColumnSelect = (e) => {
    setFilterColumn(e.target.value);
    setFilterValue("");
    setFilteredData(originalData);
  };
  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      minWidth: "70px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      minWidth: "70px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      minWidth: "250px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="wrapButtons">
          <button className="edit-button" onClick={() => handleEdit(row)}>
            Edit
          </button>
          <button className="delete-button" onClick={() => handleDelete(row)}>
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "250px",
    },
  ];
  const handleUpdateUserAdmin = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    try {
      axios
        .post(
          `http://localhost:5001/api/profile/updateInfos/${selectedUser}`,
          formdata
        )

        .then((res) => {
          if (res.data.message) {
            Swal.fire({
              icon: "error",
              title: "User Not Updated",
              text: res.data.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "User Updated Successfully",
            });
            const updatedUser = res.data;
            setFilteredData((prevUsers) =>
              prevUsers.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
              )
            );
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setCin("");
            setIsEditing(false);
          }
        });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "User Not Updated",
        text: err.response.data.message,
      });
    }
  };
  const handleEdit = (row) => {
    console.log("selectedUser", selectedUser);
    if (selectedUser !== row._id) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setCin("");
    }
    setSelectedUser(row._id);
    setIsEditing(true);
    // Use a setTimeout to ensure that the user fields are cleared before setting them to the new user's data
    setTimeout(() => {
      setFirstName(row.firstName);
      setLastName(row.lastName);
      setEmail(row.email);
      setCin(row.cin);
      setPassword(row.password);
    }, 0);
  };
  const handleDelete = async (row) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/api/admin/delete/${row._id}`);
        setFilteredData((prevUsers) =>
          prevUsers.filter((user) => user._id !== row._id)
        );
      } catch (err) {
        console.log(err);
      }
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else {
      Swal.fire("Cancelled", "Your file is safe :)", "error");
    }
  };
  // const filteredUser=users.filter(user=>{
  //     if (filter === 'default'){
  //         return true}
  //     return user.role === filter;
  // })
  //  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({columns,data})
  return (
    <div className="tableContainer">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="AdminTableHead">
            <div>
              {" "}
              <input
                type="text"
                name=""
                placeholder={`filter by ${filterColumn}`}
                id=""
                value={filterValue}
                onChange={handleFilter}
              />
            </div>
            <div>
              <select name="" id="" onChange={handleColumnSelect}>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredData}
            className="myDataTable"
            pagination
            paginationPerPage={7}
            paginationRowsPerPageOptions={[5, 7, 10]}
            fixedHeader
            style={{ width: "100%", height: "500px" }}
            paginationComponentOptions={{ noRowsPerPage: true }}
            customStyles={{
              headCells: {
                style: {
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "black",
                  backgroundColor: "lightgray",
                  justifyContent: "center",
                  border: "1px solid black",
                },
              },
              cells: {
                style: {
                  wordBreak: "break-word",
                  justifyContent: "center",
                  fontSize: "0.95rem",
                  height: "50px",
                  padding: "30px",
                },
              },
            }}
          />
        </>
      )}
      <div className="adduser">
        <h1>{isEditing ? "Update User " : "Add User"}</h1>
        <form
          className="adduserform"
          onSubmit={isEditing ? handleUpdateUserAdmin : handleAddUserAdmin}
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            disabled={isEditing}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            disabled={isEditing}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
          />
          <button type="submit">{isEditing ? "modifier" : "ajouter"}</button>
        </form>
      </div>
    </div>
  );
}
export default Admin;
