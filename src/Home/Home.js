import HeaderComponent from "../utilsComponents/Header/HeaderComponent.js"
import HeroComponent from "./Hero/HeroComponent.js"
import SecondSectionComponent from "./SecondSection/SecondSectionComponent.js"
import LineComponent from "../utilsComponents/Line/LineComponent.js";
import ThirdSectionComponent from "./ThirdSection/ThirdSectionComponent.js"
import PartnerSectionComponent from "./PartnerSection/PartnerSectionComponent.js";
import FooterExpandedComponent from "../utilsComponents/Footer/FooterExpandedComponent.js";
import BigCallToActionComponent from "./callToAction/BigCallToActionComponent/BigCallToActionComponent.js"

function Home() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <main className="smallMargin">
        <HeroComponent></HeroComponent>
        <LineComponent></LineComponent>
      </main>
      <main className="bigMargin">
        <SecondSectionComponent></SecondSectionComponent>
        <LineComponent></LineComponent>
      </main>
        <ThirdSectionComponent></ThirdSectionComponent>
      <main className="smallMargin">
        <PartnerSectionComponent></PartnerSectionComponent>
      </main>
      <LineComponent></LineComponent>
      <BigCallToActionComponent></BigCallToActionComponent>
      <FooterExpandedComponent></FooterExpandedComponent>
    </>
  );
} 

export default Home;
