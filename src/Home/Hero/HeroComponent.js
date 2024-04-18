import ".//HeroComponent.css"
import CallToActionComponent from "../callToAction/CallToActionComponent.js";
import ImageBlockComponent from "./ImageBlockComponent.js";


function HeroComponent() {
  return (
    <>
      <div className="heroGrid">
          <ImageBlockComponent styleList={[1, 2, 2, 1]}></ImageBlockComponent>
            <div className="headingGrid">
              <div>
                <h1>Find your new</h1>
                <h1 className="color">Fitness Buddy</h1>
                <h1>Today!!!</h1>
              </div>

              <p className="explicationParagraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt imperdiet metus eu cursus. </p>

              <div className="iconGrid">
                <a href=""></a>
                <a href=""></a>
                <a href=""></a>
              </div>
            </div>
            <ImageBlockComponent styleList={[2, 1, 1, 2]}></ImageBlockComponent>
      </div>
      <CallToActionComponent fill="fill" size="medium" align="center" margin="big"></CallToActionComponent>
    </>
  );
}

export default HeroComponent;
