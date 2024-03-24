import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
function SignUpp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [equipe, setEquipe] = useState("");
  const [cin, setCin] = useState("");
  const [confPass, setConfPass] = useState("");
  //------------------------------------------------//
  const { signup, isLoading, error } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(nom, prenom, email, cin, password, confPass, equipe);
    window.location.href = "/Login";
  };
  return (
    <div className="sign-container">
      <div className="wrapper">
        <h2>Registration</h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="align-inputs-evenly">
            <div className="left-input">
              <p>Nom</p>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Entrer votre nom"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <p>Mail</p>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Entrer Votre mail"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <p>Mote de passe</p>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Entrer votre mot de passe"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <p>Code equipe</p>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Entrer votre Code Equipe"
                  required
                  onChange={(e) => setEquipe(e.target.value)}
                  value={equipe}
                />
              </div>
            </div>
            <div className="right-input">
              <p>Prenom</p>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Entrer votre Prenom"
                  required
                  onChange={(e) => setPrenom(e.target.value)}
                  value={prenom}
                />
              </div>
              <p>Care d'identité nationale</p>
              <div className="input-box">
                <input
                  type="number"
                  placeholder="Entrer votre Cin"
                  required
                  onChange={(e) => setCin(e.target.value)}
                  value={cin}
                />
              </div>
              <p>Confirmer</p>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Confirmer votre mot de passe"
                  required
                  onChange={(e) => setConfPass(e.target.value)}
                  value={confPass}
                />
              </div>
            </div>
          </div>

          <div className="input-box button">
            <button disabled={isLoading}>Register</button>
          </div>
          <div className="text">
            <h3>
              Vous avez un compte déja? <Link to="/Login">Login now</Link>
            </h3>
          </div>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
    </div>
  );
}

export default SignUpp;
