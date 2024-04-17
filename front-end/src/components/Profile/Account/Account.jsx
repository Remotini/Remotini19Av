import React,{useState} from "react";
import "./Account.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import unknown from "../../../assets/unknown-user.png";
import { FaUpload } from "react-icons/fa";
import EditAccount from '../../../components/Profile/Account/EditAccount';
import axios from 'axios';
import Swal from 'sweetalert2';



const Account = () => { 
  // const [info, setNewInfo] = useState({ 
  //     prenom: user.firstName,
  //     nom: user.lastName,
  //     photo: user.picturePath,
  //     cin: user.cin,
  // });

  // const handleEditAccount = async (e) => { 
  //     e.preventDefault();

  //     try {
  //         const response = await axios.put( 
  //             `http://localhost:5001/api/account/${user._id}`,
  //             {
  //                 firstName: info.prenom,
  //                 lastName: info.nom,
  //                 picturePath: info.photo,
  //                 cin: info.cin
  //             },
  //             {
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //             }
  //         );

  //         if (response.status === 200) { 
  //             const data = response.data;
  //             console.log("Info updated successfully:", data);
  //             setUpdatedUser(!updatedUser); 
  //             setNewInfo({ 
  //                 prenom: "",
  //                 nom: "",
  //                 photo: "",
  //                 cin: "",
  //             });
  //             Swal.fire({ icon: "success", title: "info modifiée avec succès" }); 
  //         }
  //     } catch (error) { 
  //         console.error("Error updating user info", error);
  //         Swal.fire({ icon: "error", title: "Une erreur est survenue lors de la mise à jour des informations" }); 
  //     }
  // };

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
      <form >
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
                  <input type="text" placeholder="Prenom" />
                </div>
                <div className="nomFam">
                  <p className="last-name">Nom de famille</p>
                  <input type="text" placeholder="Nom de famille" />
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
                <input type="text" placeholder="Email" />
              </div>
            </span>
            <span className="CIN">
              <label className="cin-label">Carte d'identité nationale</label>
              <div className="cin-input">
                <input type="text" placeholder="numéro de votre carte" />
              </div>
            </span>
            <div className="ville">
              <div className="ville-info-inputs">
                <div className="etab">
                  <label className="ville-label">Établissement</label>
                  <input type="text" placeholder="Établissement" />
                </div>
                <div className="codep">
                  <label className="code-postal-label">Code Postal</label>
                  <input type="text" placeholder="Code Postal" />
                </div>
              </div>
              <span className="adresse">
                <label className="adresse-label">Adresse</label>
                <input type="text" placeholder="Adresse" />
              </span>
            </div>
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
