import ".//ThirdSectionComponent.css"
import Carouselle from ".//Carouselle.js"


// functionality to be added
function ThirdSectionComponent(){
    return (
        <>
            <section className="thirdSectionGrid">
                <div>
                    <h2>Staying focused </h2>
                    <h2>together</h2>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt imperdiet metus eu cursus. 
                    Praesent augue eros, elementum at est vitae, 
                    tempor consequat dolor. Etiam sodales mi nisi, sit amet tempus ante pellentesque in. Integer accumsan sodales dignissim. 
                    urabitur non risus quis neque maximus tristique
                </p>
            </section>
            <Carouselle></Carouselle>
        </>
    );
  }
  
  export default ThirdSectionComponent;