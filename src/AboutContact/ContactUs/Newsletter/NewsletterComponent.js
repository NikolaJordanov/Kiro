import { Link } from "react-router-dom";
import ".//NewsletterComponent.css"

function NewsletterComponent() {
    return (
        <div className="newsletterCenter">
            <div>
                <p className="bold">Subscribe to our newsletter</p>
                <div className="newsletterGrid">
                    <input type="text"></input>
                    <button>Join</button>
                </div>
                <small>By subscribing you agree to our <Link href="terms">Terms of services</Link> and <Link href="">Privacy policy</Link></small>
            </div>
        </div>
    );
  }

export default NewsletterComponent;