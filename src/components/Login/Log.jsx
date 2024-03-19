import React from "react";
import "./Log.css";
function Log() {
  return (
    <div class="wrapper">
      <h2>Se Connecter</h2>
      <form action="#">
        <div class="input-box">
          <input type="text" placeholder="Enter your email" required />
        </div>
        <div class="input-box">
          <input type="password" placeholder="Create password" required />
        </div>

        <div class="input-box button">
          <input type="Submit" value="Register Now" />
        </div>
        <div class="text">
          <h3>
            Vouns n'avez pas de compte ? <a href="#">Sing Up</a>
          </h3>
        </div>
      </form>
    </div>
  );
}

export default Log;
