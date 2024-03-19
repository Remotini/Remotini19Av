import React from "react";
import "./Log.css";
import { Link } from "react-router-dom";
function Log() {
  return (
    <div class="wrapper_log">
      <h2>Se Connecter</h2>
      <form action="#" className="f-login">
        <div class="input-box-login">
          <input type="text" placeholder="Enter your email" required />
        </div>
        <div class="input-box-login">
          <input type="password" placeholder="Create password" required />
        </div>

        <div class="input-box-login button">
          <input type="Submit" value="Register Now" />
        </div>
        <div class="text">
          <h3>
            Vouns n'avez pas de compte ? <Link to="/SignUp">Sing Up</Link>
          </h3>
        </div>
      </form>
    </div>
  );
}

export default Log;
