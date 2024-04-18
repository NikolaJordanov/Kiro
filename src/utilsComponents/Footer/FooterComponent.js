import ".//Footer.css"
import { Outlet, Link } from "react-router-dom";

// functionality to be added
function FooterComponent() {
    return (
        <footer>
            <div className="footerSiteMapGrid">
                <Link to="/Home">Home</Link>
                <Link to="/Settings">Settings</Link>
                <Link to="/About us">About us</Link>
                <Link to="/Contact us">Contact us</Link>
                <Link to="/Find a buddy">Find a buddy</Link>
                <Link to="/Posts">Posts</Link>
            </div>
            <div className="footerLine"></div>
            <div className="footerLegalGrid">
                <div>
                <Link to="/#">Copyright</Link>
                </div>
                <div className="footerLegalMenuGrid">
                    <Link to="/#">Terms of services</Link>
                    <Link to="/#">Privacy policy</Link>
                    <Link to="/#">Cookie Settings</Link>
                </div>
            </div>
        </footer>

    );
  }
  
  export default FooterComponent;