import React,{useContext,useState} from "react";
import "./Password.css";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import { useLogout } from "../../../hooks/useLogOut";
 
const Password = () => {
  const {user}=useContext(AuthContext);
  const { logout } = useLogout();
  const [pass, setNewPass]=useState({
    pass: "",
    newPassword:"",
    confirmNewPassword:""
  });

  const handleEditPassword=async(e)=>{
    e.preventDefault();
    console.log("pass", pass);
    try{
      const response = await axios.post(
        `http://localhost:5001/api/profile/updatePass/${user.id}`,
        {
          password: pass.pass,
          newPassword: pass.newPassword,
          confirmNewPassword: pass.confirmNewPassword,
        }
      );

      if(response.status===200){
        const data = response.data;
        console.log("Info updated successfully:", data);
        setNewPass({
          pass: "",
        });
        const responseUser= await axios.get(`http://localhost:5001/api/user/${user.id}`);
        const dataUser=responseUser.data;
        localStorage.setItem("user", JSON.stringify(dataUser));

        Swal.fire({icon: "success", title: "mot de passe modifié avec succès",text: "Veuillez vous reconnecter avec votre nouveau mot de passe." })
        .then(() => {
          logout();
          window.location.href = '/login';
        });
      }
    }catch(error){
      console.error("Error updating user password", error);
      const errorMessage = error.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Une erreur est survenue lors de la mise à jour du mot de passe",
        text: errorMessage,
      });
    }
  }
  return (
    <form onSubmit={handleEditPassword}>
    <div className="password">
      <div className="pass-div">
        <h5 className="pass-title">Mot De Passe</h5>
        <div className="pass-body">
          <span className="current-pass">
            <label className="current-pass-label">Mot de passe actuel</label>
            <span className="current-pass-input">
              <input type="password" onChange={(e)=>setNewPass({ ...pass, pass:e.target.value})} required/>
            </span>
            <a className="forgot-current-pass" href="#">
              Mot de passe oublié?
            </a>
          </span>
          <span className="new-pass">
            <label className="new-pass-label">Nouveau mot de passe</label>
            <span className="new-pass-input">
              <input type="password" onChange={(e)=>setNewPass({ ...pass, newPassword:e.target.value})} required/>
            </span>
          </span>
          <span className="confirm-new-pass">
            <label className="confirm-new-pass-label">
              confirmer le nouveau mot de passe
            </label>
            <span className="confirm-new-pass-input">
              <input type="password" onChange={(e)=>setNewPass({ ...pass, confirmNewPassword:e.target.value})} required/>
            </span>
          </span>
          <button type="submit" className="save-changes">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default Password;
