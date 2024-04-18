import CallToActionComponent from "../CallToActionComponent.js";
import "../CallToAction.css"

// functionality to be added
function BigCallToActionComponent() {
    return (
        <>
            <h4 className="callToActionHeading">Go and Discover</h4>
            <CallToActionComponent fill="fill" align="center" size="big"></CallToActionComponent>
        </>
    );
  }
  
  export default BigCallToActionComponent;