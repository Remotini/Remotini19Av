import React, { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Account from "./Account/Account";
import Password from "./Password/Password";
import Notifications from "./notification/notification";
import "./profile.css";
const Profile = () => {
  const [currentComponent, setCurrentComponent] = useState(<Account />);

  const handleButtonClick = (component) => {
    setCurrentComponent(component);
  };
  return (
    <div className="profile">
      <div className="settings">
        <div className="profile-settings">
          <h5>Paramètres de profil</h5>
        </div>
        <hr className="br" />
        <div className="list-settings" role="tablist">
          <div>
            <a
              className="settings-account"
              onClick={() => handleButtonClick(<Account />)}
            >
              Compte
            </a>
          </div>
          <hr className="br" />
          <div>
            <a
              className="settings-password"
              onClick={() => handleButtonClick(<Password />)}
            >
              Mot de passe
            </a>
          </div>

          <hr className="br" />
          <div>
            <Link
              className="settings-web-notifications"
              to=""
              aria-selected="false"
            >
              Notifications
            </Link>
          </div>
          <hr className="br" />
          <div>
            <Link
              className="settings-delete-account"
              to=""
              aria-selected="false"
            >
              Delete Account
            </Link>
          </div>
          <hr className="br" />
        </div>
      </div>
      <div className="scrollable">{currentComponent}</div>
    </div>
  );
};

export default Profile;
