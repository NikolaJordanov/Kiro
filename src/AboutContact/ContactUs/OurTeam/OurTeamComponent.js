import ContactInfoHolder from "./contactInfoHolder"
import ".//OurTeamComponent.css"

const json = require('../../aboutUs.json');


function OurTeamComponent() {
    const n = json["teamRender"]["n"];
    const image_list = json["teamRender"]["image_list"];
    const name_list = json["teamRender"]["name_list"]; 
    const profession_list = json["teamRender"]["profession_list"];
    const email_list = json["teamRender"]["email_list"];
    const quote_list = json["teamRender"]["quote_list"]; 

    let teamRender = []
    for (let idx = 0; idx < n; idx++) {
        const self_image = image_list[idx]
        const self_name = name_list[idx]
        const self_profession = profession_list[idx]
        const self_email = email_list[idx]
        const self_quote = quote_list[idx]

        teamRender.push(
            <div className="ourTeamElement" key={idx}>
                <div style={{backgroundImage: self_image}} className="image"></div>
                <h6 >{self_name}</h6>
                <p className="proffession">{self_profession}</p>
                <ContactInfoHolder email={self_email} quote={self_quote}></ContactInfoHolder>
            </div>
        )
    }

    return (
        <>
            <h3 className="light noMargin">Our Team</h3>
            <div className="ourTeamCenter">
                {teamRender}
            </div>
        </>
    );
}

export default OurTeamComponent;