import ContactListComponent from "./ContactList/ContactListComponent";
import NewsletterComponent from "./Newsletter/NewsletterComponent";
import OurTeamComponent from "./OurTeam/OurTeamComponent";

function ContactUsComponent() {
    return (
      <div className="contactUsCenter">
          <h2>Contact Us</h2>
          <ContactListComponent></ContactListComponent>
          <NewsletterComponent></NewsletterComponent>
          <OurTeamComponent></OurTeamComponent>
      </div>
    );
}

export default ContactUsComponent;