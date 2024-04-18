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
  
  const [info, setNewInfo] = useState({
    prenom: user.firstName,
    nom: user.lastName,
    photo: user.picturePath,
    cin: user.cin,
  });

  const handleEditAccount = async (e) => {
    e.preventDefault();
    console.log("user", user);
    try {
      const response = await axios.post(
        `http://localhost:5001/api/profile/updateInfos/${user.id}`,
        {
          firstName: info.prenom,
          lastName: info.nom,
          picturePath: info.photo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Info updated successfully:", data);
        setNewInfo({
          prenom: "",
          nom: "",
        });
        const responseUser = await axios.get( `http://localhost:5001/api/user/${user.id}`);
        const dataUser = responseUser.data;
        localStorage.setItem("user", JSON.stringify(dataUser));
        Swal.fire({ icon: "success", title: "info modifiée avec succès" });
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
      {/* <div className="first-div">
        <div className="left-first-div">
          <h5 className="public-info">Public Info</h5>
          <span className="info-u">
            <label>Nom d'utilisateur</label>
            <input
              className="username"
              type="text"
              placeholder="Nom d'utilisateur"
            ></input>
          </span>
          <span className="info-b">
            <label>Biographie</label>
            <input
              className="biography"
              type="text"
              placeholder="Tell me something about yourself"
            ></input>
          </span>
          <button type="submit" className="save-changes">
            Sauvegarder aaslema ya hmema
          </button>
        </div>
        <div className="right-first-div">
          <div className="icons">
            <BsThreeDotsVertical className="icon1" />
          </div>
          <img src={unknown} alt="user-photo" />
          <div className="upload-btn">
            <span className="upload">
              <FaUpload className="icon2" />
              Importer
            </span>
          </div>
        </div>
      </div> */}
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
                        setNewInfo({ ...info, prenom: e.target.value })
                      }
                    />
                  </div>
                  <div className="nomFam">
                    <p className="last-name">Nom de famille</p>
                    <input
                      type="text"
                      placeholder={user.lastName}
                      onChange={(e) =>
                        setNewInfo({ ...info, nom: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="right-first-div">
                  <img src={unknown} alt="user-photo" />
                  <div className="upload-btn">
                    <span className="upload">
                      <FaUpload className="icon2" />
                      Importer
                    </span>
                  </div>
                </div>
              </div>
              <span className="e-mail">
                <label className="mail-label">E-mail</label>
                <div className="e-mail-input">
                  <input type="text" placeholder={user.email}  disabled/>
                </div>
              </span>
              <span className="CIN">
                <label className="cin-label">Carte d'identité nationale</label>
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
