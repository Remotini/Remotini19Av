import React from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
function SignUpp() {
  return (
    <div className="sign-container">
      <div class="wrapper">
        <h2>Registration</h2>
        <form action="#">
          <div className="align-inputs-evenly">
            <div className="left-input">
              <p>Nom</p>
              <div class="input-box">
                <input type="text" placeholder="Entrer votre nom" required />
              </div>
              <p>Mail</p>
              <div class="input-box">
                <input type="text" placeholder="Entrer Votre mail" required />
              </div>
              <p>Mote de passe</p>
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Entrer votre mot de passe"
                  required
                />
              </div>
              <p>Code equipe</p>
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Entrer votre Code Equipe"
                  required
                />
              </div>
            </div>
            <div className="right-input">
              <p>Prenom</p>
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Entrer votre Prenom"
                  required
                />
              </div>
              <p>Care d'identité nationale</p>
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Entrer votre Cin"
                  required
                />
              </div>
              <p>Confirmer</p>
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Confirmer votre mot de passe"
                  required
                />
              </div>
            </div>
          </div>

          <div class="input-box button">
            <input type="Submit" value="Register Now" />
          </div>
          <div class="text">
            <h3>
              Vous avez un compte déja? <Link to="/Login">Login now</Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpp;
