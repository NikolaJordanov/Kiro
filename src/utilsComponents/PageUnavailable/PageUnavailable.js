import NewsletterComponent from "../../AboutContact/ContactUs/Newsletter/NewsletterComponent";
import HeaderComponent from "../Header/HeaderComponent";

function PageUnavailable() {
    return (
      <>
        <HeaderComponent></HeaderComponent>
        <section className="pageUnavailableColor">
            <h1>Still unavailable </h1>
            <NewsletterComponent></NewsletterComponent>
        </section>
      </>
    );
  }
  
  export default PageUnavailable;
  