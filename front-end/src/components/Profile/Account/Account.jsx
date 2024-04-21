import React, { useContext, useState } from "react";
import "./Account.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import unknown from "../../../assets/unknown-user.png";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

const Account = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [info, setNewInfo] = useState({
    id: user.id,
    email: user.email,
    token: user.token,
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user.picturePath,
    cin: user.cin,
    role: user.role,
  });
  
  const handleEditAccount = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    
    formdata.append("file", file);
    
    formdata.append("firstName", info.firstName);
    formdata.append("lastName", info.lastName);

    try {
      const response = await axios.post(
        `http://localhost:5001/api/profile/updateInfos/${user.id}`,
        formdata
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("info picturePath", data.picturePath);
        console.log("Info updated successfully:", data);
        setNewInfo({
          lastName: "",
          firstName: "",
          photo: "",
        });
        const responseUser = await axios.get(
          `http://localhost:5001/api/user/${user.id}`
        );
        const updatedUser = {
          ...user,
          firstName: info.firstName,
          lastName: info.lastName,
          picturePath: data.picturePath,
        };
        console.log("updated user:", updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update the state with the new information
        setNewInfo(updatedUser);

        Swal.fire({ icon: "success", title: "info modifiée avec succès" }).then(
          () => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      console.error("Error updating user info", error);
      Swal.fire({
        icon: "error",
        title:
          "Une erreur est survenue lors de la mise à jour des informations",
      });
    }
  };

  return (
    <div className="account">
      <form onSubmit={handleEditAccount}>
        <div className="second-div">
          <div className="left-second-div">
            <div className="heading">
              <div className="left-heading">
                <h5 className="Private-info">Private Info</h5>
              </div>
              <div className="right-heading">
                <BsThreeDotsVertical />
              </div>
            </div>
            <div className="info">
              <div className="first-row">
                <div className="inputs-names">
                  <div className="nomFam">
                    <p className="prenom">Prénom</p>
                    <input
                      type="text"
                      placeholder={user.firstName}
                      onChange={(e) =>
                        setNewInfo({ ...info, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="nomFam">
                    <p className="last-name">Nom de famille</p>
                    <input
                      type="text"
                      placeholder={user.lastName}
                      onChange={(e) =>
                        setNewInfo({ ...info, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="right-first-div">
                  {!file ? (
                    info.photo ? (
                      <img
                        src={`http://localhost:5001/images/${info.photo}`}
                        alt="user-photo"
                      />
                    ) : (
                      <img src={unknown} alt="user-photo" />
                    )
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="user-photo"
                    />
                  )}

                  <div className="label-screenshot">
                    <input
                      type="file"
                      accept="image/*"
                      className="input-file"
                      id="profile-picture"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label htmlFor="profile-picture" className="file-label">
                      <FaUpload /> Importer
                    </label>
                  </div>
                </div>
              </div>
              <span className="e-mail">
                <label className="mail-label">E-mail</label>
                <div className="e-mail-input">
                  <input type="text" placeholder={user.email} disabled />
                </div>
              </span>
              <span className="CIN">
                <label className="cin-label">
                  Carte d'identité nationale
                </label>
                <div className="cin-input">
                  <input type="text" placeholder={user.cin} disabled />
                </div>
              </span>
              <button type="submit" className="save-changes">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Account;
