import CallToActionComponent from "../callToAction/CallToActionComponent";
import ".//SecondSectionComponent.css"

// functionality to be added
function SecondSectionComponent(){
    return (
        <section className="secondSectionGrid">
            <div>
                <h2>Find your perfect gym buddy with us</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt imperdiet metus eu cursus. 
                    Praesent augue eros, elementum at est vitae, tempor consequat dolor. Etiam sodales mi nisi, sit amet tempus ante pellentesque in. 
                    Integer accumsan sodales dignissim. Curabitur non risus quis neque maximus tristique. 
                </p>
                <CallToActionComponent fill="nofill" size="small" margin="big"></CallToActionComponent>
            </div>
            <div className="image"></div>
        </section>

    );
  }
  
  export default SecondSectionComponent;