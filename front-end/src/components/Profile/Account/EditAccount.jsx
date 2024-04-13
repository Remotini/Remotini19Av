import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditAccount =({user, setEditUser, setUpdatedUser, updatedUser})=>{
    const [info, setNewInfo]=useState({
        prenom: user.firstName,
        nom: user.lastName,
        photo: user.picturePath,
        cin: user.cin,
    });

    const handleClick= async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.put(
                `http://localhost:5001/api/tasks/${user._id}`,
                {
                    firstName: info.prenom,
                    lastName: info.nom,
                    picturePath: info.photo,
                    cin: info.cin
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if(response.status===200){
                const data= response.data;
                console.log("Info updated successfully:", data);
                setUpdatedUser(!updatedUser);
                setNewInfo({
                    prenom:"",
                    nom:"",
                    photo:"",
                    cin:"",
                });
                setEditUser(false);
                Swal.fire({icon: "success", title: "info modifiée avec succès"});
              }
        } catch(error){
            console.error("Error updating user info", error);
        }
    }
    const handleInputChange=(e)=>{
        setUser(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("user updated:", user);
    }
}

export default EditAccount;