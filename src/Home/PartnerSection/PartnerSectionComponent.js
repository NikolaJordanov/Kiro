import ".//PartnerSectionComponent.css"

const json = require("../home.json")
// functionality to be added
function PartnerSectionComponent(){
    const n = json["partnerRender"]["n"]
    const name_list = json["partnerRender"]["name_list"]
    const data_list = json["partnerRender"]["data_list"]
    const image_list =json["partnerRender"]["image_list"]

    var columns = []
    for (let index = 0; index < n; index++) {
        const self_data = data_list[index]
        const self_image = image_list[index]
        columns.push(<a href={self_data} key={index} style={{backgroundImage: self_image}}></a>)
    }
    return (
        <section className="partnerSectionGrid" style={{gridTemplateColumns: `repeat(${n}, 6.25vw)`}}>
            {columns}
        </section>

    );
  }
  
  export default PartnerSectionComponent;