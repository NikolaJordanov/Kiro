import HeaderComponent from "../utilsComponents/Header/HeaderComponent.js"
import FooterExpandedComponent from "../utilsComponents/Footer/FooterExpandedComponent.js";
import AboutUsComponent from "./AboutUs/AboutUsComponent.js"
import ContactUsComponent from "./ContactUs/ContactUsComponent.js"
import LineComponent from "../utilsComponents/Line/LineComponent.js";

import "..//styles.css"

function AboutContact() {
    return (
      <>
        <HeaderComponent></HeaderComponent>
        <main className="bigMargin">
          <ContactUsComponent></ContactUsComponent>
          <LineComponent></LineComponent>
          <AboutUsComponent></AboutUsComponent>
        </main>
        <FooterExpandedComponent></FooterExpandedComponent>
      </>
    );
  }

export default AboutContact;