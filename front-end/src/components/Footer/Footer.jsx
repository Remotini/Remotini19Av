import "./Footer.css";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="line-ft">
      <div className="line-one">
        <p>Support</p>
        <p>Privacy</p>
        <p>Terms of service</p>
      </div>
      <div className="icons-ft">
        <FaInstagram className="insta" />
        <FaFacebook className="fb" />
        <FaTwitter className="tw" />
      </div>
      <div className="line-two">
        <p>®2024-Remotini</p>
      </div>
    </div>
  );
};

export default Footer;
